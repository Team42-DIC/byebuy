function onError(error) {
  console.log(`Error: ${error}`);

}
var newNode = document.createElement("div");
newNode.className = "a-button a-button-stack a-spacing-small a-button-inner celwidget a-button-icon ";
newNode.style.lineHeight = "1.95em"
newNode.style.width = "100%"
newNode.textContent = "byebuy: Postpone & Save CO2";
newNode.style.backgroundColor = "#90ee90";
newNode.addEventListener("click", addToList)

newNode.addEventListener("mouseenter", () => newNode.style.backgroundColor = "#64e764");
newNode.addEventListener("mouseleave", () => newNode.style.backgroundColor = "#90ee90");

const nodes = document.querySelectorAll("#addToCart_feature_div")
let cartButton = null
nodes.forEach(node => {
    if (node.childNodes.length == 9) {
        console.log(node.childNodes.length)
        cartButton = node
    }
    
});
cartButton.parentNode.insertBefore(newNode, cartButton.nextSibling);

function addToList() {
    const link = window.location.href;
    const name = document.getElementById("productTitle").innerText;
    let price = document.getElementById("priceblock_ourprice")
    if (price === null) {
        price = document.getElementById("priceblock_dealprice")
    }
    price = price.innerText
    const image= document.getElementById("landingImage").src;
    const timeStamp = Date.now();
    browser.storage.sync.get("items").then(result => {
        let items = result.items;
        if (!items) {
            items = [];
        }
        items.push({ name, link, price, image, timeStamp });
        console.log("newItems", items)
        browser.storage.sync.set({ items });
    }, onError);
}
