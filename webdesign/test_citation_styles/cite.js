$(document).ready(function(){

	console.log($('#a').css('height').replace(/[^0-9]/g, '') - $('#a').offset().top);

// $(window).on('scroll', function () {
//     var scrollTop     = $(window).scrollTop(),
//         elementOffset = $('#a').offset().top,
//         distance      = (elementOffset - scrollTop);
//        console.log(scrollTop);
//     });





////////////////////////
////POP-UP REFERENCE BOX
////////////////////////
	$(".in-text").each(function(){
		var n = $(this).data("dref");
		var t = $("p#ref"+n).text();
		$(this).data("ref", t)
//		console.log(t);
	});

////DISPLAY REFERENCE BOX WHEN IN-TEXT REFEERENCE IS CLICKED
	$(".in-text").click(function(ev) {		// for all events
		ev.stopPropagation();				// go through layers
		var info = $(this).data("ref");
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$(".tip p").text(info);
		$(".tip").css('display','block').offset({top: top - 30, left: left });
	});

	$('#x').click(function() {
		$('.tip').css('display', 'none');
	});

	$("#main").click(function(){
		$('.tip').css('display', 'none');
	});





////////////////
////CITATION BOX
////////////////

////GENERATE ID TO p
	$('.section p').each(function(number){
		//console.log(number);
		$(this).attr("id", "p"+number);
	});

////TOGGLE TOOLS
	$('#tools').click( function() {
		$('#citation-box').fadeToggle();
	});

////GENERATE CITATION
	function getSelectedText() {
	  	t = (document.all) ? document.selection.createRange().text : document.getSelection();
		  return t;
	}
	
////CONVERT SELECTION TO STRING AND WRAP A SPAN AROUND IT
	var span = document.createElement('SPAN');
	$('.section').mouseup(function(){
	    var selection = getSelectedText();
	    var selection_text = selection.toString();

	    //SPAN AROUND SELECTED TEXT
	    selection_text = span.textContent.substr(0, 1);
	    var range = selection.getRangeAt(0);
	    range.insertNode(span);
	});

////ON CLICK GET ALL THE DATA FROM PARENT ELEMENT AND GENERATE THE
////CITING REFERENCE IN THREE DIFFERENT STYLES
	$('#cite').click( function() {
		span.className = "qwertz";		//ADD CLASS TO SPAN ON CLICK
		var par = $('.qwertz').closest('p').attr('id');		//GET ID OF PARENT p
	  	var ref_article = $('.qwertz').closest('.section').attr('data-article');

	    var ref_authorName = $('.qwertz').closest('.section').attr('data-authorName');
	    var author = function() {
	    	return ref_authorName.substr(0, 1);
	    }
	    var ref_apaAuthorName = author();
	    console.log(ref_apaAuthorName);
	    var ref_authorLastName = $('.qwertz').closest('.section').attr('data-authorLastName');
	    var ref_title = $('meta[name="title"]').attr('content');
	    var ref_eds = $('meta[name="editors"]').attr('content');
	    var ref_apaEds = $('meta[name="apa-editors"]').attr('content');
	    var ref_year = $('meta[name="year"]').attr('content');
	    var ref_place = $('meta[name="place"]').attr('content');
	    var ref_pub = $('meta[name="publisher"]').attr('content');
	    var MLA_date_of_access = moment().format('D MMMM YYYY');
	    var chicago_date_of_access = moment().format('MMMM D, YYYY');
		var url = $(location).attr('pathname');

////////MLA STYLE 
	    $('#mla').html(ref_authorLastName + ", " + ref_authorName + ". '" + ref_article + ".' " + "<i>" + ref_title + "</i>" 
	    + ". Eds. " + ref_eds + ". " + ref_place + ": " + ref_pub + ", " + ref_year + ". &lt;" + url + "#" + par + "&gt;. " + MLA_date_of_access + ".");

////////CHICAGO STYLE
	    $('#chicago').html(ref_authorLastName + ", " + ref_authorName + ". '" + ref_article + ".' In " + "<i>" + ref_title + "</i>"
	    + ", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+ url + "#" + par + ". Accessed "+chicago_date_of_access + ".");

////////APA STYLE
	    $('#apa').html(ref_authorLastName + ", " + ref_apaAuthorName + ". (" + ref_year + "). " + ref_article + ". In "+ref_apaEds+" (Eds.), "+"<i>"+ref_title+"</i>"
	    +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
	});


////////////////////////////////
////CLICKING COPIES THE CITATION
////TO THE CLIPBOARD////////////
////////////////////////////////
	var clipboard = new Clipboard('.full-citation');

////DISPLAY CONFIRMATION AT COPY
	$('.full-citation').click(function() {
		$(this).prev().append('<span class="confirmation" style="color: green">        Copied!</span>');
	    $('.confirmation').fadeOut(3000);
	});

	// clipboard.on('success', function(e) {
	//     $('.full-citation').append('<div class="confirmation">YXCVBN</div>');
	//     $('.confirmation').fadeOut(3000);
	//     //e.clearSelection();
	// });

	clipboard.on('error', function(e) {
	    $('.full-citation').prev().append('<div class="confirmation"><br/>Error!</div>');
	});
});

/*///////////////////////
ON RESIZE DO THESE THINGS
///////////////////////*/
$(window).resize(function() {
////////////////////////////////////
////SIDENOTES = BOX WHEN WIDTH SMALL
////////////////////////////////////
	if ($(window).width() <= "400") {	//SUBSTITUTE '400' WITH THE DESIRED MINIMUM SIZE
		$('#footnotes, #notes').hide();

		$('.footnoteRef').click(function(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			var n = $(this).attr('href').substr(3, 4);
			var t = $('li#fn'+n).text();
			var top = $(this).offset().top;
			var left = $(this).offset().left;
			$('.tip p').text(t);
			$('.tip').css('display','block').offset({top: top - 30, left: left });
			/*
			and make the link bring up a box (same as the one used for in-text);
			print the respective contents of the footnote in the box;
			put the direct link to the footnote reference on the bottom;
			*/
		});
	}else{
		$('.footnoteRef').unbind("click");
		$('#footnotes, #notes').show();
	}
});
