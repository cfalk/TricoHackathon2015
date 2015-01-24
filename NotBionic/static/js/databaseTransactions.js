

function removeCourse(reg_id, local) {
  var data = {"reg_id":reg_id, "location":local};
  $.post("/remove_course/", data);
}


function addCourse(reg_id, local) {
  var data = {"reg_id":reg_id, "location":local};
  $.post("/add_course/", data);
}
