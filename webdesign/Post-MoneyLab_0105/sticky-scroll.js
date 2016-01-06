$(document).ready(function () {  
  var top = $('.sticky-scroll-box').offset().top;
  $(window).scroll(function (event) {
	var y = $(this).scrollTop();
		if (y >= top) {
		  $('.sticky-scroll-box').addClass('fixed');
		} else {
		  $('.sticky-scroll-box').removeClass('fixed');
		}
		$('.sticky-scroll-box').width($('.sticky-scroll-box').parent().width());
  	});
});