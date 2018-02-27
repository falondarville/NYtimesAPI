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
	queryTerm = $("#search").val().trim();
	startYear = $("start").val().trim() + 0101
	endYear = $("end").val().trim() + 1231
	numberResults = $("#numberRecords").val().trim();

	var newURL = baseURL + "&q=" + queryTerm + ";

	runQuery(numberResults, newURL);

});





});