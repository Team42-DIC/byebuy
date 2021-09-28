
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  let color = "blue";
  if (item.color) {
    color = item.color;
  }
  document.body.style.border = "10px solid " + color;
}

let getting = browser.storage.sync.get("color");
getting.then(onGot, onError);

