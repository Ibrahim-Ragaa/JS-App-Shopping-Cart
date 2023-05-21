// Define products

let productDom = document.querySelector(".products");
shoppingCartIcon = document.querySelector(".fa-cart-shopping");
shoppingCartIcon.addEventListener("click", opencartMenu);
let cartProductDom = document.querySelector(".carts-products div");
let cartProductcnt = document.querySelector(".badge");
let cartProductmenue = document.querySelector(".carts-products");

function drawProductsUI() {
  let ProductsUI = products.map((item) => {
    return `
        <div class="product-item">
              <img
                src="${item.imageurl}"
                alt="image"
                class="product-item-img"
                alt=""
              />
              <div class="product-item-desc">
                <h2><a onclick="productId(${item.id})">${item.title}</a></h2>
                <p>the product is glasses</p>
                <span> Size: ${item.size} </span>
              </div>
              <div class="product-item-actions">
                <button class="add-to-cart" onclick="addToCart(${item.id})">Add To Cart</button>
                <i class="heart fa-thin fa-heart"></i>
              </div>
            </div>`;
  });

  productDom.innerHTML = ProductsUI;
}

drawProductsUI();

//check if there is item in localstorage
let addedItem = localStorage.getItem("productsincarts")
  ? JSON.parse(localStorage.getItem("productsincarts"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductDom.innerHTML += `<p>${item.title}</p>`;
  });
  let cartProductlength = document.querySelectorAll(".carts-products div p");
  cartProductcnt.innerHTML = cartProductlength.length;
  if (cartProductlength.length) {
    cartProductcnt.style.display = "block";
  }
}

function addToCart(id) {
  if (localStorage.getItem("username")) {
    let chosenItem = products.find((item) => id === item.id);
    cartProductDom.innerHTML += `<p>${chosenItem.title}</p>`;
    cartProductcnt.style.display = "block";
    // cartProductcnt.innerHTML = +cartProductcnt.innerHTML + 1;
    let cartProductlength = document.querySelectorAll(".carts-products div p");
    cartProductcnt.innerHTML = cartProductlength.length;
    addedItem = [...addedItem, chosenItem];
    localStorage.setItem("productsincarts", JSON.stringify(addedItem));
  } else {
    window.location = "login.html";
  }
}

function opencartMenu() {
  if (cartProductDom.innerHTML != "") {
    if (cartProductmenue.style.display == "block") {
      cartProductmenue.style.display = "none";
    } else {
      cartProductmenue.style.display = "block";
    }
  }
}

function productId(id) {
  localStorage.setItem("productId", id);
  window.location = "cart-details.html";
}
