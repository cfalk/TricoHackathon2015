$(document).ready(function(){
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
	bindFilterOpen();
	var pageNum = 1;

	$(window).scroll(function(){
		if($(window).scrollTop() == $(document).height() - $(window).height()){ //If statement copied from http://www.sitepoint.com/jquery-infinite-scrolling-demos/
			//This means that we have scrolled to the bottom of the page
			pageNum=pageNum+1;
			$.get({
				url:"/courses/"+(pageNum),
				success:function(data){

				},
				error:function(error){
					alert(error);
				}
			});
		}
	});
});