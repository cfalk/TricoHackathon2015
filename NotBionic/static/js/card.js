//File with the logic to create a card.

iconDict = {
  "CHEM" : "chem.png",
  "CMSC" : "cmsc.png",
  "ECON" : "econ.png",
  "ENGL" : "engl.png",
  "MATH" : "math.png",
  "PHIL" : "phil.png",
  "PHYS" : "phys.png",
  "ENGR" : "engr.png",
  "ARCH" : "arch.png",
  "ANTH" : "anthro.png",
  "ARTW" : "artw.png",
  "HIST" : "hist.png",
  "BIOL"  : "biol.png",
  "PEAC"  :  "peac.png",
  "CITY"  :  "city.png",
  "RELG"  :   "relg.png",
  "PSYC"  :  "psyc.png"
  };

var colorDict = {};
var colors = [
  "#8dd3c7",
  "#fb8072",
  "#bebada",
  "#80b1d3",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffed6f"
]

var colorCounter = 0;

function getColor(reg_id) {
  var color = colorDict[reg_id];
  if (color===undefined) {

    if (colorCounter>=colors.length) colorCounter = 0;

    // Assign colors to each reg_id.
    color = colors[colorCounter++];
    colorDict[reg_id] = color;
  }
  return color;
}

function shoppingCartButton(reg_id) {
  return "<div reg_id='"+reg_id+"' class='button button-card shop'>" +
            "<img src='/static/images/shopping-cart.png'>" +
          "</div>";
}

function thumbsUpButton(reg_id) {
  return "<div reg_id='"+reg_id+"' class='button button-card approve'>" +
            "<img src='/static/images/thumbs.png'>" +
          "</div>";
}

function trashButton(reg_id) {
  return "<div reg_id='"+reg_id+"' class='button button-card trash'>" +
            "<img src='/static/images/trash.png'>" +
          "</div>";
}

function toggleVisButton(reg_id) {
  return "<div reg_id='"+reg_id+"' class='button button-card toggleVis'>" +
            "<img src='/static/images/schedule.png'>" +
          "</div>";
}


function createCard(courseData, container, buttons){

  /*from http://yellowicons.com/wp-content/uploads/Shopping-Cart-Icon-1.png*/
  var icon = iconDict[courseData.reg_id.substring(0,4)];

  if (buttons===undefined) {
    buttons = [shoppingCartButton(courseData.reg_id)];
  } else if (!buttons instanceof Array) {
    buttons = [buttons];
  }

  var color = "";
  if (container == '#confirmed') {
    color = getColor(courseData.reg_id);
  }

  var card ="<a class='fancyboxClass fancybox.ajax' href='/render_course/" +
             courseData.reg_id + "'>" +
             "<div class='card_container' style='background-color:"+color+"'>";


  for (var i=0; i<buttons.length; i++) {
    card += buttons[i];
  }

  card += "<div class='card_course_id'>" +
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
          "</div>" +

          "</div></a>";

  $card = $(card);
  $card.find(".card_container").data("course-obj", courseData);
  $(container).append($card);

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
