// $(document).scroll(function() {
// 	var b = $('#a').position();
// 	console.log(b);	
// });

$(document).ready(function(){

	console.log($('#a').css('height').replace(/[^0-9]/g, '') - $('#a').offset().top);

// $(window).on('scroll', function () {
//     var scrollTop     = $(window).scrollTop(),
//         elementOffset = $('#a').offset().top,
//         distance      = (elementOffset - scrollTop);
//        console.log(scrollTop);
//     });





///////////////////////
//POP-UP REFERENCE BOX
///////////////////////
	$(".in-text").each(function(){
		var n = $(this).data("dref");
		var t = $("p#ref"+n).text();
		$(this).data("ref", t)
//		console.log(t);
	});

	$(".in-text").click(function(ev) {		// for all events
	/*	$(document).tooltip();*/
		ev.stopPropagation();				// go through layers
		//var info = $(this).attr('id');
		var info = $(this).data("ref");
		//console.log("info : " +info);
		//html-> <p data-ref="XXX">
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$(".tip p").text(info);
		$(".tip").css('display','block').offset({top: top - 30, left: left });
		//console.log($(this).offset().top);
	});

	$('#x').click(function() {
		$('.tip').css('display', 'none');
	});

	$("#main").click(function(){
		//console.log("hi");
		$('.tip').css('display', 'none');
	});







///////////////////
// GENERATE ID TO p
///////////////////
	$('.section p').each(function(number){
		//console.log(number);
		$(this).attr("id", "p"+number);
	});

///////////////
// TOGGLE TOOLS
///////////////
	$('#tools').click( function() {
		$('#citation-box').fadeToggle();
	});

///////////////////
//GENERATE CITATION
///////////////////
	
	function getSelectedText() {
	  	t = (document.all) ? document.selection.createRange().text : document.getSelection();
		  return t;
	}
	
	var span = document.createElement('SPAN');
	$('.section').mouseup(function(){
	    var selection = getSelectedText();
	    var selection_text = selection.toString();

	    //SPAN AROUND SELECTED TEXT
	    selection_text = span.textContent.substr(0, 1);
	    var range = selection.getRangeAt(0);
//	    range.deleteContents();
	    range.insertNode(span);
	});


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
	    $('#mla').html(ref_authorLastName + ", " + ref_authorName + ". '" + ref_article + ".' " + "<i>" + ref_title + "</i>" 
	    + ". Eds. " + ref_eds + ". " + ref_place + ": " + ref_pub + ", " + ref_year + ". &lt;" + url + "#" + par + "&gt;. " + MLA_date_of_access + ".");

	    $('#chicago').html(ref_authorLastName + ", " + ref_authorName + ". '" + ref_article + ".' In " + "<i>" + ref_title + "</i>"
	    + ", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+ url + "#" + par + ". Accessed "+chicago_date_of_access + ".");

	    $('#apa').html(ref_authorLastName + ", " + ref_apaAuthorName + ". (" + ref_year + "). " + ref_article + ". In "+ref_apaEds+" (Eds.), "+"<i>"+ref_title+"</i>"
	    +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");


	});

	var clipboard = new Clipboard('.full-citation');

///////////////////////////////
// DISPLAY CONFIRMATION AT COPY
///////////////////////////////
	$('.full-citation').click(function() {
		$(this).prev().append('<div class="confirmation">Copied!</div>');
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

$(window).resize(function() {
	//////////////////////////////////
	//SIDENOTES = BOX WHEN WIDTH SMALL
	//////////////////////////////////
	console.log($(window).width());
	if ($(window).width() <= "400") {

	$('#footnotes, #notes').hide();

	$('.footnoteRef').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var n = $(this).attr('href').substr(3, 4);
		var t = $('li#fn'+n).text();
	//	var info = $(this).attr('id');
		console.log(t);
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$('.tip p').text(t);
		$('.tip').css('display','block').offset({top: top - 30, left: left });
		//$('.tip')
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
