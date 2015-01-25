
function loadUserCards() {
  $.get("/user_courses/", function(courses) {
    for(var i=0; i<courses.shopping_cart.length; i++){
      var url = "/course/"+courses.shopping_cart[i];
      $.get(url, function(data){
        createCard(data,"#shopping-cart");
      });
    }
    for(var i=0; i<courses.schedule.length; i++){
      var url = "/course/"+courses.schedule[i];
      $.get(url, function(data){
        createCard(data,"#confirmed")
      });
    }
  });
}

$(document).ready(function(){

  loadUserCards();

});
