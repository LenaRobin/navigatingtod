$(document).ready(function(){





//////////////////////////////////////////////////////////////////////////////////
////PUSH MENU ON THE LEFT
//////////////////////////////////////////////////////////////////////////////////
	$menuLeft = $('.pushmenu-left');
	$toggle_menu = $('.toggle_menu');

	$toggle_menu.click(function() {
		fadeOutSidenotes();
		$(this).toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$menuLeft.toggleClass('pushmenu-open');
		$(this).toggleClass('close_menu');
		$('.pushmenu-push').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
			alignSidenotes();
			alignVertically();
		});
		fadeInSidenotes();
	});


////ON LOAD OPEN THE TOC
	// fadeOutSidenotes();
	$toggle_menu.toggleClass('active');
	$('.pushmenu-push').toggleClass('pushmenu-push-toright');
	$menuLeft.toggleClass('pushmenu-open').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
		alignSidenotes();
		alignVertically();
	});
	$toggle_menu.toggleClass('close_menu');
	fadeInSidenotes();


//////////////////////////////////////////////////////////////////////////////////
////SCROLL PROGRESSION BARS
//////////////////////////////////////////////////////////////////////////////////

////ASSIGN IDS FOR ID TITLES AND SUBTITLES
	var nr = 1;
	$('.horizScroll').each(function() {
		$(this).attr('id', 'title'+nr);
		nr++;
	});

	var x = 1;
	$('.subScroll').each(function() {
		$(this).attr('id', 'subtitle'+x);
		x++;
	});

////VERTICAL SCROLL BAR 
	$(window).scroll(function() {
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();					// height of scroll on top (=0)
        var bottom = $(document).height() - windowHeight;			// heigth from top at the end of doc
        var verticalBar = (scrollTop / bottom)*windowHeight;
		var windowWidth = $(window).width(); // WIDTH OF THE WINDOW SCREEN
		var titleWidth = ((20/100)*windowWidth);	//TITLE WIDTH
		// var subtitleWidth = titleWidth*(90/100);				//SUBTITLE WIDTH
		var n = 1;
		var y = 1;
        $("#menu_bar_scroll").css('height', verticalBar);

////////CREATES THE HORIZONTAL PROGRESSION
////////SCROLL BARS IN THE MENU (CHAPTERS LEVEL 1)
		$('.section').each(function(){
			$('#title'+n).each(function(){
				var a = $('#chapter'+n).offset().top;
				var b = $('#chapter'+n).height();
				var c = scrollTop - a; // POSITION AT WHICH TO START SCROLL
				var f = (c / b) * titleWidth; // SUBSTITUTE OR CALCULATE E ABOVE FOR ANY DESIRED WIDTH OF THE SCROLL BAR
				
				$(this).css('width', f);
			});

////////////LAST TITLE SCROLLBAR (WAS MISSING THE LAST BIT, WHICH EQUALED TO THE HEIGHT OF THE WINDOW)
			var lastHeight = $('#chapter7').height()-windowHeight;
			var lastTop = $('#chapter7').offset().top;
			var lastStartScroll = scrollTop - lastTop;
			var lastWidth = (lastStartScroll/lastHeight)*titleWidth;
			$('#title7').css('width', lastWidth);
			n++;
		});

////////SAME FOR SUBCHAPTERS
		$('.subchapter').each(function(){
			$('#subtitle'+y).each(function(){
				var subchapterTop = $('#subchapter'+y).offset().top;
				var subchapterBottom = $('#subchapter'+y).height();
				var subScrollTop = scrollTop - subchapterTop;
				var subScrollBar = (subScrollTop / subchapterBottom) * subtitleWidth;
				$(this).css('width', subScrollBar);
				y++;
			});
		});
////////HIDE REFERENCE POP-UP BOXES ON SCROLL
		$('.tip').css('display','none');
     });


/////////////////////////////////////////////////////////////////////////////////////////////////////
////SEARCH FUNCTION
/////////////////////////////////////////////////////////////////////////////////////////////////////
	var maxCount;
	var counter = 0;

////CANCEL SEARCH AND REMOVE HIGHLIGHTING
	function cancelSearch() {
		$('.highlight').each(function() {
			var par = $(this).parent();
    		$(this).contents().unwrap();
    		par[0].normalize();
    	});
    	$('.search-notfound').removeClass('search-notfound');
    	$("#filter-count").hide();
    	$('#buttons_wrapper').hide();
    	$('#search_ui').hide();
	};

