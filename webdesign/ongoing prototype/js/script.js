$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});

if (!window.opera) {
	window.onload = sidenotes;
	window.onresize = sidenotes;
}