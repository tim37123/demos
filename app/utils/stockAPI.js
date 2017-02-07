import moment from 'moment';

function logResults(json){
 // console.log(json[0].Exchange);
}

export const stockAPI = {
	returnQuote: (symbol) => {
        const end_date = moment().format('YYYY-MM-DD');
        const start_date = moment().subtract(12, 'months').format('YYYY-MM-DD');
        const collapse = 'weekly';
        const column_index = 4;
        const transform = "diff";
        const api_key = "UigyuWyskW1TUVzs1dK7";
        // "https://www.quandl.com/api/v3/datasets/WIKI/FB.json?column_index=4&start_date=2014-01-01&end_date=2014-12-31&collapse=monthly&transform=diff&api_key=xFAGELQQeJWaHgp3UfVW"
        const baseURL = "https://www.quandl.com/api/v3/datasets/WIKI/" + symbol + ".json?";
        const queryParams = "column_index=" + column_index + "&start_date=" + start_date + "&end_date=" + end_date + "&collapse=" + collapse + "&transform=" + transform + "&api_key=" + api_key;
        const fullRequest = baseURL + queryParams;

        return $.ajax({
                    type: "GET",
                    url: fullRequest
                });

        // $.ajax({
        //     type: "GET",
        //     url: fullRequest,
        //     success: function(data){
        //         console.log("SUCCESS");
        //         console.log(data);
        //     },
        //     error: function (xhr, textStatus, errorThrown) {
        //         console.error("ERROR: " + errorThrown);
        //         console.error(textStatus);
        //         console.log(xhr);
        //     }
        // });

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