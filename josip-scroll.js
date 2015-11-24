var nItems = $('.section').length;
var scrTo = 0;
// you have a slightly different array name
var scrValues = [];
var curSlide;
//nItems is the number of timeline items
//we'll use this number to place navigation items on the page

$('.content').on('scroll', function() {
	var curPos = $(this).scrollLeft() + 590;
	console.log(curPos);
	// you would use your sections instead of .timeline-bullet 
	$('.timeline-bullet').removeClass("active");
	
	//if curPos is in scrValues, get the index and set the timeline bullet class to active (remove all other active classes)
	for(var i=-1; i < scrValues.length -1; i++){
		if (curPos > scrValues[i-1] && curPos < scrValues[i]){
			//console.log(i);
			$('.timeline-bullet:eq('+i+')').addClass("active");
		}
	}
	// here we check if it's below the first pic (590 is the pic width)
	if(curPos <= 590){
		$('.timeline-bullet').removeClass("active");
		$('.timeline-bullet:eq(0)').addClass("active");
	}
	// and here if the scroll is after the last one (minus 1) (590 is the pic width)
	if(curPos >= scrValues[scrValues.length -1] - 590){
		$('.timeline-bullet').removeClass("active");
		$('.timeline-bullet:eq('+(scrValues.length -1)+')').addClass("active");
	}
	

});