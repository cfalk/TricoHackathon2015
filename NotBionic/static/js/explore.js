<<<<<<< Updated upstream

// Define global variables to keep track of the filters.
var currentQueries = {};
var page = 1;
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
  console.log(currentQueries);
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
      applyFilter(field, text);
    }
  })
=======
$(document).ready(function(){
	//Click binds
	function bindFilterOpen(){
		$(".filter").off("click").on("click", function(){
			console.log("init");
			var $this = $(this); //Used to speed to up calls to this $(this)
			var dataDiv = $this.data("filter");
			var $correspondingFilterOptionsDiv = $("#"+dataDiv+"-filterOptions"); //Similarly use to speed up calls
			if ($correspondingFilterOptionsDiv.hasClass("activeFilterOptions")){
				$correspondingFilterOptionsDiv.toggleClass("activeFilterOptions");
				$correspondingFilterOptionsDiv.toggleClass("disabledFilterOptions");
			}
			else{
				var $currentActive = $(".activeFilterOptions");
				if ($currentActive){
					$currentActive.toggleClass("activeFilterOptions");
					$currentActive.toggleClass("disabledFilterOptions");
				}
				$correspondingFilterOptionsDiv.toggleClass("activeFilterOptions");
				$correspondingFilterOptionsDiv.toggleClass("disabledFilterOptions");
			}
		});
	}
	var global_filters = [];
	console.log(global_filters)
	$("label:not(.filter-input)").on("click", function() {
	    //console.log($(this).find("input").prop("checked"));
	    if (!($(this).hasClass("activated"))) {
		//console.log($(this).children("input").prop("value"))
		global_filters.push($(this).children("input").attr("value"));
	     } else {
		var index = global_filters.indexOf($(this).children("input").attr("value"));
		if (index) {
		    global_filters.splice(index, 1);
		}else {
		    global_filters = [];   
		}
	    }
	    console.log(global_filters);
	});
	
	$(".filter-text").off("click").on("click", function() {
	    var my_input = ($(this).parent().find("input"))
	    console.log(my_input.val());
	    if (my_input.val() != "" && (global_filters.indexOf(my_input.val()) == -1)) {
		global_filters.push(my_input.val());
		$("#department-tags").append(my_input.val() + " x ")
	    } else {
		var index = global_filters.indexOf(my_input.val());
		if (index) {
		    global_filters.splice(index, 1);
		}
	    }
	    console.log(global_filters);
	});

	bindFilterOpen();
	var pageNum = 1;

			$.get(
				"/courses/"+(pageNum),
				function(data){
					if(data){
						data.forEach(function(val,index){
							createCard(val);
						});
					}
				}

	);
>>>>>>> Stashed changes


});

