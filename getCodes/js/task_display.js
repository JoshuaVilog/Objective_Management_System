
$("#containerCategory").hide();
$("#containerActivity").hide();

// reloadSavedWorkspace();

var table;
var subtable;
var actionitem;

let eventList = []; // THIS CODE IS FOR CALENDAR

setTimeout(() => {
    $("#containerCalendar").hide(); 
    
}, 1200);

// =============================================================== //
// CATEGORY

function displayCategory(workspaceID){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getCategory.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            let container = $("#listCategory");

            if(data.length > 0){
                let element = '';

                for(let index = 0; index < data.length; index++){
                    element += createElementCategory(data[index].a, data[index].b);
                }
            
                container.html(element)
            } else {
                container.html('<p>-No Categories Added-</p>');
            }


            //POPULATE SELECT IN MOVE TASK MODAL
            let element = '<option>-Select-</option>';
            for(let index = 0; index < data.length; index++){
                element += '<option value="'+data[index].a+'">'+data[index].b+'</option>'
                // element += createElementCategory(data[index].a, data[index].b);
            }
            $("#selectMT_Category").html(element)
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}
function displayMembers(workspaceID){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getMembers.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            $("#txtArrayMembers").val(JSON.stringify(data))
            let container = $("#listMembers");

            if(data.length > 0){
                let element = '';

                
                for(let index = 0; index < data.length; index++){
                    if(data[index].c == "2" || data[index].c == "3"){
                        element += "<li>"+data[index].b+"</li>";
                    }
                }
                
            
                container.html(element)
            } else {
                container.html('<p>-No Members Added-</p>');
            }
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}
function displayMembersOnTask(workspaceID){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getMembers.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(membersList) {
            // console.log(membersList);
            membersList = membersList.filter(item => item.a !== "1");

            $("#txtMemberListWorkspace").val(JSON.stringify(membersList));
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}

// ========================================================= //
// ACTIVITY

function displayActivity(categoryID){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getActivity.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            categoryID: categoryID,
        },
        dataType: 'json',
        success: function(data) {

            let container = $("#listActivity");

            if(data.length > 0){
                let element = '';

                for(let index = 0; index < data.length; index++){
                    element += createElementActivity(data[index].a, data[index].b);

                    displayTask(data[index].a);
                }
            
                container.html(element)
            } else {
                container.html('<p>-No Activity Added-</p>');
            }
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

// ========================================================= //
// TASK

function displayTask(activityID){
    // console.log("Display Task: "+activityID);
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTask.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            activityID: activityID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            let varTable = "#tableTaskRecords"+ activityID;
            let limitAction = (userRole != "1")? true: false;

            table = new Tabulator(varTable, {
                data: data,
                // layout: "fitDataFill", // Adjust table height based on the data
                dataTree:true,
                dataTreeStartExpanded: false,
                placeholder:"No Task",
                groupBy: function(data) {
                    // Group "1", "2", and "4" together, and "3" separately
                    if (data.f != "3") {
                        return "INCOMPLETE";
                    } else if (data.f === "3"){
                        return "COMPLETE";
                    }
                },
                groupStartOpen:function(value, count, data, group){
                
                    return value != "COMPLETE";
                },
                groupHeader: function(value, count, data, group){

                    return value;
                },
                groupValues:[
                    ["INCOMPLETE","COMPLETE"]
                ],
                columns: [
                    {title: "RID", field: "a", headerFilter: "input", visible:false, headerFilterPlaceholder: "Filter Description"},
                    {title: "RID", field: "id", headerFilter: "input", visible:false},
                    // {title: "NO", field: "", formatter:"rownum"}, //HINDI PALA PWEDE YUNG MAY ROWNUM SA FORMATTER NG DATATREE TABULATOR
                    {title: "TASK DESCRIPTION", field: "b", headerFilter: "input", editor:"input"},
                    {title: "TARGET", field: "d", formatter: displayDueDate},
                    {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                    {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                    {title: "STATUS", field: "f", formatter: displayTaskStatus},
                    {title: "DELAY", field: "", formatter: displayTaskDelay},
                    {title: "START", field: "g"},
                    {title: "FINISH", field: "h"},
                    {title: "TASK CREATED BY", field: "n", formatter: displayTaskCreatedBy},
                    {title: "NO OF SUBTASKS", field: "i"},
                    {title: "ACTION", field: "action", frozen: true, formatter: displayTaskAction, visible: limitAction},

                    {title: "TASK_PARENT_ID", field: "j", visible:false}, 
                    {title: "SUBTASK_PARENT_ID", field: "l", visible:false}, 
                    {title: "ACTIVITY_ID", field: "m", visible:false}, 
                    {title: "TASK_DETAILS", field: "c", visible:false},
                ],
                
            });

            table.on("rowDblClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
                
            });
            
            table.on("rowContext", function(e, row){
                var rowData = row.getData();

                /*
                if(userRole != "1"){
                    $("#liRemoveTask").attr("data-task-id", rowData.a)
                    $("#liMoveTask").attr("data-task-id", rowData.a)
                    $("#liRemoveTask").attr("data-activity-id", activityID)
    
                    hideDropDown()
                    
                    contextMenuTask.css({
                        display: "block",
                        left: e.pageX,
                        top: e.pageY
                    });
                    
                    // $("#contextMenuDiv2").hide();
                
                    e.preventDefault(); // prevent the browsers default context menu form appearing.
                }
                */
                
            });
            table.on('cellEdited', (cell) => {
                var row = cell.getRow().getData();
                var id = row.a;
                var value = cell.getValue();
                var column = cell.getField();
                let url;

                
                // console.log("ID: "+row.a)
                // console.log("VALUE: "+value)
                // console.log("COLUMN: "+column)

                if(column == "b"){
                    // TASK DESC
                    url = '/'+rootFolder+'/getCodes/php/updateTaskDesc.php';

                } else if(column == "d"){
                    // DUE DATE
                    url = '/'+rootFolder+'/getCodes/php/updateTaskDueDate.php';

                } else if(column == "e"){
                    // PRIORITY
                    url = '/'+rootFolder+'/getCodes/php/updateTaskPriority.php';

                } else if(column == "f"){
                    // STATUS
                    url = '/'+rootFolder+'/getCodes/php/updateTaskStatus.php';

                }

                $.ajax({
                    url: url, 
                    type: 'POST',
                    data:{
                        desc: value,
                        taskID: id,
                        userCode: userCode,
                    },
                    success: function(data) {
            
                        // displayTask(activityID)
            
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });


            })
            

            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function displayTaskAction(cell, formatterParams, onRendered){
    // let rowData = cell.getValue();
    var rowData = cell.getRow().getData();
    var task_id = rowData.id;
    var task_parent_id = rowData.j;
    var subtask_parent_id = rowData.l;
    var activity_id = rowData.m;

    let remove = '<button class="btn btn-minier btn-danger" onclick="removeTaskRow(\''+task_id+'\',\''+activity_id+'\',\''+task_parent_id+'\',\''+subtask_parent_id+'\')">Delete</button>';

    if(userRole != "1"){
        // table.showColumn("action");
        return remove;
    } else {
        // table.hideColumn("action");
        return "";
    }
    
}
function displayTaskID(cell){
    let value = cell.getValue();

    return '<span class="spanTaskID">'+value+'</span>'

}

function displayTaskPriority(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let priorityList = JSON.parse(localStorage.getItem(lsPriorityList));

    if(rowData == "" || rowData == null){
        return "";
    } else {
        var result = priorityList.find(function(value) {
            return value.a === rowData;
        });
    
        return  result.b;

    }
}
function displayTaskStatus(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

    if(rowData == "" || rowData == null){
        return "";
    } else {
        var result = statusList.find(function(value) {
            return value.a === rowData;
        });
        
        if(rowData == 1){
            cell.getElement().style.backgroundColor = "#FFEF00";
        } else if(rowData == 2){
            cell.getElement().style.backgroundColor = "#1589FF";
        } else if(rowData == 3){
            cell.getElement().style.backgroundColor = "#50C878";
        }
        return  result.b;

    }
}
function displayTaskAssignee(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let selectedList = (rowData == "")? "":JSON.parse(rowData);
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let element = '';

    for(let i= 0; i < userList.length; i++){
        let isSelected = false;

        for(let j = 0; j < selectedList.length; j++){
            if(selectedList[j] == userList[i].a){
                isSelected = true
            }
        }
        let fname = userList[i].c;
        let lname = userList[i].b;
        let fnameChar = fname.charAt(0);
        let lnameChar = lname.charAt(0);

        if(isSelected == true){
            // element += '<span class="badge badge-info " data-toggle="tooltip" title="'+fname+" "+lname+'">'+fnameChar+lnameChar+'</span>&nbsp;';
            return fname + " " +lname;
        }
    }
    
    // return element;
}
function displayTaskCreatedBy(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    if(rowData == "" || rowData == null){
        return "";
    } else {
        return setUserFullName(rowData)

    }
}
function displayTaskDelay(cell, formatterParams, onRendered){
    var rowData = cell.getRow().getData();
    let target = rowData.d;
    let status = rowData.f;

    return "<span class='red'>" + calculateDelayDate(target, status) + "</span>";
}
function displayDueDate(cell, formatterParams, onRendered){
    let date = cell.getValue();
    var rowData = cell.getRow().getData();
    
    const datePhils = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
    const year = new Date(datePhils).getFullYear();
    const month = String(new Date(datePhils).getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
    const day = String(new Date(datePhils).getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    if(date != ""){
        if(date < currentDate && rowData.f != "3"){
            return "<span class='red'>"+date+"</span>";
        } else if(date <= currentDate){
            return date;
        } else if(date >= currentDate){
            return date;
        }
    } else {
        return "";
    }
    

}

function displayTaskInfo(taskID){
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskInfo.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            // a = RID / TASK ID
            // b = TASK DESC
            // c = TASK DETAILS
            // d = DUE DATE
            // e = PRIORITY
            // f = STATUS
            // g = START DATE
            // h = FINISH DATE
            // i = TASK PARENT ID
            // j = TASK ASSIGNEE
            // k = SUBTASK PARENT ID
            // l = ACTIVITY ID
            // m = WORKSPACE ID
            // n = CREATED_BY

            $("#hiddenIfTaskUpdate").val("1");

            $("#hiddenDisplayTaskID").val(data.a); //PUT TASK ID ON HIDDEN INPUT
            $("#spanDisplayTaskDesc").text(data.b); // PUT TASK TITLE 
            $("#txtDisplayTaskDetails").val(data.c); // PUT TASK DETAILS
            $("#txtDisplayTaskDueDate").val(data.d); // PUT DUE DATE
            $("#txtDisplayTaskStartDate").val(data.g); //PUT START DATE
            $("#txtDisplayTaskFinishDate").val(data.h); //PUT FINISH DATE
            $("#hiddenDisplayWorkspaceID").val(data.m); //PUT WORKSPACE ID
            $("#hiddenDisplayTaskParentID").val(data.i); //PUT TASK PARENT
            $("#hiddenDisplaySubtaskParentID").val(data.k); //PUT SUBTASK PARENT
            $("#hiddenDisplayActivityID").val(data.l); //DISPLAY HIDDEN ACTIVITY ID
            $("#pDisplayTaskCreatedBy").text(setUserFullName(data.n)); //PUT CREATED_BY
            $("#hiddenDisplayTaskCreatedBy").val(data.n); //PUT CREATED_BY
            $("#hiddenDisplayTaskAssigneeID").val(setAssigneeUserCode(data.j)); //PUT CREATED_BY
            
            $("#btnUploadFiles").prop("disabled", true);
            $('#txtDisplayTaskFile').val("");
            $("#btnNotifyRequest").hide();
            $("#btnNotifyRequest").prop("disabled", false)
            $("#btnAcceptTaskRequest").hide();

            populateStatus(data.f);
            populatePriority(data.e);
            displayTaskComment(data.a);
            displayTaskActivityHistory(data.a);
            populateUser(data.j, data.m, data.a); // ASSIGNEE

            displayTaskApproverComment(data.a)
            displayFileAttachments(data.a)

            displayMembersOnTask(data.m)
            
            // console.log(data.i);
            if(data.i == 0){
                // if TASK
                $("#containerSubtaskRecord").show(); //SHOW SUBTASK RECORD
                $("#containerAddSubtask").hide(); // HIDE ADD SUBTASK
                $("#btnBackToTask").hide(); // HIDE BACK BUTTON
                $("#btnBackToSubtask").hide(); // HIDE BACK BUTTON
                $("#containerActionItemRecord").hide(); // HIDE ACTION ITEM RECORD
                $("#containerButtonSubtask").show();
                $("#containerAddSubtask").hide();

                displaySubtask(data.l, data.a) // DISPLAY SUBTASK
                // $("#hiddenDisplayActivityID").val(data.l); //DISPLAY HIDDEN ACTIVITY ID

                $("#btnBackToTask").val(data.a); //SET VALUE OWN TASK ID 
            } else {

                $("#containerSubtaskRecord").hide();

                if(data.k == 0){
                    // if SUBTASK
                    
                    $("#btnBackToTask").show(); //SHOW BACK
                    $("#btnBackToSubtask").hide(); // HIDE BACK
                    $("#containerActionItemRecord").show(); // SHOW ACTIION ITEM RECORD
                    $("#containerButtonActionItem").show(); //
                    $("#containerAddActionItem").hide(); //

                    displayActionItem(data.a);

                    $("#btnBackToTask").val(data.i); // SET VALUE TASK_PARENT_ID
                    $("#btnBackToSubtask").val(data.a); // SET VALUE OWN TASK ID
                    $("#btnBackToSubtask").hide();
                } else {
                    // if ACTION ITEM
                    
                    $("#containerActionItemRecord").hide();
                    $("#containerButtonActionItem").hide();
                    $("#btnBackToTask").hide();
                    $("#btnBackToSubtask").show();
                    $("#btnBackToSubtask").val(data.k); // SET VALUE SUBTASK_PARENT_ID

                }
            }

            

            // IF NO ASSIGNEE,  DISABLED ANG PAGCHANGE NG STATUS NG TASK
            if(data.j == "0" || data.j == "" || data.j == "[]"){
                $("#selectDisplayTaskStatus").prop("disabled", true);
            } else {
                $("#selectDisplayTaskStatus").prop("disabled", false);
            }


            // RESTRICTION/LIMIT ACCESS NG DUE DATE
            if(userRole == 1){
                // IF NORMAL YUNG USER
                
                let dueDate = $("#txtDisplayTaskDueDate").val();

                if(dueDate == ""){
                    $("#txtDisplayTaskDueDate").removeClass("disabled");
                } else {
                    $("#txtDisplayTaskDueDate").addClass("disabled");
                }
            } else {
                // IF ADMIN OR POWER USER
                $("#txtDisplayTaskDueDate").removeClass("disabled");
                $("#txtDisplayTaskStartDate").removeClass("disabled");
                $("#txtDisplayTaskFinishDate").removeClass("disabled");
            }

            // DISABLED ANG PAG CHANGE NG ASSIGNEE KAPAG COMPLETED OR FOR APPROVAL NA YUNG TASK
            if(data.f == "3" || data.f == "4"){
                $("#btnChangeAssignee").prop("disabled", true);
            } else {
                $("#btnChangeAssignee").prop("disabled", false);

            }

            // APPROVING MENU
            let taskCreator = data.n;

            $("#btnApproveTask").prop("disabled", false);
            $("#btnDisapproveTask").prop("disabled", false);

            setTimeout(() => {
                if(data.f == "4"){
                    
                    if(userRole == "0"){
                        // SI ADMIN AY MAY ACCESS KAHIT KANINO SA PAG APPROVE
                        setApprovingMenu("SHOW");
                    } else if(setMemberWorkspaceRole(userCode) == "3" && setUserUserRole(taskCreator) == "0"){
                        // KAPAG SI HEAD ANG NAG OPEN NG TASK TAPOS SI ADMIN ANG TASK CREATOR, WALA SIYA ACCESS SA PAG APPROVE
                        setApprovingMenu("HIDE");
                    } else if(setMemberWorkspaceRole(userCode) == "3" && setMemberWorkspaceRole(taskCreator) == "2"){
                        // KAPAG SI HEAD ANG NAG OPEN NG TASK TAPOS SI MEMBER ANG TASK CREATOR, MAY ACCESS SIYA SA PAG APPROVE
                        setApprovingMenu("SHOW");
                    } else if(setMemberWorkspaceRole(userCode) == "2"){
                        // SI MEMBER WALANG ACCESS SA PAG APPROVE
                        setApprovingMenu("HIDE");
                    }
                } else {
                    setApprovingMenu("HIDE");
                }
            }, 800);
            

            $("#modalDisplayTask").modal("show");
        },
        error: function(error) {
            alert('Error Displaying of Task Info: '+error);
        }
    });
}

function setApprovingMenu(e){

    if(e == "HIDE"){
        $("#containerDivTaskApprover").hide();
                    
        //CLOSE THE APPROVING MENU
        $("#tabTaskCategory3").removeClass("active");
        $("#tabTaskCategory2").removeClass("active");
        $("#tabTaskCategory1").addClass("active");
        $("#tabTaskCategory3").removeClass("in");
        $("#tabTaskCategory2").removeClass("in");
        $("#tabTaskCategory1").addClass("in");

        $("#liTaskCategory3").removeClass("active");
        $("#liTaskCategory2").removeClass("active");
        $("#liTaskCategory1").addClass("active");

    } else if(e == "SHOW"){
        $("#containerDivTaskApprover").show();

        //OPENS THE APPROVING MENU
        $("#tabTaskCategory3").addClass("active");
        $("#tabTaskCategory2").removeClass("active");
        $("#tabTaskCategory1").removeClass("active");
        $("#tabTaskCategory3").addClass("in");
        $("#tabTaskCategory2").removeClass("in");
        $("#tabTaskCategory1").removeClass("in");

        $("#liTaskCategory3").addClass("active");
        $("#liTaskCategory2").removeClass("active");
        $("#liTaskCategory1").removeClass("active");

    }
}



// DISPLAY ALL TASK BY WORKSPACE

function displayAllTaskByWorkspace(workspaceID){

    var table1;
    var table2;
    var table3;
    var table4;
    var table5;

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getAllTaskByWorkspace.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            let listForApproving = [];
            let listPending = [];
            let listTodo = [];
            let listOngoing = [];
            let listCompleted = [];

            eventList = [];
            // $("#containerCalendar").show(); 

            let countCompletedTask = 0;
            let countIncompleteTask = 0;
            let countForApprovalTask = 0;


            const datePhils = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
            const year = new Date(datePhils).getFullYear();
            const month = String(new Date(datePhils).getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
            const day = String(new Date(datePhils).getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            for(let index = 0; index < data.length; index++){

                //GET ALL COMPLETED
                if(data[index].f == "3"){
                    listCompleted.push(data[index]);
                    countCompletedTask++;
                } else {

                    //GET ALL FOR APPROVAL
                    if(data[index].f == "4"){
                        listForApproving.push(data[index]);
                        countForApprovalTask++;
                    }
                    //GET ALL ON-GOING
                    if(data[index].f == "2"){
                        listOngoing.push(data[index]);
                    }
    
                    //GET ALL TO-DO
                    if(data[index].f == "1"){
                        listTodo.push(data[index]);
                    }

                    //COUNT INCOMPLETE TASK
                    countIncompleteTask++;
                }

                //GET ALL PENDING
                if(data[index].d != null){
                    if (data[index].d < currentDate && data[index].f !== "3") {
                        listPending.push(data[index])
                    }
                }


                // THIS CODE IS FOR CALENDAR
                let taskDesc = data[index].b;
                let taskDueDate = data[index].d;
                let taskID = data[index].a;
                let taskParentID = data[index].j;
                let labelColor = "";

                if(data[index].f == "3"){
                    labelColor = "label-success"
                } else if(data[index].f == "4"){
                    labelColor = "label-grey"
                } else {
                    const target = new Date(taskDueDate);
                    const currentDate = new Date(); // Get the current date
                    const differenceMs = currentDate - target; // Calculate the difference in milliseconds
                    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
                    let delay = differenceDays - 1;

                    if(delay > 0){
                        labelColor = "label-important";
                    } else {
                        
                        if(data[index].f == "1"){
                            labelColor = "label-yellow"
                        } else if(data[index].f == "2"){
                            labelColor = "label-blue"
                        }

                    }

                }

                

                if(taskParentID == 0){
                    if(taskDueDate){
                        
                        eventList.push({
                            title: taskDesc,
                            start: taskDueDate,
                            className: labelColor,
                            id: taskID,
                        });
                    }
                }
                
            }

            
            $('#calendar').fullCalendar('removeEvents');

            setTimeout(() => {
                // Set a new event source (replace existing events with new events)
                $('#calendar').fullCalendar('addEventSource', eventList);
                
                // $("#containerCalendar").hide(); 
            }, 1000);
            
            $("#countWorkspaceTotalCompleted").text(countCompletedTask);
            $("#countWorkspaceTotalIncompleted").text(countIncompleteTask);
            $("#countWorkspaceTotalForApproval").text(countForApprovalTask);

            let taskColumns = [
                {title: "RID", field: "a", headerFilter: "input", visible:false},
                {title: "TASK DESCRIPTION", field: "b", headerFilter: "input", headerFilterPlaceholder: "Filter Description"},
                {title: "TARGET", field: "d", formatter:displayDueDate},
                {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                {title: "STATUS", field: "f", formatter: displayTaskStatus},
                {title: "DELAY", field: "", formatter: displayTaskDelay},
                {title: "START", field: "g"},
                {title: "FINISH", field: "h"},
                {title: "TASK CREATED BY", field: "n", formatter: displayTaskCreatedBy},
            ],

    
            table1 = new Tabulator("#tableDashboardTaskForApproving", {
                data: listForApproving,
                layout: "fitDataFill",
                
                columns: taskColumns,
            });
            table1.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
            });


            table2 = new Tabulator("#tableDashboardTaskPending", {
                data: listPending,
                layout: "fitDataFill", 
                
                columns: taskColumns,
            });
            table2.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
            });

            table3 = new Tabulator("#tableDashboardTaskOngoing", {
                data: listOngoing,
                layout: "fitDataFill",
                
                columns: taskColumns,
            });
            table3.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
            });

            table4 = new Tabulator("#tableDashboardTaskTodo", {
                data: listTodo,
                layout: "fitDataFill", 
                
                columns: taskColumns,
            });
            table4.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
            });


            table5 = new Tabulator("#tableDashboardTaskCompleted", {
                data: listCompleted,
                layout: "fitDataFill",
                
                columns: taskColumns,
            });
            table5.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
            });


            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "pie2d",
                    renderAt: "chart4",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                        chart: 
                        {
                            caption: "Total Task By Status",
                            subcaption: "",
                            decimals: "1",
                            theme: "fusion",
                            showLegend: "0",
                            palettecolors: "#fdff01, #021bbe, #fed102, #00dc54",
                        },
                        data: [
                            {
                                label: "TO-DO",
                                value: listTodo.length
                            },
                            {
                                label: "ON-GOING",
                                value: listOngoing.length
                            },
                            {
                                label: "FOR APPROVAL",
                                value: listForApproving.length
                            },
                            {
                                label: "COMPLETED",
                                value: listCompleted.length
                            },
                        ]
                    }
                }).render();
            });


        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}






