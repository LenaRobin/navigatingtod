$(document).ready(function(){
/*//COPY-PASTE WITH APPENDED REFERENCE vvv
    function addLink() {
        //Get the selected text and append the extra info
        var selection = window.getSelection(),
            pagelink = '<br /><br /> Read more at: ' + document.location.href,
            copytext = selection + pagelink,
            newdiv = document.createElement('div');

        //hide the newly created container
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';

        //insert the container, fill it with the extended text, and define the new selection
        document.body.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);

        window.setTimeout(function () {
            document.body.removeChild(newdiv);
        }, 100);
    }

    document.addEventListener('copy', addLink);
//COPY-PASTE WITH APPENDED REFERENCE ^^^
*/

//SEARCH FUNCTION vvv
	var elem = $('<div id="search_ui" style="position: fixed; float: right; right: 0px; top: 0px; display: none;"><button id="cancel" style="margin: 5px 0px 5px 0px;">Cancel</button></div>');

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


/*	$("#filter").keyup(function(e){*/
	$('#filter').on('keyup', function(){
		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val();
		var count = 0;
		// Loop through the text
		$("h1, h2, h3, h4, p, div, ol, li, a").each(function(){
			// If the element does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				// add classes to the block elements
				$(this).addClass('search-notfound');
				$(this).removeClass('search-found');
                $("#filter-count").show().text("Number of Hits = "+count);
			} else {
				$(this).removeClass('search-notfound');
				$(this).addClass('search-found');
				count++;
                $("#filter-count").show().text("Number of Hits = "+count);
			}
		});

		$('#main').unhighlight();
        $('#main').highlight($(this).val());

        $('.highlight').each(function() {
        	var span_top = $(this).offset().top;
        	var span_left = $(this).offset().left;
        	console.log(span_top + " + " + span_left);
        	$(this).css({
        		'background': '-webkit-radial-gradient(span_top,span_left,circle,rgb(27,186,135),transparent)'
			});
        });

		// Update the count
		var numberItems = count;
		  
		// HIDE CANCEL BUTTON WHEN NO INPUT
		if (0 < filter.length) {
			// filter active
			$('#search_ui').css('display', 'block');
		} else {
			$('#search_ui').css('display', 'none');
			cancelSearch();
		}

		// HIDE CANCEL BUTTON WHEN CLICKED
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







