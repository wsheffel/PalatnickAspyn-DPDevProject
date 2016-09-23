$(function () {
    var IMAGE_INDICATOR_THUMBNAIL = "thumbnail-url";
    var IMAGE_INDICATOR_PICTURE = "image";

    var HTML_INDICATOR = "html";
    var LINK_INDICATOR = "href";

    var generateHtml = function (json, template) {
    	$(template).find("[template-key*='template']").each(function (i, obj) {
            var templateKeyFullVal = $(obj).attr('template-key');
            var value = json;
            var templateKeyFullValComponents = templateKeyFullVal.split(" ");
            if (templateKeyFullValComponents.length > 1 && 
                templateKeyFullValComponents[templateKeyFullValComponents.length - 1] === 'template') {
                
                $.each(templateKeyFullValComponents, function (j, k) {
                    if (k !== 'template') {
                        value = value[k];
                    }
                });

                var finalHtml = "";
                $.each(value, function (indexInJSON, jsonObj) {
                    var templateCopy = $(obj).clone();
                    templateCopy.find("[template-key*='template']").each(function (j, templateComponent) {
                        var jsonElementTemplateKeyFullVal = $(templateComponent).attr('template-key');
                        var jsonElementTemplateKeyFullValComponents = jsonElementTemplateKeyFullVal.split(" ");

                        var jsonElementID = 
                            jsonElementTemplateKeyFullValComponents[jsonElementTemplateKeyFullValComponents.length - 1];

                        var jsonElementContents = jsonObj[jsonElementID];
                        if (jsonElementID === IMAGE_INDICATOR_PICTURE 
                            || jsonElementID == IMAGE_INDICATOR_THUMBNAIL) {
                            $(this).attr({'src': jsonElementContents});
                        } else if (jsonElementID === HTML_INDICATOR) {
                            $(this).html(jsonElementContents);
                        } else if (jsonElementID === LINK_INDICATOR) {
                            $(this).attr(LINK_INDICATOR, jsonElementContents);
                        } else {
                            $(this).text($(this).text() + jsonElementContents);
                        }
                    });
                    finalHtml += templateCopy.html();
                });
                $(obj).empty().append(finalHtml);
            }
    	});

    	$(template).find("[template-key]:not([template-key*='template'])").each(function (i, obj) {
            var templateKeyFullVal = $(obj).attr('template-key');
    		var value = json;
            var key = '';
    		$.each(templateKeyFullVal.split(' '), function (j, k) {
                key = k;
    			value = value[k];
    		});
            console.log(key);
            if (key === IMAGE_INDICATOR_PICTURE
                || key == IMAGE_INDICATOR_THUMBNAIL) {
                $(this).attr({'src': value});
            } else if (key === HTML_INDICATOR) {
                console.log(key);
                $(this).html(value);
            }  else if (key === LINK_INDICATOR) {
                $(this).attr(LINK_INDICATOR, value);
            } else {
                $(this).text($(this).text() + value);
            }
    	});
    };
    window.Templater = generateHtml;
});