/*
//DISPLAYING THE ASSIGNEE
function populateUser(selectedUsersList){
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let display = $("#pDisplayTaskAssignee");

    if(selectedUsersList != "" && selectedUsersList != "[]" && selectedUsersList != null){
        
        let isArray = Array.isArray(JSON.parse(selectedUsersList));

        if(isArray == true){
            let selectedUsers = JSON.parse(selectedUsersList);
            
            let elements ='';

            for (var i = 0; i < userList.length; i++) {
                let isSelected = false; 
                let selectedDesc = "";

                for(let j = 0; j < selectedUsers.length; j++){
                    if(selectedUsers[j] == userList[i].a){
                        isSelected = true;
                        break;
                    }
                }

                if(isSelected == true){
                    elements += userList[i].c + " " + userList[i].b + " ";
                }
                
            }
            // console.log(elements);
            display.html(elements)
        } 
        
    } else{
        // console.log("WALEY");
        display.html("NO ASSIGNEE YET")
    }
    
    

}
*/

// ========================================================= //
// SUBTASK

function displaySubtask(activityID, taskID){
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getSubtask.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            activityID: activityID,
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
    
            // let varTable = "#tableTaskRecords"+ activityID;
            // subtable.clearData();
    
            subtable = new Tabulator("#tableRecordSubtask", {
                // pagination: "local", // Enable local pagination
                // paginationSize: parseInt(localStorage.pageSize), // Number of rows per page
                // paginationSizeSelector: [10, 25, 50, 100], // Page size options
                // page: 1, // Initial page number
                // ajaxURL: "your_data_endpoint_here.json",
                data: data,
                layout: "fitDataFill", // Adjust table height based on the data
                
                columns: [
                    {title: "RID", field: "a", headerFilter: "input", visible:false},
                    {title: "TASK DESCRIPTION", field: "b", headerFilter: "input", headerFilterPlaceholder: "Filter Description"},
                    {title: "TARGET DATE", field: "d"},
                    {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                    {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                    {title: "STATUS", field: "f", formatter: displayTaskStatus},
                    {title: "START DATE", field: "g"},
                    {title: "FINISH DATE", field: "h"},
                    {title: "DETAILS", field: "c", visible:false},
                    // {title: "Action", field:"a", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
                ],
            });
    
            subtable.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
                // $("#btnBackToSubtask").show();

                // displayActionItem(rowData.a);
                // // $("#containerActionItemRecord").show();
                // $("#btnBackToSubtask").val(rowData.a);
                // $("#btnBackToSubtask").hide();

            });
            subtable.on("rowContext", function(e, row){
                var rowData = row.getData();

                $("#liRemoveSubtask").attr("data-task-id", rowData.a);
                $("#liRemoveSubtask").attr("data-activity-id", activityID);
                $("#liMoveSubtask").attr("data-task-id", rowData.a)

                

                /* 
                // WAG BUBURAHIN BAKA NEED MO PA GAMITIN YUNG CODE NA TO
                contextMenuSubtask.css({
                    display: "block",
                    left: e.pageX-40,
                    top: e.pageY-100
                }); */
                // console.log("PageX:"+e.pageX);
                // console.log("PageY:"+e.pageY);
                
                
            
                e.preventDefault(); // prevent the browsers default context menu form appearing.
            });
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

// ========================================================= //
// ACTION ITEMS
function displayActionItem(subtaskID){
    // console.log(taskID);
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getActionItem.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            subtaskID: subtaskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
    
            actionitem = new Tabulator("#tableRecordActionItem", {
                // pagination: "local", // Enable local pagination
                // paginationSize: parseInt(localStorage.pageSize), // Number of rows per page
                // paginationSizeSelector: [10, 25, 50, 100], // Page size options
                // page: 1, // Initial page number
                // ajaxURL: "your_data_endpoint_here.json",
                data: data,
                layout: "fitDataFill", // Adjust table height based on the data
                
                columns: [
                    {title: "RID", field: "a", headerFilter: "input", visible:false},
                    {title: "TASK DESCRIPTION", field: "b", headerFilter: "input"},
                    {title: "TARGET DATE", field: "d"},
                    {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                    {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                    {title: "STATUS", field: "f", formatter: displayTaskStatus},
                    {title: "START DATE", field: "g"},
                    {title: "FINISH DATE", field: "h"},
                    // {title: "DETAILS", field: "c", visible:false},
                    // {title: "Action", field:"a", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
                ],
            });
    
            actionitem.on("rowClick", function(e, row) {
                var rowData = row.getData();
                
                displayTaskInfo(rowData.a);
                // $("#btnBackToSubtask").show();
                // $("#containerActionItemRecord").show();
                // $("#btnBackToSubtask").hide();

            });
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
    
}



// ========================================================= //
// COMMENT
function displayTaskComment(taskID){
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskComment.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            let container = $("#containerComment");

            let element = '';

            for(let index = 0; index < data.length; index++){
                element += createElementTaskComment(data[index].a,data[index].c, data[index].b, data[index].d);
            }
        
            container.html(element)
            
        },
        error: function(error) {
            alert('Error: Comment');
        }
    });
}

