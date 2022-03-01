debugger;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === "stream" && message.streamId) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: message.streamId,
          },
        },
      })
      .then(handleScreenshot)
      .then(processImage)
      .then((base64) => {
        sendResponse({ success: true, base64 });
      })
      .catch((err) => {
        alert("Could not take screenshot");
        sendResponse({ success: false, message: err });
      });
    return true;
  }
});

function processImage(bitmap) {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width; //if not set, the width will default to 200px
  canvas.height = bitmap.height; //if not set, the height will default to 200px
  let context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
  const base64 = canvas.toDataURL();
  canvas.remove();
  return base64;
}

async function handleScreenshot(stream) {
  const track = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);
  const bitmap = await imageCapture.grabFrame();
  track.stop();
  return bitmap;
}
