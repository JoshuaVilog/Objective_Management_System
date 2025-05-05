$(document).ready(function() {
    // getDepartment();
    fetchDataAndInitializeTable();
});

var table;

function fetchDataAndInitializeTable() {
    // console.log(userCode);

    $.ajax({
        url: "/"+rootFolder+"/getRecords/task_request.php",
        method: "POST",
        data:{
            userCode: userCode,
        },
        success: function(recordList) {

            let container = $("#containerTaskRequest");
            let elements = '';

            // console.log(recordList);

            for(let index = 0; index < recordList.length; index++){
                let message;
                let taskID;
                let requestor = setName(recordList[index].c);
                let requestorID = recordList[index].c;
                let showtask;

                
                if(recordList[index].e == "1"){
                    // message = requestor + " is assigning a Task for you. <a href='#' class='showTaskRequest1' data-id='"+recordList[index].b+"'>Show the task</a>";
                    message = requestor + " is assigning a Task for you.";
                    showtask = "<a href='#' class='showTaskRequest1' data-id='"+recordList[index].b+"'>Show the task</a>";
                    taskID = '<input type="hidden" class="hiddenMessageRequestRemarksTaskID" value="'+recordList[index].b +'">';
                } else if(recordList[index].e == "2"){
                    // message = "You accepted the Task Request for "+ requestor+". <a href='#' class='showTaskRequest' data-id='"+recordList[index].b+"'>Show the task</a>";
                    message = "You accepted the Task Request for "+ requestor+".";
                    showtask = '<a href="#" class="showTaskRequest" data-id="'+recordList[index].b+'">Show task</a>';
                    taskID = '<input type="hidden" class="hiddenMessageRequestRemarksTaskID" value="'+recordList[index].b +'">';
                } else if(recordList[index].e == "3"){
                    message = "You decline a Task for "+ requestor;
                    taskID = '<input type="hidden" class="hiddenMessageRequestRemarksTaskID" value="">';
                    showtask = "";
                }

                // elements += '<li class="dd-item dd2-item divMessageRequest"> <div class="dd-handle dd2-handle"> <i class="normal-icon ace-icon fa fa-comments bigger-130"></i> <i class="drag-icon ace-icon fa fa-arrows bigger-125"></i> </div> <div class="dd2-content">'+ message +'</div> <input type="hidden" class="hiddenMessageRequestRemarks" value="'+recordList[index].e +'"> '+taskID+'<input type="hidden" class="hiddenMessageRequestorID" value="'+recordList[index].c+'"> <input type="hidden" class="hiddenMessageRequestID" value="'+recordList[index].a+'"> </li>'

                elements += '<div class="itemdiv dialogdiv divMessageRequest"> <div class="user"> </div> <div class="body"> <div class="text">'+message+'</div> <div class="time"> <span>'+recordList[index].g+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name"> '+showtask+'  &nbsp;|&nbsp; <span>'+recordList[index].h+'</span> </div> </div> <input type="hidden" class="hiddenMessageRequestRemarks" value="'+recordList[index].e +'"> '+taskID+'<input type="hidden" class="hiddenMessageRequestorID" value="'+recordList[index].c+'"> <input type="hidden" class="hiddenMessageRequestID" value="'+recordList[index].a+'"> <input type="hidden" class="hiddenMessageTaskDesc" value="'+recordList[index].h+'"> </div>';
                
                // <span class="sticker"> <span class="label label-success arrowed-in"> <i class="ace-icon fa fa-check bigger-110"></i> </span> </span>

            }

            container.html(elements);


        }
    });

    $.ajax({
        url: "/"+rootFolder+"/getRecords/task_approval.php",
        method: "POST",
        data:{
            userCode: userCode,
        },
        success: function(recordList) {

            let container2 = $("#containerTaskApproval");
            let elements2 = '';

            for(let index = 0; index < recordList.length; index++){
                let assignee = setName(recordList[index].d);

                if(recordList[index].e != 1){
                    if(recordList[index].e == "2"){
                        // message = assignee+" confirmed the Task request. <a href='#' class='showTaskRequest' data-id='"+recordList[index].b+"'>Show the task</a>";
                        message = assignee+" confirmed the Task request.";
                        taskID = '<input type="hidden" class="hiddenMessageRequestRemarksTaskID" value="'+recordList[index].b +'">';
                    } else if(recordList[index].e == "3"){
                        // message = assignee +" decline the request. <a href='#' class='showTaskRequest' data-id='"+recordList[index].b+"'>Show the task</a>";
                        message = assignee +" decline the request.";
                        taskID = '<input type="hidden" class="hiddenMessageRequestRemarksTaskID" value="">';
                    }


                    //elements2 += '<li class="dd-item dd2-item divMessageRequest"> <div class="dd-handle dd2-handle"> <i class="normal-icon ace-icon fa fa-comments bigger-130"></i> <i class="drag-icon ace-icon fa fa-arrows bigger-125"></i> </div> <div class="dd2-content">'+ message +'</div> <input type="hidden" class="hiddenMessageRequestRemarks" value="'+recordList[index].e +'"> '+taskID+'<input type="hidden" class="hiddenMessageRequestorID" value="'+recordList[index].c+'"> <input type="hidden" class="hiddenMessageRequestID" value="'+recordList[index].a+'"> </li>'

                    elements2 += '<div class="itemdiv dialogdiv divMessageRequest"> <div class="user"> </div> <div class="body"> <div class="text">'+message+'</div> <div class="time"> <span>'+recordList[index].g+'</span> <i class="ace-icon fa fa-cog"></i> </div> <div class="name"> <a href="#" class="showTaskRequest" data-id="'+recordList[index].b+'">Show task</a> &nbsp;|&nbsp; <span>'+recordList[index].h+'</span> </div> </div> </div>';
                }

            }

            container2.html(elements2);
        }
    });
    
}