function displayTaskActivityHistory(taskID){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskActivityHistory.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            let container = $("#containerTaskActivityHistory");
            let userList = JSON.parse(localStorage.getItem(lsUserList));

            let element = '';
            for(let index = 0; index < data.length; index++){
                let createdBy = data[index].d;

                var result = userList.find(function(value) {
                    return value.a === createdBy;
                });
                let user = (userCode == createdBy)? "You": result.c + " " + result.b;
                element += createElementTaskActivityHistory(data[index].a, data[index].b, user, data[index].c);
            }
        
            container.html(element)
            
        },
        error: function(error) {
            alert('Error: Comment');
        }
    });
}

function displayTaskApproverComment(taskID){
    $("#txtTaskApproverComment").val("");

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskApproverComment.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            let container = $("#containerTaskApproverComment");

            let element = '';

            for(let index = 0; index < data.length; index++){

                let status = (data[index].e == "1")? "approved":"disapproved";
                let displayStatus = setUserFullName(data[index].d) + " " + status + " the task.";
                element += createElementTaskApproverComment(data[index].a, displayStatus, data[index].b, data[index].c);
            }
        
            container.html(element)
            
        },
        error: function(error) {
            alert('Error: Comment');
        }
    });
}

// ========================================================= //
// FILES

function displayFileAttachments(taskID){
    $.ajax({
        url: '/'+rootFolder+'/getRecords/task_files.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            let container = $("#containerTaskFileAttachments");
    
            let element = '';
            for(let index = 0; index < data.length; index++){
                
                element += createElementTaskFileAttachment(data[index].a, data[index].c, data[index].b);
            }
        
            container.html(element)
            
        },
        error: function(error) {
            alert('Error: Comment');
        }
    });
}