////////ON ENTER CLEAR RESULTS, THEN GO TO THE FIRST NEW INSTENCE
	$('#filter').keypress(function(e){
		if(e.keyCode == 13){
			counter = 0;
	    	e.preventDefault();
			cancelSearch();
			searchAndHighlight();
			// $('#hit0').offset('top', 50);
			location.href="#hit0";
			$("#filter-count").show().text('Hit '+(counter+1)+'/'+(maxCount+1));
	    	$('#next').focus();
	        $('#hit0').css('background-color', 'yellow');
		}
	});		

////////ON ESC EXIT THE SEARCH
	// $('#filter').keyup(function(e){
	// 	if (e.keyCode == 27){
	// 		console.log('vubhjkn');
	// 		cancelSearch();
	// 		clearAllHighlights();
	// 		$(this).blur();
	// 	}
	// });


	$(document).keyup(function(e){
		if (e.keyCode == 27){
			// console.log('vubhjkn');
			cancelSearch();
			$('#filter, #next, #prev').blur();
		}
	});

////ON SHIFT+ENTER GO TO TH PREVIOUS INSTANCE
	$(document).bind('keydown', 'Shift+return', function() {
	    // console.log("You pressed shift + enter");
    	if(counter > 0){
    		counter--;
    	}else{
    		counter = maxCount;
    	}
    	
    	location.href="#hit"+counter;
    	$('#next').focus();
    	$("#filter-count").show().text('Hit '+(counter+1)+'/'+(maxCount+1));
    	$('#hit'+counter).css('background-color', 'yellow');
    	$('#hit'+(counter+1)).css('background-color', '#BFBFBF');
    	return false;
	});


	function searchAndHighlight() {
////////IF THE ELEMENT DOES NOT CONTAIN THE TEXT PHRASE FADE IT OUT
		$('.section > h2, .section > p, .section > ol > li, .section > span, .subchapter > h3, .subchapter > p, .subchapter > ol > li, .subchapter > span, blockquote > *, .references > h3, .references > p, #toc_wrapper  h2  a, #toc_wrapper > h3 > a, .btn-default, .author, .toc_author').each(function(){
				var filter = $('#filter').val().toLowerCase();
			if ($(this).text().toLowerCase().indexOf(filter) >= 0) {
				$(this).removeClass('search-notfound');
				$(this).addClass('search-found');

				$(this).unhighlight();	
        		$(this).highlight(filter); // <-- wordsOnly: false if looking for exact words
			} else {
				$(this).addClass('search-notfound');
				$(this).removeClass('search-found');
			}


 ////////HIDE CANCEL BUTTON WHEN NO INPUT
			if (0 < filter.length) {
				$('#search_ui').css('display', 'block');
				$('#buttons_wrapper').css('display', 'block');
			} else {
				$('#search_ui').css('display', 'none');
				$('#buttons_wrapper').css('display', 'none');
			}

////////HIDE CANCEL BUTTON WHEN CLICKED
			$('#search_ui').click(function() {
				$(this).css("display", "none");
				$('#buttons_wrapper').css('display', 'none');
				$("#filter").val('');
				cancelSearch();
			});
		});

////////GENERATE IDs FOR ALL HIGHLIGHTED HITS
        $('.highlight').each(function(number) {
        	maxCount = number;
       		// $("#filter-count").show().text(maxCount + " results");
        	$(this).attr('id', 'hit'+number);
        });
	}	

////////GET THE NUMBER OF HITS
    function getHitCount() {
    	var i=0;
		while ($('#hit'+i).length) {
			i++;
		} 
    	return i;
    }
////////GO TO THE NEXT INSTANCE
    function toNext(n){
    	counter = n;
    	if(counter < maxCount){
    		counter++;
    	}else{
    		counter = 0;
    	}
    	location.href="#hit"+counter;
    	$("#filter-count").show().text('Hit '+(counter+1)+'/'+(maxCount+1));
    	$('#next').focus();
        $('#hit'+counter).css('background-color', 'yellow');
       	$('#hit'+(counter-1)).css('background-color', '#BFBFBF');
    }

    $('#next').click(function() {
    	toNext(counter);
    });

