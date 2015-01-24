$( document ).ready(function() {

	//Click binds
	function bindFilterOpen(){
		$(".filter").on("click", function(){
			var $this = $(this); //Used to speed to up calls to this $(this)
			var dataDiv = $this.data("filter");
			var $correspondingFilterOptionsDiv = $("#"+dataDiv+"-filterOptions"); //Similarly use to speed up calls
			if ($correspondingFilterOptionsDiv.hasClass("activeFilterOptions")){
				$correspondingFilterOptionsDiv.toggleClass("activeFilterOptions");
				$correspondingFilterOptionsDiv.toggleClass("disabledFilterOptions");
			}
			else{
				var $currentActive = $("activeFilterOptions");
				if ($currentActive){
					$currentActive.toggleClass("activeFilterOptions");
					$currentActive.toggleClass("disabledFilterOptions");
				}
				$correspondingFilterOptionsDiv.toggleClass("activeFilterOptions");
				$correspondingFilterOptionsDiv.toggleClass("disabledFilterOptions");
			}
		});
	}

	bindFilterOpen();
});
