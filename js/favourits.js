let productDom = document.querySelector(".products");

//Display Favourites
let drawProductsUIFav = function (favProducts = []) {
  let ProductsUI = favProducts.map((item) => {
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
                  <button class="add-to-cart" onclick="removeFromFav(${item.id})">Remove From Favourite</button>
                </div>
            </div>`;
  });

  productDom.innerHTML = ProductsUI.join("");
};

let removeFromFav = function (id) {
  let productsInFav = localStorage.getItem("productsinfav");
  if (productsInFav) {
    let items = JSON.parse(productsInFav);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsinfav", JSON.stringify(filteredItems));

    let productsDB = localStorage.getItem("productsDB")
      ? JSON.parse(localStorage.getItem("productsDB"))
      : [];

    productsDB.forEach((item) => {
      if (item.id === id) {
        item.fav = 0;
      }
    });

    localStorage.setItem("productsDB", JSON.stringify(productsDB));

    drawProductsUIFav(filteredItems);
  }
};

drawProductsUIFav(JSON.parse(localStorage.getItem("productsinfav")));
