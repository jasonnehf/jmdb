// if you want to do something AFTER a request comes back, you need to do it in the callback function
'use strict';

var $searchbox;
var $toggleoptions;
var $searchyear;
var $searchtype;

$(document).ready(init);

function init(event) {
	$searchbox=$('#searchbox');
	$searchyear=$('#searchyear');
	$searchtype=$('#searchtype');
	$toggleoptions=$("#toggleoptions");

	$toggleoptions.click(function() {
		console.log("options-toggle");
		$(".searchoptions").toggleClass("hidden");
		$toggleoptions.toggleClass("fa-caret-left");
		$toggleoptions.toggleClass("fa-caret-right");
     	return false;
    });
	$('#searchbtn').click(findMovie);
	$searchbox.keyup(findMovie);
};

function doAnimation(element_selector, animation) {
	$(element_selector).addClass(animation);
	var wait = window.setTimeout( function(){
		$(element_selector).removeClass(animation);
	}, 1300);
};

function findMovie(event) {
	if(event.type==="keyup" && event.keyCode!==13)	return;
	$.ajax({
		method:'GET',
		url:"http://www.omdbapi.com/?t="+$searchbox.val()+"&y="+($searchyear.val()||'')+"&plot=short&r=json&type="+($searchtype.val() || 'movie'),
		success: function(data){
			// console.log("data: ",data);
			if(data.Response==="False") {
				var $errorMsg=$("<div>").text("Sorry! Your search returned zero results. Try searching for 'Batman', maybe?");
				$("#table-container").empty().append($errorMsg);
			}	else{
				$("#table-container").empty().append(dataToTable(data));
				var $img=$("<img>").attr("src", data.Poster);
				$("#poster-container").empty().append($img);
			}
			
		},
		error: function(err) {
			// console.log("ERROR***ERROR***ERROR: ", err);
		},
	});

	var $spinner=$("<div>").addClass("sp-circle");
	$("#table-container").empty().append($spinner);
}

function dataToTable(data)
{
	var $toReturn=$("<table>");
	var $tbody=$("<tbody>");
	for(var item in data)
	{
		if(item==="Response" || item==="Poster")	continue;
		var $newtr=$("<tr>");
		var $newtd1=$("<td>").text(item);
		var $newtd2=$("<td>").text(data[item]);
		$newtr.append($newtd1, $newtd2);
		$tbody.append($newtr);
	}
	$toReturn.append($tbody);
	return $toReturn;
}
	