// ========================================================= //
// ELEMENTS

function createElementCategory(id, desc){
    let deleteBtn = (userRole != "1")? '<a class="red btnRemoveCategory" href="#"> <i class="ace-icon fa fa-trash-o"></i> </a>':'';
    let element = '<li class="dd-item liCategory"> <div class="dd-handle selectCategory"> <span class=""><span class="spanCategoryDesc">'+desc+'</span></span> <input type="hidden" class="hiddenCategoryID" value="'+id+'"> </div>  </li>';
    // let element = '<li class="dd-item liCategory"> <div class="dd-handle selectCategory"> <span class=""><span class="spanCategoryDesc">'+desc+'</span></span> <div class="pull-right action-buttons"> <a class="blue btnEditCategory" href="#"> <i class="ace-icon fa fa-pencil-square-o"></i> </a> '+deleteBtn+' </div> <input type="hidden" class="hiddenCategoryID" value="'+id+'"> </div>  </li>';
    //let element = '<li class="dd-item "> <div class="dd-handle selectCategory"> <span class=""><span class="spanCategoryDesc">'+desc+'</span></span> <div class="pull-right action-buttons"> <a class="blue btnEditCategory" href="#"> <i class="ace-icon fa fa-pencil-square-o"></i> </a> <input type="hidden" class="hiddenCategoryID" value="'+id+'"> </div> </li>';

    return element;
}
function createElementActivity(id, desc){
    let deleteBtn = (userRole != "1")? '<a class="red" href="#"> <i class="ace-icon fa fa-trash-o bigger-130 btnRemoveActivity"></i> </a>':'';
    let element = '<div class="panel panel-default"> <div class="panel-heading"> <a href="#panelActivity'+id+'" data-parent="#listActivity" data-toggle="collapse" class="text-dark accordion-toggle collapsed selectActivityPanel" aria-expanded="false"> <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; <span class="spanActivityDesc">'+desc+'</span> <input type="hidden" class="hiddenPanelActivityID" value="'+id+'"></a> <div class="pull-right action-buttons"> <a class="blue" href="#"> <i class="ace-icon fa fa-pencil bigger-130 btnEditActivity"></i> </a> '+deleteBtn+' </div> </div> <div class="panel-collapse collapse in" id="panelActivity'+id+'" aria-expanded="false"> <div class="panel-body"> <div class="containerTask"><p> <button class="btn btn-primary btnOpenModalAddTask" value="'+id+'">Add Task</button> </p><hr> <div id="tableTaskRecords'+id+'"></div></div> </div> </div> </div>';
    //let element = '<div class="panel panel-default"> <div class="panel-heading"> <a href="#panelActivity'+id+'" data-parent="#listActivity" data-toggle="collapse" class="text-dark accordion-toggle collapsed selectActivityPanel" aria-expanded="false"> <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; <span class="spanActivityDesc">'+desc+'</span> <input type="hidden" class="hiddenPanelActivityID" value="'+id+'"></a> <div class="pull-right action-buttons"> <a class="blue" href="#"> <i class="ace-icon fa fa-pencil bigger-130 btnEditActivity"></i> </a> </div> </div> <div class="panel-collapse collapse" id="panelActivity'+id+'" aria-expanded="false"> <div class="panel-body"> <div class="containerTask"><p> <button class="btn btn-primary btnOpenModalAddTask" value="'+id+'">Add Task</button> </p><hr> <div id="tableTaskRecords'+id+'"></div></div> </div> </div> </div>';

    return element;
}
function createElementTaskComment(id, name, desc, datetime){
    let element = '<div class="itemdiv dialogdiv divComment"> <div class="user"> <img alt="" src="" /> </div> <div class="body"> <div class="time"> <span>'+datetime+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name"> <a href="#">'+name+'</a> </div> <div class="text txtDisplayComment">'+desc+'</div> </div> <input type="hidden" class="hiddenCommentID" value="'+id+'"> </div>';

    return element;

}
function createElementTaskActivityHistory(id, desc, created, datetime){
    // let element = '<div class="itemdiv dialogdiv"> <div class="user"> <img alt="" src="" /> </div> <div class="body"> <div class="time"> <span>'+datetime+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name"><a href="#" class="white">.</a> </div><div class="text">'+desc+'</div> </div> </div>';
    let element = '<div class="itemdiv dialogdiv"> <div class="user"> <img alt="" src="" /> </div> <div class="body"> <div class="time"> <span>'+datetime+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name"><a href="#" class="white">.</a> </div><div class="text"> '+created+' '+desc+'</div> </div> </div>';

    return element;

}