function setName(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === id;
    });

    return result.c + " " + result.b;

}

$("#containerTaskRequest").on("click", ".divMessageRequest", function(){
    let remarks = $(this).find(".hiddenMessageRequestRemarks").val();
    let taskID = $(this).find(".hiddenMessageRequestRemarksTaskID").val();
    let requestID = $(this).find(".hiddenMessageRequestID").val();
    let requestorID = $(this).find(".hiddenMessageRequestorID").val();

    /*
    if(remarks == "1"){
        Swal.fire({
            title: 'Are you sure you want to accept the Task?',
            icon: 'question',
            confirmButtonText: 'Accept',
            confirmButtonColor: "#3085d6",
            showCancelButton: true,
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {

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
                    url: "ajax/updateRemarks.php",
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

                let taskActivityHistoryDesc = "accepted the task requested by "+ setName(requestorID);

                insertTaskActivityHistory(taskID, taskActivityHistoryDesc);

                sendEmailApproveRequest(requestorID, userCode)

                Swal.fire({
                    title: 'Task Accepted!',
                    text: 'You accepted the Task',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        fetchDataAndInitializeTable();
                    } else if(result.isDismissed) {
                        alert("Dismiss")
                    }
                    fetchDataAndInitializeTable();
                })
                
            } else if(result.isDenied){

                $.ajax({
                    url: "/"+rootFolder+"/getCodes/php/updateTaskAssignee.php",
                    method: "POST",
                    data: {
                        userCode: userCode,
                        assignees: "",
                        taskID: taskID,
                    },
                    success: function(response) {
                        console.log(response);

                    }
                });

                $.ajax({
                    url: "ajax/updateRemarks.php",
                    method: "POST",
                    data: {
                        userCode: userCode,
                        id: requestID,
                        remarks: "3"
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });

                let taskActivityHistoryDesc = "declined the task requested by "+ setName(requestorID);

                insertTaskActivityHistory(taskID, taskActivityHistoryDesc);
                sendEmailDeclineRequest(requestorID, userCode)

                Swal.fire({
                    title: 'Task Decline!',
                    text: 'You decline the Task',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        fetchDataAndInitializeTable();
                    }
                    fetchDataAndInitializeTable();
                })
            }
        })
        

    } 
    */
});


// SHOWING THE TASK
$("#containerTaskRequest").on("click", ".showTaskRequest", function(){
    let taskID = $(this).attr("data-id");
    // alert(taskID)

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskInfo.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {

            if(data.j == '["'+userCode+'"]'){

                displayTaskInfo(data.a);

                // NASESELECT PA DIN PAG PUMUNTA NG SUBTASK
                // setTimeout(() => {
                //     $('#selectDisplayTaskAssignee').prop("disabled", true);
                // }, "500");

            } else {

                Swal.fire({
                    title: 'The Task is no longer assigned to you.',
                    icon: 'error',
                })
            }

            // 

        },
        error: function(error) {
            alert('Error: '+error);
        }
    });

});

