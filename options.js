function relativeTime(date) {
    // Make a fuzzy time
    const delta = Math.round((+new Date - date) / 1000);

    const minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    if (delta < 30) {
        return 'just now';
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
    browser.storage.local.get("items").then(result => {
        const newItems = [];
        for (const item in result.items) {
            if (result.items[item].timeStamp !== timestamp) {
                newItems.push(result.items[item]);
            }
        }
        console.log("newItems", newItems);
        browser.storage.local.set({items: newItems}).then(() => location.reload());
    });
}

function setPurchased(timestamp) {
    browser.storage.local.get("items").then(result => {
        const newItems = [];
        for (const item in result.items) {
            if (timestamp === result.items[item].timeStamp) {
                newItems.push({purchased: true, ...result.items[item]})
            } else {
                newItems.push(result.items[item]);
            }
        }
        browser.storage.sync.set({items: newItems}).then(() => location.reload());
    });
}
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get("items").then(result => {
        const itemRoot = document.querySelector('#itemRoot')
        if (result.items.length === 0) {
            itemRoot.innerHTML = "<p>No purchases have been postponed yet. When you postpone a purchase on Amazon, it will appear here.</p>";
        }
        for (const item in result.items) {
            console.log("item", result.items[item]);
            
            const itemDiv = document.createElement("div");
            if (result.items[item].purchased) {
                itemDiv.className += "purchased";
            }

            const itemName = document.createElement("h2");
            const itemLink = document.createElement("a");
            itemLink.href = result.items[item].link;
            itemLink.innerText = result.items[item].name;
            itemLink.target = "_blank";
            itemName.appendChild(itemLink);
            itemDiv.appendChild(itemName);

            const itemImage = document.createElement("img");
            if (result.items[item].image) {
                itemImage.src = result.items[item].image;
            } else {
                itemImage.src = "open-box.png";
                itemImage.className += "greyed";
            }
            itemDiv.appendChild(itemImage);
            const itemPrice = document.createElement("span");
            itemPrice.innerText = result.items[item].price;
            itemPrice.className += "price";
            itemDiv.appendChild(itemPrice);
            const itemTime = document.createElement("span");
            itemTime.innerText = relativeTime(result.items[item].timeStamp);
            itemTime.className += "time";
            itemDiv.appendChild(itemTime);
            const buttons = document.createElement("div");
            buttons.className += "buttons";

            const deleteDiv = document.createElement("div");
            deleteDiv.className += "tooltip";
            deleteDiv.id = "delete";
            deleteDiv.addEventListener("click", () => deleteItem(result.items[item].timeStamp));
            deleteDiv.innerText = "Item was bought";
            buttons.appendChild(deleteDiv);

            const buyDiv = document.createElement("div");
            buyDiv.className += "tooltip";
            buyDiv.id = "buy";
            buyDiv.addEventListener("click", () => setPurchased(result.items[item].timeStamp));
            buyDiv.innerText = "Item won't be purchased";
            buttons.appendChild(buyDiv);
            itemDiv.appendChild(buttons);
            itemRoot.appendChild(itemDiv);
        }
    });
});
