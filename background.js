function openExtension() {
    browser.tabs.create({
      url: "moz-extension://ccb24c53-ff44-4d15-99a8-cd56e9de30c6/options.html"
    });
  }
  
  browser.browserAction.onClicked.addListener(openExtension);