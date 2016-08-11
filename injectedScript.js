var div=document.createElement("div");
var button = document.createElement("button");
var controls = document.createElement("div");
var header = document.createElement("h2");
var iframe = document.createElement("iframe");

div.style.position = "fixed";
div.style.right = "0px";
div.style.top = "54px"; //hard-coded to sit below main status bar
div.style.width = "20%";
div.style.height = "100%";
div.style.maxWidth = "500px";
div.style.minWidth = "250px";
div.style.zIndex = "103";
div.id = "sliderDiv";

//button.style.position = "fixed";
button.style.width = "50px";
//button.style.right = "0";
button.style.float = "right";

controls.style.position = "fixed";
controls.style.zIndex = "9999";
controls.style.width = "100%";
controls.style.bottom = "0px";

var id = getId();

iframe.src = 'http://localhost:3000/pins/' + id + '?comments=';
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.maxWidth = "500px";
iframe.style.border = "0";
iframe.style.overflow = "hidden";

button.onclick = function() {
	$('#sliderDiv').slideToggle('slow');
};

//header.innerText = document.getElementsByClassName('richPinNameLink')[0].innerText;

//div.appendChild(button);
//div.appendChild(header);
div.appendChild(iframe);
document.body.getElementsByClassName('mainContainer')[0].appendChild(div);
//document.body.appendChild(controls);
button.innerText="X";

function getId() {
	var url = window.location.href;
	console.assert(typeof url == 'string', 'url should be string');

	// We could use a check that it's a pinterest URL of the proper form

	// Pinterest urls are formatted ...pinterest.com/pin/25lljk35llj/, so
	// we split on 'pin/', get the second entry, and remove the trailing /
	url = url.split('pin/')
	if (url[0].split('.')[1] != 'pinterest') {
		console.log('Want to rate this page? Pin it, because right now \
			you\'re not on pinterest!');
		return;
	}
	var id = url[1].slice(0, -1);
	return id;
};

// I should make this better because it is janky
window.onmousedown = function() {
	setTimeout(function() {
		if(id != getId()) {
			console.log('ok');
			id = getId();
			iframe.src = 'http://localhost:3000/pins/' + id + '?comments=';
		};
	}, 100);
};