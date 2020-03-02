function get(url){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data){
        resolve(data);
      },
      error: function(data){
        resolve("err");
      }
    });
  });
}
function getUserImgLinkByUser(user){
  if(user.avatarImage){
    return `https://playentry.org/uploads/profile/${user._id.substring(0,2)}/${user._id.substring(2,4)}/avatar_${user._id}.png`;
  }else{
    return `https://playentry.org/img/assets/avatar_img.png`;
  }
}
function getProjectsByUsername(username){
  return getUserByUsername(username).then(function(d){
    console.log(d);
    return get(`https://playentry.org/api/project/find?option=list&sort=updated&rows=15&page=1&tab=my_project&type=project&user=${d._id}&blamed=false`);
  })

}

function getUserByUsername(username){
  return get(`https://playentry.org/api/getUserByUsername/${username}`).then(function(d){
    console.log(d);
    if(d != "err"){
      return d;
    }else {
      return "none";
    }

  });
}

function getFavoriteProjectByUsername(username){
  var user = getUserByUsername(username);

  get(`https://playentry.org/api/user/favorites/${user._id}?sort=updated&rows=15&page=1&tab=marked_project&type=project&user=${user._id}&targetSubject=project&targetType=individual`).then(function(data){
    return data;
  });
}
function getUpdateProjects(){
  return get(``);
}
