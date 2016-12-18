import fetchJsonp from 'fetch-jsonp';

function logResults(json){
 // console.log(json[0].Exchange);
}

export const stockAPI = {
	returnQuote: (url) => {
    $.getJSON(url,logResults);

    // $.ajax({
    //     url: url,
     
    //     // The name of the callback parameter, as specified by the YQL service
    //     jsonp: "callback",
     
    //     // Tell jQuery we're expecting JSONP
    //     dataType: "jsonp",
     
    //     // Work with the response
    //     success: function( response ) {
    //         console.log( response ); // server response
    //     }
    // });
  } 
}