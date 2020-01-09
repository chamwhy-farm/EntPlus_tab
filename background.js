var bkg = chrome.extension.getBackgroundPage();
chrome.tabs.onUpdated.addListener(function(data){
  test();
});

chrome.tabs.onActivated.addListener(function(data){
  test();
});

// function index(){
//   bkg.console.log("index");
//   chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
//     bkg.console.log(tabs);
//     let url = tabs[0].url;
//       chrome.storage.sync.get(['enabled', 'entUser', 'fileData', 'plzClick'], function(result) {
//         bkg.console.log("storageGet");
//         if(result.enabled == undefined) { //최초 실행 시
//           bkg.console.log("it is first");
//           chrome.storage.sync.set({'enabled': true});
//           chrome.storage.sync.set({'entUser': []});
//         }
//         if(result.enabled) {
//           bkg.console.log("it is start");
//           if(url.startsWith("https://playentry.org/#!/")) {
//             bkg.console.log("it is real");
//             chrome.tabs.executeScript({file: "index.js"}, function(){
//               chrome.tabs.insertCSS({file : "index.css", runAt: "document_end"});
//             });
//           }
//         }
//       });
//   });
// }
function test(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
    bkg.console.log("dd");
      let url = tabs[0].url;
        chrome.storage.sync.get(['enabled', 'entUser'], function(result) {
          bkg.console.log("dd2");
          if(result.enabled == undefined) { //최초 실행 시

            chrome.storage.sync.set({'enabled': true});
            chrome.storage.sync.set({'entUser': ['entry']});

          }
          if(result.enabled) {
            bkg.console.log(url);
            if(url.startsWith("https://playentry.org/#!/")) {
              bkg.console.log("dd3");
              chrome.tabs.executeScript({file: "jquery.js"}, function(){
                bkg.console.log("dd3");
                chrome.tabs.executeScript({file: "ent.js"}, function(){
                  chrome.tabs.executeScript({file: "index.js"}, function(){
                    bkg.console.log("d3333");
                    chrome.tabs.insertCSS({file : "index.css", runAt: "document_end"});
                  });
                });

              });

            }else if(url.startsWith("https://playentry.org/")){
              bkg.console.log("d3333");
              chrome.tabs.executeScript({file:"jquery.js"}, function(){
                chrome.tabs.executeScript({file:"ent.js"}, function(){
                  chrome.tabs.executeScript({file:"user.js"}, function(){
                    chrome.tabs.insertCSS({file : "user.css", runAt: "document_end"}, function(){
                      bkg.console.log("it is usercss");
                    });
                  });
                });
              });
            }
          }
        });
    });

}
