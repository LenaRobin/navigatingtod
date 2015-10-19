// TO ADD: function that highlights the h2, h3, h4 in the pushmenu on the left (table of content) to see where are located the matching results

// TO ADD: possibility to exit the "search mode" by clicking somewhere on the page or something like this


$(document).ready(function(){
    $("#filter").keyup(function(){

       // alert( "Handler for .keyup() called." );

 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val()
        var count = 0;


        // Loop through the comment list
       // $("h1, h2, h3, h4, p, div, span, ol, li, section, sup").each(function(){
        $("h2, h3, h4, p, div, span, ol, li, section, #social, #book-downloads").not("#reference-list, .pushmenu pushmenu-left").each(function(){
            
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
             //   $(this).css("color", "red");
                $(this).css("color", "rgba(203, 203, 203, 0.22)");
                $(this).css("text-decoration", "none");
                $(this).css("border-bottom", "0px");
               // $("h2").css("color", "inherit");
                // if section 
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                $(this).css("border-bottom", "solid 1px #ffff00");
                $(this).css("color", "black");
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        $("#filter-count").text(count+" results");
        $("#filter-count").css("font-size", "12px");

      //  console.log("Number of Hits = " + count);
  
    
        

        
        
        
        
if(onclick){ 
     alert("message") 
    return false; } 
    
    
    
    
    
    });
    
    
    
});
