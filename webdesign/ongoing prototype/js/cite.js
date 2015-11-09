function getSelectedText() {
  t = (document.all) ? document.selection.createRange().text : document.getSelection();
  return t;
}

var span = document.createElement('SPAN');

$('.section').mouseup(function(){
    var selection = getSelectedText();
    var selection_text = selection.toString();
//    console.log(selection_text);
    

    //SPAN AROUND SELECTED TEXT
    selection_text = span.textContent.substr(0, 1);
    
    var range = selection.getRangeAt(0);
//    range.deleteContents();
    range.insertNode(span);
});

$('#cite').click( function() {
span.className = "qwertz";//ADD CLASS TO SPAN ON CLICK
var par = $('.qwertz').closest('p').attr('id');//GET ID OF PARENT p
  var ref_article = $('#cite-this').closest('.section').attr('data-article');
    var ref_author = $('#cite-this').closest('.section').attr('data-author');
    var ref_title = $('meta[name="title"]').attr('content');
    var ref_eds = $('meta[name="editors"]').attr('content');
    var ref_year = $('meta[name="year"]').attr('content');
    var ref_place = $('meta[name="place"]').attr('content');
    var ref_pub = $('meta[name="publisher"]').attr('content');
    $('#mla').text(ref_author + ". " + ref_article + ". " +  ref_title + ", eds. "
    + ref_eds + ". " + ref_place + ": " + ref_pub + ". " + ref_year + ". "
    + "file:///Users/lenarobin/GitHub/navigatingtod/webdesign/ongoing%20prototype/lambda.html" + "#" + par); 
});