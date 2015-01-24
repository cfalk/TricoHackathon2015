
function removeCourse(reg_id, local) {
  var data = {"reg_id":reg_id, "location":local};
  prepareCSRF();
  $.post("/remove_course/", data);
}


function addCourse(reg_id, local) {
  var data = {"reg_id":reg_id, "location":local};
  prepareCSRF();
  $.post("/add_course/", data);
}
