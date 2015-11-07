$(document).ready(function(){

///////////////////////
// POP-UP REFERENCE BOX
///////////////////////
	$(".in-text").each(function(){
		var n = $(this).data("dref");
		var t = $("p#ref"+n).text();
		$(this).data("ref", t)
		//console.log(t);
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


/////////////
// GENERATE ID TO p
///////////////
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
var selected_text;

    function getSelectedText() {
        if (window.getSelection().toString().length > 0) {
            var selObj = window.getSelection().toString().substr(0, 1);
            var span = "<span id='s'>" + selObj + "</span>";
            var text = $('.section').html();
            $('.section').html(text.replace(selObj, span));
        }};

  $('.section').mouseup(function() {
        getSelectedText();

    });
	$('#cite').click( function() {
//	    alert("bla");
		console.log(selected_text);
	  	var ref_article = $('#cite-this').closest('.section').attr('data-article');
	    var ref_author = $('#cite-this').closest('.section').attr('data-author');
	    var ref_title = $('meta[name="title"]').attr('content');
	    var ref_eds = $('meta[name="editors"]').attr('content');
	    var ref_year = $('meta[name="year"]').attr('content');
	    var ref_place = $('meta[name="place"]').attr('content');
	    var ref_pub = $('meta[name="publisher"]').attr('content');
//	    var ref_par = $('')
	    $('#mla').text(ref_author + ". " + ref_article + ". " +  ref_title + ", eds. " + ref_eds + ". " + ref_place + ": " + ref_pub + ". " + ref_year + "."); 
	});






/////////////////////////
// CONTEXT MENU
////////////////////////
/*	$('p').mouseup(function() {
        //$('p').html(getSelectedText());

           $(function() {
		        $.contextMenu( {
		            selector: '.section', 
		            callback: function(key, options) {
		                var m = "clicked: " + key;
		                window.console && console.log(m) || alert(m); 
		            },
		            items: {
		                "edit": {name: "Edit", icon: "edit"},
		                "cut": {name: "Cut", icon: "cut"},
		                copy: {name: "Copy", icon: "copy"},
		                "paste": {name: "Paste", icon: "paste"},
		                "delete": {name: "Delete", icon: "delete"},
		                "sep1": "---------",
		                "quit": {name: "Quit", icon: function(){
		                    return 'context-menu-icon context-menu-icon-quit';
		                }}
		            }
		        });

		        /*$('.section').on('click', function(e){
		        **   console.log('clicked', this);
		        }); 
			});

		        
    });
*/

///////////////////////
//GET SELECTED TEXT 
//////////////////////
/*    function getSelectedText() {;
 *       if (window.getSelection().toString().length > 1) {
 *           return window.getSelection().toString();
 *    //   } else if (document.selection) {
 *      //     console.log("NADA");
 *          // return document.selection.createRange().text;
 *       } else {
 *           return; //'QWER';
 *   	};
*	};
*/



});
