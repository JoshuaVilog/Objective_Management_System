
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

            // displayTask(activityID)

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
});

$("#chkCheckShowAllUser").change(function(){
    let taskID = $("#hiddenDisplayTaskID").val();
    let assignee = $("#selectDisplayTaskAssignee").val();
    let workspaceID = $("#hiddenDisplayWorkspaceID").val();
    
    
    if ($("#chkCheckShowAllUser").prop("checked")) {
        // console.log("The checkbox is checked.");
        //ALL USERS
        let userList = JSON.parse(localStorage.getItem(lsUserList));
        
        var myUserID = userList.find(element => element.a === userCode);
        userList = userList.filter(element => element !== myUserID);
        userList.unshift(myUserID); // yung Login User nilagay ko sa unahan

        var adminID = userList.find(element => element.a === "1");
        userList = userList.filter(element => element !== adminID);
        userList.push(adminID); // yung admin nilagay ko sa huli

        let elements1 = '';
        let selectedAssignee = "";
        
        for(let index = 0; index < userList.length; index++){
            let selectedDesc = "";

            if(assignee == userList[index].a){
                selectedAssignee = userList[index].a;
                selectedDesc = "selected";
                break;
            }

            elements1 += '<option value="'+userList[index].a+'" '+selectedDesc+'>'+ userList[index].c +" "+ userList[index].b +'</option>';
        }

        $("#containerChangeAssignee .select2-container").html("");

        
        $("#selectDisplayTaskAssignee").html(elements1);
        // console.log(elements1);

        $('#selectDisplayTaskAssignee').select2({
            placeholder: '-Select Assignee-',
        });

        // $("#selectDisplayTaskAssignee").val(selectedAssignee);

        setTimeout(() => {
            
        }, "1000");


    } else {
        // console.log("The checkbox is not checked.");
        // MEMBERS ONLY

        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/getMembers.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                workspaceID: workspaceID,
            },
            dataType: 'json',
            success: function(userList) {
                let elements = '';
                let selectedAssignee = "";

                var myUserID = userList.find(element => element.a === userCode);
                userList = userList.filter(element => element !== myUserID);
                userList.unshift(myUserID); // yung Login User nilagay ko sa unahan

                var adminID = userList.find(element => element.a === "1");
                userList = userList.filter(element => element !== adminID);
                userList.push(adminID); // yung admin nilagay ko sa huli

                

                for(let index = 0; index < userList.length; index++){

                    if(assignee == userList[index].a){
                        selectedAssignee = userList[index].a;
                        break;
                    }

                    elements += '<option value="'+userList[index].a+'">'+ userList[index].b +'</option>';
                }

                $("#selectDisplayTaskAssignee").html(elements);
                $("#selectDisplayTaskAssignee").val(selectedAssignee);

                setTimeout(() => {
                   
                }, "1000");
                
            },
            error: function(error) {
                alert('Error: '+error);
            }
        });

    }
    
});

$("#btnChangeAssignee").click(function(){

    $("#containerDisplayAssignee").hide();
    $("#containerChangeAssignee").show();

    
    
});

$("#btnCancelChangeAssignee").click(function(){

    $("#containerDisplayAssignee").show();
    $("#containerChangeAssignee").hide();
    
});

$("#selectDisplayTaskAssignee").change(function(){
    let value = $(this).val();
    // value = (value == null)? []:value;

    // let filteredArray = value.filter(str => str !== "");

    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let taskDesc = $("#spanDisplayTaskDesc").text();
    // let assignees = JSON.stringify(filteredArray);
    let assignees = '["'+value+'"]';
    let workspaceID = $("#hiddenDisplayWorkspaceID").val();


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
    
                // displayTask(activityID)
                $("#hiddenIfTaskUpdate").val("0");
                // console.log(data);
                
                let taskActivityHistoryDesc = "assigned on task ";
                insertTaskActivityHistory(taskID, taskActivityHistoryDesc);
                
                $("#containerDisplayAssignee").show();
                $("#containerChangeAssignee").hide();
                $('#pDisplayTaskAssignee').text(setDisplayFullName(value))
                $("#hiddenDisplayTaskAssigneeID").val(value);

                $("#selectDisplayTaskStatus").prop("disabled", false);
    
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
                        

                        // displayTask(activityID)
                        $("#hiddenIfTaskUpdate").val("0");
                        sendEmailTaskRequest(userCode, value, taskDesc, taskID);

                        notifyDepartmentHead(value, workspaceID, taskDesc, taskID, userCode)

                       

                        let taskActivityHistoryDesc = "assigned a task for "+ setDisplayFullName(value);
                        insertTaskActivityHistory(taskID, taskActivityHistoryDesc);

                        // console.log(data);
                        

                        $('#selectDisplayTaskAssignee').prop("disabled", true);
                        // $('#pDisplayTaskAssignee').text("Waiting for confirmation.");

                        $("#containerDisplayAssignee").show();
                        $("#containerChangeAssignee").hide();
                        $("#btnChangeAssignee").prop("disabled", true);

                        $("#btnChangeAssignee").hide()
                        $('#pDisplayTaskAssignee').text(setUserFullName(value)+" assigned on this task. Waiting to accept the Request.");
                        $("#hiddenDisplayTaskAssigneeID").val("0");
            
                    },
                    error: function(error) {
                        console.error('Error in SELECT ASSIGNEE');
                    }
                });
            } else{
                $('#selectDisplayTaskAssignee').val("");
                
            }
        })
        
    }
    
});

