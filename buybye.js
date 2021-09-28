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
    askMeAgainLabel.innerHTML = "<p>Is this purchase really necessary?<p> Maybe you should think about it for a while. Be part of a sustainable world!<p> Postpone this product...";
    askMeAgainLabel.style.textAlign = "center";
    
    modal.appendChild(askMeAgainLabel);

    const askMeAgainButtons = document.createElement("div");
    askMeAgainButtons.style.display = "flex";
    askMeAgainButtons.style.flexDirection = "column";
    askMeAgainButtons.style.justifyContent = "space-around";
    askMeAgainButtons.style.height = "250px";

    modal.appendChild(askMeAgainButtons);

    const addAskMeAgain = (label, handler) => {
        const askMeAgainBtn = document.createElement("button");
        askMeAgainBtn.innerText = label;
        askMeAgainBtn.addEventListener("click", event => {
          event.stopPropagation();
          handler();
        });
        askMeAgainBtn.style.padding = "10px";
        askMeAgainBtn.style.borderRadius = "10px";
        askMeAgainBtn.className += "a-button";
        askMeAgainBtn.style.borderWidth = "2px";
        askMeAgainBtn.style.margin = 0;
        askMeAgainButtons.appendChild(askMeAgainBtn);
    }

    addAskMeAgain("until tomorrow", () => addToList(1));
    addAskMeAgain("for 3 days", () => addToList(3));
    addAskMeAgain("for a week", () => addToList(7));
    addAskMeAgain("for a month", () => addToList(30));
    addAskMeAgain("I don't need this at all!", () => renderModalSuccess());
}

function renderModalSuccess() {
    modal.innerHTML = '';
    const successLabel = document.createElement("p");
    successLabel.innerHTML = "<p>Purchase postponed. <p> Thank you for being conscious about the environment!"
    successLabel.style.color = "green";
    modal.appendChild(successLabel);

    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    buttons.style.flexDirection = "column";
    buttons.style.justifyContent = "space-around";
    buttons.style.height = "150px";
    modal.appendChild(buttons);

    const successBtn1 = document.createElement("button");
    successBtn1.innerText = "Continue shopping";
    successBtn1.addEventListener("click", event => {
      event.stopPropagation();
      closePopup();
    });
    successBtn1.style.marginRight = "5px";
    successBtn1.style.padding = "10px";
    successBtn1.style.borderRadius = "10px";
    successBtn1.className += "a-button";
    successBtn1.style.borderWidth = "2px";
    successBtn1.style.margin = 0;
    buttons.appendChild(successBtn1);

    const successBtn2 = document.createElement("button");
    successBtn2.innerText = "Show all postponed purchases";
    successBtn2.addEventListener("click", event => {
      event.stopPropagation();
      browser.runtime.openOptionsPage();
    });
    successBtn2.style.marginRight = "5px";
    successBtn2.style.padding = "10px";
    successBtn2.style.borderRadius = "10px";
    successBtn2.className += "a-button";
    successBtn2.style.borderWidth = "2px";
    successBtn2.style.margin = 0;
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
    modalContainer.style.backgroundColor = "rgba(0,0,0,0.3)";
    modalContainer.style.display = "none";
    
    document.addEventListener("click", event => {
        if (!modal.contains(event.target)) {
            closePopup();
        }
    });

    const modal = document.createElement("div");
    modal.style.maxWidth = "500px";
    modal.style.backgroundColor = "white";
    modal.style.margin = "50px auto";
    modal.style.padding = "10px";
    modal.style.borderRadius = "5px";
    modal.style.borderColor = "lightgrey";
    modal.style.borderWidth = "2px";

    modalContainer.appendChild(modal);



    body.appendChild(modalContainer);
    return [modalContainer, modal];
}

