
function loadUserCards() {

  $.get("/user_courses/", function(courses) {

    for(var i=0; i<courses.shopping_cart.length; i++){
      var url = "/course/"+courses.shopping_cart[i];
      $.get(url, function(data){
        var thumbs = thumbsUpButton(data["reg_id"])
        var trash = trashButton(data["reg_id"])

        createCard(data,"#shopping-cart", [thumbs, trash]);
      });
    }

    for(var i=0; i<courses.schedule.length; i++){
      var url = "/course/"+courses.schedule[i];
      $.get(url, function(data){
        var trash = trashButton(data["reg_id"])

        createCard(data,"#confirmed", trash)
      });
    }

  });

}

$(document).ready(function(){

  loadUserCards();

});
