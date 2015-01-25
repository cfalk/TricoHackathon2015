$(document).ready(function() {
    var schedule = $('#schedule');
    // Create the header information for the table
    schedule.append('<table>');
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    schedule.append('<tr>')
    schedule.append('<th></th>')
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
		}
	    }
	    else {
		if(i%2 == 0){
		    schedule.append('<td class="visualBlock" id="'+days[j-1].toString()+'-'+time_counter.toString()+'00"></td>');
		}
		else if(time_counter-1==0){
		    schedule.append('<td id="'+days[j-1].toString()+'-1230"></td>');
		}
		else {
		    // need to subtract 1 from time counter because it is incremented prematurely above
		    schedule.append('<td id="'+days[j-1].toString()+'-'+(time_counter-1).toString()+'30"></td>');
		}
	    }
	    if (time_counter == 12 && i%2 != 0 && j==0) {
		time_counter = 1;
	    }
	    else if (i%2 != 0 && j==0) {
		time_counter++;
	    }
	}
	schedule.append('</tr>');
    }
    schedule.append('<tr>');
    for(var i=0;i<8;i++) {
	if (i==0) {
	    schedule.append('<td>7:00</td>');
	}
	else {
	    schedule.append('<td></td>');
	}
    }
    schedule.append('</tr>')
    // need this to change the given day information into the same form as the one used for the class labeling
    $.get( "/user_courses/", function( data ) {
	for(var i=0;i<data.schedule.length;i++) {
	    $.get( "/course/"+data.schedule[i]+"/", function( course ) {
		drawClass(course);
	    });
	}
    });

    $('#schedule').on('click', '.occupiedSlot', function(){
	var classes = $(this)[0].className;
	var split = classes.split(" ");
	var reg_id = split[0];
	if (split[0] == 'occupiedSlot'){
	    reg_id = split[1];
	}
	$.get('/course/'+reg_id+'/', function( data ){
	    var string = "<h1>"+data.title+"</h1>";
	    string = string + "<p style='width:400px;'>"+data.description+"</p>";
	    $.fancybox.open(string);
	});
    });
});

var days_key = {'M':'Monday','Tu':'Tuesday','W':'Wednesday','Th':'Thursday','F':'Friday'};

