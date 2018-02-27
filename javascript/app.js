$(document).ready(function() {
//use localhost through MAMP to test code, issue otherwise with cross origin

//API information
var apiKey = "bd2ce8623fb048b697f2ddbc2abef055";
var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//Search parameters inputted on form
var queryTerm = "";
var numberResults = 0;
var startYear = 0;
var endYear = 0;

//number of articles initializing counter
var articleCounter = 0;

//onclick function to retrieve articles
function runQuery(numberArticles, queryURL) {

	$.ajax({
		crossOrigin: true,
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		$("#resultsContainer").empty();

		for (var i=0; i < numberArticles; i++) {

			var cardBlock = $("<div>").addClass("card card-block bg-faded");
			
			cardBlock.append(
				response.response.docs[i].headline.main + "<br>" +
				response.response.docs[i].section_name + "<br>" +
				response.response.docs[i].pub_date + "<br>" +
				response.response.docs[i].byline.original + "<br>" +
				"<a href='" + response.response.docs[i].web_url + "'>" + "Read the article here" + "</a>");

			$("#resultsContainer").append(cardBlock);

		}
	});
};

//NYT API does not have a built-in parameter for the number of results to retrieve
$("#searchButton").on("click", function(event){

	event.preventDefault();
	//user inputted values to be added to query URL
	queryTerm = $("#search").val().trim();
	numberResults = $("#numberRecords").val();
	startYear = $("#start").val().trim();
	endYear = $("#end").val().trim();

	var newURL = baseURL + "&q=" + queryTerm;

	if(parseInt(startYear)) {
		startYear += "0101";
		newURL = newURL + "&begin_date=" + startYear;
	}

	if(parseInt(endYear)){
		endYear += "1231";
		 newURL = newURL + "&end_date=" + endYear;
	}

	console.log(newURL);
	runQuery(numberResults, newURL);

});

$("#clearButton").on("click", function(event) {

	event.preventDefault();

	$("#resultsContainer").empty();
	queryTerm = $("#search").val("");
	startYear = $("#start").val("");
	endYear = $("#end").val("");
});




});