// // send initial state
// if (port.name) {
//   console.log('port has name');

//   port.postMessage({
//     msg: 'I am contnet script'
//   });
// }

// port.onMessage.addListener(function (msg) {
//   console.log('Got Message', msg);
// });
// var _port;

// _port = chrome.runtime.connect(null, {name: 'hi'});

// function ping() {
  
//   chrome.runtime.sendMessage("laefjkbdefhnkmlfknkhejjlckoklbdi", (response) => {
//     if (chrome.runtime.lastError) {
//       setTimeout(ping, 1000);
//     } else {
//       chrome.tabs.onMessage.addListener(
//         (message, sender, senderResponse) => {
//           if (message.name === "stream" && message.streamId) {
//             let track, canvas;
//             navigator.mediaDevices
//               .getUserMedia({
//                 video: {
//                   mandatory: {
//                     chromeMediaSource: "desktop",
//                     chromeMediaSourceId: message.streamId,
//                   },
//                 },
//               })
//               .then((stream) => {
//                 track = stream.getVideoTracks()[0];
//                 const imageCapture = new ImageCapture(track);
//                 return imageCapture.grabFrame();
//               })
//               .then((bitmap) => {
//                 track.stop();
//                 canvas = document.createElement("canvas");
//                 canvas.width = bitmap.width; //if not set, the width will default to 200px
//                 canvas.height = bitmap.height; //if not set, the height will default to 200px
//                 let context = canvas.getContext("2d");
//                 context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
//                 return canvas.toDataURL();
//                 //The callback function will stop the stream, create a canvas and draw the ImageBitmap in it, then get the Data Url of the canvas.
//               })
//               .then((url) => {
//                 chrome.runtime.sendMessage(
//                   { name: "download", url },
//                   (response) => {
//                     if (response.success) {
//                       alert("Screenshot saved");
//                     } else {
//                       alert("Could not save screenshot");
//                     }
//                     canvas.remove();
//                     senderResponse({ success: true });
//                   }
//                 );
//               })
//               .catch((err) => {
//                 alert("Could not take screenshot");
//                 senderResponse({ success: false, message: err });
//               });
//             return true;
//           }
//         }
//       );
//     }
//   });
// }

// ping();

// chrome.extension.onConnect.addListener((port) => {
//     port.onMessage.addListener(this.processMessage);
//   });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
//     if(message.name === 'stream' && message.streamId){
//         let track, canvas;
//         navigator.mediaDevices.getUserMedia({
//             video: {
//                 mandatory: {
//                     chromeMediaSource : 'desktop',
//                     chromeMediaSourceId: message.streamId
//                 },
//             }
//         }).then((stream)=>{
//             track = stream.getVideoTracks()[0];
//             const imageCapture = new ImageCapture(track);
//             return imageCapture.grabFrame();
//         }).then((bitmap) => {
//             track.stop()
//             canvas = document.createElement('canvas');
//             canvas.width = bitmap.width; //if not set, the width will default to 200px
//             canvas.height = bitmap.height;//if not set, the height will default to 200px
//             let context = canvas.getContext('2d');
//             context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
//             return canvas.toDataURL();
//             //The callback function will stop the stream, create a canvas and draw the ImageBitmap in it, then get the Data Url of the canvas.
//         }).then((url) => {
//             // chrome.runtime.sendMessage({name: 'download', url}, (response) => {
//             //     if (response.success) {
//             //         alert("Screenshot saved");
//             //     } else {
//             //         alert("Could not save screenshot")
//             //     }
//             //     canvas.remove()
//             //     sendResponse({success: true})
//             // })
//             chrome.downloads.download(
//               {
//                 filename: "screenshot.png",
//                 url,
//               },
//               (downloadId) => {
//                 sendResponse({ success: true });
//               }
//             );
//         }).catch((err) => {
//             alert("Could not take screenshot");
//             sendResponse({success: false, message: err})
//         })

//     }
//     return true;
// });
