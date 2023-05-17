let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutButton = document.querySelector("#logout");

let username = localStorage.getItem("username");

if (username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = username;
}

logoutButton.addEventListener("click", logout);

function logout() {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
}

// Define products

let productDom = document.querySelector(".products");
shoppingCartIcon = document.querySelector(".fa-cart-shopping");
shoppingCartIcon.addEventListener("click", opencartMenu);

let products = [
  {
    id: 1,
    title: "Glasses Item",
    size: "large",
    imageurl: "images/glasses.webp",
  },
  {
    id: 2,
    title: "Headphone Item",
    size: "large",
    imageurl: "images/headphone.jpg",
  },
  {
    id: 3,
    title: "Labtop Item",
    size: "large",
    imageurl: "images/labtop.jpg",
  },
  {
    id: 4,
    title: "Watch Item",
    size: "Large",
    imageurl: "images/watch.jpg",
  },
];

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
                <h2>${item.title}</h2>
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

let cartProductDom = document.querySelector(".carts-products div");
let cartProductcnt = document.querySelector(".badge");

function addToCart(id) {
  let chosenItem = products.find((item) => id === item.id);
  cartProductDom.innerHTML += `<p>${chosenItem.title}</p>`;
  cartProductcnt.style.display = "block";
  // cartProductcnt.innerHTML = +cartProductcnt.innerHTML + 1;
  let cartProductlength = document.querySelectorAll(".carts-products div p");
  cartProductcnt.innerHTML = cartProductlength.length;
}

let cartProductmenue = document.querySelector(".carts-products");

function opencartMenu() {
  if (cartProductDom.innerHTML != "") {
    if (cartProductmenue.style.display == "block") {
      cartProductmenue.style.display = "none";
    } else {
      cartProductmenue.style.display = "block";
    }
  }
}
