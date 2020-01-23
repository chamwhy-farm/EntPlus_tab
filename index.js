var notice = [];
var setNot = [];
var skills = {};
var entModule = {};

skills.numUnit = function(count){
  var countNum;
  if(count >= 1000000){
    countNum = (parseInt(count / 100000) / 10)+"M";
  }else if(count >= 1000){
    countNum = (parseInt(count / 100) /10)+ "K";
  }else{
    countNum = count;
  }
  return countNum;
}  //숫자단위 변환 코드
skills.textToDate = function(text){
  return `${text.substring(0,4)}-${text.substring(4,6)}-${text.substring(6,8)} ${text.substring(8,10)}:${text.substring(10,12)}`;
}
skills.textForm = function(text){
  if(text.length>40){
    return text.substring(0,40)+"...";
  }else{
    return text;
  }
}



entModule.project = function(projectId, projectName, projectImg, username, userImg, view, like, comment){
  var output = ``;
  var output2 = `
    <a href="/${project._id}">
      <img class="ent-projectImg" src="${projectImg}" alt="">
    </a>
    <div class="ent-projectStat">
      <img class="ent-userImg" src="${userImg}" alt="">
      <div class="ent-projectDes">
        <a href="/${project._id}">
          <div class="ent-projectName">${projectName}</div>
        </a>
        from <a href="/${username}" class="ent-username">${username}</a>
      </div>
      <div class="ent-stat">
        <div class="ent-view">${view}</div>
        <div class="ent-like">${like}</div>
        <div class="ent-comment">${comment}</div>
      </div>
    </div>`;
  var entProject = document.createElement('div');
  entProject.className = 'ent-project';
  entProject.innerHTML(output2);
  return entProject;
}
entModule.notice = function(username, userId, type, data, when){

  var text = ``;
  switch (type) {
    case "shareProject":
      text = `<a class="ent-username" href="https://playentry.org/${username}">${username}</a>이(가) <a class="ent-data" href="https://playentry.org/${username}/${data._id}">${skills.textForm(data.name)}</a>를 공유했습니다! `;
      break;
    default:

  }
  return getUserByUsername(username).then(function(d){
    var userImg = getUserImgLinkByUser(d);
    var proejctContent = `
    <div class="entContainerBox">
      <div class="ent-containerSmallBox">
        <img class="ent-userImg" src="${userImg}" alt="">
        <div class="ent-text">${text}</div>

      </div>
      <div class="ent-when">${skills.textToDate(when)}</div>
    </div>`;

    return proejctContent;
  });

}

$(document).ready(function(){
  // console.log("kkkkkk");
  // get('https://playentry.org/api/rankProject?type=best&limit=9').then(function(data){
  //   console.log(data);
  // });
  // resetByUsername("entry");



  var userPick = `<div class="userPicks"></div>`;
  var entNoticeEntContainer = `<div class="ent-noticeentContainer"></div>`;

  //entContainer.appendChild(userPick);
  //$('.staffProjectsContainer.entryBaseContainer').html($('.staffProjectsContainer.entryBaseContainer').html()+userPick);
  $('.baseWrapper.indexPanel div').remove();
  $('.baseWrapper.indexPanel').html(entNoticeEntContainer);



  chrome.storage.sync.get(['entUser', 'enabled'], function(item){


    if(item.enabled == undefined) { //최초 실행 시
      alert('reset');
      chrome.storage.sync.set({'enabled': true});
      chrome.storage.sync.set({'entUser': ['entry']});
    }
    console.log(item);
    for (var i = 0; i < item.entUser.length; i++) {


      var username = item.entUser[i];
      console.log(item.entUser.length);
      resetByUsername(username, i==item.entUser.length-1).then(function(e){
        if(e==item.entUser[item.entUser.length-1]){
          for (var ae = 0; ae < notice.length; ae++) {
            if(ae > 4){
              break;
            }
            entModule.notice(notice[ae].username, notice[ae].data.user._id, notice[ae].type, notice[ae].data, notice[ae].when).then(function(noticeContent){
              console.log(noticeContent);
              console.log("ggg");
              $('.ent-noticeentContainer').html($('.ent-noticeentContainer').html()+noticeContent);

            });

          }
        }

      });
    }
  });

});




function entReadTime(time){
  var d = time.split("T")[0].split("-"),
      t = time.split("T")[1].substring(0,7).split(":");
  d = d[0]+d[1]+d[2];
  t = t[0]+t[1]+t[2];
  return d+t;
}

function resetByUsername(username, last){
  console.log("llll");
  return getProjectsByUsername(username).then(function(projects){
    console.log(projects);
      for (var i = 0; i < projects.data.length; i++) {  //작품 긁어오기
        if(i<150){  //작품 한계 : 150개
          var count = 0;
          var update = entReadTime(projects.data[i].updated);
          var content = {
            type:"shareProject",
            username:username,
            data:projects.data[i],
            when:update
          };
          notice.splice(count,0,content);
          console.log("done");
        }
      }
      if(last){
        setNotice();
      }
      return username;
  });


}

function setNotice(){
  setNot = notice;
  notice = [];
  for (var i = 0; i < setNot.length; i++) {
    for (var a = 0; a < notice.length; a++) {
      if(setNot[i].when>=notice[a].when){
        break;
      }
    }
    notice.splice(a,0,setNot[i]);
  }
}
