
$("#containerCategory").hide();
$("#containerActivity").hide();

var table;
var subtable;
var actionitem;


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

            let container = $("#listMembers");

            if(data.length > 0){
                let element = '';

                
                for(let index = 0; index < data.length; index++){
                    if(data[index].c == "2"){
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

            table = new Tabulator(varTable, {
                data: data,
                // layout: "fitDataFill", // Adjust table height based on the data
                dataTree:true,
                dataTreeStartExpanded: false,
                
                columns: [
                    {title: "RID", field: "a", headerFilter: "input", visible:false},
                    // {title: "NO", field: "", formatter:"rownum"}, //HINDI PALA PWEDE YUNG MAY ROWNUM SA FORMATTER NG DATATREE TABULATOR
                    {title: "TASK DESCRIPTION", field: "b", headerFilter: "input", editor:"input"},
                    {title: "DUE DATE", field: "d", formatter: displayDueDate},
                    {title: "ASSIGNEE", field: "k",formatter: displayTaskAssignee},
                    {title: "PRIORITY", field: "e", formatter: displayTaskPriority},
                    {title: "STATUS", field: "f", formatter: displayTaskStatus},
                    {title: "START DATE", field: "g"},
                    {title: "FINISH DATE", field: "h"},
                    {title: "NO OF SUBTASKS", field: "i"},
                    {title: "TASK_PARENT_ID", field: "j", visible:false}, // !USELESS ROW
                    {title: "TASK_DETAILS", field: "c", visible:false},
                ],
                
            });

            table.on("rowDblClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
                displaySubtask(activityID, rowData.a);
                $("#hiddenDisplayActivityID").val(activityID);

                //TITIGNAN IF SI TASK PARENT ID AY TASK OR SUBTASK
                if(rowData.j == "0"){
                    $("#btnBackToTask").val(rowData.a); //PUT TASK ID ON BUTTON VALUE
                } else{
                    $("#btnBackToTask").val(rowData.j); //PUT TASK ID ON BUTTON VALUE
                    $("#btnBackToSubtask").val(rowData.l); // PUT SUBTASK ID ON BUTTON VALUE

                    
                }
                
            });
            
            table.on("rowContext", function(e, row){
                var rowData = row.getData();

                if(userCode == "0"){
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
            element += '<span class="badge badge-info " data-toggle="tooltip" title="'+fname+" "+lname+'">'+fnameChar+lnameChar+'</span>&nbsp;';
        }
    }
    
    return element;
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
            // a = RID
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

            $("#hiddenDisplayTaskID").val(data.a); //PUT TASK ID ON HIDDEN INPUT
            $("#spanDisplayTaskDesc").text(data.b); // PUT TASK TITLE 
            $("#txtDisplayTaskDetails").val(data.c); // PUT TASK DETAILS
            $("#txtDisplayTaskDueDate").val(data.d); // PUT DUE DATE
            $("#txtDisplayTaskStartDate").val(data.g); //PUT START DATE
            $("#txtDisplayTaskFinishDate").val(data.h); //PUT FINISH DATE

            populateStatus(data.f);
            populatePriority(data.e);
            displayTaskComment(data.a);
            displayTaskActivityHistory(data.a)
            populateUser(data.j) // ASSIGNEE

            $("#containerButtonSubtask").show();
            $("#containerAddSubtask").hide();
            
            // console.log(data.i);
            if(data.i == 0){
                // if TASK
                $("#containerSubtaskRecord").show();
                $("#containerAddSubtask").hide();
                $("#btnBackToTask").hide();
                $("#btnBackToSubtask").hide();
                $("#containerActionItemRecord").hide();

            } else {

                $("#containerSubtaskRecord").hide();

                if(data.k == 0){
                    // if SUBTASK
                    
                    $("#btnBackToTask").show();
                    $("#btnBackToSubtask").hide();
                    $("#containerActionItemRecord").show();
                    $("#containerButtonActionItem").show();
                    $("#containerAddActionItem").hide();
                    displayActionItem(data.a);
                } else {
                    // if ACTION ITEM
                    $("#containerActionItemRecord").hide();
                    $("#containerButtonActionItem").hide();
                    $("#btnBackToTask").hide();
                    $("#btnBackToSubtask").show();

                }
                

                

            }
            
            

            $("#modalDisplayTask").modal("show");
        },
        error: function(error) {
            alert('Error: '+error);
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
                    {title: "TASK DESCRIPTION", field: "b", headerFilter: "input"},
                    {title: "DUE DATE", field: "d"},
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
                $("#btnBackToSubtask").show();

                displayActionItem(rowData.a);
                $("#containerActionItemRecord").show();
                $("#btnBackToSubtask").val(rowData.a);
                $("#btnBackToSubtask").hide();

            });
            subtable.on("rowContext", function(e, row){
                var rowData = row.getData();

                $("#liRemoveSubtask").attr("data-task-id", rowData.a);
                $("#liRemoveSubtask").attr("data-activity-id", activityID);
                $("#liMoveSubtask").attr("data-task-id", rowData.a)

                

                contextMenuSubtask.css({
                    display: "block",
                    left: e.pageX-40,
                    top: e.pageY-100
                });
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
                    {title: "DUE DATE", field: "d"},
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
                $("#btnBackToSubtask").show();

                $("#containerActionItemRecord").show();
                $("#btnBackToSubtask").hide();

            });
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
    
}

