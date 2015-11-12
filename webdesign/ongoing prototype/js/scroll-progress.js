$(document).ready(function() {

  var n = 1
  $('#book-toc nav h2').each(function(){
    $(this).attr('id', 'title'+n);
    n++;
  });

  $('#book-toc nav h3').each(function(){
    $(this).attr('id', 'subtitle'+n);
    n++;
  });

  $(window).scroll(function () {
        var title_top = $('.content').offset().top;
        var start_scroll_bar = $(document).scrollTop() - title_top;          // height of doc=0
        var d = $(document).height() - $(window).height();  // heigth at the end of doc
        var Perc = (start_scroll_bar / d)*700;
        $("#verticalScroll").css('height', Perc);
  });



});