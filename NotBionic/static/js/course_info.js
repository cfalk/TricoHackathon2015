
function prepareCardImage() {
  // Load the icon.
  var dept = $(".big_card_course_id").html().trim().substring(0,4);
  var iconSrc = iconDict[dept];
  $(".big_card_icon img").attr("src", "/static/images/"+iconSrc);
 }


function arrowButton() {
  return "<div class='button arrow-button'>" +
            "<img src='/static/images/arrow.png'>" +
          "</div>";
}

var open = false;

$(".big-card-arrow-button").click(function(){
	$(".more_info").toggle();
	if (open){
		$(this).css("transform", "rotate(0deg)");
		open = false;
	} else {
		$(this).css("transform", "rotate(180deg)");
		
		open = true;
	}
});

