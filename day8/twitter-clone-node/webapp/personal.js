/* TODO temporarily comment
 if (GetCookie()===  "" ){
  //no user so send to sign on page
  window.location="signon.html";
}
*/

//-----------------------------------------------------------------------------


  ajaxHandler("/rest/tweets/" + GetCookie(), function (tweets) {
//ajaxHandler("/rest/tweets/abu", function (resp) {



  		var tweetDiv =document.getElementById('tweets');
		  var dataStr="";
           for (var i = tweets.length -1; i >= 0; i--) {
                dataStr+='<div id="newtweet"><p class="firstln">' + tweets[i].user + '<p class="thirdln">' + tweets[i].date + '</p>' ;
                dataStr += '</p>' + tweets[i].msg  + '</div>';
                
            }
            tweetDiv.innerHTML=dataStr;


  });

//-----------------------------------------------------------------s
  
  var user=document.getElementById('userName');
  user.innerHTML=GetCookie(); 
