

$("#btnNotifyRequest").click(function(){
    let assignee = $(this).val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let requestor = $("#hiddenDisplayTaskRequestorID").val();
    let taskDesc = $("#spanDisplayTaskDesc").text();

    sendEmail5(requestor, assignee, taskDesc, taskID)
    $(this).prop("disabled", true)
});


function notifyDepartmentHead(assignee, workspaceID, taskDesc, taskID, requestor){
    // let assigneeID = setNameAssignee(assignee);
    let assigneeRole = setUserRole(assignee);

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getMembers.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(list) {

            for(let index = 0; index < list.length; index++){

                if(list[index].c == "3"){
                    // IF YUNG USER SA WORKSPACE AY SUB OWNER SIYA

                    if(list[index].a != assignee){
                        sendEmail8(list[index].a, assignee, taskDesc, taskID, requestor)
                        
                    }

                }

            }

        },
        error: function(error) {
            alert('Error fetching data from the database. ASSIGNEE');
        }
    });
}

// ============================================= ///////////
// SEND EMAIL

function sendEmailTaskRequest(requestor, assignee, taskDesc, taskID){

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorName = "";
    let assigneeEmail = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeEmail = userList[index].j;
            break;
        }
    }

    console.log(assigneeEmail);
    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendTaskRequest.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeEmail: assigneeEmail,
            requestorName: requestorName,
            taskDesc: taskDesc,
            taskID: taskID,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
        },
        error: function(response) {
            // Handle errors
            console.log(response);
        }
    });
}

function sendEmailApproveRequest(requestor, assignee, taskDesc, taskID){

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorEmail = "";
    let assigneeName = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorEmail = userList[index].j;
            break;
        }
    }

    // console.log(assigneeEmail);

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendApproveTaskRequest.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeName: assigneeName,
            requestorEmail: requestorEmail,
            taskDesc: taskDesc,
            taskID: taskID,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
        },
        error: function(response) {
            // Handle errors
            console.log(response);
        }
    });
}
function sendEmailDeclineRequest(requestor, assignee){

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorEmail = "";
    let assigneeName = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorEmail = userList[index].j;
            break;
        }
    }

    // console.log(assigneeEmail);

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendDeclineTaskRequest.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeName: assigneeName,
            requestorEmail: requestorEmail,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
        },
        error: function(response) {
            // Handle errors
            console.log(response);
        }
    });
}


function sendEmail4(creator, assignee, taskDesc, taskID){

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let email = "";
    let name = "";

    // NAME
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            name = userList[index].c + " " + userList[index].b;
            break;
        }
    }

    //EMAIL
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == creator){
            email = userList[index].j;
            break;
        }
    }
    
    // alert("EMAIL SENT APPROVE")

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendTaskApproving.php", // URL to your PHP script
        type: 'POST',
        data:{
            name: name,
            email: email,
            taskDesc: taskDesc,
            taskID: taskID,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
        },
        error: function(response) {
            // Handle errors
            console.log(response);
        }
    });
}

function sendEmail5(requestor, assignee, taskDesc, taskID){
    //NOTIFY

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorName = "";
    let assigneeEmail = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeEmail = userList[index].j;
            break;
        }
    }
    

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendEmail5.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeEmail: assigneeEmail,
            requestorName: requestorName,
            taskDesc: taskDesc,
            taskID: taskID,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });

        },
        error: function(response) {
            // Handle errors
            console.log(response);
            
        }
    });
}


function sendEmail6(requestor, assignee, taskDesc, taskID, comment){
    // NOTIFY DISAPPROVE

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorName = "";
    let assigneeEmail = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeEmail = userList[index].j;
            break;
        }
    }
    

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendEmail6.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeEmail: assigneeEmail,
            requestorName: requestorName,
            taskDesc: taskDesc,
            taskID: taskID,
            comment: comment,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });

        },
        error: function(response) {
            // Handle errors
            console.log(response);
            
        }
    });
}

function sendEmail7(requestor, assignee, taskDesc, taskID, comment){
    // NOTIFY DISAPPROVE

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let requestorName = "";
    let assigneeEmail = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorName = userList[index].c + " " + userList[index].b;
            break;
        }

    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeEmail = userList[index].j;
            break;
        }
    }
    

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendEmail7.php", // URL to your PHP script
        type: 'POST',
        data:{
            assigneeEmail: assigneeEmail,
            requestorName: requestorName,
            taskDesc: taskDesc,
            taskID: taskID,
            comment: comment,
        },
        success: function(response) {
            
            console.log(response);
            Swal.fire({
                title: response,
                // icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });

        },
        error: function(response) {
            // Handle errors
            console.log(response);
            
        }
    });
}

function sendEmail8(head, assignee, taskDesc, taskID, requestor){
    // NOTIFY DISAPPROVE

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    let assigneeName = "";
    let requestorName = "";
    let headEmail = "";

    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == assignee){
            assigneeName = userList[index].c + " " + userList[index].b;
            break;
        }
    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == requestor){
            requestorName = userList[index].c + " " + userList[index].b;
            break;
        }
    }
    for(let index = 0; index < userList.length; index++){
        if(userList[index].a == head){
            headEmail = userList[index].j;
            break;
        }
    }
    

    $.ajax({
        url: "/"+rootFolder+"/getCodes/php/phpmailer/sendEmail8.php", // URL to your PHP script
        type: 'POST',
        data:{
            headEmail: headEmail,
            assigneeName: assigneeName,
            requestorName: requestorName,
            taskDesc: taskDesc,
            taskID: taskID,
        },
        success: function(response) {
            
            console.log(response);
            // Swal.fire({
            //     title: response,
            //     // icon: "success",
            //     toast: true,
            //     position: "top-end",
            //     timer: 3000,
            //     showConfirmButton: false,
            // });

        },
        error: function(response) {
            // Handle errors
            console.log(response);
            
        }
    });
}

