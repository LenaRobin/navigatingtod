
$('a.display').on('click', function (e) {
    e.preventDefault();

    var t = $(this).text(),
        that = $(this);
        console.log('hey');

    if (t === 'next' && $('.current').next('div.section').length > 0) {
        var $next = $('.current').next('.section');
        var top = $next.offset().top;

        $('.current').removeClass('current');
        $(function () {
            $next.addClass('current');
            $('html, body').animate({
                scrollTop: $('.current').offset().top
            });
            
        //$(function () {
        //    $next.addClass('current');
        //    $('html, body').animate({
        //        scrollTop: $('.current').offset().top
        //    }, 'slow');    

        });
    } else if (t === 'prev' && $('.current').prev('div.section').length > 0) {
        var $prev = $('.current').prev('.section');
        var top = $prev.offset().top;

        $('.current').removeClass('current');

        $(function () {
          $prev.addClass('current');
            $('html, body').animate({
                scrollTop: $('.current').offset().top
            }, 'slow');
         });
    }
});


function hideShowLinks() {
    $('.section').each(function (k, v) {
        var self = $(this);
        if (self.hasClass('current')) {
            if (k == 0) {
                console.log('hide prev');
                $('#display1').show();
                $('#display').show();
            } else if (k == ($('.section').length - 1)) {
                $('#display').hide();
                $('#display1').show();
            } else {
                $('#display, #display1').show();
            }
        }
    });
}

hideShowLinks();

$(window).scroll(function () {
    hideShowLinks();
});