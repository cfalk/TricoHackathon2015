$(document).on("ready", function() {

  alert("HHERE")

  // Load the icon.
  var dept = $(".big_card_course_id").substr(0,4);
  var iconSrc = iconDict[dept];
  $(".big_card_icon img").attr("src",iconSrc);

})