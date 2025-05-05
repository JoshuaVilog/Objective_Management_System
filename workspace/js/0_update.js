
/////////////////////////////////////
// SET UPDATE

function setUpdateCategory(id){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/setUpdateCategory.php', 
        type: 'POST',
        data:{
            id: id,
            userCode: userCode,
        },
        success: function(data) {
            
            $("#hiddenEditCategoryID").val(data.a);
            $("#txtEditCategoryDesc").val(data.b);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}   

function setUpdateActivity(id){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/setUpdateActivity.php', 
        type: 'POST',
        data:{
            id: id,
            userCode: userCode,
        },
        success: function(data) {
            
            $("#hiddenEditActivityID").val(data.a);
            $("#txtEditActivityDesc").val(data.b);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}   


// ======================================================== //
// Edit RECORD

$("#btnEditCategory").click(function(){

    let desc = $("#txtEditCategoryDesc").val();
    let id = $("#hiddenEditCategoryID").val();
    let workspace = $("#selectWorkspace").val(); 

    if(desc != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/updateCategory.php', 
            type: 'POST',
            data:{
                desc: desc,
                id: id,
                userCode: userCode,
            },
            success: function(data) {
                
                $("#txtEditCategoryDesc").val("");
                $("#hiddenEditCategoryID").val("");
                $("#modalEditCategory").modal("hide");
                $("#displayCategoryName").text(desc);
                displayCategory(workspace);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});
$("#btnEditActivity").click(function(){

    let desc = $("#txtEditActivityDesc").val();
    let id = $("#hiddenEditActivityID").val();
    let category = $("#hiddenCategoryID").val(); // YUNG VARIABLE NETO NAKALAGAY SA index.php sa may tabi ng Category Title
    
    if(desc != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/updateActivity.php', 
            type: 'POST',
            data:{
                desc: desc,
                id: id,
                userCode: userCode,
            },
            success: function(data) {
                // console.log(data);
                $("#txtEditActivityDesc").val("");
                $("#hiddenEditActivityID").val("");
                $("#modalEditActivity").modal("hide");
                displayActivity(category);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});

$("#btnMoveTask").click(function(){
    let moveTaskID = $("#hiddenMoveTaskID").val();
    let selectTaskID = $("#selectMT_Task").val();
    let selectActivityID = $("#selectMT_Activity").val();
    let categoryID = $("#hiddenCategoryID").val();

    if(selectTaskID != null || selectTaskID != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/updateTaskParent.php', 
            type: 'POST',
            data:{
                moveTaskID: moveTaskID,
                selectTaskID: selectTaskID,
                selectActivityID: selectActivityID,
                userCode: userCode,
            },
            success: function(data) {
               
                console.log(data);
                if(data == "MOVED"){
                    
                    Swal.fire({
                        title: 'Task Moved!',
                        text: 'The Task has been moved.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $("#modalMoveTask").modal("hide");
                            displayActivity(categoryID)
                        }
                        $("#modalMoveTask").modal("hide");
                        displayActivity(categoryID)
                    })
                    
                } else if(data == "CANCEL"){
                    Swal.fire({
                        title: 'Invalid!',
                        text: 'The Task has Subtask. Not able to move into Subtask',
                        icon: 'warning'
                    })
                } else {
                    alert("ERROR");
                }
                
                $("#modalMoveTask").modal("show");
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });

    }


});

// ================================================== //
// EDIT TASK INFO

let oldDueDate;
let oldStartDate;
let oldFinishDate;
let oldStatus;
let oldPriority;

$("#txtDisplayTaskDetails").blur(function(){
    let desc = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskDetails.php', 
        type: 'POST',
        data:{
            desc: desc,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {

            displayTask(activityID)

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
});


$("#selectDisplayTaskAssignee").change(function(){
    let value = $(this).val();
    // value = (value == null)? []:value;

    // let filteredArray = value.filter(str => str !== "");

    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    // let assignees = JSON.stringify(filteredArray);
    let assignees = '["'+value+'"]';


    if(value == userCode){
        // IF SARILI NIYA INASSIGN NIYA

        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/updateTaskAssignee.php', 
            type: 'POST',
            data:{
                assignees: assignees,
                taskID: taskID,
                userCode: userCode,
            },
            success: function(data) {
    
                displayTask(activityID)
                console.log(data);
                
    
            },
            error: function(error) {
                console.error('Error fetching data from the database.');
            }
        });

    } else {

        Swal.fire({
            title: 'Are you sure you want to assign task in other Assignee?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/insertTaskRequest.php', 
                    type: 'POST',
                    data:{
                        assignee: value,
                        taskID: taskID,
                        userCode: userCode,
                    },
                    success: function(data) {
                        

                        displayTask(activityID)
                        // console.log(data);

                        $('#selectDisplayTaskAssignee').prop("disabled", true);
                        $('#pDisplayTaskAssignee').text("Waiting for the Approval.");

                        Swal.fire({
                            title: 'Task assigned, wait for the approval.',
                            icon: 'success',
                        })
            
                    },
                    error: function(error) {
                        console.error('Error in SELECT ASSIGNEE');
                    }
                });
            } else{

                populateUser("");
            }
        })
        
        

    }
    
});

$("#selectDisplayTaskPriority").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let priorityList = JSON.parse(localStorage.getItem(lsPriorityList));

    let setOldPriority = priorityList.find(item => item.a === oldPriority)?.b;
    // console.log(value)
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskPriority.php', 
        type: 'POST',
        data:{
            desc: value,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {

            displayTask(activityID)

            value = priorityList.find(item => item.a === value)?.b;
            
            let taskActivityDesc;

            if(oldPriority == "" || oldPriority == null){
                taskActivityDesc = "set Priority to " + value;
            } else {
                taskActivityDesc = "changed Priority from " + setOldPriority + " to " + value;
            }

            insertTaskActivityHistory(taskID, taskActivityDesc)


        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
});
$("#selectDisplayTaskStatus").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

    let setOldStatus = statusList.find(item => item.a === oldStatus)?.b;
    
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
        type: 'POST',
        data:{
            desc: value,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {

            displayTask(activityID)

            value = statusList.find(item => item.a === value)?.b;
            
            let taskActivityDesc = "changed Status from " + setOldStatus + " to " + value;

            insertTaskActivityHistory(taskID, taskActivityDesc)

        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
    
});
$("#txtDisplayTaskDueDate").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    console.log(oldDueDate)
    
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskDueDate.php', 
        type: 'POST',
        data:{
            desc: value,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {
            // console.log(data);
                
            
            displayTask(activityID)

            let taskActivityDesc;

            if(oldDueDate == "" || oldDueDate == null){
                taskActivityDesc = "set Due Date to " + value;
            } else {
                taskActivityDesc = "changed Due Date from " + oldDueDate + " to " + value;
            }
            
            insertTaskActivityHistory(taskID, taskActivityDesc)

        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
    
});
$("#txtDisplayTaskStartDate").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    // console.log(value)
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskStartDate.php', 
        type: 'POST',
        data:{
            desc: value,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {
            // console.log(data);
                
            
            displayTask(activityID)
            
            let taskActivityDesc;

            if(oldStartDate == "" || oldStartDate == null){
                taskActivityDesc = "set Start Date to " + value;
            } else {
                taskActivityDesc = "changed Start Date from " + oldStartDate + " to " + value;
            }
            
            insertTaskActivityHistory(taskID, taskActivityDesc)

        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
});
$("#txtDisplayTaskFinishDate").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    // console.log(value)
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/updateTaskFinishDate.php', 
        type: 'POST',
        data:{
            desc: value,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(data) {
            // console.log(data);
                
            
            displayTask(activityID)

            let taskActivityDesc;

            if(oldFinishDate == "" || oldFinishDate == null){
                taskActivityDesc = "set Finish Date to " + value;
            } else {
                taskActivityDesc = "changed Finish Date from " + oldFinishDate + " to " + value;
            }
            
            insertTaskActivityHistory(taskID, taskActivityDesc)
            

        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
});

$('#modalDisplayTask').on('click', '#spanDisplayTaskDesc', function() {
    var text = $(this).text();
    var inputElement = $('<input>', {
        type: 'text',
        value: text
    });
    $(this).replaceWith(inputElement);
    inputElement.focus();

    // Blur event handler for the input element
    inputElement.on('blur', function() {
        var newText = $(this).val();
        
        if(newText == ""){
            $(this).replaceWith($('<h4>', {
                id: 'spanDisplayTaskDesc',
                text: text
            }));
        } else {
            $(this).replaceWith($('<h4>', {
                id: 'spanDisplayTaskDesc',
                text: newText
            }));
    
            let taskID = $("#hiddenDisplayTaskID").val();
            let activityID = $("#hiddenDisplayActivityID").val();
    
            // console.log(value)
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/updateTaskDesc.php', 
                type: 'POST',
                data:{
                    desc: newText,
                    taskID: taskID,
                    userCode: userCode,
                },
                success: function(data) {
                    console.log(data);
                        
                    
                    displayTask(activityID)
                    
    
                },
                error: function(error) {
                    console.error('Error fetching data from the database.');
                }
            });
        }
       
    });
});

