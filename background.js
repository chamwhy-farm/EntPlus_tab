var bkg = chrome.extension.getBackgroundPage();
// chrome.tabs.onUpdated.addListener(function(data){
//   test();
// });
//
// chrome.tabs.onActivated.addListener(function(data){
//   test();
// });
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status == 'complete' && tab.active) {
    console.log("555");
    test();
    // do your things

  }

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
chrome.browserAction.onClicked.addListener(function (tab) {

});
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
              executeScripts(null, [
                  { file: "jquery.js" },
                  { file: "ent.js" },
                  { file: "index.js" }
              ]);
              chrome.tabs.insertCSS({file : "index.css", runAt: "document_end"});


            }else if(url.startsWith("https://playentry.org/")){
              executeScripts(null, [
                  { file: "jquery.js" },
                  { file: "ent.js" },
                  { file: "like.js" },
                  { file: "projectLank.js" },
                  { file: "user.js" }
              ]);
              chrome.tabs.insertCSS({file:"projectLank.css", runAt: "document_end"});
              chrome.tabs.insertCSS({file : "user.css", runAt: "document_end"}, function(){
                bkg.console.log("it is usercss");
              });
            }
          }
        });
    });

}

function executeScripts(tabId, injectDetailsArray)
{
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }
    var callback = null;
    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);
    if (callback !== null)
        callback();   // execute outermost function
}
