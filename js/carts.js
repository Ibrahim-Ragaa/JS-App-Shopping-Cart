let productsInCarts = localStorage.getItem("productsincarts");
let productDom = document.querySelector(".products");

if (productsInCarts) {
  let item = JSON.parse(productsInCarts);
  drawProductsUI(item);
}

function drawProductsUI(products) {
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
                  <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                  <i class="heart fa-thin fa-heart"></i>
                </div>
            </div>`;
  });

  productDom.innerHTML = ProductsUI;
}

function removeFromCart(id) {
  if (productsInCarts) {
    let items = JSON.parse(productsInCarts);
    let filteredItems = items.filter((item) => item.id !== id);
    drawProductsUI(filteredItems);
    localStorage.setItem("productsincarts", JSON.stringify(filteredItems));
  }
}
