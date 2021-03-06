$(document).ready(function() {
    var schedule_box = $('#schedule');
    var schedule = ""

    // Don't show the table if the user isn't logged in.
    if ($("#login-user").length) { return false; }

    // Create the header information for the table
    schedule = schedule + '<table>';
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    schedule = schedule + '<tr>'
    schedule = schedule + '<th></th>'
    for(var i=0;i<days.length;i++){
	schedule = schedule + '<th>'+days[i]+'</th>';
    }
    schedule = schedule + '</tr>';
    var time_counter = 8;
    for(var i=0;i<17;i++) {
	schedule = schedule + '<tr>'
	for(var j=0;j<8;j++) {
	    if (j==0){
		if (i%2 == 0) {
		    schedule = schedule + '<td>'+time_counter.toString()+':00</td>';
		}
		else {
		    schedule = schedule + '<td>'+time_counter.toString()+':30</td>';
		}
	    }
	    else {
		if(i%2 == 0){
		    schedule = schedule + '<td class="visualBlock" id="'+days[j-1].toString()+'-'+time_counter.toString()+'00"></td>';
		}
		else if(time_counter-1==0){
		    schedule = schedule + '<td id="'+days[j-1].toString()+'-1230"></td>';
		}
		else {
		    // need to subtract 1 from time counter because it is incremented prematurely above
		    schedule = schedule + '<td id="'+days[j-1].toString()+'-'+(time_counter-1).toString()+'30"></td>';
		}
	    }
	    if (time_counter == 12 && i%2 != 0 && j==0) {
		time_counter = 1;
	    }
	    else if (i%2 != 0 && j==0) {
		time_counter++;
	    }
	}
	schedule = schedule + '</tr>';
    }
    schedule = schedule + '<tr>';
    for(var i=0;i<8;i++) {
	if (i==0) {
	    schedule = schedule + '<td>7:00</td>';
	}
	else {
	    schedule = schedule + '<td></td>';
	}
    }
    schedule = schedule + '</tr>'
    schedule = schedule +'</table>'
    schedule_box.append(schedule)
    // need this to change the given day information into the same form as the one used for the class labeling
    $.get( "/user_courses/", function( data ) {
	for(var i=0;i<data.schedule.length;i++) {
	    $.get( "/course/"+data.schedule[i]+"/", function( course ) {
		drawClass(course);
	    });
	}
    });

    $('#schedule').on('click', '.occupiedSlot', function(){
        var reg_id = $(this).attr("reg_id");
	$.get('/course/'+reg_id+'/', function( data ){
	    var string = "<h1>"+data.title+"</h1>";
	    string = string + "<p style='width:400px;'>"+data.description+"</p>";
	    $.fancybox.open(string);
	});
    });
});

var days_key = {'M':'Monday','Tu':'Tuesday','W':'Wednesday','Th':'Thursday','F':'Friday'};

function drawClass(course) {
    var color = getColor(course.reg_id);
    var start_time = course.start_times[0];
    var end_time = course.end_times[0];
    var days = course.days;
    var start_hour = 0;
    var start_minute = 0;
    var end_hour = 0;
    var end_minute = 0;
    var error = false;
    if(start_time.charAt(0) == "0") {
	start_hour = parseInt(start_time.charAt(1));
    }
    else {
	start_hour = parseInt(start_time.substring(0,2));
    }
    var min = parseInt(start_time.charAt(3));
    if(min < 3) {
	start_minute = "00";
    }
    else{
	start_minute = '30';
    }
    try{
	if(end_time.charAt(0) == "0") {
	    end_hour = parseInt(end_time.charAt(1));
	}
	else {
	    end_hour = parseInt(end_time.substring(0,2));
	}
    }
    catch(err) {
	error = true;
    }
    try{
	var min = parseInt(end_time.charAt(3));
	if(min < 3) {
	    end_minute = "00";
	}
	else{
	    end_minute = '30';
	}
    }
    catch(err) {
	error=true;
    }
    for(var j=0;j<days.length;j++) {
	var temp_hour = start_hour;
	var temp_minute = start_minute;
	var counter = 0;
	var last = false;
	while((temp_hour != end_hour || temp_minute != end_minute) && !(error)) {
	    var block = $('#'+days_key[days[j]]+'-'+temp_hour+temp_minute);
	    if(temp_hour == 12 && temp_minute == '30') {
		temp_hour = 1;
	    }
	    else if (temp_minute == '30') {
		temp_hour++;
	    }
	    if(temp_minute == '30'){
		temp_minute = '00';
	    }
	    else {
		temp_minute = '30'
	    }
	    block.css('background-color',color);
	    block.css('cursor','pointer');
	    if(counter == 0) {
		block.text(course.reg_id.substring(0,course.reg_id.length-3));
	        block.css('border-bottom','none');
		block.css('padding','5px');
	    }
	    else if(!(temp_hour != end_hour || temp_minute != end_minute)){
		block.css('border-top','none');
	    }
	    else {
		block.css('border-bottom','none')
		block.css('border-top','none');
	    }
	    block.attr("reg_id",course.reg_id);
	    block.addClass("occupiedSlot");
	    counter++;
	}
    }
}
