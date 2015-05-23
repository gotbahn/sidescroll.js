/*global navigator, document */
'use strict';

(function () {

	var userAgent = navigator.userAgent, // user agent identifier
			html = document.documentElement, // html tag
			version = 7, // minimal supported version of IE
			gap = ''; // gap between classes

	if (html.className) { // check if neighbour class exist in html tag
		gap = ' ';
	} // end if

	for (version; version <= 10; version++) { // loop from minimal to 10 version of IE
		if (userAgent.indexOf('MSIE ' + version) > -1) { // match IE individual name
			html.className += gap + 'ie' + version;
		} // end if
	}

	if (userAgent.match(/Trident.*rv[ :]*11\./)) { // Special case for IE11
		html.className += gap + 'ie11';
	} // end if

})();
