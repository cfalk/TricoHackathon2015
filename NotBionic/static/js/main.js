$( document ).ready(function() {
	//Click binds

	$(".fancyboxClass").fancybox({
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

	onCardHover();

});