// SHOWING THE TASK
$("#containerTaskApproval").on("click", ".showTaskRequest", function(){
    let taskID = $(this).attr("data-id");
    // alert(taskID)

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskInfo.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            taskID: taskID
        },
        dataType: 'json',
        success: function(data) {

            displayTaskInfo(data.a);
            /*
            if(data.j == '["'+userCode+'"]'){

                displayTaskInfo(data.a);

            } else {

                Swal.fire({
                    title: 'The Task is no longer assigned to you.',
                    icon: 'error',
                })
            }
            */

        },
        error: function(error) {
            alert('Error: '+error);
        }
    });

});



// OPENS A MODAL AND DISPLAY THE TASK DESC, TARGET DATE, REQUESTOR
$("#containerTaskRequest").on("click", ".showTaskRequest1", function(){
    // let taskID = $(this).attr("data-id");
    let remarks = $(this).closest(".divMessageRequest").find(".hiddenMessageRequestRemarks").val();
    let taskID = $(this).closest(".divMessageRequest").find(".hiddenMessageRequestRemarksTaskID").val();
    let requestID = $(this).closest(".divMessageRequest").find(".hiddenMessageRequestID").val();
    let requestorID = $(this).closest(".divMessageRequest").find(".hiddenMessageRequestorID").val();

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTaskInfo.php',
        method: "POST",
        data: {
            taskID: taskID
        },
        success: function(data) {
            // console.log(response);

            $("#txtDisplayTaskRequestDesc").val(data.b);
            $("#txtDisplayTaskRequestTargetDate").val(data.d);

        }
    });

    $("#txtDisplayTaskRequestRequestedBy").val(setName(requestorID));
    $("#hiddenMessageRequestRemarks").val(remarks);
    $("#hiddenMessageRequestRemarksTaskID").val(taskID);
    $("#hiddenMessageRequestID").val(requestID);
    $("#hiddenMessageRequestorID").val(requestorID);

    $("#modalDisplayTaskRequest").modal("show");

});

$("#btnTaskRequestApprove").click(function(){
    let remarks = $("#hiddenMessageRequestRemarks").val();
    let taskID = $("#hiddenMessageRequestRemarksTaskID").val();
    let requestID = $("#hiddenMessageRequestID").val();
    let requestorID = $("#hiddenMessageRequestorID").val();
    let taskDesc = $("#txtDisplayTaskRequestDesc").val();


    acceptTaskRequest(requestID, taskID, requestorID, taskDesc);
    

    Swal.fire({
        title: 'Task Accepted!',
        text: 'You accepted the Task',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Proceed!',
        }).then((result) => {
        if (result.isConfirmed) {
            fetchDataAndInitializeTable();
            $("#modalDisplayTaskRequest").modal("hide");
        }
        fetchDataAndInitializeTable();
        $("#modalDisplayTaskRequest").modal("hide");
    })

});

$("#btnTaskRequestDecline").click(function(){
    let remarks = $("#hiddenMessageRequestRemarks").val();
    let taskID = $("#hiddenMessageRequestRemarksTaskID").val();
    let requestID = $("#hiddenMessageRequestID").val();
    let requestorID = $("#hiddenMessageRequestorID").val();

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/updateTaskAssignee.php",
        method: "POST",
        data: {
            userCode: userCode,
            assignees: "",
            taskID: taskID,
        },
        success: function(response) {
            console.log(response);

        }
    });

    $.ajax({
        url: "ajax/updateRemarks.php",
        method: "POST",
        data: {
            userCode: userCode,
            id: requestID,
            remarks: "3"
        },
        success: function(response) {
            console.log(response);
        }
    });

    let taskActivityHistoryDesc = "declined the task requested by "+ setName(requestorID);

    insertTaskActivityHistory(taskID, taskActivityHistoryDesc);
    sendEmailDeclineRequest(requestorID, userCode)

    Swal.fire({
        title: 'Task Decline!',
        text: 'You decline the Task',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Proceed!',
        }).then((result) => {
        if (result.isConfirmed) {
            fetchDataAndInitializeTable();
            $("#modalDisplayTaskRequest").modal("hide");
        }
        fetchDataAndInitializeTable();
        $("#modalDisplayTaskRequest").modal("hide");
    })
});

