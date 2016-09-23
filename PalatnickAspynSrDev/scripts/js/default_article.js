$(function () {
	window.templater = Templater;

	$.getJSON("../../sample_content/article1/article.json", function (result) {
		console.log(result);
		window.templater(result, $("body"));
	}).fail(function (a, b, err) {
		console.log(err);
	});
});