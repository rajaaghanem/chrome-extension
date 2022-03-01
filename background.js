chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.desktopCapture.chooseDesktopMedia(
    ["screen", "window", "tab"],
    tab,
    (streamId) => {
      //check whether the user canceled the request or not
      if (streamId && streamId.length) {
        chrome.tabs.sendMessage(
          tab.id,
          { name: "stream", streamId },
          ({ success, base64, error }) => {
            if (!success) {
              console.log(error);
              return;
            }
            chrome.tabs.create({ url: base64 });
          }
        );
      }
    }
  );
});
