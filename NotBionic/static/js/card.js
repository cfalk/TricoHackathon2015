/*
{"division": "", "description": "An introduction to the methods and theories of cultural anthropology in order to understand and explain cultural similarities and differences among contemporary societies .",
 "title": "Intro to Cultural Anthropology", "course_cap": null, "id": 1, "start_times": ["11:10am"], "days": ["M", "W", "F"], "end_times": ["12:00pm"],
  "reg_id": "ANTHB102001", "department": "Anthropology", "semester": "spring_2014", "college": "bryn_mawr", "location": "DAL119", "course_num": 1006, "distribution": "", "department_num": 102, "seminar": ""}
  */
//File with the logic to create a card

function createCard(courseData){
	//The image needs to be picked properly, for now, the dict is not created
		/*<div class="cards_container">
			<div class="card_container">
					<div class="card_icon">
						<img src="http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png" class="card_icon">
					</div>
						<div class="card_information">	
								<div class="card_header">

									<!--FANCYBOX call-->
									<a class="various fancybox.ajax" href="/course/info.html"><h3 class="card_title">course.title</h3></a>
									
									<h4 class="card_subtitle">course.subtitle</h4>
								</div>
								<div class="card_description">course.description</div>
								<div class="card_hours">course.hours</div>
							<div class="card_stats">
								<div class="card_coursenumber">			
									<h4>course.number</h4>				
								</div>
							</div>
							<div class="inactiveCardButton cardButtons add-course">
								<button class="button button--add-course">Add Course to Shopping Cart</button>
							</div>
							<div class="inactiveCardButton cardButtons course-moreinfo">
								<button class="button button--more-info">More info...</button>
							</div>	
						</div>
			</div>
		</div>*/
	var $course_id = 5;
	var $cardsContainer = $(".cards_container");

	$cardsContainer.append($('<a class="various fancybox.ajax" href="/render_course/' + courseData.reg_id + '">')
							.append($('<div class="card_container">')
							.append($('<div class="card_header">')
						.append($('<div class="card_course_id">')
								.append('<h4>' + $course_id + '</h4>'))
						.append($('<div class="card_icon">')
							.append('<img src="http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png" class="card_icon">')
						))
						.append($('<div class="card_information">')
							.append($('<div class="card_title">')
								.append('<a class="various fancybox.ajax" href="/render_course/' + courseData.reg_id + '><h3>'+courseData.title+'</h3></a>')
							)
							.append('<div class="card_hours">'+courseData.days.join()+" at " + courseData.start_times[0]+' - '+courseData.end_times[0]+'</div>')
							.append($('<div class="card_stats">')
								.append($('<div class="card_coursenumber>')
									.append('<h4>'+courseData.department + ' ' + courseData.department_num + '</h4>')
								)
							)
							.append('<div class="inactiveCardButton cardButtons add-course"><button class="button button--add-course">Add Course to Shopping Cart</button></div><div class="inactiveCardButton cardButtons course-moreinfo"><button class="button button--more-info">More info...</button></div>')
						)
					));
}