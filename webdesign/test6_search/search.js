$(document).ready(function() {

	// $('.section').each(function(nr){
	// 	$(this).attr('id', 'section'+nr);
	// });

	// // use document.body if the whole page is scrollable
	// var myViewport = document.getElementById('myViewport');
	// var firstSection = document.getElementById('section0');

	// myViewport.addEventListener(
	//     'scroll',
	//     function() {
	//         var location = firstSection.viewportTopLocation;
	//         console.log(
	//             'The viewport is at ' + location +
	//             ' relatively to the first section'
	//         );
	//     },
	//     false
	// );

/////////////////
//SEARCH FUNCTION
/////////////////
	var elem = $('<div id="search_ui" style="position: fixed; float: right; right: 0px; top: 0px; display: none;"><button id="cancel" style="margin: 5px 0px 5px 0px;">Cancel</button></div>');
	var maxCount;

	$('#live-search').append(elem);

	// this remove the classes in the text relating to search-highlighting
	var cancelSearch = function() {
		$('.search-found').each(function() {
			$(this).removeClass('search-found');
		});
		$('.search-notfound').each(function() {
			$(this).removeClass('search-notfound');
		});
        $('#filter-count').hide();
	};

	


	$('#filter').on('keyup', function(e){
		if(e.keyCode == 13){
			// $('#next').tabs({
			// 	activate: function(event, ui) {                   
			// 		var scrollTop = $(window).scrollTop(); // save current scroll position
			// 		window.location.hash = ui.newPanel.attr('id');
			// 		$(window).scrollTop(scrollTop); // keep scroll at current position
			// 	}    
			// });
		
			location.href="#hit0";
			return false;
		}
		
		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val();
		// Loop through the text
		$('h1, h2, h3, h4, p, div, ol, a').each(function(){
			// If the element does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				// add classes to the block elements
				$(this).addClass('search-notfound');
				$(this).removeClass('search-found');
			} else {
				$(this).removeClass('search-notfound');
				$(this).addClass('search-found');
			}
		});

		$('#main').unhighlight();
        $('#main').highlight(filter);

        // GENERATE IDs FOR ALL HIGHLIGHTED HITS
        $('.highlight').each(function(number) {
        	maxCount = number;
       		console.log("highlight " +number);
       		$("#filter-count").show().text("Number of Hits = "+maxCount);
        	$(this).attr('id', 'hit'+number);
        });

        // ON CLICK GO TO THE NEXT INSTANCE
        var counter = -1;

        function getHitCount() {
	    	var i=0;
    		while ($('#hit'+i).length) {
    			i++;
    		} 
	    	return i;
        }

        function toNext(n){
        	counter = n;
        	//console.log(count+ " ,"+ counter)
        	// var next_nr = $('#next').attr('href').match(/\d+/);
        	//  if (next_nr > count) {
        	// 	counter = 0;
        	//  }
        	if(counter < maxCount){
        		counter++;
        	}else{
        		counter = 0;
        	}
        	//console.log("again " +count+ " ,"+ counter)
	        $('#hit'+counter).css('background-color', 'yellow');
	       	$('#hit'+(counter-1)).css('background-color', '#BFBFBF');
        }

        $('#next').click(function() {
        	// if (0 == counter) {
        	// 	counter = getHitCount();
        	// }
        	toNext(counter);
        	$(this).attr('href', '#hit'+counter);
        	$('#prev').attr('href', '#hit'+(counter-2));
        });

        // ON CLICK GO TO THE PREVIOUS INSTANCE
        function toPrev(n) {
        	counter = n;
        	if(counter > 0){
        		counter--;
        	}else{
        		counter = maxCount;
        	}
        	
        	$('#hit'+counter).css('background-color', 'yellow');
        	$('#hit'+(counter+1)).css('background-color', '#BFBFBF');
        }

        $('#prev').click(function() {
        	console.log("prev : "+counter);
        	// if (0 == counter) {
        	// 	counter = getHitCount();
        	// }
        	toPrev(counter);
        	$(this).attr('href', '#hit'+(counter));
	        $('#next').attr('href', '#hit'+(counter+2));
        });


	    /*$(document).keypress(function(event) {
		    if (event.keyCode == 13) {
				toNext(counter);
		    }
		});*/


/*
	    $(document).keypress(function(e) {
		    if(e.which == 13) {
	    		console.log('pressed enter');
	    	    nextInstance();
		    }
		});       
*/
        // WRAP ALL SUGGESTED MENU ITEMS IN A HREFs
/*        $('.ui-menu-item').each(function(number) {
*        	var link = document.createElement('A');
*        	console.log(link);
*        	$(link).attr('href', '#hit'+number);
*        	$(this).insertNode(link);
*        });
*/
        /* gradient highlight
        *$('.highlight').each(function() {
        *	var span_top = $(this).offset().top;
        *	var span_left = $(this).offset().left;
        *	console.log(span_top + " + " + span_left);
        *	$(this).css({
        *		'background': '-webkit-radial-gradient(span_top,span_left,circle,rgb(27,186,135),transparent)'
		*	});
        *});
		*/

		//////// Update the count ////////
//		var numberItems = count;
		  
		///////// HIDE CANCEL BUTTON WHEN NO INPUT
		if (0 < filter.length) {
			// filter active
			$('#search_ui').css('display', 'block');
		} else {
			$('#search_ui').css('display', 'none');
			cancelSearch();
		}

		////////// HIDE CANCEL BUTTON WHEN CLICKED
		$(elem).click(function() {
			$(this).css("display", "none");
			$("#filter").val('');
			cancelSearch();
		});
	});


	



	$(function() {
	var allWords = [
		"20th",
		"21st",
		"a",
		"ability",
		"about",
		"above",
		"Abram",
		"abstraction",
		"actions",

		"actors",

		"add",

		"addresses",

		"administrative",

		"aesthetic",

		"against",

		"Agency",

		"all",

		"alliance",

		"also",

		"although",

		"America",

		"an",

		"Ana",

		"analyses",

		"analysis",

		"analyzing",

		"AND",

		"another",

		"antagonize",

		"Antonio",

		"apartheids",

		"apparatus",

		"are",

		"areas",

		"art",

		"as",

		"aspiration",

		"assumes",

		"at",

		"attack",

		"attention",

		"author",

		"Autonomy",

		"be",

		"beginning",

		"Beller",

		"Berry",

		"between",

		"beyond",

		"biopolitical",

		"bloc",

		"Britain",

		"broader",

		"but",

		"by",

		"called",

		"CAPITAL",

		"capitalism",

		"capitalist",

		"carried",

		"Castro",

		"category",

		"centrality",

		"centre",

		"century",

		"certain",

		"change",

		"Chapter",

		"character",

		"characterized",

		"city",

		"class",

		"co",

		"cognitive",

		"cognitivities",

		"Collective",

		"colonial",

		"coloniality",

		"commodification",

		"commodified",

		"concept",

		"concepts",

		"concludes",

		"connection",

		"constitute",

		"contained",

		"contemporary",

		"context",

		"contribute",

		"control",

		"cooperation",

		"corpus",

		"creative",

		"CREATIVITY",

		"critical",

		"critically",

		"criticism",

		"criticizes",

		"critique",

		"culture",

		"current",

		"currently",

		"cusing",

		"dealing",

		"deals",

		"decolonialist",

		"defining",

		"degree",

		"democracies",

		"democracy",

		"democratic",

		"depoliticization",

		"derogation",

		"detects",

		"detriment",

		"devastating",

		"devastation",

		"dichotomy",

		"dictated",

		"different",

		"discourse",

		"discourses",

		"distinctive",

		"distribution",

		"division",

		"divisions",

		"does",

		"domain",

		"domains",

		"dominant",

		"domination",

		"economy",

		"editors",

		"effects",

		"elites",

		"Emmelheinz",

		"emphasizing",

		"Empire",

		"encompassed",

		"end",

		"Engaged",

		"engagement",

		"engineering",

		"entire",

		"entitled",

		"environments",

		"epistemological",

		"equal",

		"era",

		"establish",

		"establishes",

		"establishment",

		"ethnic",

		"ethnicity",

		"ethnocentric",

		"European",

		"Even",

		"exist",

		"expand",

		"exploitation",

		"extent",

		"Factory",

		"faire",

		"feature",

		"fiction",

		"figure",

		"financial",

		"First",

		"fo",

		"focus",

		"focused",

		"for",

		"Fordist",

		"form",

		"former",

		"forms",

		"Foucault",

		"framework",

		"free",

		"from",

		"function",

		"functional",

		"general",

		"generally",

		"gentrification",

		"Geography",

		"ghettoized",

		"global",

		"goes",

		"Gomez",

		"Gordana",

		"GRAY",

		"great",

		"guided",

		"Gómez",

		"Hardt",

		"has",

		"he",

		"hegemonic",

		"hegemony",

		"help",

		"heterogeneous",

		"hierarchies",

		"historical",

		"historicization",

		"huge",

		"idea",

		"ideological",

		"ideologies",

		"Image",

		"implies",

		"imposition",

		"impotence",

		"impotent",

		"in",

		"include",

		"industries",

		"initial",

		"instances",

		"institutions",

		"interpretation",

		"interpretations",

		"into",

		"Introduction",

		"introductory",

		"invested",

		"involved",

		"Irmgard",

		"is",

		"it",

		"its",

		"itself",

		"James",

		"Jonathan",

		"Josephine",

		"Lacan",

		"laissez",

		"large",

		"Latin",

		"led",

		"Leger",

		"legitimization",

		"level",

		"links",

		"Ljubljana",

		"locates",

		"logic",

		"logics",

		"longer",

		"Machine",

		"mainstream",

		"maintaining",

		"majority",

		"manner",

		"Marc",

		"market",

		"mass",

		"meaning",

		"mentioned",

		"merely",

		"Mexico",

		"Michael",

		"Missing",

		"model",

		"modern",

		"modernity",

		"modernization",

		"modernized",

		"monopoly",

		"most",

		"name",

		"nation",

		"necessary",

		"necessity",

		"needs",

		"Negri",

		"neoliberal",

		"Neoliberalism",

		"networked",

		"neutralization",

		"Neutralizing",

		"New",

		"niche",

		"Nikolić",

		"no",

		"normative",

		"not",

		"nullity",

		"obscene",

		"occupies",

		"occurs",

		"OF",

		"on",

		"only",

		"opposite",

		"optation",

		"or",

		"organization",

		"organizing",

		"Other",

		"out",

		"pan",

		"paradigm",

		"paradigmatic",

		"part",

		"partnership",

		"parts",

		"perception",

		"period",

		"periods",

		"periphery",

		"perpetuation",

		"perspective",

		"place",

		"plays",

		"point",

		"points",

		"political",

		"politically",

		"politicized",

		"politics",

		"popular",

		"position",

		"positioning",

		"positions",

		"post",

		"postfordist",

		"Postmodern",

		"power",

		"practices",

		"preceding",

		"precisely",

		"preparation",

		"presented",

		"primarily",

		"principles",

		"private",

		"privileges",

		"process",

		"processes",

		"produce",

		"producing",

		"production",

		"professional",

		"profit",

		"progress",

		"proponents",

		"psychoanalytic",

		"public",

		"publication",

		"publications",

		"racial",

		"radical",

		"radically",

		"rationalization",

		"reconfiguring",

		"reduced",

		"refer",

		"reflection",

		"Regardless",

		"regards",

		"regeneration",

		"region",

		"register",

		"regulation",

		"reinvented",

		"relation",

		"relations",

		"relationship",

		"relying",

		"remain",

		"reorganization",

		"reorganized",

		"reportedly",

		"representation",

		"repressive",

		"reproducing",

		"reproduction",

		"retain",

		"retains",

		"rhetorics",

		"Rog",

		"role",

		"roots",

		"ruling",

		"s",

		"same",

		"Sandi",

		"Santiago",

		"scene",

		"see",

		"sees",

		"sense",

		"separated",

		"separating",

		"Serbia",

		"serving",

		"she",

		"should",

		"significance",

		"similar",

		"Since",

		"Slater",

		"Slovenia",

		"so",

		"social",

		"societies",

		"society",

		"socio",

		"sorts",

		"space",

		"speak",

		"specific",

		"stance",

		"state",

		"still",

		"strategies",

		"strategy",

		"strives",

		"structural",

		"structuralist",

		"structurally",

		"structure",

		"subjected",

		"subjecting",

		"subjects",

		"subversive",

		"such",

		"supernarrative",

		"surpass",

		"surplus",

		"system",

		"takes",

		"taking",

		"Tatlić",

		"temporal",

		"text",

		"texts",

		"than",

		"that",

		"Thatcher",

		"THE",

		"their",

		"then",

		"theoretical",

		"theory",

		"therefore",

		"these",

		"this",

		"those",

		"though",

		"through",

		"title",

		"to",

		"today",

		"topics",

		"total",

		"towards",

		"transcend",

		"transcends",

		"transformation",

		"transforming",

		"transition",

		"treated",

		"treats",

		"try",

		"turning",

		"ultimately",

		"unbalanced",

		"Unconscious",

		"undergoing",

		"urban",

		"use",

		"utilization",

		"vagueness",

		"vast",

		"view",

		"viewed",

		"views",

		"Vilenica",

		"was",

		"way",

		"we",

		"wealth",

		"well",

		"West",

		"wherein",

		"whether",

		"which",

		"who",

		"whose",

		"will",

		"wish",

		"with",

		"within",

		"work",

		"world",

		"would",

		"yet",

		"Yugoslavia",

		"ZONES",

		"Šefik",

		"Žižek"

	];

	$("#filter").autocomplete({
			source: allWords
		});
  });
});







