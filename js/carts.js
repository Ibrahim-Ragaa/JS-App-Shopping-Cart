let productDom = document.querySelector(".products");

function drawCartProductsUI(allProducts = []) {
  let productsInCarts = localStorage.getItem("productsincarts");
  let products = JSON.parse(productsInCarts) || allProducts;
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
                  <span>Quantity : ${item.qnt}</span><br>
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

drawCartProductsUI();

function removeFromCart(id) {
  let productsInCarts = localStorage.getItem("productsincarts");
  if (productsInCarts) {
    let items = JSON.parse(productsInCarts);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsincarts", JSON.stringify(filteredItems));
    drawCartProductsUI(filteredItems);
  }
}
