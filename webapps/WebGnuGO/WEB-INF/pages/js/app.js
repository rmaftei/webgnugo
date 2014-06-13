$(document).ready(function() {
	$(".option").click(function() {
		var url = $(this).attr("boardsize");
		
		window.location = url;
	});
});