$(document).ready(function(){

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

/////////////////////////
// CONTEXT MENU
////////////////////////
	$('p').mouseup(function() {
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
		        });*/    
			});

		        
    });
/////////////////////////
// CONTEXT MENU
////////////////////////

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
