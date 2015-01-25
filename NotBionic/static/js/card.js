//File with the logic to create a card.

var iconDict = {
  "CHEM" : "chem.png",
  "CMCS" : "cmsc.png",
  "ECON" : "econ.png",
  "ENGL" : "engl.png",
  "MATH" : "math.png",
  "PHIL" : "phil.png",
  "PHYS" : "phys.png",
  "ENGR" : "engr.png",
  "ARCH" : "arch.jpg",
  "ANTH" : "anthro.png",
  "ARTW" : "artw.jpg",
  "HIST" : "hist.jpg",
  "BIOL"  : "biol.jpg",
  "PEAC"  :  "peac.jpg",
  "CITY"  :  "city.jpg",
  "RELG"  :   "relg.jpg",
  "PSYC"  :  "psyc.png"
  };

function createCard(courseData){

  /*from http://yellowicons.com/wp-content/uploads/Shopping-Cart-Icon-1.png*/
  var icon = iconDict[courseData.reg_id.substring(0,4)];

  var card = "<a class='fancyboxClass fancybox.ajax' href='/render_course/" +
             courseData.reg_id + "'>" +
             "<div class='card_container'>" +

             "<div reg_id='"+courseData.reg_id+"' " +
                   "class='button button-shop-course'>" +
                "<img src='/static/images/shopping-cart.png' " +
                "class='card_shopping_cart'>" +
             "</div>" +

             "<div class='card_course_id'>" +
               courseData.reg_id.substring(0, courseData.reg_id.length-3) +
             "</div>" +

             "<div class='card_icon'>" +
              "<img src='/static/images/" + icon + "'>" +
             "</div>" +

             "<div class='card_title'>"+
               courseData.title +
             "</div>" +

             "<div class='card_instructor'>" +
               courseData.instructor +
             "</div>"+
             "<div class='card_time'>"+
               times(courseData) +
             "</div>";


  $(".cards_container").append(card);
}

function times(courseData){
  var returnString = "";
  if (courseData){
    if(courseData.days){
      returnString = courseData.days.join("");
      if(courseData.start_times){
        returnString = returnString+" @ " +courseData.start_times[0];
        if (courseData.end_times){
          returnString = returnString + "-" + courseData.end_times[0];
        }
      }
      else{
        returnString = "time TBD";
      }
    }
  }
  return returnString;
}
