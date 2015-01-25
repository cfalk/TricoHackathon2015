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
		"PHYS" : "phys.png",
		"ENGR" : "engr.png",
		/*https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRo7rT08EadJKMlMYnDHzyC6w3uZl8v_pdQJQ9hUu4Q4Qo9c6WM47y46AA*/
		"ARCH" : "arch.jpg",
		/*https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS9qI_8jIToLsP8GKYZAInJ9bBAzBw5NEWjWxJbDcaTRtqZfqCPRQ*/
		"ARTW" : "artw.jpg",
		/*data:image/jpeg;base64,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*/
		"HIST" : "hist.jpg",
		/*https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQNL3yM3FpZDVcx1GGVEYkm4jxxW2-BIeXeGUTFbheId5fU804Hcg*/
		"BIOL"  : "biol.jpg",
		/*https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt80AkP_6am-DaqFN0Jsw7iMRmjxEnj5f0prPEGZkVZ9zflEdqbw*/
		"PEAC"  :  "peac.jpg",
		/*https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5j_ww5WJANwiCSUCrOJ2lwANzwLJjjHVozwA7L9tUBU0OK-y*/
		"CITY"  :  "city.jpg",
		/*https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSFnRg737Rk-M5i2LULB1AsKnXKbuWoNHWvx_4axdd0EA5SYj-t*/
		"RELG"  :   "relg.jpg",
		/*https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRYees8NmA0JzRNvKbWtroiurLrMSXGlZVlyrUNFWxnh7C_1JVWLg*/
		"PSYC"  :  "psyc.png"
		/*https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTn9j3uJRUMV-Y1wjNqCfGiNqdisrgNag_3stxMXE0lJ14v65qb*/
 	};

 	/*from http://yellowicons.com/wp-content/uploads/Shopping-Cart-Icon-1.png*/
	var cartIcon = "shopping-cart.png";

	$cardsContainer.append($('<a class="fancyboxClass fancybox.ajax" id="'+courseData.reg_id+'_top" href="/render_course/' + courseData.reg_id + '">')
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
					.append($('<a class="fancyboxClass fancybox.ajax" href="/render_course/' + courseData.reg_id + '">')
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
