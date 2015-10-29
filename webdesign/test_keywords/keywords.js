$(document).ready(function(){
	$(".keyword").click(function() {
		var info = $(this).attr('id');
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$(".tip").html(info).css("display","block").offset({top: top - 30, left: left });

		console.log($(this).offset().top);
	});

});