function displayActionItemInfo(){
    /*
    $.ajax({
        url: 'ajax/getActionItemInfo.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            $("#hiddenDisplayTaskID").val(data.a); //PUT TASK ID ON HIDDEN INPUT
            $("#spanDisplayTaskDesc").text(data.b); // PUT TASK TITLE 
            $("#txtDisplayTaskDetails").val(data.c); // PUT TASK DETAILS
            $("#txtDisplayTaskDueDate").val(data.d); // PUT DUE DATE
            $("#txtDisplayTaskStartDate").val(data.g); //PUT START DATE
            $("#txtDisplayTaskFinishDate").val(data.h); //PUT FINISH DATE

            populateStatus(data.f);
            populatePriority(data.e);
            displayTaskComment(data.a);
            displayTaskActivityHistory(data.a)
            populateUser(data.j) // ASSIGNEE

            $("#containerButtonSubtask").show();
            $("#containerAddSubtask").hide();
            
            if(data.i == 0){
                // if TASK
                $("#containerSubtaskRecord").show();
                $("#containerAddSubtask").hide();
                $("#btnBackToTask").hide();


            } else {
                // if SUBTASK
                $("#containerSubtaskRecord").hide();
                $("#btnBackToTask").show();
            }
            
            

            // $("#modalDisplayTask").modal("show");
        },
        error: function(error) {
            alert('Error: '+error);
        }
    });
    */

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



// ========================================================= //
// ELEMENTS

function createElementCategory(id, desc){
    // let element = '<li class="dd-item "> <div class="dd-handle selectCategory"> <span class=""><span class="spanCategoryDesc">'+desc+'</span></span> <div class="pull-right action-buttons"> <a class="blue btnEditCategory" href="#"> <i class="ace-icon fa fa-pencil-square-o"></i> </a> <a class="red btnRemoveCategory" href="#"> <i class="ace-icon fa fa-trash-o"></i> </a> </div> <input type="hidden" class="hiddenCategoryID" value="'+id+'"> </div>  </li>';
    let element = '<li class="dd-item "> <div class="dd-handle selectCategory"> <span class=""><span class="spanCategoryDesc">'+desc+'</span></span> <div class="pull-right action-buttons"> <a class="blue btnEditCategory" href="#"> <i class="ace-icon fa fa-pencil-square-o"></i> </a> <input type="hidden" class="hiddenCategoryID" value="'+id+'"> </div> </li>';

    return element;
}
function createElementActivity(id, desc){
    // let element = '<div class="panel panel-default"> <div class="panel-heading"> <a href="#panelActivity'+id+'" data-parent="#listActivity" data-toggle="collapse" class="text-dark accordion-toggle collapsed selectActivityPanel" aria-expanded="false"> <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; <span class="spanActivityDesc">'+desc+'</span> <input type="hidden" class="hiddenPanelActivityID" value="'+id+'"></a> <div class="pull-right action-buttons"> <a class="blue" href="#"> <i class="ace-icon fa fa-pencil bigger-130 btnEditActivity"></i> </a> <a class="red" href="#"> <i class="ace-icon fa fa-trash-o bigger-130 btnRemoveActivity"></i> </a> </div> </div> <div class="panel-collapse collapse" id="panelActivity'+id+'" aria-expanded="false"> <div class="panel-body"> <div class="containerTask"><p> <button class="btn btn-primary btnOpenModalAddTask" value="'+id+'">Add Task</button> </p><hr> <div id="tableTaskRecords'+id+'"></div></div> </div> </div> </div>';
    let element = '<div class="panel panel-default"> <div class="panel-heading"> <a href="#panelActivity'+id+'" data-parent="#listActivity" data-toggle="collapse" class="text-dark accordion-toggle collapsed selectActivityPanel" aria-expanded="false"> <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; <span class="spanActivityDesc">'+desc+'</span> <input type="hidden" class="hiddenPanelActivityID" value="'+id+'"></a> <div class="pull-right action-buttons"> <a class="blue" href="#"> <i class="ace-icon fa fa-pencil bigger-130 btnEditActivity"></i> </a> </div> </div> <div class="panel-collapse collapse" id="panelActivity'+id+'" aria-expanded="false"> <div class="panel-body"> <div class="containerTask"><p> <button class="btn btn-primary btnOpenModalAddTask" value="'+id+'">Add Task</button> </p><hr> <div id="tableTaskRecords'+id+'"></div></div> </div> </div> </div>';

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

reloadSavedWorkspace()

function reloadSavedWorkspace(){
    let savedList = {
        workspaceID: 0,
        categoryID: 0,
        categoryDesc: "",
    }

    if(localStorage.getItem(lsSavedWorkspace) != null){
        let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
        let workspaceID = savedWorkspace.workspaceID;
        let categoryID = savedWorkspace.categoryID;
        let categoryDesc = savedWorkspace.categoryDesc;

        if(workspaceID != 0){
             // SHOW CATEGORY
            displayCategory(workspaceID);
            displayMembers(workspaceID);
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
        



    } else {
        localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedList));
    }
    $('#selectWorkspace').select2({});

}