function createElementTaskApproverComment(id, status, comment, datetime){
    let element = '<div class="itemdiv dialogdiv divApproverComment"> <div class="user"> <img alt="" src="" /> </div> <div class="body"> <div class="time"> <span>'+datetime+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name white">.</div> <div class="text"><strong>'+status+'</strong></div> <div class="text">'+comment+'</div> </div> </div>';

    return element;

}
function createElementTaskFileAttachment(id, descNew, descOld){

    let element = '<div class="dd-handle divTaskFile"> <a href="#" class="openTaskFile">'+descOld+'</a> <div class="pull-right action-buttons"> <a class="red removeTaskFile" href="#"> <i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div><input type="hidden" class="hiddenTaskFileID" value="'+id+'"> <input type="hidden" class="hiddenTaskFileDescNew" value="'+descNew+'"> </div>';
    return element;

}

// ========================================================== //
// PAGE SIZE LOCAL STORAGE

if(localStorage.pageSize == null || localStorage.pageSize == "" || localStorage.pageSize == undefined){
    localStorage.pageSize = 10;
}


$("#listActivity").on("change", ".tabulator-page-size",function(){
    
    console.log($(this).val());
    localStorage.pageSize = $(this).val();

});

// ========================================================== //
// WORKSPACE LOCAL STORAGE