function setDisplayFullName(userCode){
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    var result = userList.find(function(value){
        return value.a === userCode;
    });
    return result.c + " " + result.b;
}


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

            // displayTask(activityID)
            $("#hiddenIfTaskUpdate").val("0");

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
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));
    // let activityID = $("#hiddenDisplayActivityID").val();
    // let setOldStatus = statusList.find(item => item.a === oldStatus)?.b;

    let taskParent = $("#hiddenDisplayTaskParentID").val();
    let subtaskParent = $("#hiddenDisplaySubtaskParentID").val();
    let setOldStatus = oldStatus;
    if(value == "3"){
        if(taskParent == 0){
            // TASK
            // ICHE
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/checkTaskStatus.php', 
                type: 'POST',
                data:{
                   taskType: "TASK",
                   taskID: taskID,
                },
                success: function(data) {
                    // console.log(data)
                    
                    if(data.length > 0){
                        Swal.fire({
                            title: 'Are you sure you want complete the Task even the subtask are not completed?',
                            icon: 'question',
                            confirmButtonText: 'Yes',
                            showCancelButton: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                                updateTaskStatus(value, taskID);
                            }
                            $("#selectDisplayTaskStatus").val(setOldStatus)
                            
                        })
                    } else {
                        updateTaskStatus(value, taskID);
                    }
    
                },
                error: function(error) {
                    console.error('Error fetching data from the database.');
                }
            });
            
    
        } else {
            if(subtaskParent == 0){
                // SUBTASK
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/checkTaskStatus.php', 
                    type: 'POST',
                    data:{
                       taskType: "SUBTASK",
                       taskID: taskID,
                    },
                    success: function(data) {
                        console.log(data)
                        
                        if(data.length > 0){
                            Swal.fire({
                                title: 'Are you sure you want complete the Task even the action items are not completed?',
                                icon: 'question',
                                confirmButtonText: 'Yes',
                                showCancelButton: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    updateTaskStatus(value, taskID);
                                }
                                $("#selectDisplayTaskStatus").val(setOldStatus)
                            })
                        } else {
                            updateTaskStatus(value, taskID);
                        }
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });
    
    
            } else {
                // ACTION ITEM
                updateTaskStatus(value, taskID);
    
            }
        }
    } else {
        updateTaskStatus(value, taskID);
    }
    
    
});
function updateTaskStatus(value, taskID){
    // SI VALUE AY YUNG STATUS NG TASK - (TO-DO, ON-GOING, COMPLETE)

    let activityID = $("#hiddenDisplayActivityID").val();
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));
    let setOldStatus = statusList.find(item => item.a === oldStatus)?.b;
    let taskCreator = $("#hiddenDisplayTaskCreatedBy").val();
    let taskDesc = $("#spanDisplayTaskDesc").text();

    // console.log(setMemberWorkspaceRole(taskCreator));
    // console.log(setMemberWorkspaceRole(userCode));
    
    if(value == "3"){
        //IF TASK STATUS IS COMPLETE

        // if(userCode == taskCreator){
        if(userRole == "0"){
            // PAG SI ADMIN NAG COMPLETE, AUTO APPROVE
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
                type: 'POST',
                data:{
                    desc: value,
                    taskID: taskID,
                    userCode: userCode,
                },
                success: function(data) {
        
                    // displayTask(activityID)
                    $("#hiddenIfTaskUpdate").val("0");
        
                    var currentDate = new Date();
                    var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
        
                    if(value == "2"){
                        $("#txtDisplayTaskStartDate").val(formattedDate);
                    } else if(value == "3"){
                        $("#txtDisplayTaskFinishDate").val(formattedDate);
                    }
        
                    value = statusList.find(item => item.a === value)?.b;
                    
                    let taskActivityDesc = "changed Status from " + setOldStatus + " to " + value;
                    insertTaskActivityHistory(taskID, taskActivityDesc)

                    populateStatus("3");
                    
        
                },
                error: function(error) {
                    console.error('Error fetching data from the database.');
                }
            });

        } else {
            // PROCEED MUNA FOR APPROVING 

            if(setMemberWorkspaceRole(userCode) == "3" && setUserUserRole(taskCreator) == "0"){
                // PAG SI HEAD NAG COMPLETE, NEED MUNA MAGPA APPROVE KAY ADMIN PAG SI ADMIN NAG CREATE NG TASK

                // NEED MUNA MAGPA APPROVE
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
                    type: 'POST',
                    data:{
                        desc: "4",
                        taskID: taskID,
                        userCode: userCode,
                    },
                    success: function(data) {

                        // displayTask(activityID)
                        $("#hiddenIfTaskUpdate").val("0");

                        var currentDate = new Date();
                        var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');

                        $("#txtDisplayTaskFinishDate").val(formattedDate);

                        let taskActivityDesc = "set status for approving by "+ setUserFullName(taskCreator);
                        insertTaskActivityHistory(taskID, taskActivityDesc)

                        populateStatus("4"); //SET STATUS FOR APPROVING

            
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });

                sendEmail4(taskCreator, setDisplayFullName(userCode), taskDesc, taskID); // SEND EMAIL KASE MAGPAPA APPROVE KA SA TASK CREATOR

            } else if(setMemberWorkspaceRole(userCode) == "3" && setMemberWorkspaceRole(taskCreator) == "2"){
                // KUNG HEAD SI USER AT SI MEMBER ANG NAG CREATE NG TASK, AUTO APPROVED NA
                
                // COMPLETE NA AGAD
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
                    type: 'POST',
                    data:{
                        desc: value,
                        taskID: taskID,
                        userCode: userCode,
                    },
                    success: function(data) {
            
                        // displayTask(activityID)
                        $("#hiddenIfTaskUpdate").val("0");
            
                        var currentDate = new Date();
                        var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
            
                        if(value == "2"){
                            $("#txtDisplayTaskStartDate").val(formattedDate);
                        } else if(value == "3"){
                            $("#txtDisplayTaskFinishDate").val(formattedDate);
                        }
            
                        value = statusList.find(item => item.a === value)?.b;
                        
                        let taskActivityDesc = "changed Status from " + setOldStatus + " to " + value;
                        insertTaskActivityHistory(taskID, taskActivityDesc)
                        
                        populateStatus("3");
            
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });
            } else if(setMemberWorkspaceRole(userCode) == "3" && taskCreator == userCode){
                // PAG HEAD SI MEMBER, AT SIYA DIN ANG TASK CREATOR, AUTO APPROVED NA DIN ANG TASK

                // COMPLETE NA AGAD
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
                    type: 'POST',
                    data:{
                        desc: value,
                        taskID: taskID,
                        userCode: userCode,
                    },
                    success: function(data) {
            
                        // displayTask(activityID)
                        $("#hiddenIfTaskUpdate").val("0");
            
                        var currentDate = new Date();
                        var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
            
                        if(value == "2"){
                            $("#txtDisplayTaskStartDate").val(formattedDate);
                        } else if(value == "3"){
                            $("#txtDisplayTaskFinishDate").val(formattedDate);
                        }
            
                        value = statusList.find(item => item.a === value)?.b;
                        
                        let taskActivityDesc = "changed Status from " + setOldStatus + " to " + value;
                        insertTaskActivityHistory(taskID, taskActivityDesc)
                        
                        populateStatus("3");
            
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });

            } else if(setMemberWorkspaceRole(userCode) == "2"){
                // PAG SI MEMBER SI USER, NEED MUNA MAGPA APPROVE KAY HEAD OR KAY ADMIN.

                // NEED MUNA MAGPA APPROVE
                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/updateTaskStatus.php', 
                    type: 'POST',
                    data:{
                        desc: "4",
                        taskID: taskID,
                        userCode: userCode,
                    },
                    success: function(data) {

                        // displayTask(activityID)
                        $("#hiddenIfTaskUpdate").val("0");

                        var currentDate = new Date();
                        var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');

                        $("#txtDisplayTaskFinishDate").val(formattedDate);

                        let taskActivityDesc = "set status for approving by "+ setUserFullName(taskCreator);
                        insertTaskActivityHistory(taskID, taskActivityDesc)

                        populateStatus("4"); //SET STATUS FOR APPROVING
                        
            
                    },
                    error: function(error) {
                        console.error('Error fetching data from the database.');
                    }
                });

                sendEmail4(taskCreator, setDisplayFullName(userCode), taskDesc, taskID); // SEND EMAIL KASE MAGPAPA APPROVE KA SA TASK CREATOR
            }
        }


        // KAPAG YUNG USER AY HINDI KAPAREHAS YUNG CREATOR NG TASK
        // MAGNONOTIF SA EMAIL IF MAGPAPA APPROVE NA NG TASK
        // if(userCode != taskCreator){

        //     sendEmail4(taskCreator, setDisplayFullName(userCode), taskDesc, taskID)

        // }


    } else {
        // IF VALUE IS TO-DO AND ON-GOING

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
                $("#hiddenIfTaskUpdate").val("0");
    
                var currentDate = new Date();
                var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
    
                if(value == "2"){
                    $("#txtDisplayTaskStartDate").val(formattedDate);
                } else if(value == "3"){
                    $("#txtDisplayTaskFinishDate").val(formattedDate);
                }
    
                value = statusList.find(item => item.a === value)?.b;
                
                let taskActivityDesc = "changed Status from " + setOldStatus + " to " + value;
                insertTaskActivityHistory(taskID, taskActivityDesc)
    
    
            },
            error: function(error) {
                console.error('Error fetching data from the database.');
            }
        });
    }
}

