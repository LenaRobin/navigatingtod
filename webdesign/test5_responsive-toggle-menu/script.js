$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});

if (!window.opera) {
	window.onload = sidenotes;
	window.onresize = sidenotes;
}

function sidenotes() {
	// declare variables
	var cont, notes, w_medium, w_large, width;

	// widths where switching should occur
	// only values you'd have to change on similar setups
	w_medium = 900;
	w_large= 1070;

	// assign values to variables
	cont = document.getElementById('container');
	notes = document.getElementsByTagName('li');

	// if Gecko (or Opera as you don't need mediaqueries) get the width this way
	if (window.outerWidth) {
		width = window.outerWidth;
	}
	// otherwise try the IE method
	else if (document.body.offsetWidth) {
		width = document.body.offsetWidth;
	}
	// if that doesn't work then either the browser will support mediaqueries, or use the float version
	else {
		width = 0;
	}

	if (width > w_medium) {
		if (width > w_large) {
			cont.style.marginLeft = 'auto';
	}
	else {
		cont.style.marginLeft = '10px';
	}
	for (var i=0; i<notes.length; i++) {
			if (notes[i].className == 'sidenote') {
				notes[i].className = 'sidenote sidenote2';
			}
		}
	}
	else {
		cont.style.marginLeft = 'auto';

	for (var i=0; i<notes.length; i++) {
			if (notes[i].className == 'sidenote sidenote2') {
				notes[i].className = 'sidenote';
			}
		}
	}
}