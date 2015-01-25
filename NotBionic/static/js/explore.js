$(document).on("ready", function() {


var currentQueries = [];
var page = 1;
var canLoadMore = true;

// When we get near the bottom, load more cards.
$(window).scroll(function() {
  if (canLoadMore) {
    var triggerMargin = $(document).height() - 200;
    var scrollLocal = $(window).scrollTop() + $(window).height() ;
    if(scrollLocal > triggerMargin) {
      loadMoreCards();
    }
  }
});


function resetFilters() {
  currentQueries = [];
  page = 1;
  canLoadMore = true;
}


function loadMoreCards() {
  if (canLoadMore) {
    page += 1
    var url = "/courses/"+page

    $.get(url, {"queries":currentQueries}, function(response) {
      if (response.length) {
        for (var i=0; i<response.length; i++) {
          var card = response[i];
          createCard(card);
        }
      } else {
        canLoadMore = false;
      }
    });
  }
}

// Load the initial cards.
loadMoreCards();

});
