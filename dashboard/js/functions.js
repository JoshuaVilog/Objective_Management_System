
$("#menuDashboard").addClass("active");
$("#containerDashboard2").hide();

if(userRole == 0){
    $("#dashboardAdmin").show();
    $("#dashboardUser").hide();
} else {
    $("#dashboardAdmin").hide();
    $("#dashboardUser").show();
}

function getWorkspaceRecord(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsWorkspaceList, JSON.stringify(list));
            // console.log(list);
            $("#countWorkspace").text(list.length);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function getAllTask(statusOpen){
    // let activeYear = JSON.parse(localStorage.getItem(lsActiveYear)).RID;
    let activeYear = $("#selectYearDashboardAdmin").val();

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getAllTask.php',
        type: 'POST',
        data:{
            yearID: activeYear,
        },
        dataType: 'json',
        success: function(list) {
            // localStorage.setItem(lsAllTaskList, JSON.stringify(list));

            localStorage.removeItem(lsAllTaskList); // NIREMOVE KO MUNA YUNG ALL TASK ANDAMI NA KASI


            //COUNTS PENDING IN WORKSPACE
            let pendingCounts = {};
            
            const datePhils = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
            const year = new Date(datePhils).getFullYear();
            const month = String(new Date(datePhils).getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
            const day = String(new Date(datePhils).getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            list.forEach(obj => {
                if(obj.k != null){
                    let targetDate = obj.k;

                    if (targetDate < currentDate && obj.d !== "3") {
                        pendingCounts[obj.h] = (pendingCounts[obj.h] || 0) + 1;
                    }
                }
            });

            let pendingList = Object.keys(pendingCounts).map(id => ({ a: parseInt(id), b: pendingCounts[id] }));
            // console.log(pendingList);

            localStorage.setItem(lsAllPendingTaskList, JSON.stringify(pendingList))

            let countTotalTask = list.length;
            let countIncompleteTask = 0;
            let countCompletedTask = 0;

            for(let index = 0; index < list.length; index++){
                if(list[index].d == "3"){
                    countCompletedTask++;
                } else {
                    countIncompleteTask++;
                }

            }

            $("#countIncompleteTask").text(countIncompleteTask);
            $("#countCompletedTask").text(countCompletedTask);
            $("#countTotalTask").text(countTotalTask);

            $('#btnExportAllTask').on('click', function() {

                let exportFileName = "Task.xlsx";
                let jsonDataExport = list.map(obj => {
                    
                    return {
                        "TASK DESCRIPTION": obj.b,
                        "TARGET": obj.k,
                        "ASSIGNEE": setNameAssignee(obj.c),
                        "DEPARTMENT": setUserDepartment(setAssigneeUserCode(obj.c)),
                        "PRIORITY": setPriority(obj.o),
                        "STATUS": setStatus(obj.d),
                        // "DELAY": calculateDelayDate(obj.k, obj.d),
                        "START": obj.l,
                        "FINISH": obj.m,
                        "CREATED BY": setUserFullName(obj.n),
                        "ACTIVITY":obj.e,
                        "CATEGORY":obj.f,
                        "WORKSPACE": obj.g,
                    }
                });
    
                exportToExcel(jsonDataExport, exportFileName);
                // console.log(jsonDataExport);
            });


            // ====================================================================================== //

            table = new Tabulator("#tableRecord3", {
                
                data: list,
                layout: "fitDataFill", // Adjust table height based on the data
                groupBy:["d","g","f","e"],
                groupStartOpen: [
                    function(value, count, data, group){
                        if(value != 3){
                            return true;
                        }
        
                    },
                    function(value, count, data, group){
                        return true;
        
                    },
                    function(value, count, data, group){
                        return true;
        
                    },
                    function(value, count, data, group){
                        return statusOpen;
        
                    },
                ], 
                
                groupValues:[
                    ["4", "2", "1", "3"]
                ],
                groupHeader:[
                    function(value, count, data){ //generate header contents for gender groups
                        let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));
        
                        var result = statusList.find(function(item) {
                            return item.a === value;
                        });
                        let color;
                        if(value == "1"){
                            color = "black";
                        } else if(value == "2"){
                            color = "#1589FF";
                        } else if(value == "3"){
                            color = "#50C878";
                        } else if(value == "4"){
                            color = "black";
                        }
                            
                        return "<span style='color:"+color+"; margin-left:10px; font-size: 18px;'>"+result.b + " ("+count+")</span> ";
                        // return value + "<span style='color:#d00; margin-left:10px;'>(" + count + " item)</span>";
                    },
                    function(value, count, data){ //generate header contents for color groups
                        return value + " ("+count+")";
                    },
                    function(value, count, data){ //generate header contents for color groups
                        return value + " ("+count+")";
                    },
                    function(value, count, data){ //generate header contents for color groups
                        return value + " ("+count+")";
                    },
                ],
                
                columns: [
                    {title: "id", field: "id", visible: false},
                    {title: "ID", field: "a", visible: false},
                    {title: "#", field: "", formatter: "rownum"},
                    {title: "TASK", field: "b"},
                    {title: "ASSIGNEE", field: "c", formatter: displayTaskAssignee},
                    {title: "TARGET DATE", field: "k"},
                    {title: "STATUS", field: "d", formatter: formatterStatus},
                    {title: "DELAY", field: "", formatter: displayTaskDelayDashboard1},
                    {title: "START DATE", field: "l"},
                    {title: "FINISH DATE", field: "m"},
                    {title: "TASK CREATED BY", field: "n", formatter:displayTaskCreatedBy},
                    {title: "ACTIVITY", field: "e"},
                    {title: "CATEGORY", field: "f"},
                    {title: "WORKSPACE", field: "g"},
                ],
            });
            table.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();
        
                displayTaskInfo(rowData.a);
                
            });
        },
        error: function(error) {
            alert('Error fetching data from the database.TASK');
        }
    });

}