function setMemberWorkspaceRole(userCode){
    let memberWorkspace = JSON.parse($("#txtMemberListWorkspace").val());
    // console.log(memberWorkspace);
    var workspaceRole = memberWorkspace.find(function(value){
        return value.a === userCode;
    });

    return workspaceRole.c;
}

$("#txtDisplayTaskDueDate").change(function(){
    let value = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    // console.log(oldDueDate)
    
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
            $("#hiddenIfTaskUpdate").val("0");

            let taskActivityDesc;

            if(oldDueDate == "" || oldDueDate == null){
                taskActivityDesc = "set Due Date to " + value;
            } else {
                taskActivityDesc = "changed Due Date from " + oldDueDate + " to " + value;
            }
            
            insertTaskActivityHistory(taskID, taskActivityDesc)
            $("#txtDisplayTaskDueDate").addClass("disabled");

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
            $("#hiddenIfTaskUpdate").val("0");
            
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
            $("#hiddenIfTaskUpdate").val("0");

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
                    $("#hiddenIfTaskUpdate").val("0");
                    
    
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


$("#btnApproveTask").click(function(){
   
    checkTaskForApproving();


});
$("#btnDisapproveTask").click(function(){

    // checkTaskForApproving("2");
    insertTaskApproving("2")

    //BAKA MALITO KA KUNG SAAN GALING YUNG CODE NA AFTER MAG APPROVE OR DISAPPROVE BIGLANG NABABAGO YUNG STATUS NG TASK, NAKALAGAY YUNG CODE SA insertTaskForApproving.php 

});

function checkTaskForApproving(){
    let taskID = $("#hiddenDisplayTaskID").val();
    let taskParentID = $("#hiddenDisplayTaskParentID").val();
    let subtaskParentID = $("#hiddenDisplaySubtaskParentID").val();

    // ICHECHECK KUNG YUNG TASK AY MAY MGA HINDI PA NACOCOMPLETE OR "FOR APPROVING"

    if(taskParentID == 0){
        // TASK
        
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/checkTaskStatus.php', 
            type: 'POST',
            data:{
               taskType: "TASK",
               taskID: taskID,
            },
            success: function(data) {
                console.log(data)
                
                if(data.length > 0){
                    Swal.fire({
                        title: 'Approving Disabled',
                        text: 'Some Subtasks are not Completed',
                        icon: 'error',
                    })
                } else {
                    
                    insertTaskApproving("1")
                    
                }

            },
            error: function(error) {
                console.error('Error fetching data from the database.');
            }
        });


    } else {
        if(subtaskParentID == 0){
            // SUBTASK
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/checkTaskStatus.php', 
                type: 'POST',
                data:{
                    taskType: "SUBTASK",
                    taskID: taskID,
                },
                success: function(data) {
                    console.log(data)
                    
                    if(data.length > 0){
                        Swal.fire({
                            title: 'Approving Disabled',
                            text: 'Some Subtasks are not Completed',
                            icon: 'error',
                        })
                    } else {
                        // updateTaskStatus(value, taskID);
                        insertTaskApproving("1")
                    }
                },
                error: function(error) {
                    console.error('Error fetching data from the database.');
                }
            });


        } else {
            // ACTION ITEM
            insertTaskApproving("1")

        }
    }
}



