
// Define global variables to keep track of the filters.
var currentQueries = [];
var page = 1;
var canLoadMore = true;


// Resest the filters so that a search may begin anew.
function resetFilters() {
  currentQueries = [];
  page = 1;
  canLoadMore = true;
  $(".cards_container").empty();
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


function openFilter(name) {
  $(".activeFilterOptions").removeClass("activeFilterOptions")
                           .addClass("disabledFilterOptions");
  $("#"+name+"-filterOptions").removeClass("disabledFilterOptions")
                              .addClass("activeFilterOptions");
}


$(document).on("ready", function() {

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


$(document).on("click", ".filter", function() {
  var name = $(this).data("filter");
  openFilter(name);
});


  // Load the initial cards.
  loadMoreCards();

});

