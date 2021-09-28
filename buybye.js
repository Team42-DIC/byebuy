function onError(error) {
  console.log(`Error: ${error}`);
}
var newNode = document.createElement("div");
newNode.className = "a-button a-button-stack a-spacing-small a-button-inner celwidget a-button-icon ";
newNode.textContent = "Buy me later!";

var cartButton = document.getElementById("addToCart_feature_div");
cartButton.parentNode.insertBefore(newNode, cartButton.nextSibling);

const link = window.location.href;
const title = document.getElementById("productTitle").innerText;
const price = document.getElementById("price_inside_buybox").innerText;
const imageLink = document.getElementById("landingImage").src;
const timeStamp = Date.now();
browser.storage.local.get()
console.log(timeStamp)
    console.log("teste")
    browser.storage.sync.get("items").then(result => {
        console.log(result)
    }, onError);
/* browser.storage.sync.get("items").then(result => {
    console.log("Trolol")
 let items = result.items;
 if (!items) {
  items = [];
 }
 items.push({ title, link, price, imageLink, timeStamp });
 console.log("newItems", items)
 browser.storage.sync.set({ items });
}, onError);

console.log("test")
browser.storage.sync.get("items").then(console.log) */
