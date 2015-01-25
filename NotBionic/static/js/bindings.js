
/*

NOTE: `setTimeout`s have been applied below because SQLITE3
      is too slow to keep up with JavaScript's queries.
      Essentially, it is awful at concurrency.

*/



$(document).on("click",".button-card", function() {
  var reg_id = $(this).attr("reg_id");

  if ($(this).hasClass("shop")) {

    addCourse(reg_id, "shopping_cart");
    $(this).toggleClass("shop",false)
	   .toggleClass("trash",true);
    var img = $(this).children()[0];
    $(img).attr("src","/static/images/trash.png");

  } else if ($(this).hasClass("approve")) {

    addCourse(reg_id, "schedule");

    setTimeout(function() { //TODO: DELETE WHEN MYSQL
      removeCourse(reg_id, "shopping_cart");
      location.reload();
    },50);//TODO: DELETE WHEN MYSQL


  } else if ($(this).hasClass("trash")) {

    removeCourse(reg_id, "schedule");

    setTimeout(function() { //TODO: DELETE WHEN MYSQL
      removeCourse(reg_id, "shopping_cart");
    },50);//TODO: DELETE WHEN MYSQL

    if ($('#schedule').length) {
      $(this).closest(".card_container").remove();

    } else {

      $(this).toggleClass("trash",false)
            .toggleClass("shop",true);

      var img = $(this).children()[0];
      $(img).attr("src","/static/images/shopping-cart.png");
    }

  } else if ($(this).hasClass("toggleVis")) {

    var blocks = $(".occupiedSlot[reg_id='"+reg_id+"']");
    $container = $(this).closest(".card_container");

    if (blocks.length) {
      blocks.attr("reg_id",""); // Clear the `reg_id` attribute.
      blocks.css("background-color","initial");
      $container.css("background-color","initial");

    } else {
      var courseData = $(this).closest(".card_container").data("course-obj");
      drawClass(courseData);
      $container.css("background-color",colorDict[reg_id]);

    }

  }

  return false;
});
