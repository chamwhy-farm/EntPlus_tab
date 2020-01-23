function lank(){
  console.log("lank is start");
  get("https://playentry.org/api/project/find?blamed=false&isopen=true&option=list&sort=recentLikeCnt&rows=12&page=1&role=member").then(function(d){
    var data = d.data;
    console.log(data);
    $(".projectInfoNumbers").remove();
    $(".projectBox").each(function(){
      var thisO = $(this);
      var a = 0;
      var count = 0;
      var style = thisO.children().first().attr('style');
      var projectId = style.substring(style.lastIndexOf("/")+1, style.indexOf(".png"));
      console.log("랭크 projectId - "+projectId);
      while(a<120){
        if(data[a]._id == projectId){
          break;
        }
        a++;
      }
      if(a===120){
        count = "없음";
      }else{
        count = `${a+1}위`;
      }
      var color = lankColor(a);
      var html = `
        <div class="ent_lank" style="background-color:${color};">

          <div class="lankCount">${count}</div>
        </div>`;
      thisO.children(".projectInfoBox").append(html);
    });
  });
}

function lankColor(count){
  var color = ['red', '#FD7F18', '#FDCB00', '#08CC0B', 'blue', 'purple'];
  if(count == 120){
    return 'gray';
  }else{
    return color[parseInt(count*color.length/120)];
  }

}
$(document).ready(lank());
