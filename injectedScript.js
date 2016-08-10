var div=document.createElement("div");
var button = document.createElement("button");
var controls = document.createElement("div");
var header = document.createElement("h2");
var iframe = document.createElement("iframe");

div.style.position = "fixed";
div.style.bottom = "0px";
div.style.width = "500px";
div.style.height = "250px";
div.style.left = "0";
div.style.right = "0";
div.style.maxWidth = "500px";
div.style.margin = "0 auto"; 
div.style.backgroundColor = "white";
div.style.zIndex = "9998";
div.id = "sliderDiv";
div.style.opacity = "0.9";

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

button.onclick = function() {
	$('#sliderDiv').slideToggle('slow');
};

//header.innerText = document.getElementsByClassName('richPinNameLink')[0].innerText;

div.appendChild(button);
//div.appendChild(header);
div.appendChild(iframe);
document.body.appendChild(div);
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