const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));

  loadAllPlants();
};

const loadAllPlants = () => {
  setLoading(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => {
      displayCats(json.plants);
      setLoading(false);
      const allBtn = document.querySelector(".all-btn");
      if (allBtn) setActiveCategory(allBtn);
    });
};

const loadCats = (id, btn) => {
  setLoading(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => {
      displayCats(json.plants);
      setLoading(false);
      setActiveCategory(btn);
    });
};

const displayCats = (trees) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  trees.forEach((tree) => {
    const treeCard = document.createElement("div");
    treeCard.innerHTML = `
      <div class="rounded-lg bg-white p-4">
        <img class="w-[300px] h-[200px] rounded-lg mb-4" src="${tree.image}" alt="">
        <h1 class="text-lg font-semibold mb-4">${tree.name}</h1>
        <p class="text-sm text-gray-700 mb-4">${tree.description}</p>
        <div class="flex justify-between mb-4">
          <p class="bg-green-200 text-green-700 px-3 py-0.5 rounded-3xl">
            ${tree.category}
          </p>
          <p class="font-bold">৳ ${tree.price}</p>
        </div>
        <div class="text-white bg-green-700 py-2 rounded-3xl text-center">
          <button class=""><a href="">Add To Cart</a></button>
        </div>
      </div>
    `;
    plantContainer.appendChild(treeCard);
  });
};

const displayCategories = (category) => {
  const catContainer = document.getElementById("categories-container");
  catContainer.innerHTML = "";

  const allBtn = document.createElement("div");
  allBtn.innerHTML = `
    <button onclick="loadAllPlants()" 
            class="cat-btn all-btn hover:text-white text-left hover:bg-green-700 rounded p-2 my-0.5 w-full cursor-pointer">
      All Trees
    </button>
  `;
  catContainer.appendChild(allBtn);

  for (const cats of category) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadCats(${cats.id}, this)" 
              class="cat-btn hover:text-white text-left hover:bg-green-700 rounded p-2 my-0.5 w-full cursor-pointer">
        ${cats.category_name}
      </button>
    `;
    catContainer.appendChild(btnDiv);
  }
};

const setActiveCategory = (btn) => {
  document.querySelectorAll(".cat-btn").forEach((b) => {
    b.classList.remove("bg-green-700", "text-white");
  });
  btn.classList.add("bg-green-700", "text-white");
};

const setLoading = (status) => {
  const container = document.getElementById("plant-container");
  if (status) {
    container.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
  }
};

loadCategories();
