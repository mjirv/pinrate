function getPinId(callback, errorCallback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function(tabs) {
		var activeTab = tabs[0];
		var url = activeTab.url;

		console.assert(typeof url == 'string', 'url should be string');

		// We could use a check that it's a pinterest URL of the proper form

		// Pinterest urls are formatted ...pinterest.com/pin/25lljk35llj/, so
		// we split on 'pin/', get the second entry, and remove the trailing /
		url = url.split('pin/')
		if (url[0].split('.')[1] != 'pinterest') {
			errorCallback('Want to rate this page? Pin it, because right now \
				you\'re not on pinterest!');
			return;
		}
		var id = url[1].slice(0, -1);

		// Call getTitle here so we have already returned if not on Pinterest
		getTitle();
		showSliderInPage();
		getComments(callback, id);
	});
}

function getTitle() {
	// When the popup loads, gets Pin title and displays it at the top of page
	chrome.tabs.executeScript(
	null,{
		code: "var title = document.getElementsByClassName('richPinNameLink')\
				[0].innerText; title;"
	},
	function(title) {
		document.getElementById('title').innerText = title;
		console.log(title)
	});
}

function showSliderInPage() {
	chrome.tabs.executeScript(null, { file: "jquery-3.1.0.min.js" }, 
		function() {
			chrome.tabs.executeScript(null, { code: 
				"$('h2').slideToggle('slow');" });
		});
}

function getComments(callback, id) {
	comments = chrome.tabs.executeScript(
		null,{
			code: "var c_array = [];\
			var comments = document.getElementsByClassName\
			('commentDescriptionContent');\
			for (var i=0; i<comments.length; i++) {\
				c_array += ' ' + comments[i].innerText;\
			}\
			c_array;"
		},
		function(comments) {
			callback(id, comments);
		}
	);
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.executeScript(null, { code: "$('#sliderDiv').slideToggle('slow');"
		});
	window.close();
	/*
	getPinId(function(id, comments) {
		html = '<iframe src="http://localhost:3000/pins/' + id + '?comments='
		+ comments + '"width="100%"" height="100%" frameborder="0" style="\
		display:block"></iframe>'
		document.getElementById('container').innerHTML = html;
	},
	function(err) {
		document.getElementById('container').innerText = err;
	});
	*/
});