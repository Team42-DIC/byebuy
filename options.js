function deleteItem(timestamp) {
    browser.storage.sync.get("items").then(result => {
        const newItems = [];
        for (const item in result.items) {
            if (result.items[item].timestamp !== timestamp) {
                newItems.push(result.items[item]);
            }
        }
        browser.storage.sync.set({items: newItems});
        location.reload();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.sync.get("items").then(result => {
        const itemRoot = document.querySelector('#itemRoot')
        for (const item in result.items) {
            console.log("item", result.items[item])
            
            const itemDiv = document.createElement("div");

            const itemHeaderDiv = document.createElement("div");
            
            const itemName = document.createElement("h2")
            itemName.innerHTML = result.items[item].name + " (" + new Date(result.items[item].timestamp).toLocaleDateString() + ")";
            itemHeaderDiv.appendChild(itemName);

            const itemDelete = document.createElement("button")
            itemDelete.innerHTML = "Delete"
            itemDelete.addEventListener("click", () => deleteItem(result.items[item].timestamp));
            itemHeaderDiv.appendChild(itemDelete)

            itemDiv.appendChild(itemHeaderDiv);


            const itemPrice = document.createElement("p")
            itemPrice.innerHTML = result.items[item].price;
            itemDiv.appendChild(itemPrice);

            const itemLink = document.createElement("a");
            itemLink.href = result.items[item].link;
            itemLink.target = "_blank";
            itemLink.innerHTML = result.items[item].link;
            itemDiv.appendChild(itemLink);

            itemDiv.appendChild(document.createElement("br"))

            const itemImage = document.createElement("img");
            if (result.items[item].image) {
                itemImage.src = result.items[item].image;
                itemImage.width = 128;
            } else {
                itemImage.src = "open-box.png";
                itemImage.className += "greyed";
                itemImage.width = 64;
            }
            itemDiv.appendChild(itemImage);
            
            itemRoot.appendChild(itemDiv)
        }
    });
});

document.querySelector("#itemForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#itemName").value;
    const link = document.querySelector("#itemLink").value;
    const price = document.querySelector("#itemPrice").value;
    const image = document.querySelector("#itemImage").value;
    browser.storage.sync.get("items").then(result => {
        let items = result.items;
        if (!items) {
            items = [];
        }
        items.push({name, link, price, image, timestamp: Date.now()});
        console.log("newItems", items)
        browser.storage.sync.set({items});
        location.reload();
    });
});