$("#containerComment").on('click', '.txtDisplayComment', function(){
    var text = $(this).text();
    var commentID = $(this).closest(".divComment").find(".hiddenCommentID").val();
    var inputElement = $('<input>', {
        type: 'text',
        value: text
    });
    $(this).replaceWith(inputElement);
    inputElement.focus();

    // Blur event handler for the input element
    inputElement.on('blur', function() {
        var newText = $(this).val();
        
        $(this).replaceWith($('<div>', {
            text: newText,
            class: 'text txtDisplayComment'
        }));

        // console.log(commentID);

        // let taskID = $("#hiddenDisplayTaskID").val();
        // let activityID = $("#hiddenDisplayActivityID").val();

        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/updateTaskComment.php', 
            type: 'POST',
            data:{
                desc: newText,
                commentID: commentID,
                userCode: userCode,
            },
            success: function(data) {
                console.log(data);
                    
                
                

            },
            error: function(error) {
                console.error('Error fetching data from the database.');
            }
        });

    });

    // console.log(text);
});

// FOCUS
$("#txtDisplayTaskDueDate").focus(function() {
    // Store the old value when the input field is focused
    oldDueDate = $(this).val();
});
$("#txtDisplayTaskStartDate").focus(function() {
    // Store the old value when the input field is focused
    oldStartDate = $(this).val();
});
$("#txtDisplayTaskFinishDate").focus(function() {
    // Store the old value when the input field is focused
    oldFinishDate = $(this).val();
});
$("#selectDisplayTaskStatus").on("click focus", function() {
    oldStatus = $(this).val();
});
$("#selectDisplayTaskPriority").on("click focus", function() {
    oldPriority = $(this).val();
});



// console.log(userFullName);