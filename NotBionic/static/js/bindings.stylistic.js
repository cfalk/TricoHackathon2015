
$(document).on("click", ".filter", function() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".filter.active").removeClass("active");
    $(this).addClass("active");
  }
});

$(document).on("click", ".activeFilterOptions label", function() {
  $(this).toggleClass("activated");

  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});
