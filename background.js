function openExtension() {
    browser.runtime.openOptionsPage();
}
  
browser.browserAction.onClicked.addListener(openExtension);