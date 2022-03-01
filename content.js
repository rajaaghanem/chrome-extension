chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === "stream" && message.streamId) {
    let track, canvas;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: message.streamId,
          },
        },
      })
      .then((stream) => {
        track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        return imageCapture.grabFrame();
      })
      .then((bitmap) => {
        track.stop();
        canvas = document.createElement("canvas");
        canvas.width = bitmap.width; //if not set, the width will default to 200px
        canvas.height = bitmap.height; //if not set, the height will default to 200px
        let context = canvas.getContext("2d");
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        return canvas.toDataURL();
        //The callback function will stop the stream, create a canvas and draw the ImageBitmap in it, then get the Data Url of the canvas.
      })
      .then((base64) => {
        canvas.remove();
        sendResponse({ success: true, base64 });
      })
      .catch((err) => {
        alert("Could not take screenshot");
        sendResponse({ success: false, message: err });
      });
    return true;
  }
});
