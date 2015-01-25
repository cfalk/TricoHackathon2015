
$(document).on("click", ".button-add-course", function(event) {
  var reg_id = $(this).attr("reg_id");
  addCourse(reg_id, "shopping_cart");

  $(this).toggleClass("button-add-course")
         .toggleClass("button-remove-course")
         .html("&#10003;")

  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});


$(document).on("click", ".button-remove-course", function(event) {
  var reg_id = $(this).attr("reg_id");
  removeCourse(reg_id, "shopping_cart");

  $(this).toggleClass("button-remove-course")
         .toggleClass("button-add-course")
         .html("Add Course to Shopping Cart")

  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});


