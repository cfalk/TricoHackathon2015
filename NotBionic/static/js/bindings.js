
/*

NOTE: `setTimeout`s have been applied below because SQLITE3
      is too slow to keep up with JavaScript's queries.
      Essentially, it is awful at concurrency.

*/


$(document).on("click", ".button-card", function(event) {
  var reg_id = $(this).attr("reg_id");

  if ($(this).hasClass("shop")) {
    addCourse(reg_id, "shopping_cart");

  } else if ($(this).hasClass("approve")) {
    addCourse(reg_id, "schedule");

    setTimeout(function() { //TODO: DELETE WHEN MYSQL
      removeCourse(reg_id, "shopping_cart");
    },50);//TODO: DELETE WHEN MYSQL

  } else if ($(this).hasClass("trash")) {
    removeCourse(reg_id, "schedule");

    setTimeout(function() { //TODO: DELETE WHEN MYSQL
      removeCourse(reg_id, "shopping_cart");
    },50);//TODO: DELETE WHEN MYSQL

  }

  return false;
});
