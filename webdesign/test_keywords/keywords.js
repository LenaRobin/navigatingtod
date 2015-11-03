$(document).ready(function(){
	$(".in-text").click(function() {
		var info = $(this).attr('id');
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$("full-ref").html(info).css({
			display: block,
			border: 1px solid black,
		}).offset({top: top - 30, left: left });
		console.log($(this).offset().top);
	});

});