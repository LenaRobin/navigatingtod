$(document).ready(function(){
    //////////////////////////////////////////////////////////////////////////////////
    ////PUSH MENU ON THE LEFT
    //////////////////////////////////////////////////////////////////////////////////
    $('.toggle_menu_right').on('mouseenter', function() {
        if ($(window).width() >= "768") {
            var window_width = $(window).width();
            var menu_wrapper_width = $('#menu-right-wrapper').outerWidth();
            var menu_right_width = $('#menu-right').outerWidth();
            var padding_left = parseInt($('#menu-right').css('padding-left').replace('px', ''));
            var correct_distance = menu_right_width - padding_left;
            var initial_offset = Math.floor($('#menu-right-wrapper').offset().left);
            if (Math.floor($('#menu-right-wrapper').offset().left) >= window_width) {
                // $('#menu-right').animate({left: +correct_distance});
                // $('#toggle_menu_right').animate({offset: '50px'});
                // $('#menu-right').animate({left: -menu_wrapper_width});
                $('#menu-right').animate({left: 1});
            } 
            // else {
                // $('#menu-right').animate({left: 0});
                // $('#toggle_menu_right').animate({width: '50px'});
                // $('#menu-right').animate({left: + menu_wrapper_width});
            // }
        }
    });

    $('.toggle_menu_right').on('click', function() {
        if ($(window).width() >= "768") {
            var window_width = $(window).width();
            var menu_wrapper_width = $('#menu-right-wrapper').outerWidth();
            var menu_right_width = $('#menu-right').outerWidth();
            var padding_left = parseInt($('#menu-right').css('padding-left').replace('px', ''));
            var correct_distance = menu_right_width - padding_left;
            var initial_offset = Math.floor($('#menu-right-wrapper').offset().left);
            if (Math.floor($('#menu-right-wrapper').offset().left) < window_width) {
                $('#menu-right').animate({left: +correct_distance+1});
                // $('#toggle_menu_right').animate({offset: '50px'});
                // $('#menu-right').animate({left: -menu_wrapper_width});
            } 
            // else {
            //     $('#menu-right').animate({left: 0});
            //     // $('#toggle_menu_right').animate({width: '50px'});
            //     // $('#menu-right').animate({left: + menu_wrapper_width});
            // }
        }
    });






////ON CLICKING THE TOGGLE THAT OPENS THE MENU
    $toggle_menu = $('.toggle_menu');
    $toggle_menu.click(function() {
        if ($(window).width() <= "480") {
            var menu_width = $('#toc_wrapper').width();
            // console.log($('#menu').offset().left);
            if ($('#menu').offset().left == 0) {
                $('#menu').animate({left: -menu_width});
            } else {
                $('#menu').animate({left: 0});
            }
        } else {
            var menu_width = $('#toc_wrapper').width();
            console.log($('#menu').offset().left);
            if ($('#menu').offset().left == 0) {
                $('#menu').animate({left: -menu_width});    
            } else {
                $('#menu').animate({left: 0});
            }
            $('#menu_bar').fadeToggle(1000);
            $('#content, .footer').toggleClass('col-lg-offset-0', 'col-lg-offset-1');
            $('#content, .footer').toggleClass('col-md-offset-0', 'col-md-offset-1');
            $('#content, .footer').toggleClass('col-sm-offset-0', 'col-sm-offset-1');
        }
    });

////ROTATE THE MENU-LEFT ARROW
    $toggle_menu.toggle(function() {
      $('.fa-chevron-left').rotate({ endDeg:180, persist:true, duration:0.3 });
    }, function() {
      $('.fa-chevron-left').rotate({ endDeg:360, duration:0.3 });
    });

////ANIMATE SIDENOTES AND STUFF
    $('#content').animate({
        opacity: 1
    }, 1500, function() {
        alignSidenotes();
        alignVertically();
        fadeInSidenotes();
    });

////ON LOAD OPEN THE TOC IF SMALLER
    if ($(window).width() <= "480") {
        var menu_width = $('#toc_wrapper').width();
        $('#menu').css({left: -menu_width});
    }



//////////////////////////////////////////////////////////////////////////////////
////SCROLL PROGRESSION BARS
//////////////////////////////////////////////////////////////////////////////////
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
////////////////////////
////ON SCROLL HAPPENINGS
////////////////////////
    $(window).scroll(function() {
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();					// height of scroll on top (=0)
        var bottom = $(document).height() - windowHeight;			// heigth from top at the end of doc
        var verticalBar = (scrollTop / bottom)*windowHeight;
        // var subtitleHeight = titleHeight*(90/100);				//SUBTITLE WIDTH
        var n = 1;
        var y = 1;
        $("#menu_bar_scroll").css('height', verticalBar);
 

////////MENU TITLE SCROLLBARS
        $('.section').each(function(){
            $('#title'+n).each(function(){
                var titleHeight = $(this).parent().outerHeight();
                var a = $('#chapter'+n).offset().top;
                var b = $('#chapter'+n).height();
                var c = scrollTop - a; // POSITION AT WHICH TO START SCROLL
                var f = (c / b) * titleHeight; // SUBSTITUTE OR CALCULATE E ABOVE FOR ANY DESIRED WIDTH OF THE SCROLL BAR

                $(this).css('height', f);

                if ($(this).height() > 0) { 
                    $(this).parent().css('color', 'black');
                } else {
                    $(this).parent().css('color', '#8e8e8e');            
                }
            });

////////////ADD WINDOW HEIGHT TO THE LAST TITLE
            var lastTitleHeight = $('#title7').parent().outerHeight();
            var lastHeight = $('#chapter7').height()-windowHeight;
            var lastTop = $('#chapter7').offset().top;
            var lastStartScroll = scrollTop - lastTop;
            var lastHeight = (lastStartScroll/lastHeight)*lastTitleHeight;
            $('#title7').css('height', lastHeight);
            n++;
        });

////////KEEP THIS IN CASE WE HAVE OR WANT SUBTITLES
        // $('.subchapter').each(function(){
        //     $('#subtitle'+y).each(function(){
        //         var subchapterTop = $('#subchapter'+y).offset().top;
        //         var subchapterBottom = $('#subchapter'+y).height();
        //         var subScrollTop = scrollTop - subchapterTop;
        //         var subScrollBar = (subScrollTop / subchapterBottom) * subtitleHeight;
        //         $(this).css('height', subScrollBar);
        //         y++;
        //     });
        // });           

        // var first_section = $('.section:first').offset().top;
        // if (scrollTop <= first_section) {
        //     $('#up').css('color', 'grey');
        // } else {
        //     $('#up').css('color', 'red');
        //     // $('#down').show();
        // }

        // var last_section = $('.section:last').offset().top;
        // if (scrollTop >= last_section) {
        //     $('#down').css('color', 'grey');
        // } else {
        //     $('#down').css('color', 'red');
        //     // $('#down').show();
        // }

////////HIDE SELECTION MENU ON SCROLL
        $('#asd, .delete-underline').fadeOut('3000');

////////UPDATE SCROLLTOP
        S = $(window).scrollTop();
        P = S/H;
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
            location.href="#hit0";
            $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
            $('#next').focus();
            $('#hit0').css('background-color', 'yellow');
        }
    });		

////ON <ESC> CANCEL SEARCH AND BRING TEXT BACK TO NORMAL
    $(document).keyup(function(e){
        if (e.keyCode == 27){
            cancelSearch();
            $('#filter, #next, #prev').blur();
        }
    });

////ON SHIFT+ENTER GO TO TH PREVIOUS INSTANCE
    $(document).bind('keydown', 'Shift+return', function() {
        if(counter > 0){
            counter--;
        }else{
            counter = maxCount;
        }

        location.href="#hit"+counter;
        $('#next').focus();
        $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
        $('#hit'+counter).css('background-color', 'yellow');
        $('#hit'+(counter+1)).css('background-color', '#BFBFBF');
        return false;
    });

////THE 'SEARCH'
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

////////////HIDE CANCEL BUTTON WHEN NO INPUT
            if (0 < filter.length) {
                $('#search_ui').css('display', 'block');
                $('#buttons_wrapper').css('display', 'block');
            } else {
                $('#search_ui').css('display', 'none');
                $('#buttons_wrapper').css('display', 'none');
            }

////////////HIDE CANCEL BUTTON WHEN CLICKED
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
        $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
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
        $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
        $('#prev').focus();
        $('#hit'+counter).css('background-color', 'yellow');
        $('#hit'+(counter+1)).css('background-color', '#BFBFBF');
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
////AUTOCOMPLETE
    $("#filter").autocomplete({
    	source: someWords
    });



////////////////////////
////POP-OVER REFERENCE BOX
////////////////////////
    var a = 1;
    $('.references p').each(function(){
        $(this).attr('id', 'ref'+a);
        a++;
    });

    $(".in-text").each(function(){
        var n = $(this).data("dref");
        var t = $("#ref"+n).text();
        $(this).attr({"data-toggle": "popover", "data-trigger": "focus", "data-content": t, "data-placement": "top", "href": "#0"}).addClass("button");
    });

////////////////
////CITATION BOX
////////////////

////GENERATE ID TO p
    $('.section p').not('.references p').each(function(number){
        $(this).attr("id", "p"+(number+1));
    });

    $('.section').mousedown(function() {
        $('.qwertz').remove();
    });

////ON MOUSEUP GET SELECTION AND DO THINGS TO IT
    var selection;
    var selection_text;

    $('.section').mouseup(function(e){
        selection = document.getSelection().getRangeAt(0); //MAKE THIS WORK ON EVERY BROWSER
        selection_text = selection.toString();
        var scrollTop = $(window).scrollTop();
        var clickTop = e.pageY-scrollTop;
        var asd_height = $('#asd').outerHeight();
        console.log(selection);
        if (selection_text.length > 0 ) {
            if (clickTop >= asd_height) {
                clickTop -=asd_height;
            }
            var left = e.pageX;
            $("#asd").css('display','block').css({top: clickTop, left: left});

////////////HIDE/SHOW UNHIGHLIGHT IF SELECTED AREA HAS HIGHLIGHT
            if (selection.commonAncestorContainer.children) {
                for (var i = 0; i < selection.commonAncestorContainer.children.length; i++ ) {
                  if (selection.commonAncestorContainer.children[i].classList[1] == 'underline') {
                    $('#erase').show();
                  }
                }
            } else if (selection.commonAncestorContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else if (selection.startContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else if (selection.endContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else {
                $('#erase').hide();
                console.log('parent-hide');
            }
        }

        var par = $(e.target).closest('p').attr('id');
        if (par) {
            var blaaa = par.substr(1, 3);
        }
        var ref_article = $('#'+par).closest('.section').attr('data-article');
        var ref_authorName = $('#'+par).closest('.section').attr('data-authorName');
        if (ref_authorName) {
            var ref_apaAuthorName = ref_authorName.substr(0, 1);
        }
        var ref_intro = $('#'+par).closest('.section').attr('data-authorName');
        var ref_authorLastName = $('#'+par).closest('.section').attr('data-authorLastName');
        var ref_title = $('meta[name="title"]').attr('content');
        var ref_eds = $('meta[name="editors"]').attr('content');
        var ref_apaEds = $('meta[name="apa-editors"]').attr('content');
        var ref_year = $('meta[name="year"]').attr('content');
        var ref_place = $('meta[name="place"]').attr('content');
        var ref_pub = $('meta[name="publisher"]').attr('content');
        var MLA_date_of_access = moment().format('D MMMM YYYY');
        var chicago_date_of_access = moment().format('MMMM D, YYYY');
        var url = $(location).attr('pathname');



////////IF IT IS THE FIRST CHAPTER (INTRODUCTION) CITE IN THIS WAY
        if (blaaa < 15) {
////////////MLA STYLE 
            $('#mla').html("Nikolić, Gordana and Tatlić Šefik"+", "+ref_title
                           +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");
////////////CHICAGO STYLE
            $('#chicago').html("Nikolić, Gordana &amp; Tatlić Šefik"+". '"+ref_article+".' In "+ref_title
                               +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");
////////////APA STYLE
            $('#apa').html("Nikolić, G., Tatlić Š."+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+ref_title
                           +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
////////OTHERWISE (NORMAL CHAPTERS) CITE IN THIS WAY
        } else {
////////////MLA STYLE 
            $('#mla').html(ref_authorLastName +", "+ref_authorName+". '"+ref_article+", "+ref_title 
                           +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");
////////////CHICAGO STYLE
            $('#chicago').html(ref_authorLastName+", "+ref_authorName+". '"+ref_article+".' In "+ref_title
                               +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");
////////////APA STYLE
            $('#apa').html(ref_authorLastName +", "+ ref_apaAuthorName+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+ref_title
                           +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
        }
    });


////DEFINE
    $('#lookup').click(function() {
        // $( "#loaded").load( "http://www.oxforddictionaries.com/definition/english/capital .entryPageContent" );
        window.open('http://www.oxforddictionaries.com/definition/english/' + selection_text); 
        $('#asd').fadeOut('3000');
    });

////HIGHLIGHT
    // $('#asd.btn-group-horizontal:nth-child(1)').click(function() {
    $('#highlight').click(function() {
        $('#content').wrapSelection({
            fitToWord: true
        }).addClass('underline');
        $('#asd').fadeOut('3000');
    });

////ERASE HIGHLIGHT
    $('#erase').click(function() {
        $('#content').wrapSelection({
            fitToWord: true
        }).addClass('remove_highlight');
        $('#asd').fadeOut('3000');
    });

////APPEND P-SPANS TO THE COLUMN
    $('.section p').each(function() {
        $('#par_numbr').append('<div class="p_number"></div>');
        $(this).addClass('paragraph');
    });

////ALIGN PARAGRAPH NRS TO THE ATUAL PARAGRAPHS
    function alignParagraphNumbers() {
        var p_id_number = 1;
        setTimeout(function(){
            $('.p_number').each(function() {
                $(this).attr('id', 'pnr'+p_id_number);
                $('#pnr'+p_id_number).each(function() {
                    var p_id = $('#p'+p_id_number);
                    if (p_id) {
                        var p_offset = $(p_id).offset().top;
                        $(this).offset({top: p_offset}).text(p_id_number);
                    }
                });
                p_id_number++;
            });
        }, 3000);
    }

    alignParagraphNumbers();


    $('#menu-right h4 a').each(function() {
        $(this).addClass('toggle_panel_button');
    });

////OPEN 'REFERENCE TOOL' PANEL ON SELECTION MENU 'REFERENCE THIS' CLICK
    $('#get-reference').click(function() {
        $("#collapse3").addClass('in').attr('aria-expanded', 'true').animate({height: '100%'}, 1000);
        $('.panel-collapse').not("#collapse3").removeClass('in').attr('aria-expanded', 'false').animate({height: 0}, 1000);;
        $('#cite').removeClass('collapsed').attr('aria-expanded', 'true');
        $('.toggle_panel_button').not("#cite").removeClass('in').attr('aria-expanded', 'false');
        $('#asd').fadeOut('3000');
    });


////HIDE DELETE-UNDERLINE WHEN CLICKED OUTSIDE (EXCEPT THE TWO MENUS)
    $('body').mousedown(function(e) {
        if ($('#asd').is(':visible')
            && !$('#asd').is(e.target) // if the target of the click isn't the container...
            && !$('#menu').is(e.target)
            && !$('#menu-right').is(e.target)
            && $('#asd').has(e.target).length === 0 // ... nor a descendant of the container
            && $('#menu').has(e.target).length === 0
            && $('#menu-right').has(e.target).length === 0)
        {
            $('#asd').fadeOut('3000');
        }
    });


////HIDE SELECTION MENU WHEN CLICKED OUTSIDE (EXCEPT THE TWO MENUS)
    $('body').mousedown(function(e) {
        if ($('.delete-underline').is(':visible')
            && !$('.delete-underline').is(e.target) // if the target of the click isn't the container...
            && !$('#menu').is(e.target)
            && !$('#menu-right').is(e.target)
            && $('.delete-underline').has(e.target).length === 0 // ... nor a descendant of the container
            && $('#menu').has(e.target).length === 0
            && $('#menu-right').has(e.target).length === 0)
        {
            $('.delete-underline').fadeOut('3000');
        }
    });


/////////////////////////////////
////DRAGGING AND DROPPING THE PIN
/////////////////////////////////
    var pins = [],
        t,
        ptop,
        pleft,
        pObj;

////UPDATES THE INFO IN THE PINS ARRAY
    function checkPin(pinID) {
        // var a = pinID.substr(11);
        // console.log('pidnr: '+pidnr);
        console.log('pinID: '+pinID);
        //ako nije prazno
        if (pins.length > 0) {
            //loop through
            for (var i = 0; i < pins.length; i++) {
                console.log("pins[i]['id']: "+ pins[i]['id']);
                //ako je id vec postoji u arrayu
                if (pinID > pins.length) {
                    console.log("id not found1: ");
                    console.log(pins);

                    pins.push(pObj);

                    console.log("id not found2: ");
                    console.log(pins);
                } else if(pins[i]["id"] == 'dragged-pin'+pinID){
                    console.log("id found at "+ i);
                    pins[i]["value"] = t;
                    pins[i]["top"] = ptop;
                    pins[i]["left"] = pleft;
                    // break;
                    //ako ne postoji nutri
                } else {
                    break;
                }
                // else{
                    // console.log("id not found1: ");
                    // console.log(pins);

                    // pins.push(pObj);

                    // console.log("id not found2: ");
                    // console.log(pins);
                    // break;
                // }
                console.log("here "+pins[i]['value']);
            }
            console.log('random log: ');
            console.log(pins);
        }else{
          pins.push(pObj);
          console.log('nothing was inside: ');
          console.log(pins);
          console.log('                                        ');
        } 
    }

////UPDATES INFO ABOUT PINS WHEN MOVED
    function pinMoved() {
        pinID = $(this).attr("id");
        var found = pins.some(function (el) {
            ptop = $('#'+pinID).offset().top;
            pleft = $('#'+pinID).offset().left;
            el.top = ptop;
            el.left = pleft;
            return el.id === pinID;
        });
        console.log(pins);
    }

////ORIGINAL PIN, THE BEGINNING OF ALL
    $('#pin').draggable({
        containment: '#main',
        snapTolerance: 100,
        cursor: 'move',
        snap: '#content',
        snapMode: 'outer',
        helper: 'clone',
        stop: getPinPosition
    });

    // function updatePin(id) {
    //     // alert('oiuuio');
    // //     var found = pins.some(function(el) {
    // //         el.value = t;
    // //         el.top = ptop;
    // //         el.left = pleft;
    // //         return el.id ===pinID;
    // //         console.log(pins);
    // //     });
    // //     if (!found) {
    // //         pins.push(pObj);
    // //     }
    // //     console.log(pins);
    // // }

    //     for (var i in pins) {
    //         alert('sfhbk');
    //         if (pins[i].id == id) {
    //             pins[i].value = t;
    //             pins[i].top = ptop;
    //             pins[i].left = pleft;
    //             console.log(pins);
    //             break; //Stop this loop, we found it!
    //         } else {
    //             // pins.push(pObj);
    //             console.log(pins);
    //         }
    //     }
    // }


    // $('#main').on('click', function(e) {
    //     if (!$('#content').find('.pin-input').is(e.target)) {
    //         $('#content').find('.pin-input').each(function() {
    //             // console.log($(this).val());
    //             t = $(this).val();
    //             var newPin = $(this).closest('.pin-clone');
    //             var pid = newPin.attr("id");
    //             var pidnr = pid.substr(11);
    //             // console.log('pidnr: '+pidnr);
    //             // console.log('t: '+t);
    //             ptop = newPin.offset().top;
    //             pleft = newPin.offset().left;
    //             pObj = {value : t, top: ptop, left: pleft , id: pid};

    //             checkPin(pid);
    //         });
    //             e.stopPropagation;
    // });


    // && !$('#asd').is(e.target)


////ON HOVER SHOW INPUT AREA
    $('#content').on('mouseenter', '.pin-clone', function() {
        $(this).find('.pin-form').fadeIn();
    });

    $('#content').on('mouseleave', '.pin-clone', function() {
        $(this).find('.pin-form').fadeOut();
    });

////DROP THE PIN AND GET THE POSITION AND OTHER INFO BOUT IT
    var pin_count = 1;
    function getPinPosition(e, ui) {
        var pinXPos = ui.offset.left;
        var pinYPos = ui.offset.top;
        var newPin =  $(ui.helper).clone(true);
////////DRAG IT, GET TAG NAME FROM USER, ASSIGN DEFAULT ID TO IT, AND UPDATE VALUES WHEN EDITED OR MOVED
        newPin.appendTo('#content').offset({top: pinYPos, left: pinXPos}).attr('id', 'dragged-pin'+pin_count).addClass('pin-clone').draggable({
            containment: '#main',
            cursor: 'move',
            snapTolerance: 100,
            snap: '#content',
            snapMode: "outer",
            stop: pinMoved
        });

        newPin.find('.pin-form').css('display', 'inline-block');
        newPin.find('.pin-input').focus();

        newPin.submit(function(e){
            t = newPin.find('.pin-input').val();
            var pid = newPin.attr("id");
            var pidnr = pid.substr(11);
            console.log(pidnr);
            ptop = newPin.offset().top;
            pleft = newPin.offset().left;
            pObj = {value : t, top: ptop, left: pleft, id: pid};

            checkPin(pid);
            
             // $(this).find('.pin-input').blur();
             $(this).find('.pin-form').hide();
            e.preventDefault();
        });

        newPin.find('.pin-input').focusout(function() {
            t = $(this).val();
            // var newPin = $(this).closest('.pin-clone');
            var pid = newPin.attr("id");
            var pidnr = pid.substr(11);
            console.log('pidnr: '+pidnr);
            console.log('t: '+t);
            ptop = newPin.offset().top;
            pleft = newPin.offset().left;
            pObj = {value : t, top: ptop, left: pleft, id: pid};

            checkPin(pidnr);
        });
        pin_count++;
    }

// console.log(pins);

    // if ($.cookie('scroll') !== null) {
    //     $(document).scrollTop($.cookie('scroll'));
    //     // alert('bookmark recovered');
    // }

    // $('#bookmark').click(function() {
    //     // Set a cookie that holds the scroll position.
    //     $.cookie('scroll', $(document).scrollTop());
    // });

    // $('#remove_bookmark').click(function() {
    //     // Set a cookie that holds the scroll position.
    //     $.removeCookie('scroll');
    // });

//////////////////////
////SHOW/HIDE KEYWORDS
//////////////////////
    var keywords = ['capitalism', 'capital', 'creativity', 'art', 'contemporary', 'culture', 'ideological', 'social', 'labor', 'attention', 'image', 'production', 'capitalism', 'art', 'state', 'life', 'public', 'city', 'economics', 'production', 'development', 'art', 'social', 'avant-garde', 'world', 'big', 'Other', 'art', 'urban', 'cultural', 'project', 'creativity', 'Belgrade', 'Rog', 'capital', 'creative', 'collective', 'urban', 'factory', 'gentrification', 'art', 'political', 'social', 'culture', 'autonomy', 'public', 'work'];

    $('.keyword-button').each(function(m){
        $('#keyword_toggle'+m).each(function() {
            $(this).click(function() {

                $(this).button('toggle');
                if ($(this).hasClass('active')) {
                    $(this).closest('.section').highlight(keywords[m], {element: 'span', className: keywords[m], wordsOnly: true});
                } else {
                    $(this).closest('.section').unhighlight({element: 'span', className: keywords[m], wordsOnly: true});	
                }
            });

        });

    });


///////////////////////////////////////
////ANIMATION SCROLL ON MENU ITEM CLICK
///////////////////////////////////////
    $('a.page-scroll').bind('click', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2000, 'easeInOutQuart');
        e.preventDefault();
    });

////////////////////
////ARROW NAVIGATION
////////////////////

////ON ARROW-DOWN CLICK SCROLL TO NEXT SECTION
    $('#down').on('click', function (e) {
        // var scrollTop = $(document).scrollTop();
        e.preventDefault(); 
        ////////SET DATA-TOP FOR EVERY SECTION
        $('.section').each(function() {
            var scrollTop = $(document).scrollTop();
            var section_top = Math.floor($(this).offset().top);
            var first_section = Math.floor($('.section:first').offset().top);
            var last_section = Math.floor($('.section:last').offset().top);
            if ($(this).next('.section')) {
                var nextTop = Math.floor($(this).next('.section').offset().top);
            }
            if (scrollTop >= section_top && scrollTop < nextTop) {
                $('html, body').stop().animate({
                    scrollTop: nextTop
                }, 2000, 'easeInOutQuart');
            } else if (scrollTop < first_section || scrollTop >= last_section) {
                $('html, body').stop().animate({
                    scrollTop: first_section
                }, 2000, 'easeInOutQuart');
            } else {
                e.preventDefault();
            }
        });
    });


////ON ARROW-UP CLICK SCROLL TO PREVIOUS SECTION
    $('#up').on('click', function (e) {
        e.preventDefault();	
        ////////SET DATA-TOP FOR EVERY SECTION
        $('.section').each(function() {
            var scrollTop = $(document).scrollTop();
            var section_top = Math.floor($(this).offset().top);
            var first_section = Math.floor($('.section:first').offset().top);
            var last_section = Math.floor($('.section:last').offset().top);
            if ($(this).next('.section')) {
                var nextTop = Math.floor($(this).next('.section').offset().top);
            }
            if (scrollTop > section_top && scrollTop <= nextTop) {
                $('html, body').stop().animate({
                    scrollTop: section_top
                }, 2000, 'easeInOutQuart');
            } else if (scrollTop > last_section || scrollTop <= first_section) {
                $('html, body').stop().animate({
                    scrollTop: last_section
                }, 2000, 'easeInOutQuart');
            } else {
                e.preventDefault();
            }
        });
    });


/////////////
////SIDENOTES
/////////////

////FOCUS ON RESPECTIVE SIDENOTE WHEN ANCHOR CLICKED
    $('a sup').click(function(ev){
        var numbr = $(this).text();
        var aidee = $('#fn'+numbr);
        ev.stopPropagation();
        ev.preventDefault();
        $(this).effect('transfer', {to: aidee}, 1000);
        // aidee.effect('bounce', 1000);
    });

    $('.sidenote').click(function(e) {
        var sideNr = e.currentTarget.id.substr(2);//parseInt(e.currentTarget, 10);
        // console.log(sideNr);
        var anchor = $('#fnref'+sideNr);
        $(this).effect('transfer', {to: anchor}, 1000);
        // $(anchor).effect('bounce', 1000);
    });

////FADES OUT SIDENOTES AND SLIDES THEM RIGHT
    function fadeOutSidenotes() {
        $('.sidenote').animate({
            opacity: 0,
            left: '+=40px'
        }, 100);
    }

////FADES IN SIDENOTES AND SLIDES THEM LEFT
    function fadeInSidenotes() {
        $('.sidenote').animate({
            opacity: 1,
            left: '-=40px'
        }, 3000);
    }

////SIDENOTES BECOME POPOVER BOXES IF SCREEN IS SMALL, AND THEY ARE CENTERED
    function sideToBox() {
        if ($(window).width() < "768") {	//SUBSTITUTE '400' WITH THE DESIRED MINIMUM SIZE
            $("a sup").each(function(){
                var n = $(this).text();
                var t = $("#fn"+n).text();
                $(this).parent().attr({"data-toggle": "popover", "data-trigger": "focus", "data-content": t, "data-placement": "top", "href": "#0"}).addClass("button");
            });
        } else {
            $('.footnoteRef').popover('destroy');
        }
    }

////MAKES FOOTNOTES SIDENOTES
    function alignSidenotes() {
        $('.sidenote').each(function(tic){
            $('#fn'+tic).each(function(){
                var anchorposition = $('#fnref'+tic).offset().top;
                $(this).offset({top: anchorposition});
            });
        });
    }



////ALIGN SIDENOTES VERTICALL SO THEY DON'T OVERLAP
    function alignVertically() {
        $('.sidenote').each(function(count){
            $('#fn'+count).each(function() {
                var sideTop = $(this).offset().top;
                var sideBottom = sideTop+$(this).height();
                var newHeight = (sideBottom+10);
                var sideNext = $('#fn'+(count+1));
                if (sideNext) {
                    var sideNextTop = sideNext.offset().top;
                }
                if ((sideBottom-sideNextTop) > 0) {
                    $('#fn'+(count+1)).offset({top: newHeight});
                }
            });
        });
    }

    sideToBox();

/*///////////////////////
ON RESIZE DO THESE THINGS
///////////////////////*/
    var html = $('html'),
        H = html.outerHeight(true),
        S = $(window).scrollTop(),
        P = S/H;

    $(window).resize(function() {
////////ALIGNS SIDENOTES ON WINDOW RESIZE
        fadeOutSidenotes();
        sideToBox();
        alignSidenotes();
        alignVertically();
        alignParagraphNumbers();
        fadeInSidenotes();
        H = html.outerHeight(true);
        $(window).scrollTop(P*H);
    });

////////////////////
////CHANGE FONT SIZE
////////////////////

////DECREASE FONT SIZE AND ALIGN SIDENOTES
    $('#button_fontsizeminus').click(function(){
        fadeOutSidenotes();
        var fontSize = parseInt($(".section").css('font-size'));
        $('.section').not('.references').animate({'font-size': '-=0.5'}, function() {
            alignSidenotes();
            alignVertically();
            alignParagraphNumbers();
        });
        fadeInSidenotes();
        H = html.outerHeight(true);
        S = $(window).scrollTop();
        P = S/H;
    });

////INCREASE FONT SIZE AND ALIGN SIDENOTES
    $('#button_fontsizeplus').click(function(){
        fadeOutSidenotes();
        var fontSize = parseInt($(".section").css('font-size'));
        $('.section').animate({'font-size': '+=0.5'}, function() {
            alignSidenotes();
            alignVertically();
            alignParagraphNumbers();
        });
        fadeInSidenotes();
        H = html.outerHeight(true);
        S = $(window).scrollTop();
        P = S/H;
    });

////TOOLTIP AND POPOVER
    $('[data-toggle="tooltip"]').tooltip(); 
    $('[data-toggle="popover"]').popover(); 


}); // <-- document ready














