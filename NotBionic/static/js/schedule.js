$(document).ready(function() {
    var schedule = $('#schedule');
    // Create the header information for the table
    schedule.append('<table id=schedule>');
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    schedule.append('<tr>')
    schedule.append('<th>Times</th>')
    for(var i=0;i<days.length;i++){
	schedule.append('<th>'+days[i]+'</th>');
    }
    schedule.append('</tr>');
    var time_counter = 8;
    for(var i=0;i<17;i++) {
	schedule.append('<tr>')
	for(var j=0;j<8;j++) {
	    if (j==0){
		if (i%2 == 0) {
		    schedule.append('<td>'+time_counter.toString()+':00</td>');
		}
		else {
		    schedule.append('<td>'+time_counter.toString()+':30</td>');
		    if (time_counter == 12) {
			time_counter = 1;
		    }
		    else {
			time_counter++;
		    }
		}
	    }
	    else {
	    schedule.append('<td class='+days[j-1].toString()+'></td>');
	    }
	}
	schedule.append('</tr>');
    }
    $.get( "/user_courses/", function( data ) {
	for(var i=0;i<data.schedule.length;i++) {
	    $.get( "/course/"+data.schedule[i]+"/", function( course ) {
		var start_time = course.start_times[0];
		var end_time = course.end_times[0];
		var days = course.days;
		schedule.append('here: ' + course);
	    }); 
	}
    });
});

