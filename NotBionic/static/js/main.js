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
	
	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});

	function onCardHover(){
		var hoverObject = {
			mouseenter:function(){
				var $this = $(this);
				$this.toggleClass("activeCard");
				var cardButtons = $this.find(".cardButtons");
				cardButtons.toggleClass("activeCardButton");
				cardButtons.toggleClass("inactiveCardButton");
			},
			mouseleave:function(){
				var $this = $(this);
				$this.toggleClass("activeCard");
				var cardButtons = $this.find(".cardButtons");
				cardButtons.toggleClass("activeCardButton");
				cardButtons.toggleClass("inactiveCardButton");
			}
		};

		$("#cardDisplayArea").on(hoverObject,".card_container"); //Using the object version of on, which is why it follows this prototype, also allows for dynamic adding/removing of cards
	}

	bindFilterOpen();
	onCardHover();
});
