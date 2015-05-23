/*global navigator, document */
'use strict';

(function () {

	define('globalNavigationScroll', [
		'jquery'
	], function ($) {
		'use strict';

		var win = $(window),
			menu = $('.menu-wrapper'),
			content = $('.page-wrapper'),
			winHeight,
			menuHeight = menu.height(),
			menuHeightRest = 0,
			contentHeight,
			winTop = 0,
			winTopLast = 0,
			scrollStep = 0,
			nextTop = 0,
			fixedClass = '_fixed';

		function isMenuFixed() {
			return (menuHeight < contentHeight) && (contentHeight > winHeight);
		}

		function addFixed(el) {
			if (!el.hasClass(fixedClass)) {
				el.addClass(fixedClass);
			}
		}

		function removeFixed(el) {
			if (el.hasClass(fixedClass)) {
				el.removeClass(fixedClass);
			}
		}

		function positionMenu() {

			//  Spot positions and heights
			winHeight = win.height();
			contentHeight = content.height();
			winTop = win.scrollTop();
			scrollStep = winTop - winTopLast; // scroll step
			menuHeightRest = menuHeight - winTop; // visible menu height

			// Fixed menu cases
			if (isMenuFixed()) {

				addFixed(menu);

				//  Smart scroll cases
				if (menuHeight > winHeight) {

					//  Scroll down
					if (winTop > winTopLast) {

						var menuScrollMax = menuHeight - winHeight;

						nextTop < (menuScrollMax - scrollStep) ?
							nextTop += scrollStep : nextTop = menuScrollMax;

						menu.css('top', -nextTop);

					}
					//  Scroll up
					else if (winTop < winTopLast) {

						nextTop > -scrollStep ?
							nextTop += scrollStep : nextTop = 0;

						menu.css('top', -nextTop);

					}

				}
				//  Static menu cases
			} else {
				removeFixed(menu);
			}

			//  Save previous window scrollTop
			winTopLast = winTop;

		}

		//  Page start calculation
		positionMenu();

		//  Change position on scroll
		win.on('scroll', function () {
			positionMenu();
		});

		win.on('resize', function () {

			winHeight = win.height();

			//  Reset position if fixed and out of smart scroll
			if (
				(menuHeight < contentHeight) && (menuHeight <= winHeight)
			) {
				menu.removeAttr('style');
			}

		});

	})

})();
