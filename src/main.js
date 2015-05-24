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
            sidebar = this,
            sidebarHeight = sidebar.height(),
            sidebarHeightRest = 0,
            contentHeight,
            winTop = 0,
            winTopLast = 0,
            scrollStep = 0,
            nextTop = 0,
            fixedClass = settings.fixedClass;

        function isSidebarFixed() {
            return (sidebarHeight < contentHeight) && (contentHeight > winHeight);
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

        function positionSidebar(el) {
            //  Spot positions and heights
            winHeight = win.height();
            contentHeight = content.height();
            winTop = win.scrollTop();
            scrollStep = winTop - winTopLast; // scroll step
            sidebarHeightRest = sidebarHeight - winTop; // visible sidebar height

            // Fixed sidebar cases
            if (isSidebarFixed()) {

                addFixed(el);

                //  Smart scroll cases
                if (sidebarHeight > winHeight) {

                    //  Scroll down
                    if (winTop > winTopLast) {

                        var sidebarScrollMax = sidebarHeight - winHeight;

                        if (nextTop < (sidebarScrollMax - scrollStep)) {
                            nextTop += scrollStep;
                        } else {
                            nextTop = sidebarScrollMax;
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
            } else { //  Static sidebar cases
                removeFixed(el);
            }
            winTopLast = winTop; //  Save previous window scrollTop
        }

        //  Page start calculation
        positionSidebar(sidebar);

        //  Change position on scroll
        win.on('scroll', function () {
            positionSidebar(sidebar);
        });

        win.on('resize', function () {
            winHeight = win.height();
            //  Reset position if fixed and out of smart scroll
            if ((sidebarHeight < contentHeight) && (sidebarHeight <= winHeight)) {
                sidebar.removeAttr('style');
            }
        });

    };

}(jQuery));
