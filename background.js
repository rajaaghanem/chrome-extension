// chrome.extension.onConnect.addListener(function (port) {
//     console.log('connected ', port);

//     if (port.name === 'hi') {
//       port.onMessage.addListener(this.processMessage);
//     }
//   });

// chrome.extension.onConnect.addListener((port) => {
//   port.onMessage.addListener(this.processMessage);
// });
// var _port;

// _port = chrome.runtime.connect(null, {name: 'hi'});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.desktopCapture.chooseDesktopMedia(
    ["screen", "window", "tab"],
    tab,
    (streamId) => {
      //check whether the user canceled the request or not
      if (streamId && streamId.length) {
        let track, canvas;
        navigator.mediaDevices.getUserMedia({
            video: {
                mandatory: {
                    chromeMediaSource : 'desktop',
                    chromeMediaSourceId: streamId
                },
            }
        }).then((stream)=>{
            track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            return imageCapture.grabFrame();
        }).then((bitmap) => {
            track.stop()
            canvas = document.createElement('canvas');
            canvas.width = bitmap.width; //if not set, the width will default to 200px
            canvas.height = bitmap.height;//if not set, the height will default to 200px
            let context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
            return canvas.toDataURL();
            //The callback function will stop the stream, create a canvas and draw the ImageBitmap in it, then get the Data Url of the canvas.
        }).then((url) => {
            // chrome.runtime.sendMessage({name: 'download', url}, (response) => {
            //     if (response.success) {
            //         alert("Screenshot saved");
            //     } else {
            //         alert("Could not save screenshot")
            //     }
            //     canvas.remove()
            //     sendResponse({success: true})
            // })
            chrome.downloads.download(
              {
                filename: "screenshot.png",
                url,
              },
              (downloadId) => {
                // sendResponse({ success: true });
                console.log({ success: downloadId });
              }
            );
        }).catch((err) => {
            alert("Could not take screenshot");
            console.log(err);
            // sendResponse({success: false, message: err})
        })
        // chrome.runtime.sendMessage(
        //     'laefjkbdefhnkmlfknkhejjlckoklbdi',
        //     {text: 'hello'},{}, (response) => console.log(response)
        //   )
        // setTimeout(() => {
        // //   chrome.tabs.query(
        //     // { active: true, currentWindow: true },
        //     // function (tabs) {
        //     //   chrome.runtime.sendMessage(
        //     //     // tab.id,
        //     //     { name: "stream", streamId }
        //     //     // (response) => console.log(response)
        //     //   );
        //     // }
        // //   );
        // }, 200);

      }
    }
  );

});

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

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
//     if (message.name === "download" && message.url) {
//       chrome.downloads.download(
//         {
//           filename: "screenshot.png",
//           url: message.url,
//         },
//         (downloadId) => {
//           senderResponse({ success: true });
//         }
//       );

//       return true;
//     }
//   });
// });
