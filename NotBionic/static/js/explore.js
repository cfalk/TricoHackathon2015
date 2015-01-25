
// Define global variables to keep track of the filters.
var currentQueries = {};
var page = 0;
var canLoadMore = true;


// Resest the filters so that a search may begin anew.
function resetFilters() {
  currentQueries = {};
  clearCards();
}


function clearCards() {
  page = 0;
  canLoadMore = true;
  $(".cards_container").empty();
}


function loadMoreCards() {
  if (canLoadMore) {
    page += 1
    var url = "/courses/"+page

    $.get(url, currentQueries, function(response) {
      if (response.length) {
        for (var i=0; i<response.length; i++) {
          var card = response[i];
          createCard(card, ".cards_container");
        }
      } else {
        canLoadMore = false;
      }
    });
  }
}


function applyFilter(field, val) {
  if (((typeof val) !== undefined) && (val.length!==0)) {
    currentQueries[field] = val;
  } else {
    delete currentQueries[field];
  }

  clearCards();
  loadMoreCards();
}


function openFilter(name) {
  // Open the specified filter and close any others that are open.
  $(".activeFilterOptions").removeClass("activeFilterOptions")
                           .addClass("disabledFilterOptions");
  $("#"+name+"-filterOptions").removeClass("disabledFilterOptions")
                              .addClass("activeFilterOptions");
}


$(document).on("ready", function() {

  // Load the initial cards.
  loadMoreCards();

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


  $(document).on("click", "#suggestionButton", function() {
    applyFilter("suggestions", "on");
    delete currentQueries["suggestions"];
  });


  $(document).on("click", ".checkbox", function() {
    var newList = [];
    $(".activeFilterOptions").find(".checkbox.activated input").each(function() {
      newList.push($(this).attr("value"));
    });
    var field = $(this).parent().attr("id").split("-")[0];
    applyFilter(field, newList);
  });

  $(document).on("click", ".filter-text", function() {
    var $input = $(this).siblings("label").children();
    var text = $input.val();
    if (text) {
      var field = $input.attr("id");
      var container = $(this).siblings(".filter-container");
      var checkbox = $("<label class='checkbox input-filter' for="+text+" > <input type=checkbox id='"+field+"-"+text+"' value="+text+ " name="+text+ " >"+text+ " </label>")
      container.append(checkbox);
      checkbox.trigger("click");

    }
  })

  $(document).on("click", ".input-filter", function() {
    var $input = $(this).siblings("label").children();
    var text = $input.val();
    var field = $(this).parent().find("input").attr("id");
  });
});

