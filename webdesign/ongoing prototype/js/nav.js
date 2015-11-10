var toppyDiv = 0;
var sValues = [];
var counter = 0;

$('.section').each(function () {
    var scrValue = $(this).offset().top;
    console.log(scrValue);
    sValues.push(scrValue);
    $(this).attr("data-scroll", scrValue);
    //console.log(scrValue);
});

$(".nav-tabs h2 a").each(function(ind){
    $(this).attr("id", "hid"+(ind+1)); 
    $(this).attr("data-scr", sValues[ind]);
});

$(".nav-tabs h2 a").on('click', function(e){
    e.preventDefault();
    var number = $(this).attr("data-scr");
    var index = $(this).attr("id");
    scrollIt(number, index);
});

function scrollIt(number, index){
    $('html, body').animate({
    //    scrollTop: number;}, 'slow');
            scrollTop: number })    
    }

$("#display").on('click', function (e){
    e.preventDefault();
    if(counter >= sValues.length - 1){
  //is the last
    $(this).css("display","none");
  }else{
      $(this).css("display","block");
  }
   // $(this).css("display","block");
      if($('.current').next('div.section').length > 0) {
            //console.log('here '+$('.current').next('div.section').length);
           
            var $next = $('.current').next('.section');
            var top = $next.offset().top ;

            $('.current').removeClass('current toppy');
            $(function () {
                $next.addClass('current toppy');
                $('html, body').animate({
                    scrollTop: top
                });
                //console.log('hey');
            });
          
        }else{
        // console.log("no next"); 
            //console.log("offset "+$('.text').offset().top);
            //console.log(sValues[0]);
            if(counter == 0){
                //is the first
                var $next = $('.section:first');
                var top = $next.offset().top ;
                //console.log($('#info-box').height());

                //$('.current').removeClass('current');
                $(function () {
                    $next.addClass('current toppy');
                    $('html, body').animate({
                        scrollTop: top
                    });
                    //console.log();
                });
                
            }//else{
                
           // }
           // 
            
        }
    counter++;
});

$("#display1").on('click', function (e){
    e.preventDefault();
    $("#display").css("display","block");
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
    counter--;
});


function hideShowLinks() {
    $('.section').each(function (k, v) {
        var self = $(this);
        if (self.hasClass('toppy')) {
            toppyDiv = k;
           // console.log(toppyDiv);
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
    //console.log("hi from scroll = " +  $(window).scrollTop());
    //if($(window).scrollTop() > sValues[toppyDiv])
    hideShowLinks();
});