$("#btnApproveAllTask").click(function(){
    let workspaceID = $("#selectWorkspace3").val();

    Swal.fire({
        title: 'Are you sure you want approve all the task?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            let taskList = [];
            $('#taskForApprovingByWorkspaceRecord .spanTaskID').each(function () {
                var inputValue = $(this).text();
                
                taskList.push(inputValue);
            });

            let dataArray = {
                userCode: userCode,
                taskIDList: taskList,
            }

            $("#btnApproveAllTask").prop("disabled", true);
            //SHOw LOADING HERE

            // console.log(taskList);
            setTimeout(() => {
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/updateAllTaskStatus.php',
                    type: 'POST',
                    data:JSON.stringify(dataArray),
                    success: function(response) {
                        console.log(response);
    
                        displayTaskForApprovingByWorkspace(workspaceID);
                        
                        $("#btnApproveAllTask").prop("disabled", false);
                        //HIDE LOADING HERE
                    },
                    error: function(error) {
                        
                        alert('Error fetching data from the database.');
                    }
                });
            }, 700);
            

        }
    })

    
});

$("#containerDashboardWorkspace").on("dblclick", ".tblShowWorkspace", function(){
    let workspaceID = $(this).find(".hiddentblWorkspaceID").val();

    let savedList = {
        workspaceID: workspaceID,
        yearID: setWorkspaceYearID(workspaceID),
        categoryID: 0,
        categoryDesc: "",
    }

    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedList));

    window.location.href="/"+rootFolder+"/workspace/index.php?workspaceID="+workspaceID;

});

//Helpful code for updating the data in task.
$('#modalDisplayTask').on('hidden.bs.modal', function () {
    let isEdit = $("#hiddenIfTaskUpdate").val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    if(isEdit != "1"){

        if(userRole == "1"){
            // IF USER OR POWER USER
            generateDashboard1();
        } else {
            // IF ADMIN
            // generateDashboard2()
            // generateAllTask()
            getAllTask() // ALL TASK LIST
            setTimeout(generateDashboard2, 1000);
            setTimeout(generateAllTask, 500);
        }
        
        // displayTask(activityID)
    }

    // console.log('WORKSPACE Modal closed: '+isEdit); 
    // $("#hiddenIfTaskUpdate").val("0");
});



let tableForApproving;

function displayTaskForApprovingByWorkspace(workspaceID){

    // console.log(setUserUserRole(userCode));
    if(setUserUserRole(userCode) != "1"){
       
        $("#containerTaskForApproving").show();

        $.ajax({
            url: '/'+rootFolder+'/getRecords/getTaskForApprovingByWorkspace.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                workspaceID: workspaceID,
            },
            dataType: 'json',
            success: function(data) {
        
                // let varTable = "#tableTaskRecords"+ activityID;
                // subtable.clearData();
                // data = data.filter(item => item.n !== "1");
                
                tableForApproving = new Tabulator("#taskForApprovingByWorkspaceRecord", {
                    data: data,
                    layout: "fitDataFill", // Adjust table height based on the data
                    
                    columns: [
                        {title: "RID", field: "a", headerFilter: "input", visible:false, formatter:displayTaskID, },
                        {title: "TASK DESCRIPTION", field: "b", headerFilter: "input", headerFilterPlaceholder: "Filter Description"},
                        {title: "TARGET", field: "d"},
                        {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                        {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                        {title: "STATUS", field: "f", formatter: displayTaskStatus},
                        {title: "START", field: "g"},
                        {title: "FINISH", field: "h"},
                        {title: "TASK CREATED BY", field: "n", formatter: displayTaskCreatedBy,},
                        // {title: "Action", field:"a", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
                    ],
                });
        
                tableForApproving.on("rowClick", function(e, row) {
                    // Get the row data for the clicked row
                    var rowData = row.getData();
    
                    displayTaskInfo(rowData.a);
    
                });

                if(data.length > 0){
                    $("#btnApproveAllTask").prop("disabled", false)
                } else {
                    $("#btnApproveAllTask").prop("disabled", true)
                }
                
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });

    } else {
        $("#containerTaskForApproving").hide();

    }
}









































///////////////////////////////////////////////////////////////////////


// Get the reference to the calendar table body
var calendarBody = document.querySelector('#calendar tbody');
// Create a date object for the current month
var currentDate = new Date();

// Generate the calendar
// generateCalendar(currentDate);

function generateCalendar(date) {
    // Clear the calendar body
    calendarBody.innerHTML = '';

    // Get the year and month
    var year = date.getFullYear();
    var month = date.getMonth();

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
}