$(document).ready(function(){
    $("#filter").keyup(function(){

       // alert( "Handler for .keyup() called." );

 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val()
        var count = 0;

        // Loop through the comment list
        $("h1, h2, h2, h4, h5, h6, div, p, span, nav, ul, li, ol").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

                // if section 
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        $("#filter-count").text("Number of Hits = "+count);
    });
});



