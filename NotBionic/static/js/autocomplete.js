$(document).ready(function() {

var queryUrl = "/possible_values/";
$.get(queryUrl, {"field":"instructor"}, function(response) {
  $(".autocomplete-instructor").autocomplete({
    source:response
  });
});

var queryUrl = "/possible_values/";
$.get(queryUrl, {"field":"department"}, function(response) {
  $(".autocomplete-department").autocomplete({
    source:response
  });
});

var queryUrl = "/possible_values/";
$.get(queryUrl, {"field":"description"}, function(response) {
  $(".autocomplete-everything").autocomplete({
    source:response
  });
});

});
