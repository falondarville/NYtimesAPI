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

		console.log(response);
	});
};


$("#searchButton").on("click", function(event){

	event.preventDefault();
	//user inputted values to be added to query URL
	queryTerm = $("#search").val().trim();
	// numberResults = $("#numberRecords").val();
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
	runQuery(10, newURL);

});

//NYT API does not have a built-in parameter for the number of results to retrieve




});