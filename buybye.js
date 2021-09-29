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

const cartButton = document.getElementById('add-to-cart-button').parentNode.parentElement.parentNode.parentNode.parentNode;
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
    browser.storage.local.get("items").then(result => {
        let items = result.items;
        if (!items) {
            items = [];
        }
        items.push({ name, link, price, image, timeStamp, days });
        browser.storage.local.set({ items }).then(renderModalSuccess);
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

function newButton(label, handler) {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.addEventListener("click", event => {
      event.stopPropagation();
      handler();
    });
    btn.style.padding = "10px";
    btn.style.borderRadius = "10px";
    btn.className += "a-button";
    btn.style.borderWidth = "2px";
    btn.style.margin = 0;
    return btn;
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

    askMeAgainButtons.appendChild(newButton("until tomorrow", () => addToList(1)));
    askMeAgainButtons.appendChild(newButton("for 3 days", () => addToList(3)));
    askMeAgainButtons.appendChild(newButton("for a week", () => addToList(7)));
    askMeAgainButtons.appendChild(newButton("for a month", () => addToList(30)));
    askMeAgainButtons.appendChild(newButton("I don't need this at all!", () => renderModalSuccess()));
}

function renderModalSuccess() {
    modal.innerHTML = '';
    const successLabel = document.createElement("p");
    successLabel.innerHTML = '<p>Purchase postponed. <p> Not buying this product would save 500g CO2 for the transport alone! <br>[<a href="https://www.sueddeutsche.de/wissen/oeko-bilanz-des-internethandel-das-macht-500-gramm-co2-1.1607616"> source </a>] <p> Thank you for being conscious about the environment!';
    successLabel.style.textAlign = "center";
    successLabel.style.color = "green";
    modal.appendChild(successLabel);

    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    buttons.style.flexDirection = "column";
    buttons.style.justifyContent = "space-around";
    buttons.style.height = "150px";
    modal.appendChild(buttons);

    const successBtn1 = newButton("Continue shopping", () => closePopup());
    buttons.appendChild(successBtn1);

    const successLabel2 = document.createElement("p");
    successLabel2.innerHTML = '<p>Click on the extension icon in the toolbar above to see all your postponed purchases.<p>';
    successLabel2.style.textAlign = "center";
    successLabel2.style.color = "black";
    modal.appendChild(successLabel2);
    //const successBtn2 = newButton("I'm done with shopping", () => window.close());
    //buttons.appendChild(successBtn2);
    //const successBtn3 = newButton("Show all postponed purchases", () => null);
    //buttons.appendChild(successBtn3);
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