// reloadSavedWorkspace(); //SA TAAS KO NA NILAGAY

function reloadSavedWorkspace(from){
    let url = location.pathname;
    let activeYear = JSON.parse(localStorage.getItem(lsActiveYear)).RID;

    populateWorkspace(activeYear);
    populateYear(activeYear);

    if(url == "/1_OKRMS/workspace/index.php"){
        let savedList = {
            workspaceID: 0,
            yearID:0,
            categoryID: 0,
            categoryDesc: "",
        }
        
        if(localStorage.getItem(lsSavedWorkspace) != null){
            let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
            let workspaceID = savedWorkspace.workspaceID;
            let yearID = savedWorkspace.yearID;
            let categoryID = savedWorkspace.categoryID;
            let categoryDesc = savedWorkspace.categoryDesc;

            // console.log(setWorkspaceYearID(workspaceID) + " " + activeYear);
            console.log(savedWorkspace);
            
            // if(activeYear == setWorkspaceYearID(workspaceID)){}
            if(from == "DASHBOARD"){
                if(yearID == undefined){
                    let savedList = {
                        workspaceID: 0,
                        yearID:0,
                        categoryID: 0,
                        categoryDesc: "",
                    }
    
                    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedList));
                } else {
                    loadWorkspace(yearID, workspaceID, categoryID, categoryDesc)
                }

                // console.log("EYY Galing dashboard");
            } else if(from == "WORKSPACE"){
                
                // console.log("EYY Galing workspace");
                loadWorkspace(yearID, workspaceID, categoryID, categoryDesc)

            }
    
        } else {
            localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedList));

            
        }
    }


    function loadWorkspace(yearID, workspaceID, categoryID, categoryDesc){
        populateWorkspace(yearID);
        populateYear(yearID);

        if(workspaceID != 0){
            // SHOW CATEGORY
            displayCategory(workspaceID);
            displayMembers(workspaceID);
            displayAllTaskByWorkspace(workspaceID);
            generateChart3(workspaceID);
            $("#containerCategory").show();
            
            setTimeout(() => {
                $("#selectWorkspace").val(workspaceID);
                // $("#selectWorkspace").trigger("change");
            }, "500");
        }
    

        if(categoryID != 0){
            // SHOW ACTIVITY
            $("#displayCategoryName").text(categoryDesc);
            $("#hiddenCategoryID").val(categoryID)
            displayActivity(categoryID);
            generateDashboard1(categoryID)
            generateChart2(categoryID);
            $("#containerActivity").show();

            //HIGHLIGHTS THE CATEGORY
            setTimeout(() => {
                $("#listCategory input.hiddenCategoryID[value='"+categoryID+"']").closest(".selectCategory").addClass("btn-yellow");
            }, "500");
        }


    }

}
