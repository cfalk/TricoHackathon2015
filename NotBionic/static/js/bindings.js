$(document).on("click", ".button-shop-course", function(event) {
  var reg_id = $(this).attr("reg_id");
  addCourse(reg_id, "shopping_cart");

  $(this).toggleClass("button-add-course")
         .toggleClass("button-remove-course")
         .html(rejectIcon);

  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});


$(document).on("click", ".button-add-course", function(event) {
  var reg_id = $(this).attr("reg_id");
  addCourse(reg_id, "schedule");
  removeCourse(reg_id, "shopping_cart");
  $("#"+reg_id+"_top")[0].remove()
  $.get("/course/"+reg_id+"/", function(data) {
    createCard(data,".profile_schedule_cards_container");
  });
  alert("dtfghjk");
  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});

$(document).on("click", ".button-remove-course", function(event) {
  var reg_id = $(this).attr("reg_id");
  removeCourse(reg_id, "shopping_cart");
  removeCourse(reg_id, "schedule");
  console.log($("#"+reg_id+"_top"))
  $("#"+reg_id+"_top")[0].remove()
  $(this).toggleClass("button-remove-course")
         .toggleClass("button-add-course")
         .html(confirmIcon);
  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});


$(document).on("click", ".activeFilterOptions label", function() {
  $(this).toggleClass("activated");

  event.cancelBubble = true;
  event.stopImmediatePropagation();
  event.stopPropagation();
  return false;
});
