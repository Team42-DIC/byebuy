function onError(error) {
  console.log(`Error: ${error}`);

}
var newNode = document.createElement("div");
newNode.className = "a-button a-button-stack a-spacing-small a-button-inner celwidget a-button-icon ";
newNode.style.width = "100%"
newNode.textContent = "Buy me later!";
newNode.style.backgroundColor = "#90ee90";
newNode.addEventListener("click", addToList)

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
    const title = document.getElementById("productTitle").innerText;
    let price = document.getElementById("priceblock_ourprice")
    if (price === null) {
        price = document.getElementById("priceblock_dealprice")
    }
    const imageLink = document.getElementById("landingImage").src;
    const timeStamp = Date.now();
    browser.storage.sync.get("items").then(result => {
        let items = result.items;
        if (!items) {
            items = [];
        }
        items.push({ title, link, price, imageLink, timeStamp });
        console.log("newItems", items)
        browser.storage.sync.set({ items });
    }, onError);
}