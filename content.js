var pathHome = ["jquery.js", "ent.js", "index.js"];
var cssHome = ["index.css"];
var pathAll = ["jquery.js", "ent.js", "like.js", "projectLank.js", "user.js"];
var cssAll = ["projectLank.css", "user.css"];

var i = 0;

window.addEventListener("load", init());
function init(){
  if(window.location.href.startsWith("https://playentry.org/#!/")){
    if(i >= pathHome.length+cssHome.length){
      return;
    }
    if(i >= pathHome.length){
      var url = cssHome[i-pathHome.length];
      injectScript(chrome.extension.getURL(), "body", true).addEventListener("load", init());
    }else{
      var url = pathHome[i];
      injectScript(chrome.extension.getURL(), "body", false).addEventListener("load", init());
    }
  }else if(window.location.href.startsWith("https://playentry.org/"){
    if(i >= pathAll.length+cssAll.length){
      return;
    }
    if(i >= pathAll.length){
      var url = cssAll[i-pathAll.length];
      injectScript(chrome.extension.getURL(), "body", true).addEventListener("load", init());
    }else{
      var url = pathAll[i];
      injectScript(chrome.extension.getURL(), "body", false).addEventListener("load", init());
    }
  }
}

function injectScript(file_path, tag, isJs) {
    i++;
    var node = document.getElementsByTagName(tag)[0];
    if(isJs){
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', file_path);
      node.appendChild(script);
      return script;
    }else{
      var css = document.createElement('link');
      css.setAttribute('rel', 'stylesheet');
      css.setAttribute('href', file_path);
      node.appendChild(css);
      return css;
    }

}
