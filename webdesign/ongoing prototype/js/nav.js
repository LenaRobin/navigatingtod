var toppyDiv = 0;
var sValues = [];

$('.section').each(function () {
    var scrValue = $(this).offset().top;
    sValues.push(scrValue);
    $(this).attr("data-scroll", scrValue);
    console.log(scrValue);
});

$("#display").on('click', function (e){
    e.preventDefault();
      if($('.current').next('div.section').length > 0) {
            console.log('here '+$('.current').next('div.section').length);
            var $next = $('.current').next('.section');
            var top = $next.offset().top ;

            $('.current').removeClass('current toppy');
            $(function () {
                $next.addClass('current toppy');
                $('html, body').animate({
                    scrollTop: top
                });
                console.log('hey');
            });
        }else{
         //console.log("nothing");  
            var $next = $('.section:first');
            var top = $next.offset().top ;
            console.log($('#info-box').height());

            //$('.current').removeClass('current');
            $(function () {
                $next.addClass('current toppy');
                $('html, body').animate({
                    scrollTop: top
                });
                //console.log();
            });
        }
});

$("#display1").on('click', function (e){
    e.preventDefault();
    if( $('.current').prev('.section').length){
        var $prev = $('.current').prev('.section');
        var top = $prev.offset().top;

        $('.current').removeClass('current toppy');

        $(function () {
          $prev.addClass('current toppy');
            $('html, body').animate({
                scrollTop: top
            }, 'slow');
         });
    }else{
         $('.current').removeClass('current');
        $('html, body').animate({
                scrollTop: 0
            }, 'slow');
    }
    
});


function hideShowLinks() {
    $('.section').each(function (k, v) {
        var self = $(this);
        if (self.hasClass('toppy')) {
            toppyDiv = k;
            console.log(toppyDiv);
            /*if (k == 0) {
                console.log('hide prev');
                $('#display1').show();
                $('#display').show();
            } else if (k == ($('.section').length - 1)) {
                $('#display').hide();
                $('#display1').show();
            } else {
                $('#display, #display1').show();
            }*/
        }
    });
}

//hideShowLinks();

$(window).scroll(function () {
    console.log("hi from scroll = " +  $(window).scrollTop());
    //if($(window).scrollTop() > sValues[toppyDiv])
    hideShowLinks();
});