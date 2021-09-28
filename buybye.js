function onError(error) {
  console.log(`Error: ${error}`);

}
var newNode = document.createElement("div");
newNode.className = "a-button a-button-stack a-spacing-small a-button-inner celwidget a-button-icon ";
newNode.style.lineHeight = "1.95em"
newNode.style.width = "100%"
newNode.textContent = "byebuy: Postpone & Save CO2";
newNode.style.backgroundColor = "#90ee90";
newNode.addEventListener("click", event => {
    event.stopPropagation();
    openPopup();
})

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

function addToList(days) {
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
        items.push({ name, link, price, image, timeStamp, days });
        console.log("newItems", items)
        browser.storage.sync.set({ items }).then(closePopup);
    }, onError);
}

const modalContainer = setupPopup();

function openPopup() {
    modalContainer.style.display = "initial";
}

function closePopup() {
    modalContainer.style.display = "none";
}

function setupPopup() {
    const body = document.querySelector("body");
    
    const modalContainer = document.createElement("div");
    modalContainer.style.position = "fixed";
    modalContainer.style.zIndex = "1000";
    modalContainer.style.left = 0;
    modalContainer.style.top = 0;
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";
    modalContainer.style.overflow = "auto";
    modalContainer.style.display = "none";
    document.addEventListener("click", event => {
        if (!modal.contains(event.target)) {
            closePopup();
        }
    });

    const modal = document.createElement("div");
    modal.style.maxWidth = "500px";
    modal.style.height = "200px";
    modal.style.backgroundColor = "#dcdcdc";
    modal.style.margin = "30px auto";
    modal.style.padding = "10px";
    modal.style.borderRadius = "5px";
    modalContainer.appendChild(modal);


    const askMeAgainLabel = document.createElement("p");
    askMeAgainLabel.innerText = "Postpone this product...";
    modal.appendChild(askMeAgainLabel);

    const askMeAgainButtons = document.createElement("div");
    askMeAgainButtons.style.display = "inline-block";
    modal.appendChild(askMeAgainButtons);

    const addAskMeAgain = (label, days) => {
        const askMeAgainBtn = document.createElement("button");
        askMeAgainBtn.innerText = label;
        askMeAgainBtn.addEventListener("click", () => addToList(days));
        askMeAgainBtn.style.marginRight = "5px";
        askMeAgainButtons.appendChild(askMeAgainBtn);
    }

    addAskMeAgain("until tomorrow", () => addToList(1));
    addAskMeAgain("for 3 days", () => addToList(3));
    addAskMeAgain("for a week", () => addToList(7));
    addAskMeAgain("for a month", () => addToList(30));
    addAskMeAgain("forever", () => closePopup());

    body.appendChild(modalContainer);
    return modalContainer;
}


