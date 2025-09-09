let allCategories = [];

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      allCategories = json.categories;
      displayCategories(json.categories);
    });

  loadAllPlants();
};

const loadAllPlants = () => {
  loading(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => {
      displayCats(json.plants);
      loading(false);
      const allBtn = document.querySelector(".all-btn");
      if (allBtn) setActive(allBtn);
    });
};

const loadCats = (id, btn) => {
  loading(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => {
      displayCats(json.plants);
      loading(false);
      setActive(btn);
    });
};

const displayCats = (trees) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  trees.forEach((tree) => {
    const matched = allCategories.find(
      (cat) => cat.category_name === tree.category
    );

    const treeCard = document.createElement("div");
    treeCard.innerHTML = `
      <div class="rounded-lg bg-white p-4 w-[300px] h-full mx-auto md:mb-0 mb-5 flex flex-col justify-between">
        <img class="w-[300px] h-[200px] rounded-lg mb-4" src="${tree.image}" alt="">
        <h1  id="treesContainer" class="text-lg font-semibold mb-4 inter-font cursor-pointer">${tree.name}</h1>
        <p class="text-md text-gray-700 mb-4">${matched.small_description}</p>
        <div class="flex justify-between mb-4">
          <p class="bg-green-200 text-green-700 px-3 py-0.5 rounded-3xl">
            ${tree.category}
          </p>
          <p class="font-bold">৳ ${tree.price}</p>
        </div>

        <div onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})" 
             class="text-white bg-green-700 hover:bg-white hover:text-green-700 hover:border-green-700 hover:border-[2px] py-2 m-1 hover:m-0 rounded-3xl text-center cursor-pointer">
          <button>Add To Cart</button>
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
            class="cat-btn all-btn text-xl hover:text-white text-left hover:bg-green-700 rounded p-2 my-1 mt-4 w-full cursor-pointer">
      All Trees
    </button>
  `;
  catContainer.appendChild(allBtn);

  for (const cats of category) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadCats(${cats.id}, this)" 
              class="cat-btn text-xl hover:text-white text-left hover:bg-green-700 rounded p-2 my-1 w-full cursor-pointer">
        ${cats.category_name}
      </button>
    `;
    catContainer.appendChild(btnDiv);
  }
};

const setActive = (btn) => {
  document.querySelectorAll(".cat-btn").forEach((b) => {
    b.classList.remove("bg-green-700", "text-white");
  });
  btn.classList.add("bg-green-700", "text-white");
};

const loading = (el) => {
  const container = document.getElementById("plant-container");
  if (el) {
    container.innerHTML = `<div class="w-[300px] flex justify-center items-center">
          <i class="fa-solid fa-spinner text-center text-5xl md:pl-[300px] pl-0"></i>
    </div>`;
  }
};

loadCategories();

let cart = [];

function addToCart(id, name, price) {
  let found = cart.find((item) => item.id === id);

  if (found) {
    found.quantity++;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    });
  }

  alert(name + " added to cart...");
  renderCart();
}

function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    let div = document.createElement("div");

    div.innerHTML = `
      <div class="flex justify-between items-center bg-green-50 p-4 mb-2 rounded">
        <div>
          <p class="font-medium text-xl inter-font">${item.name}</p>
          <p class="text-lg text-gray-600">৳${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeCart(${item.id})" 
                class="text-red-500 font-bold text-lg cursor-pointer">❌</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = "৳ " + total;
}