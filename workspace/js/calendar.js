

var calendar = $('#calendar').fullCalendar({
    buttonHtml: {
        prev: '<i class="ace-icon fa fa-chevron-left"></i>',
        next: '<i class="ace-icon fa fa-chevron-right"></i>'
    },

    header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
    },
    events: eventList,
    
    selectable: true,
    
    // Add eventClick handler
    eventClick: function(event, jsEvent, view) {
        let title = event.title;
        let taskID = event.id;

        displayTaskInfo(taskID);
    }
    
    
});



$("#aTabWorkspace1").click(function(){
    
    $("#containerCalendar").hide();
});
$("#aTabWorkspace2").click(function(){
    
    $("#containerCalendar").hide();
});
$("#aTabWorkspace3").click(function(){
    
    $("#containerCalendar").show();
}); 


function setCalendar(list){
    $('#calendar').fullCalendar('removeEvents');

    
    setTimeout(() => {
        // Add new events
        // $('#calendar').fullCalendar('addEventSource', list);
        // $('#calendar').fullCalendar('refetchEvents', eventList);
        // alert("HEY")
    }, 1000);
    
}


/* 
$(document).ready(function() {
    $('#calendar').fullCalendar({
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Meeting',
                start: '2024-10-01T10:00:00',
                end: '2024-10-01T11:00:00',
                color: '#378006' // green color for this event
            },
            {
                title: 'Lunch Break',
                start: '2024-10-02T12:00:00',
                color: '#ff9f89' // custom color for this event
            },
            {
                title: 'Conference',
                start: '2024-10-03',
                end: '2024-10-05',
                color: '#0071c5' // blue color
            },
            {
                title: 'Birthday Party',
                start: '2024-10-07T19:00:00',
                color: '#ff5733' // orange color
            }
        ]
    });
}); 
*/


