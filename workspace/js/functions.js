
$("#menuWorkspace").addClass("active");

/////////////




//Helpful code for updating the data in task.
$('#modalDisplayTask').on('hidden.bs.modal', function () {
    let isEdit = $("#hiddenIfTaskUpdate").val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let workspaceID = $("#hiddenDisplayWorkspaceID").val();

    if(isEdit != "1"){
        displayTask(activityID)
        displayAllTaskByWorkspace(workspaceID)
    }

    // console.log('WORKSPACE Modal closed: '+isEdit); 
    // $("#hiddenIfTaskUpdate").val("0");
});


$('#btnExportAllTask').on('click', function() {
    let workspaceID = $("#selectWorkspace").val();

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getAllTaskByWorkspace.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(data) {

            let exportFileName = "Task.xlsx";
            let jsonDataExport = data.map(obj => {
                
                return {
                    "TASK DESCRIPTION": obj.b,
                    "TARGET": obj.d,
                    "ASSIGNEE": setNameAssignee(obj.k),
                    "DEPARTMENT": setUserDepartment(setAssigneeUserCode(obj.k)),
                    "PRIORITY": setPriority(obj.e),
                    "STATUS": setStatus(obj.f),
                    // "DELAY": calculateDelayDate(obj.d, obj.f),
                    "START": obj.g,
                    "FINISH": obj.h,
                    "CREATED BY": setUserFullName(obj.n),
                    "ACTIVITY": obj.o,
                    "CATEGORY": obj.p,
                    "WORKSPACE": obj.q,
                }
            });

            exportToExcel(jsonDataExport, exportFileName);
            // console.log(jsonDataExport);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
});






/////////////

// Generate the calendar
// generateCalendar();

function generateCalendar() {
    // Get the reference to the calendar table body
    var calendarBody = document.querySelector('#calendar tbody');
    // Create a date object for the current month
    var currentDate = new Date();
    
    // Clear the calendar body
    calendarBody.innerHTML = '';

    // Get the year and month
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();

    // Set the date to the 1st of the month
    var firstDay = new Date(year, month, 1);

    // Get the number of days in the month
    var lastDay = new Date(year, month + 1, 0).getDate();

    // Start creating calendar rows
    var row = document.createElement('tr');

    // Fill in the preceding empty cells
    for (var i = 0; i < firstDay.getDay(); i++) {
        var cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Fill in the days of the month
    for (var day = 1; day <= lastDay; day++) {
        var cell = document.createElement('td');
        cell.textContent = day;

        // Highlight the current day
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
        cell.classList.add('current-day');
        }

        row.appendChild(cell);

        // Start a new row at the beginning of the week
        if (row.children.length === 7) {
        calendarBody.appendChild(row);
        row = document.createElement('tr');
        }
    }

    // Add the last row to the calendar
    calendarBody.appendChild(row);
    $(".current-day").css("background-color", "yellow");
    $("#displayMonth").text(setMonth(month + 1) + " "+ year);
}

function setMonth(num){
    let list = [
        {"a":"1", "b":"JANUARY"},
        {"a":"2", "b":"FEBRUARY"},
        {"a":"3", "b":"MARCH"},
        {"a":"4", "b":"APRIL"},
        {"a":"5", "b":"MAY"},
        {"a":"6", "b":"JUNE"},
        {"a":"7", "b":"JULY"},
        {"a":"8", "b":"AUGUST"},
        {"a":"9", "b":"SEPTEMBER"},
        {"a":"10", "b":"OCTOBER"},
        {"a":"11", "b":"NOVEMBER"},
        {"a":"12", "b":"DECEMBER"},
    ];
    let desc = "";

    for(let index = 0; index < list.length; index++){
        if(num == list[index].a){
            desc = list[index].b;
            break;
        }
    }

    return desc;

}






