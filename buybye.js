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
        browser.storage.sync.set({ items }).then(renderModalSuccess);
    }, onError);
}

const [modalContainer, modal] = setupPopup();

function openPopup() {
    renderModalRemindMe();
    modalContainer.style.display = "initial";
}

function closePopup() {
    modalContainer.style.display = "none";
}

function renderModalRemindMe() {
    modal.innerHTML = '';
    const askMeAgainLabel = document.createElement("p");
    askMeAgainLabel.innerText = "Postpone this product...";
    modal.appendChild(askMeAgainLabel);

    const askMeAgainButtons = document.createElement("div");
    askMeAgainButtons.style.display = "inline-block";
    modal.appendChild(askMeAgainButtons);

    const addAskMeAgain = (label, handler) => {
        const askMeAgainBtn = document.createElement("button");
        askMeAgainBtn.innerText = label;
        askMeAgainBtn.addEventListener("click", handler);
        askMeAgainBtn.style.marginRight = "5px";
        askMeAgainButtons.appendChild(askMeAgainBtn);
    }

    addAskMeAgain("until tomorrow", () => addToList(1));
    addAskMeAgain("for 3 days", () => addToList(3));
    addAskMeAgain("for a week", () => addToList(7));
    addAskMeAgain("for a month", () => addToList(30));
    addAskMeAgain("forever", () => closePopup());
}

function renderModalSuccess() {
    modal.innerHTML = '';
    const successLabel = document.createElement("p");
    successLabel.innerText = "Purchase postponed. Thank you for being conscious about your purchases!"
    successLabel.style.color = "green";
    modal.appendChild(successLabel);

    const buttons = document.createElement("div");
    buttons.style.display = "inline-block";
    modal.appendChild(buttons);

    const successBtn1 = document.createElement("button");
    successBtn1.innerText = "Continue shopping";
    successBtn1.addEventListener("click", closePopup);
    successBtn1.style.marginRight = "5px";
    buttons.appendChild(successBtn1);

    const successBtn2 = document.createElement("button");
    successBtn2.innerText = "Show all postponed purchases";
    successBtn2.addEventListener("click", event => browser.runtime.openOptionsPage());
    successBtn2.style.marginRight = "5px";
    buttons.appendChild(successBtn2);
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
    modal.style.backgroundColor = "#dcdcdc";
    modal.style.margin = "50px auto";
    modal.style.padding = "10px";
    modal.style.borderRadius = "5px";
    modalContainer.appendChild(modal);



    body.appendChild(modalContainer);
    return [modalContainer, modal];
}

