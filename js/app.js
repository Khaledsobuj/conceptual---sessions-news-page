const loadCategory = async () => {
    const responsse = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await responsse.json();
    // console.log(data.data.news_category);
    const categoryContainer = document.getElementById('category-bar-container');
    // use the  forEach loop hear
    data.data.news_category.forEach((item) => {
        // console.log(item);
        const div = document.createElement("div");
        div.innerHTML = `<button onclick="loadNews('${item.category_id}')" class="btn">${item.category_name}</button>`;
        categoryContainer.appendChild(div);

    });

};



const loadNews = async (catId) => {
    console.log(catId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();
    const allData = data.data;
    // console.log(allData);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = '';

    allData.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("singleNews")
        div.innerHTML = `
        <div class="card w-full my-4 bg-base-100 shadow-xl">
        <figure><img src=${item.
                image_url} /></figure>
        <div class="card-body">
        
          <h2 class="card-title">
           ${item.title}
          </h2>
          <p>${item.details.slice(0, 200)}</p>
          <div class="card-actions justify-end">
          <button class="btn">Details</button>
          </div>
        </div>
      </div>
</div >

    `;
        newsContainer.appendChild(div);
    });
};

const handleSearch = () => {
    const value = document.getElementById("search-box").value;

    if (value) {
        loadNews(value);
    }
    else {
        alert("please enter avalid catId");
    }
};


loadNews("01");

loadCategory();