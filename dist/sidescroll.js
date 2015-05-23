(function ($) {
    'use strict';

    $.fn.sideScroll = function (options) {

        var settings = $.extend({
            content: '.content',
            fixedClass: 'is-fixed'
        }, options),
            win = $(window),
            content = $(settings.content),
            winHeight = 0,
            menu = this,
            menuHeight = menu.height(),
            menuHeightRest = 0,
            contentHeight,
            winTop = 0,
            winTopLast = 0,
            scrollStep = 0,
            nextTop = 0,
            fixedClass = settings.fixedClass;

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

        function positionMenu(el) {
            //  Spot positions and heights
            winHeight = win.height();
            contentHeight = content.height();
            winTop = win.scrollTop();
            scrollStep = winTop - winTopLast; // scroll step
            menuHeightRest = menuHeight - winTop; // visible menu height

            // Fixed menu cases
            if (isMenuFixed()) {

                addFixed(el);

                //  Smart scroll cases
                if (menuHeight > winHeight) {

                    //  Scroll down
                    if (winTop > winTopLast) {

                        var menuScrollMax = menuHeight - winHeight;

                        if (nextTop < (menuScrollMax - scrollStep)) {
                            nextTop += scrollStep;
                        } else {
                            nextTop = menuScrollMax;
                        }

                        el.css('top', -nextTop);

                    } else if (winTop < winTopLast) {//  Scroll up
                        if (nextTop > -scrollStep) {
                            nextTop += scrollStep;
                        } else {
                            nextTop = 0;
                        }
                        el.css('top', -nextTop);
                    }
                }
            } else { //  Static menu cases
                removeFixed(el);
            }
            winTopLast = winTop; //  Save previous window scrollTop
        }

        //  Page start calculation
        positionMenu(menu);

        //  Change position on scroll
        win.on('scroll', function () {
            positionMenu(menu);
        });

        win.on('resize', function () {
            winHeight = win.height();
            //  Reset position if fixed and out of smart scroll
            if ((menuHeight < contentHeight) && (menuHeight <= winHeight)) {
                menu.removeAttr('style');
            }
        });

    };

}(jQuery));
