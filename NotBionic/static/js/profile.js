
function loadUserCards() {

  $.get("/user_courses/", function(courses) {

    for(var i=0; i<courses.shopping_cart.length; i++){
      var url = "/course/"+courses.shopping_cart[i];
      $.get(url, function(data){
        var button = thumbsUpButton(data["reg_id"])
        createCard(data,"#shopping-cart", button);
      });
    }

    for(var i=0; i<courses.schedule.length; i++){
      var url = "/course/"+courses.schedule[i];
      $.get(url, function(data){
        var button = trashButton(data["reg_id"])
        console.log(button);
        createCard(data,"#confirmed", button)
      });
    }

  });

}

$(document).ready(function(){

  loadUserCards();

});
