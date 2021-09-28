document.addEventListener("DOMContentLoaded", () => {
    browser.storage.sync.get("items").then(result => {
        const itemRoot = document.querySelector('#itemRoot')
        for (const item in result.items) {
            console.log("item", result.items[item])
            
            const itemDiv = document.createElement("div");
            const itemLink = document.createElement("a");
            itemLink.href = result.items[item].link;
            itemLink.target = "_blank";
            itemLink.innerHTML = result.items[item].name;
            itemDiv.appendChild(itemLink);
            itemRoot.appendChild(itemDiv)
        }
    });
});

document.querySelector("#itemForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#itemName").value;
    const link = document.querySelector("#itemLink").value;
    browser.storage.sync.get("items").then(result => {
        let items = result.items;
        if (!items) {
            items = [];
        }
        items.push({name, link});
        console.log("newItems", items)
        browser.storage.sync.set({items});
    });
});

