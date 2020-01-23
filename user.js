window.onload = function(){

  let urlr = window.location.href;
  let urle =urlr.substring(22,urlr.length);
  let username = urle.substring(0,urle.indexOf("#!/"));
  
  getUserByUsername(username).then(function(data){
    if( data != "none"){

      var button = `
      <div class="addFollowingBtn" style="top: 30px;"><div class="ent-text">Follow</div></div>
      <div class="unFollowingBtn" style="top: 30px;"><div class="ent-text">Unfollow</div></div>`;
      $('.psListTopUser').html(button+$('.psListTopUser').html());
      $('.unFollowingBtn').hide();
      $('.psListTopUser').css('margin-top','0px');
      chrome.storage.sync.get('entUser', function(d){
        if(!d.entUser.includes(username)){
          $('.addFollowingBtn').show();
          $('.unFollowingBtn').hide();
        }else{
          $('.addFollowingBtn').hide();
          $('.unFollowingBtn').show();
        }
        $('.addFollowingBtn').click(function(){
          console.log('clickAdd');
          chrome.storage.sync.get('entUser', function(d){
            if(!d.entUser.includes(username)){
              console.log("follow");
              d.entUser.push(username);
              chrome.storage.sync.set({'entUser': d.entUser}, function(){
                $('.addFollowingBtn').hide();
                $('.unFollowingBtn').show();
              });

            }

          });
        });
        $('.unFollowingBtn').click(function(){
          chrome.storage.sync.get('entUser', function(d){
            if(d.entUser.includes(username)){
              console.log("unfollow");
              d.entUser.splice(d.entUser.indexOf(username),1);
              chrome.storage.sync.set({'entUser': d.entUser}, function(){
                $('.addFollowingBtn').show();
                $('.unFollowingBtn').hide();
              });

            }

          });
        });
      });

    }
  });
}
