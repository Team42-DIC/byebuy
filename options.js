// adapted from https://stackoverflow.com/a/7641812
function relativeTime(date) {
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
        browser.storage.local.set({items: newItems}).then(() => location.reload());
    });
}

function lostInterest(timestamp) {
    browser.storage.local.get(["items", "savedMoney", "savedCO2"]).then(result => {
        let savedMoney = result.savedMoney || 0;
        const newItems = [];
        for (const item in result.items) {
            if (timestamp === result.items[item].timeStamp) {
                newItems.push({lostInterest: true, ...result.items[item]})
                const euros = parseInt(result.items[item].price.split(" ")[0])
                const cents = parseInt(result.items[item].price.split(" ")[0].split(",")[1])
                savedMoney += euros * 100 + cents;
            } else {
                newItems.push(result.items[item]);
            }
        }
        browser.storage.local.set({items: newItems, savedMoney, savedCO2: result.savedCO2 ? result.savedCO2+500 : 500}).then(() => location.reload());
    });
}
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get(["items", "savedMoney", "savedCO2"]).then(result => {
        const statisticsRoot = document.querySelector('#statisticsRoot');

        function createStatistic(statistic, label) {
            const statisticContainer = document.createElement("div")
            const savedMoneyPrice = document.createElement("div")
            savedMoneyPrice.innerText = statistic;
            savedMoneyPrice.className += "price xxl";
            statisticContainer.appendChild(savedMoneyPrice);

            const statisticLabel = document.createElement("span")
            statisticLabel.innerHTML = label;
            statisticLabel.classNames += "xxl";
            statisticContainer.appendChild(statisticLabel);
            statisticsRoot.appendChild(statisticContainer);
        }

        let euros;
        let cents;
        if (!result.savedMoney) {
            euros = 0;
            cents = 0;
        } else {
            euros = Math.floor(result.savedMoney/100);
            cents = result.savedMoney - euros * 100;
        }
        const savedMoneyStatistic = euros + "," + ((''+cents).length === 1 ? cents + "0" : cents) + " €";
        createStatistic(euros + "," + ((''+cents).length === 1 ? cents + "0" : cents) + " €", "of your hard-earned money")
        createStatistic((result.savedCO2 || 0) + " g", "of CO2 in transport costs")


        const itemRoot = document.querySelector('#itemRoot')
        if (result.items.length === 0) {
            itemRoot.innerHTML = "<p class='text-center'>No purchases have been postponed yet. When you postpone a purchase on Amazon, it will appear here.</p>";
        }
        const purchasedRoot = document.querySelector('#purchased')
        const notPurchasedRoot = document.querySelector('#notPurchased')
        const postPonedItems = document.querySelector('#sucessfullyPostponed')
        for (const item in result.items) {
            const itemDiv = document.createElement("div");
            // if (result.items[item].purchased) {
            //     itemDiv.className += "purchased";
            // }

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
            buyDiv.addEventListener("click", () => lostInterest(result.items[item].timeStamp));
            buyDiv.innerText = "Lost interest";
            buttons.appendChild(buyDiv);
            itemDiv.appendChild(buttons);
            
            const alertDate = new Date(result.items[item].timeStamp)
            alertDate.setDate(alertDate.getDate() + result.items[item].days)

            if (result.items[item].lostInterest) {
                purchasedRoot.appendChild(itemDiv)
            } else if (alertDate<new Date()) {
                postPonedItems.appendChild(itemDiv);
            } else {
                notPurchasedRoot.appendChild(itemDiv)
            }
        }
        if (!purchasedRoot.hasChildNodes()){
            purchasedRoot.parentNode.style.display = "none";
        }
        if (!notPurchasedRoot.hasChildNodes() ) {
            notPurchasedRoot.parentNode.style.display = "none";
        }
        if (!postPonedItems.hasChildNodes() ) {
            postPonedItems.parentNode.style.display = "none";
        }
    });
});
