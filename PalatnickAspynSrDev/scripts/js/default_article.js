$(function () {
	window.templater = Templater;

	$.getJSON($('json').attr('src'), function (result) {
		console.log(result);
		window.templater(result, $("body"));
	}).fail(function (a, b, err) {
		console.log(err);
	});
});