////ON CLICK GO TO THE PREVIOUS INSTANCE
    function toPrev(n) {
    	counter = n;
    	if(counter > 0){
    		counter--;
    	}else{
    		counter = maxCount;
    	}
    	location.href="#hit"+counter;
    	$("#filter-count").show().text('Hit '+(counter+1)+'/'+(maxCount+1));
    	$('#prev').focus();
    	$('#hit'+counter).css('background-color', 'yellow');
    	$('#hit'+(counter+1)).css('background-color', '#BFBFBF');
    	// exitSearch();
    }

    $('#prev').click(function() {
    	toPrev(counter);
    });
		 

////ARRAY OF ALL THE UNIQUE WORDS FOR AUTOCOMPLETE
	var someWords = allWords
	var allWords = ["20th", "21st", "a", "ability", "about", "above", "Abram", "abstraction", "actions", "actors", "add", "addresses", "administrative", "aesthetic", "against", "Agency", "all", "alliance", "also", "although", "America", "an", "Ana", "analyses", "analysis", "analyzing", "AND", "another", "antagonize", "Antonio", "apartheids", "apparatus", "are", "areas", "art", "as", "aspiration", "assumes", "at", "attack", "attention", "author", "Autonomy", "be", "beginning", "Beller", "Berry", "between", "beyond", "biopolitical", "bloc", "Britain", "broader", "but", "by", "called", "CAPITAL", "capitalism", "capitalist", "carried", "Castro", "category", "centrality", "centre", "century", "certain", "change", "Chapter", "character", "characterized", "city", "class", "co", "cognitive", "cognitivities", "Collective", "colonial", "coloniality", "commodification", "commodified", "concept", "concepts", "concludes", "connection", "constitute", "contained", "contemporary", "context", "contribute", "control", "cooperation", "corpus", "creative", "CREATIVITY", "critical", "critically", "criticism", "criticizes", "critique", "culture", "current", "currently", "cusing", "dealing", "deals", "decolonialist", "defining", "degree", "democracies", "democracy", "democratic", "depoliticization", "derogation", "detects", "detriment", "devastating", "devastation", "dichotomy", "dictated", "different", "discourse", "discourses", "distinctive", "distribution", "division", "divisions", "does", "domain", "domains", "dominant", "domination", "economy", "editors", "effects", "elites", "Emmelheinz", "emphasizing", "Empire", "encompassed", "end", "Engaged", "engagement", "engineering", "entire", "entitled", "environments", "epistemological", "equal", "era", "establish", "establishes", "establishment", "ethnic", "ethnicity", "ethnocentric", "European", "Even", "exist", "expand", "exploitation", "extent", "Factory", "faire", "feature", "fiction", "figure", "financial", "First", "fo", "focus", "focused", "for", "Fordist", "form", "former", "forms", "Foucault", "framework", "free", "from", "function", "functional", "general", "generally", "gentrification", "Geography", "ghettoized", "global", "goes", "Gomez", "Gordana", "GRAY", "great", "guided", "Gómez", "Hardt", "has", "he", "hegemonic", "hegemony", "help", "heterogeneous", "hierarchies", "historical", "historicization", "huge", "idea", "ideological", "ideologies", "Image", "implies", "imposition", "impotence", "impotent", "in", "include", "industries", "initial", "instances", "institutions", "interpretation", "interpretations", "into", "Introduction", "introductory", "invested", "involved", "Irmgard", "is", "it", "its", "itself", "James", "Jonathan", "Josephine", "Lacan", "laissez", "large", "Latin", "led", "Leger", "legitimization", "level", "links", "Ljubljana", "locates", "logic", "logics", "longer", "Machine", "mainstream", "maintaining", "majority", "manner", "Marc", "market", "mass", "meaning", "mentioned", "merely", "Mexico", "Michael", "Missing", "model", "modern", "modernity", "modernization", "modernized", "monopoly", "most", "name", "nation", "necessary", "necessity", "needs", "Negri", "neoliberal", "Neoliberalism", "networked", "neutralization", "Neutralizing", "New", "niche", "Nikolić", "no", "normative", "not", "nullity", "obscene", "occupies", "occurs", "OF", "on", "only", "opposite", "optation", "or", "organization", "organizing", "Other", "out", "pan", "paradigm", "paradigmatic", "part", "partnership", "parts", "perception", "period", "periods", "periphery", "perpetuation", "perspective", "place", "plays", "point", "points", "political", "politically", "politicized", "politics", "popular", "position", "positioning", "positions", "post", "postfordist", "Postmodern", "power", "practices", "preceding", "precisely", "preparation", "presented", "primarily", "principles", "private", "privileges", "process", "processes", "produce", "producing", "production", "professional", "profit", "progress", "proponents", "psychoanalytic", "public", "publication", "publications", "racial", "radical", "radically", "rationalization", "reconfiguring", "reduced", "refer", "reflection", "Regardless", "regards", "regeneration", "region", "register", "regulation", "reinvented", "relation", "relations", "relationship", "relying", "remain", "reorganization", "reorganized", "reportedly", "representation", "repressive", "reproducing", "reproduction", "retain", "retains", "rhetorics", "Rog", "role", "roots", "ruling", "s", "same", "Sandi", "Santiago", "scene", "see", "sees", "sense", "separated", "separating", "Serbia", "serving", "she", "should", "significance", "similar", "Since", "Slater", "Slovenia", "so", "social", "societies", "society", "socio", "sorts", "space", "speak", "specific", "stance", "state", "still", "strategies", "strategy", "strives", "structural", "structuralist", "structurally", "structure", "subjected", "subjecting", "subjects", "subversive", "such", "supernarrative", "surpass", "surplus", "system", "takes", "taking", "Tatlić", "temporal", "text", "texts", "than", "that", "Thatcher", "THE", "their", "then", "theoretical", "theory", "therefore", "these", "this", "those", "though", "through", "title", "to", "today", "topics", "total", "towards", "transcend", "transcends", "transformation", "transforming", "transition", "treated", "treats", "try", "turning", "ultimately", "unbalanced", "Unconscious", "undergoing", "urban", "use", "utilization", "vagueness", "vast", "view", "viewed", "views", "Vilenica", "was", "way", "we", "wealth", "well", "West", "wherein", "whether", "which", "who", "whose", "will", "wish", "with", "within", "work", "world", "would", "yet", "Yugoslavia", "ZONES", "Šefik", "Žižek"
	];

	
	var stopWords = ["a","able","about","above","abst","accordance","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didn't","different","do","does","doesn't","doing","done","don't","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasn't","have","haven't","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isn't","it","itd","it'll","its","itself","i've","j","just","k","keep","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldn't","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","who'll","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero"];

	var someWords = [];
	for (var i=0; i < allWords.length; i++) {
		word = allWords[i].toLowerCase();
		if (word.length < 3) {
			continue;
		}
		if (stopWords.indexOf(word) != -1) {
			continue;
		}
		someWords.push(word);
	}

	$("#filter").autocomplete({
		source: someWords
	});

