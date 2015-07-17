(function () {
    $('.sidebar').sideScroll();
    document.getElementById('btn-start').addEventListener('click', function () {
        $('.sidebar').sideScroll('start');
    });
    document.getElementById('btn-stop').addEventListener('click', function () {
        $('.sidebar').sideScroll('stop');
    });
    document.getElementById('btn-clear').addEventListener('click', function () {
        $('.sidebar').sideScroll('clear');
    });
    document.getElementById('btn-add-items').addEventListener('click', function () {
        $('.sidebar').append('<a href="#" class="sidebar-item"><small>add</small></a>');
    });
    document.getElementById('btn-resize-items').addEventListener('click', function () {
        $('.sidebar').find('a').each(function () {
            $(this).css('height', '100px');
        });
    });
})();