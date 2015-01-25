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
	$("input").on("click", function() {
	    if ($(this).is(":checked")) {
		global_filters.push(this.value);
	     } else {
		var index = global_filters.indexOf(this.name);
		if (index) {
		    global_filters.splice(index, 1);
		}
	    }
	    console.log(global_filters);
	});
	
	$("input").on("keyup", function() {
	    if (!($("input").is(":empty"))) {
		global_filters.push(this.value);
	    } else {
		var index = global_filters.indexOf(this.value);
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


});