//==========================================================================================
// END SCRIPT SEARCH
//==========================================================================================



////////////////////////
////POP-UP REFERENCE BOX
////////////////////////
	var a = 1;
	$('.references p').each(function(){
		$(this).attr('id', 'ref'+a);
		a++;
	});

	$(".in-text").each(function(){
		var n = $(this).data("dref");
		var t = $("#ref"+n).text();
		// $(this).data("ref": t, 
		$(this).attr({"data-toggle": "popover", "data-trigger": "focus", "data-content": t, "data-placement": "top", "href": "#0"}).addClass("button");
		// console.log(t);
	});
  	$('[data-toggle="popover"]').popover();

////DISPLAY REFERENCE BOX WHEN IN-TEXT REFEERENCE IS CLICKED
	// $(".in-text").click(function(ev) {		// for all events
	// 	ev.stopPropagation();				// go through layers
	// 	var info = $(this).data("ref");
	// 	var top = $(this).offset().top;
	// 	var left = $(this).offset().left;
	// 	$(".tip p").text(info);
	// 	$(".tip").css('display','block').offset({top: top - 30, left: left });
	// });

	// $('#x').click(function() {
	// 	$('.tip').css('display', 'none');
	// });

	// $("#main").click(function(){
	// 	$('.tip').css('display', 'none');
	// });


	// data-toggle="popover" data-trigger="focus" data-content


////////////////
////HEADER TOOLS
////////////////

	$('#search-button').click(function () {
	    $('#search-pannel').toggle();
	    $('#search-pannel').siblings().hide();
	});

	$('#files-button').click(function () {
	    $('#files-pannel').toggle();
	    $('#files-pannel').siblings().hide();
	});

	$('#print-button').click(function () {
	    $('#print-pannel').toggle();
	    $('#print-pannel').siblings().hide();
	});

	$('#copy-button').click(function () {
	    $('#copy-pannel').toggle();
	    $('#copy-pannel').siblings().hide();
	});

	$('#share-button').click(function () {
	    $('#share-pannel').toggle();
	    $('#share-pannel').siblings().hide();
	});

	$('#tools-button').click(function () {
	    $('#tools-pannel').toggle();
	    $('#tools-pannel').siblings().hide();
	});


	$('.close').click(function () {
	    $(this).parent().hide();
	});




