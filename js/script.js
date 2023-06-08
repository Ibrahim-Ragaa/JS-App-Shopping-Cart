// Define products

let productDom = document.querySelector(".products");
shoppingCartIcon = document.querySelector(".fa-cart-shopping");
shoppingCartIcon.addEventListener("click", opencartMenu);
let cartProductDom = document.querySelector(".carts-products div");
let cartProductcnt = document.querySelector(".badge");
let cartProductmenue = document.querySelector(".carts-products");

//Display Products
let drawProductsUI;
(drawProductsUI = function (products = []) {
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
                <button class="add-to-cart" onclick="addToCart(${
                  item.id
                })">Add To Cart</button>
                <i class="heart fa-thin fa-heart" style="color:${
                  item.fav == 1 ? "red" : ""
                }" onclick="addToFav (${item.id})"></i>
              </div>
            </div>`;
  });

  productDom.innerHTML = ProductsUI.join("");
})(JSON.parse(localStorage.getItem("productsDB")));

//check if there is any item in cart
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

//Add To Cart
function addToCart(id) {
  if (localStorage.getItem("username")) {
    let chosenItem = products.find((item) => id === item.id);
    let isProductInCart = addedItem.some((i) => i.id === chosenItem.id);
    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === chosenItem.id) p.qnt += 1;
        return p;
      });
    } else {
      addedItem.push(chosenItem);
    }
    cartProductDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDom.innerHTML += `<p>${item.title} ${item.qnt}</p>`;
    });
    // cartProductcnt.innerHTML = +cartProductcnt.innerHTML + 1;
    // addedItem = [...addedItem, chosenItem];
    // let uniqueProducts = getUniqueId(addedItem, "id");
    localStorage.setItem("productsincarts", JSON.stringify(addedItem));
    let cartProductlength = document.querySelectorAll(".carts-products div p");
    cartProductcnt.innerHTML = cartProductlength.length;
    cartProductcnt.style.display = "block";
  } else {
    window.location = "login.html";
  }
}

function getUniqueId(arr, filterId) {
  let unique = arr
    .map((item) => item[filterId])
    .map((item, i, finalArr) => finalArr.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unique;
  // console.log(unique);
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

let input = document.querySelector(".search-bar");

// input.addEventListener("keyup", (event) => {
//   if (event.keyCode === 13) {
//     myArray = JSON.parse(localStorage.getItem("productsDB"));
//     search(event.target.value, myArray);
//   }
// });

input.addEventListener("keyup", (event) => {
  search(event.target.value, JSON.parse(localStorage.getItem("productsDB")));
  if (event.target.value.trim() === "") {
    drawProductsUI(JSON.parse(localStorage.getItem("productsDB")));
  }
});

function search(title, myArray) {
  // let mySearch = myArray.filter((item) => item.title === title);
  let mySearch = myArray.filter((item) => item.title.indexOf(title) !== -1);
  drawProductsUI(mySearch);
}

//check if there is any item in Favourite
let addedFav = localStorage.getItem("productsinfav")
  ? JSON.parse(localStorage.getItem("productsinfav"))
  : [];

//Add To Favourite
function addToFav(id) {
  if (localStorage.getItem("username")) {
    let chosenItem = products.find((item) => id === item.id);
    let isProductInFav = addedFav.some((i) => i.id === chosenItem.id);
    if (isProductInFav) {
      addedFav = addedFav.filter((i) => i.id !== chosenItem.id);
      chosenItem.fav = 0;
      localStorage.setItem("productsinfav", JSON.stringify(addedFav));
      products.map((item) => {
        if (item.id === chosenItem.id) {
          item.fav = 0;
        }
      });
      localStorage.setItem("productsDB", JSON.stringify(products));
      drawProductsUI(products);
    } else {
      addedFav.push(chosenItem);
      chosenItem.fav = 1;
      localStorage.setItem("productsinfav", JSON.stringify(addedFav));
      products.map((item) => {
        if (item.id === chosenItem.id) {
          item.fav = 1;
        }
      });
      localStorage.setItem("productsDB", JSON.stringify(products));
      drawProductsUI(products);
    }
  } else {
    window.location = "login.html";
  }
}
