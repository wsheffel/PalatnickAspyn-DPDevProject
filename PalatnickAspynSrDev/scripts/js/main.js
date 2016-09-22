$(function () {
	window.templater = Templater;

	$.getJSON("../../headline_page1.json", function (result) {
		console.log(result);
		window.templater(result, $("body"));
	}).fail(function (a, b, err) {
		console.log(err);
	});
});