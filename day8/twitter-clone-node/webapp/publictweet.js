function getPulicTweet() {

	//ajaxHandler("rest/followedtweets/abu", function (tweets) {
	ajaxHandler("rest/followedtweets/" + GetCookie(), function (tweets) {
	var publictweet = document.getElementById("publictweet");
		var htmlStr = "";
		for(var i = tweets.length -1; i >= 0; i--) {
			htmlStr += "<div class='tweetItem'>";
			htmlStr += "<div class='floatDiv'><a href='personal.html'><img src='avater/User.jpg' width='40'></a></div>";
			htmlStr += "<div class='floatDiv'><a href='personal.html'><span class='tweetUserID'>" + tweets[i]["userId"] + "</span></a><span class='tweetDate'>" + tweets[i]["date"] + "</span></div>";
			htmlStr += "<div class='tweetMsg'>" + tweets[i]["msg"] + "</div>";
			htmlStr += "</div>";
		}
		publictweet.innerHTML = htmlStr;
		
	});
}