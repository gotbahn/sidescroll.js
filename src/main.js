;
(function ($, window) {
    'use strict';

    var name = 'sideScroll',
        win = $(window),
        winHeight = 0,
        winTop = 0,
        winTopLast = 0,
        nextTop = 0,
        contentHeight = 0,
        sidebarHeightRest = 0,
        scrollStep = 0;

    function SideScroll(el, options) {

        this.options = $.extend({}, {
            contentClass: '.content',
            fixedClassName: 'is-fixed'
        }, options);

        var sidebar = $(el);

        this._init(sidebar);
        this._bind(sidebar);
    }

    SideScroll.prototype = {
        _init: function (el) {
            this._positionSidebar(el);
        },
        _bind: function (el) {
            var self = this,
                sidebar = $(el),
                sidebarHeight = sidebar.height();

            //  Change position on scroll
            win.on('scroll', function () {
                self._positionSidebar(el);
            });

            win.on('resize', function () {
                winHeight = win.height();
                //  Reset position if fixed and out of smart scroll
                if ((sidebarHeight < contentHeight) && (sidebarHeight <= winHeight)) {
                    sidebar.removeAttr('style');
                }
            });

        },
        _positionSidebar: function (el) {
            var content = $(this.options.contentClass),
                sidebarHeight = el.height(),
                fixedClass = this.options.fixedClassName;

            //  Spot positions and heights
            winHeight = win.height();
            contentHeight = content.height();
            winTop = win.scrollTop();
            scrollStep = winTop - winTopLast; // scroll step
            sidebarHeightRest = sidebarHeight - winTop; // visible sidebar height

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

                    } else if (winTop < winTopLast) { //  Scroll up

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
