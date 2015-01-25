
function prepareCardImage() {
  // Load the icon.
  var dept = $(".big_card_course_id").html().trim().substring(0,4);
  var iconSrc = iconDict[dept];
  $(".big_card_icon img").attr("src", "/static/images/"+iconSrc);
 }


function arrowButton() {
  return "<div class='button arrow-button'>" +
            "<img src='/static/images/arrow.jpg'>" +
          "</div>";
}

function hide() {
	$(".more_info").hide()
}

function show() {
	$(".more_info").show()
}

$(".big-card-arrow-button").on("click", function(){
	show();
});
