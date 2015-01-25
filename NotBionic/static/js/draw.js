
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
		block.text(course.reg_id);
	        block.css('border-bottom','none');
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

    return false;
}

