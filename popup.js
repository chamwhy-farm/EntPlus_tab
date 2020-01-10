var bestUsers = ['chamwhy', 'dark', 'thoratica', 'lyh2315'];
function form(username, type, btn){
  return getUserByUsername(username).then(function(data){
    var imgSrc = getUserImgLinkByUser(data);
    if(type=="best"){
      return `<li class="followLi">
        <div class="following">
          <img class="ent-userImg" src="${imgSrc}" alt="">
          <div class="bestEntUsername">${username}</div>
          <button class="${type}Following"type="button" name="${type}">${btn}</button>
        </div>
      </li>`;
    }else{
      return `<li class="followLi">
        <div class="following">
          <img class="ent-userImg" src="${imgSrc}" alt="">
          <div class="entUsername">${username}</div>
          <button class="${type}Following"type="button" name="${type}">${btn}</button>
        </div>
      </li>`;
    }

  });
}

function reset(){
  $('.followings').html("");
  chrome.storage.sync.get("entUser", function(result){
    console.log(result);
    for (var i = 0; i < result.entUser.length; i++) {
      console.log(result.entUser.length);
      form(result.entUser[i], "del", "×").then(function(data){
        console.log(data);
        $('.followings').html($('.followings').html()+data);
        btns();
      });
    }

  });
}

function best(){
  $('.bestFollowings').html();
  chrome.storage.sync.get("entUser", function(data){
    for (var i = 0; i < bestUsers.length; i++) {
      if(!data.entUser.includes(bestUsers[i])){
        form(bestUsers[i], "best", "+").then(function(d){
          $('.bestFollowings').html($('.bestFollowings').html()+d);
          bestbtns();
        })
      }
    }
  });
}
function bestbtns(){
  $(".bestEntUsername").click(function(){
    console.log("eee");
    var username = $(this).text();
    chrome.tabs.create({url: `http://playentry.org/${username}`});
  });
  $('.bestFollowing').click(function(){
    var ee = $(this);
    chrome.storage.sync.get('entUser', function(data){
      console.log(ee.prev().text());
      console.log(data.entUser);
      if(!data.entUser.includes(ee.prev().text())){
        var a = data.entUser.push(ee.prev().text());
        console.log(data.entUser);
        chrome.storage.sync.set({'entUser': data.entUser}, function(){
          ee.parent().parent().remove();

          reset();
        });
      }else{
        console.log("이미 있음");
        ee.parent().parent().remove();
      }

    });

  });
}

$(document).ready(function(){
  reset();
  btns();
  best();
  $('.resetBtn').click(function(){
    if(confirm("리셋하시겠습니까?") == true){
      console.log("resetBtn");
      chrome.storage.sync.set({'entUser': ['entry']}, function(){
        console.log("reset");
        reset();
      });
    }

  });
  $('.searchBtn').click(function(){
    var val = $('.userSearch').val();
    if(val != ""){
      console.log("eee");
      console.log(val);
      getUserByUsername(val).then(function(data){
        console.log(data);
        if(data != "none"){
          $('.userSearch').val("");
          form(val, "add", "+").then(function(d){
            console.log(d);
            console.log($('.searcher').html());
            $('.searcher').html($('.searcher').html()+d);
            btns();
          });
        }else{
          console.log("user none");
          $('.userSearch').attr('placeholder', '유저가 존재하지 않습니다').val("");

        }
      });
    }

  });


});

function btns(){

  $('.userSearch').click(function(){
      $(this).attr('placeholder', '유저 검색...');
  });
  $(".entUsername").click(function(){
    console.log("eee");
    var username = $(this).text();
    chrome.tabs.create({url: `http://playentry.org/${username}`});
  });
  $('.delFollowing').click(function(){
    var a = $(this);
    if(confirm(`unfollow - ${a.prev().text()}?`) ==true){
      chrome.storage.sync.get('entUser', function(data){
        data.entUser.splice(data.entUser.indexOf(a.prev().text()),1);
        chrome.storage.sync.set({'entUser': data.entUser}, function(){

          reset();
        });
      });
    }

  });
  $('.addFollowing').click(function(){
    var ee = $(this);
    chrome.storage.sync.get('entUser', function(data){
      console.log(ee.prev().text());
      console.log(data.entUser);
      if(!data.entUser.includes(ee.prev().text())){
        var a = data.entUser.push(ee.prev().text());
        console.log(data.entUser);
        chrome.storage.sync.set({'entUser': data.entUser}, function(){
          ee.parent().parent().remove();

          reset();
        });
      }else{
        console.log("이미 있음");
        ee.parent().parent().remove();
      }

    });

  });

}
