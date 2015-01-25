
$(document).on("click", ".filter", function() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".filter.active").removeClass("active");
    $(this).addClass("active");
  }
});