////////////////
////CITATION BOX
////////////////

////GENERATE ID TO p
	$('.section p').not('.references p').each(function(number){
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

////////SPAN AROUND SELECTED TEXT
	    selection_text = span.textContent.substr(0, 1);
	    if (selection) {
		    var range = selection.getRangeAt(0);
		    range.insertNode(span);
		}
	// });

////ON CLICK GET ALL THE DATA FROM PARENT ELEMENT AND GENERATE THE
////CITING REFERENCE IN THREE DIFFERENT STYLES
	// $('#cite').click( function() {
		span.className = "qwertz";		//ADD CLASS TO SPAN ON CLICK
		var par = $('.qwertz').closest('p').attr('id');		//GET ID OF PARENT p
		if (par) {
			var blaaa = par.substr(1, 3);
		}
	  	var ref_article = $('.qwertz').closest('.section').attr('data-article');

	    var ref_authorName = $('.qwertz').closest('.section').attr('data-authorName');
	    if (ref_authorName) {
		    var ref_apaAuthorName = ref_authorName.substr(0, 1);
		}
	    var ref_intro = $('.qwertz').closest('.section').attr('data-authorName');
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


		// $('#mla').html("Nikolić, Gordana and Tatlić Šefik"+", "+"<i>"+ref_title+"</i>" 
		//     +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");

				
		if (blaaa < 15) {
			$('#mla').html("Nikolić, Gordana and Tatlić Šefik"+", "+"<i>"+ref_title+"</i>" 
		    +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");

////////////CHICAGO STYLE
		    $('#chicago').html("Nikolić, Gordana &amp; Tatlić Šefik"+". '"+ref_article+".' In "+"<i>"+ref_title+"</i>"
		    +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");

////////////APA STYLE
		    $('#apa').html("Nikolić, G., Tatlić Š."+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+"<i>"+ref_title+"</i>"
		    +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
		} else {
////////////MLA STYLE 
		    $('#mla').html(ref_authorLastName +", "+ref_authorName+". '"+ref_article+", "+"<i>"+ref_title+"</i>" 
		    +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");

////////////CHICAGO STYLE
		    $('#chicago').html(ref_authorLastName+", "+ref_authorName+". '"+ref_article+".' In "+"<i>"+ref_title+"</i>"
		    +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");

////////////APA STYLE
		    $('#apa').html(ref_authorLastName +", "+ ref_apaAuthorName+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+"<i>"+ref_title+"</i>"
		    +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
		}
	});


////////////////////////////////
////CLICKING COPIES THE CITATION
////TO THE CLIPBOARD////////////
////////////////////////////////
	var clipboard = new Clipboard('.full-citation');

////DISPLAY CONFIRMATION AT COPY
	$('.full-citation').click(function() {
		$(this).prev().append('<span class="confirmation">Copied!</span>');
	    $('.confirmation').fadeOut(3000);
	});

	clipboard.on('error', function(e) {
	    $('.full-citation').prev().append('<div class="confirmation"><br/>Error!</div>');
	});

//////////////////////
////SHOW/HIDE KEYWORDS
//////////////////////
	var keywords = ['capitalism', 'capital', 'creativity', 'art', 'contemporary', 'culture', 'ideological', 'social', 'labor', 'attention', 'image', 'production', 'capitalism', 'art', 'state', 'life', 'public', 'city', 'economics', 'production', 'development', 'art', 'social', 'avant-garde', 'world', 'big', 'Other', 'art', 'urban', 'cultural', 'project', 'creativity', 'Belgrade', 'Rog', 'capital', 'creative', 'collective', 'urban', 'factory', 'gentrification', 'art', 'political', 'social', 'culture', 'autonomy', 'public', 'work'];

	$('.btn-default').each(function(m){
		$('#keyword_toggle'+m).each(function() {
			$(this).click(function() {
				// console.log(keywords[m]);

				$(this).button('toggle');
				if ($(this).hasClass('active')) {
					$(this).closest('.section').highlight(keywords[m], {element: 'span', className: keywords[m], wordsOnly: true});
				} else {
					$(this).closest('.section').unhighlight({element: 'span', className: keywords[m], wordsOnly: true});	
				}
			});
			
		});
		
	});



////////////////////
////ARROW NAVIGATION
////////////////////
	// var toppyDiv = 0;
	// var sValues = [];
	// var counter = 0;

	// $('.section').each(function () {
	//     var scrValue = $(this).offset().top;
	//     sValues.push(scrValue);
	//     $(this).attr("data-scroll", scrValue);
	// });

	// $(".nav-tabs h2 a").each(function(ind){
	//     $(this).attr("id", "hid"+(ind+1)); 
	//     $(this).attr("data-scr", sValues[ind]);
	// });

	// $(".nav-tabs h2 a").on('click', function(e){
	//     e.preventDefault();
	//     var number = $(this).attr("data-scr");
	//     var index = $(this).attr("id");
	//     scrollIt(number, index);
	// });

	// function scrollIt(number, index){
	//     $('html, body').animate({
	//             scrollTop: number })    
	//     }

	// $("#down").on('click', function (e){
	//     e.preventDefault();
	//     if(counter >= sValues.length - 1){
	//     $(this).css("display","none");
	//   	}else{
	//       $(this).css("display","block");
	//   	}

 //    	if($('.current').next('div.section').length > 0) {
 //            var $next = $('.current').next('.section');
 //            var top = $next.offset().top;
 //            $('.current').removeClass('current toppy');
 //            $(function () {
 //                $next.addClass('current toppy');
 //                $('html, body').animate({
	//                 scrollTop: top
 //                });
 //            });
	          
 //        }else{
 //            if(counter == 0){
 //                var $next = $('.section:first');
 //                var top = $next.offset().top ;
 //                $(function () {
 //                    $next.addClass('current toppy');
 //                    $('html, body').animate({
 //                        scrollTop: top
 //                    });
 //                });	                
 //            }     
 //        }
	//     counter++;
	// });

	// $("#up").on('click', function (e){
	//     e.preventDefault();
	//     console.log(counter);
	//     if(counter > sValues.length) {
	//     	$(this).css('display', 'none');
	// 	}else{
	// 		$(this).css('display', 'block');
	// 	}
	//     $("#down").css("display","block");
	//     if( $('.current').prev('.section').length){
	//         var $prev = $('.current').prev('.section');
	//         var top = $prev.offset().top;

	//         $('.current').removeClass('current toppy');

	//         $(function () {
	//           $prev.addClass('current toppy');
	//             $('html, body').animate({
	//                 scrollTop: top
	//             }, 'slow');
	//          });
	//     }else{
	//          $('.current').removeClass('current');
	//         $('html, body').animate({
	//                 scrollTop: 0
	//             }, 'slow');
	//     }
	//     counter--;
	// });


	// function hideShowLinks() {
	//     $('.section').each(function (k, v) {
	//         var self = $(this);
	//         if (self.hasClass('toppy')) {
	//             toppyDiv = k;
	//         }
	//     });
	// }

	// $(window).scroll(function () {
	//     hideShowLinks();
	// });




/////////////
////SIDENOTES
/////////////

////PUTS FOCUS ON THE SIDENOTE THAT IS CLICKED


////FOCUS ON RESPECTIVE SIDENOTE WHEN ANCHOR CLICKED
// $('.footnoteRef').each(function(){
	$('a sup').click(function(ev){
		// var numbr = $(this).attr('href').substr(3, 4);
		var numbr = $(this).text();
		var aidee = $('#fn'+numbr);
		ev.stopPropagation();
		ev.preventDefault();
		// $('#fn'+numbr).effect('bounce',{times: 1}, 'slow');
		$('#fn'+numbr).effect('highlight', 2000);
		// $(this).css({opacity: 1, 'z-index': 99999999999});
		// aidee.addClass('focusSidenote');
		// aidee.siblings().removeClass('focusSidenote');
	});


	function fadeOutSidenotes() {
		$('.sidenote').animate({
			opacity: 0,
			left: '+=40px'},
			100);
	}

	function fadeInSidenotes() {
		$('#menu_bar').fadeToggle(function(){
			$('.sidenote').animate({
				opacity: 1,
				left: '-=40px'},
				2000);
		});
	}


////SIDENOTES BECOME TIP BOXES IF SCREEN IS SMALL, AND THEY ARE CENTERED
	function sideToBox() {
		if ($(window).width() <= "700") {	//SUBSTITUTE '400' WITH THE DESIRED MINIMUM SIZE
			$("a sup").each(function(){
				var n = $(this).text();
				console.log('n: '+n);
				var t = $("#fn"+n).text();
				$(this).parent().attr({"data-toggle": "popover", "data-trigger": "focus", "data-content": t, "data-placement": "top", "href": "#0"}).addClass("button");
				console.log('t: '+t);
			});

		  	$('[data-toggle="popover"]').popover();
		} else {
			$('.footnoteRef').popover('destroy');
		}
	}

////MAKES FOOTNOTES SIDENOTES
	function alignSidenotes() {
		// tic = 1;
		// tops = [];
		$('.sidenote').each(function(tic){
			$('#fn'+tic).each(function(){
				//
				// $(this).css("opacity", 0);
				var anchorposition = $('#fnref'+tic).offset().top;
				// var b = "'";
				// var c = anchorposition.toString();
				// var d = 'px';
				// var a = b.concat(c, b, d);
				// tops.push(anchorposition);
				//console.log('first: '+$('#fn58').offset().top);
				//console.log(tops[tic-1]);
				 //$(this).animate({top: tops[tic-1] });
				$(this).offset({top: anchorposition});
				// console.log('tic '+tic+': '+anchorposition);
				// tic++;
				//$(this).fadeIn(100);
				// $(this).animate({"opacity": 1}, 2000);
			});
		});
	}
	
	

////ALIGN SIDENOTES VERTICALL SO THEY DON'T OVERLAP
	function alignVertically() {
		$('.sidenote').each(function(count){
			$('#fn'+count).each(function() {
				
				var sideTop = $(this).offset().top;
				// var sideTop = tops[count-1];
				var sideBottom = sideTop+$(this).height();
				var newHeight = (sideBottom+5);
				var sideNext = $('#fn'+(count+1));
				if (sideNext) {
					var sideNextTop = sideNext.offset().top;
				}
				// function hideThem() {
				// 	$('#fn'+(count+1)).hide();
				// }
				// console.log(newHeight);
				if ((sideBottom-sideNextTop) > 0) {
					// $(this).css("opacity", 0);
					// $('#fn'+(count+1)).animate({top: newHeight}, 2000);
					$('#fn'+(count+1)).offset({top: newHeight});
					 // console.log('count '+(count+1)+': '+newHeight);
					 // tops[count]= newHeight;
					 // $(this).animate({"opacity": .5}, 3000);
				// } else {
				// 	$('#fn'+count).offset({top: sideTop});
				}
				//console.log('second: '+$('#fn58').offset().top);
			});
		});
	}
	
	sideToBox();



		
		// $('.pushmenu-push').toggleClass('pushmenu-push-toright');
		// $menuLeft.toggleClass('pushmenu-open');
		
		// $('.pushmenu-push').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {alignSidenotes(function() {alignVertically();});});
		// $('#menu_bar').fadeToggle();


	// alignVertically();



////WHAT IS THIS? o_O
// var keepHeight = $(window).scrollTop();



/*///////////////////////
ON RESIZE DO THESE THINGS
///////////////////////*/
	$(window).resize(function() {
////////ALIGNS SIDENOTES ON WINDOW RESIZE
		fadeOutSidenotes();
		sideToBox();
		alignSidenotes();
		alignVertically();
		fadeInSidenotes();
		console.log($('.sidenote').offset().left);
	});


////////////////////
////CHANGE FONT SIZE
////////////////////

////DECREASE FONT SIZE AND ALIGN SIDENOTES
	$('#button2').click(function(){
		fadeOutSidenotes();
		var fontSize = parseInt($(".section").css('font-size'));
        $('.section').animate({'font-size': '-=1'}, function() {
        	alignSidenotes();
        	alignVertically();
        });
		fadeInSidenotes();
	});

////INCREASE FONT SIZE AND ALIGN SIDENOTES
	$('#button1').click(function(){
		fadeOutSidenotes();
		var fontSize = parseInt($(".section").css('font-size'));
        $('.section').animate({'font-size': '+=1'}, function() {
        	alignSidenotes();
        	alignVertically();
        });
		fadeInSidenotes();
	});



}); // <-- document ready














