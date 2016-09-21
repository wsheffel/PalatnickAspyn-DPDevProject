$(function () {
	window.templater = Templater;

	$.getJSON("../../headline_page1.json", function (result) {

		window.templater(result, $("body"));
	}).fail(function (a, b, err) {
		console.log(err);
	});
});