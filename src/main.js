;
(function ($, window) {
    'use strict';

    var name = 'sideScroll',
        defaults = {
            contentClass: '.content',
            fixedClassName: 'is-fixed'
        };

    function SideScroll(element, options) {
        this.options = $.extend({}, defaults, options);
        this.init();

        var win = $(window),
            content = $(this.options.contentClass),
            winHeight = 0,
            sidebar = $(element),
            sidebarHeight = sidebar.height(),
            sidebarHeightRest = 0,
            contentHeight,
            winTop = 0,
            winTopLast = 0,
            scrollStep = 0,
            nextTop = 0,
            fixedClass = this.options.fixedClassName;

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
    }

    SideScroll.prototype = {
        init: function () {
            console.log('hello');
        },
        destroy: function () {
            console.log('destroy');
        }
    };

    $.fn[name] = function (options) {
        return this.each(function () {
            if (!$.data(this, name)) {
                $.data(this, name, new SideScroll(this, options));
            }
            else if ($.isFunction(SideScroll.prototype[options])) {
                $.data(this, name)[options]();
            }
        });
    }

})(jQuery, window, document);