function insertTaskApproving(status){
    let taskID = $("#hiddenDisplayTaskID").val();
    let comment = $("#txtTaskApproverComment").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let taskDesc = $("#spanDisplayTaskDesc").text();
    let assignee = $("#hiddenDisplayTaskAssigneeID").val();
    
    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/insertTaskForApproving.php', 
        type: 'POST',
        data:{
            taskID: taskID,
            status: status,
            comment: comment,
            userCode: userCode,
        },
        success: function(data) {
            console.log(data);
                
            $("#txtTaskApproverComment").val("");


            if(status == "1"){
                //APPROVED
                $("#btnApproveTask").prop("disabled", true);
                $("#btnDisapproveTask").prop("disabled", true);

                populateStatus("3")

                let desc = "approved the Task";
                insertTaskActivityHistory(taskID, desc)
                sendEmail7(userCode, assignee, taskDesc, taskID, comment)

            } else {
                //NOT APPROVED
                $("#btnApproveTask").prop("disabled", true);
                $("#btnDisapproveTask").prop("disabled", true);

                populateStatus("2")
                let desc = "disapproved the Task";
                insertTaskActivityHistory(taskID, desc)

                sendEmail6(userCode, assignee, taskDesc, taskID, comment)


                // sendEmail6(userCode, assignee, taskDesc, taskID)


            }
            
            console.log(activityID);
            // displayTask(activityID);
            $("#hiddenIfTaskUpdate").val("0");
            displayTaskApproverComment(taskID)

            let url = location.pathname;
    
            if(url == '/'+rootFolder+'/dashboard/index.php'){
                let workspaceID = $("#hiddenDisplayWorkspaceID").val();

                displayTaskForApprovingByWorkspace(workspaceID);

            }

        },
        error: function(error) {
            console.error('Error fetching data from the database.');
        }
    });
}


