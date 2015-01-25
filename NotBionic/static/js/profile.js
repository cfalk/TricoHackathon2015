/*
{"division": "", "description": "An introduction to the methods and theories of cultural anthropology in order to understand and explain cultural similarities and differences among contemporary societies .",
 "title": "Intro to Cultural Anthropology", "course_cap": null, "id": 1, "start_times": ["11:10am"], "days": ["M", "W", "F"], "end_times": ["12:00pm"],
  "reg_id": "ANTHB102001", "department": "Anthropology", "semester": "spring_2014", "college": "bryn_mawr", "location": "DAL119", "course_num": 1006, "distribution": "", "department_num": 102, "seminar": ""}
  */
//File with the logic to create a card

function createCard(courseData, container){
	var $cardsContainer = $(container);
	var iconDict = {
		"CHEM" : "chem.png",
		"CMCS" : "cmsc.png",
		"ECON" : "econ.png",
		"ENGL" : "engl.png",
		"MATH" : "math.png",
		"PHIL" : "phil.png",
		"PHYS" : "phys.png"
 	};

 	/*from http://yellowicons.com/wp-content/uploads/Shopping-Cart-Icon-1.png*/
	var cartIcon = "shopping-cart.png"; 

	$cardsContainer.append($('<a class="various fancybox.ajax" id="'+courseData.reg_id+'_top" href="/render_course/' + courseData.reg_id + '">')
		    .append($('<div class="card_container">')
			.append($('<div class="card_header">')
			    .append($('<button reg_id="'+courseData.reg_id+'" class="button button-add-course">'+confirmIcon+'</button>'))
			    .append($('<button reg_id="'+courseData.reg_id+'" class="button button-remove-course">'+rejectIcon+'</button>'))
			.append($('<div class="card_course_id">')
					.append('<h4>'+ courseData.reg_id.substring(0,courseData.reg_id.length-3) + '</h4>'))
			.append($('<div class="card_icon">')
				.append('<img src="/static/images/' + iconDict[courseData.reg_id.substring(0,4)] + '" class="card_icon">')
			))
			.append($('<div class="card_information">')
				.append($('<div class="card_title">')
					.append($('<a class="various fancybox.ajax" href="/render_course/' + courseData.reg_id + '">')
						.append($('<h3>').html(courseData.title)))
				)
				.append('<div class="card_instructor">' + courseData.instructor + '</div>')
				.append('<div class="card_hours">'+courseData.days.join("") + " at " + courseData.start_times[0]+' - '+courseData.end_times[0]+'</div>')
				
				)
		));
}

$(document).ready(function(){
    $.get("/user_courses/", function(courses) {
	console.log(courses.shopping_cart);
	for(var i=0;i<courses.shopping_cart.length;i++){
	    $.get("/course/"+courses.shopping_cart[i]+'/', function(data){
		if(data){
		    createCard(data,".profile_shopping_cards_container");
		}
	    });
	}
	for(var i=0;i<courses.schedule.length;i++){
	    $.get("/course/"+courses.schedule[i]+'/', function(data){
		if(data){
		    createCard(data,".profile_schedule_cards_container");
		}
	    });
	}
    });
});
