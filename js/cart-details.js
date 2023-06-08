let productsDB1 = JSON.parse(localStorage.getItem("productsDB"));
let productId = JSON.parse(localStorage.getItem("productId"));
let productDteails = productsDB1.find((item) => item.id === productId);
let itemDom = document.querySelector(".item-details");

itemDom.innerHTML = `
                    <img src="${productDteails.imageurl}" alt="" />
                    <h2>${productDteails.title} ${productDteails.qnt}</h2>
                    <span>Quantity : ${productDteails.qnt}</span><br>
                    <span>Size : ${productDteails.size}</span>
                    `;

console.log(productsDB1);
console.log(productId);
console.log(productDteails);
