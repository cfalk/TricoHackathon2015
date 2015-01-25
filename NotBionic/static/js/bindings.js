
/*

NOTE: `setTimeout`s have been applied below because SQLITE3
      is too slow to keep up with JavaScript's queries.
      Essentially, it is awful at concurrency.

*/
$(document).on("click",".button-card", function() {
  var reg_id = $(this).attr("reg_id");
  console.log("here!")
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
    console.log('explore container:',$('#explore-results')[0]);
    if ($('#explore-results')[0]===undefined) {
	location.reload();
    }
    $(this).toggleClass("trash",false)
	   .toggleClass("shop",true);
    var img = $(this).children()[0];
    $(img).attr("src","/static/images/shopping-cart.png");
  }

  return false;
});
