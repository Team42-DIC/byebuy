function relativeTime(date) {
    // Make a fuzzy time
    const delta = Math.round((+new Date - date) / 1000);

    const minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    if (delta < 30) {
        return 'just then';
    } else if (delta < minute) {
        return delta + ' seconds ago';
    } else if (delta < 2 * minute) {
        return 'a minute ago'
    } else if (delta < hour) {
        return Math.floor(delta / minute) + ' minutes ago';
    } else if (Math.floor(delta / hour) == 1) {
        return '1 hour ago.'
    } else if (delta < day) {
        return Math.floor(delta / hour) + ' hours ago';
    } else if (delta < day * 2) {
        return 'yesterday';
    } else {
        return Math.floor(delta / day) + ' days ago';
    }
}
function deleteItem(timestamp) {
    browser.storage.sync.get("items").then(result => {
        const newItems = [];
        for (const item in result.items) {
            if (result.items[item].timeStamp !== timestamp) {
                newItems.push(result.items[item]);
            }
        }
        console.log("newItems", newItems);
        browser.storage.sync.set({items: newItems}).then(() => location.reload());
    });
}
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.sync.get("items").then(result => {
        const itemRoot = document.querySelector('#itemRoot')
        if (result.items.length === 0) {
            itemRoot.innerHTML = "<p>No items have been added yet. When you postpone a purchase on Amazon, it will appear here.</p>";
        }
        for (const item in result.items) {
            console.log("item", result.items[item])
            
            const itemDiv = document.createElement("div");

            const itemHeaderDiv = document.createElement("div");
            itemHeaderDiv.className += "itemHeader";

            const itemName = document.createElement("h2")
            itemName.innerHTML = result.items[item].name + " (" + relativeTime(new Date(result.items[item].timeStamp)) + ")";
            itemHeaderDiv.appendChild(itemName);

            const itemDelete = document.createElement("input")
            itemDelete.type = "image";
            itemDelete.src = "icons/delete.png";
            itemDelete.width = 32;
            itemDelete.addEventListener("click", () => deleteItem(result.items[item].timeStamp));
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

// document.querySelector("#itemForm").addEventListener("submit", event => {
//     event.preventDefault();
//     const name = document.querySelector("#itemName").value;
//     const link = document.querySelector("#itemLink").value;
//     const price = document.querySelector("#itemPrice").value;
//     const image = document.querySelector("#itemImage").value;
//     browser.storage.sync.get("items").then(result => {
//         let items = result.items;
//         if (!items) {
//             items = [];
//         }
//         items.push({name, link, price, image, timeStamp: Date.now()});
//         console.log("newItems", items)
//         browser.storage.sync.set({items});
//         location.reload();
//     });
// });