function acceptTaskRequest(requestID, taskID, requestorID, taskDesc){
    // console.log(requestID+" "+taskID+" "+requestorID+" "+taskDesc);

    //
    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/updateTaskAssignee.php",
        method: "POST",
        data: {
            userCode: userCode,
            assignees: '["'+userCode+'"]',
            taskID: taskID,
        },
        success: function(response) {
            console.log(response);

        }
    });

    //
    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/updateRemarks.php",
        method: "POST",
        data: {
            userCode: userCode,
            id: requestID,
            remarks: "2"
        },
        success: function(response) {
            console.log(response);
        }
    });

    let taskActivityHistoryDesc = "accepted the task requested by "+ setUserFullName(requestorID);

    insertTaskActivityHistory(taskID, taskActivityHistoryDesc);
    sendEmailApproveRequest(requestorID, userCode, taskDesc, taskID)

}


$("#btnAcceptTaskRequest").click(function(){
    let taskID = $("#hiddenDisplayTaskID").val();
    let requestorID = $("#hiddenDisplayTaskRequestorID").val();
    let requestID = $("#btnAcceptTaskRequest").val();
    let taskDesc = $("#spanDisplayTaskDesc").text();
    let workspaceID = $("#hiddenDisplayWorkspaceID").val();

    acceptTaskRequest(requestID, taskID, requestorID, taskDesc);
    // console.log(taskDesc);

    let assignee = '["'+userCode+'"]';
    populateUser(assignee, workspaceID, taskID);

    $("#selectDisplayTaskStatus").prop("disabled", false);
    

    $("#btnAcceptTaskRequest").hide();
    Swal.fire({
        title: 'Task Accepted!',
        text: 'You accepted the Task',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Proceed!',
        }).then((result) => {
        if (result.isConfirmed) {
            
        }
    })

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