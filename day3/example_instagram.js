var imagesArr = [];

function loadImageHandler(xhttp) {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
		handleImagePlacement(xhttp.responseText);
    }
}

function handleImagePlacement(rawJSONData) {
	imagesArr = JSON.parse(rawJSONData);
	
	renderImages(imagesArr);
}

function renderImages(_imagesArr) {
	var listHTML = "";
	for(var i = 0; i < _imagesArr.length; i++) {
		console.log("_imageArr[" + i + "]=" + _imagesArr[i]);
		listHTML += "<img src='http://localhost:8080/images/" + _imagesArr[i].url + "' title='" + _imagesArr[i].description + "'>";
	}
	if(listHTML === "") {
		listHTML += "No images matching filter.";
	}
	console.log("listHTML=" + listHTML);
	document.getElementById("imageList").innerHTML = listHTML;
}

function loadImages() {
	var userNameElem = document.getElementById("userName");
	var userName = userNameElem.options[userNameElem.selectedIndex].value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		loadImageHandler(xhttp);
	};
	console.log("url = " + "http://localhost:8080/" + userName);
	xhttp.open("GET", "http://localhost:8080/" + userName, true);
	xhttp.send();
}

function handleFilter() {
	var filteredImageArr = [];
	var filterElem = document.getElementById("filterText");
	for(var i = 0; i < imagesArr.length; i++) {
		if(imagesArr[i].description.includes(filterElem.value)) {
				filteredImageArr.push(imagesArr[i]);
		}
	}
	renderImages(filteredImageArr);
}
