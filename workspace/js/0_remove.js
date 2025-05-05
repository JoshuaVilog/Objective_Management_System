$("#liRemoveTask").click(function(){
    let taskID = $(this).attr("data-task-id");
    let activityID = $(this).attr("data-activity-id");

    Swal.fire({
            title: 'Are you sure you want to remove the Task?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            // console.log("TASK ID "+taskID);
            // console.log("ACTIVITY ID "+activityID);
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeTask.php',
                type: 'POST',
                data: {
                    taskID:taskID,
                    userCode: userCode
                },
                success: function(data) {
                    console.log(data);

                    let sendData = {
                        taskID: taskID,
                        taskIDList: data,
                        userCode: userCode,
                    }
                    
                    if(data != "DELETED"){
                        Swal.fire({
                            title: 'The task has a subtask. If the task is removed, the subtask will also be removed. Are you sure you want to remove the task?',
                            icon: 'question',
                            confirmButtonText: 'Yes',
                            showCancelButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {

                                $.ajax({
                                    url: 'ajax/removeSubtask.php',
                                    type: 'POST',
                                    data: JSON.stringify(sendData),
                                    success: function(data) {
                                        console.log(data);

                                        displayTask(activityID);

                                    },
                                    error: function(error) {
                                        alert('Error fetching data from the database.');
                                    }
                                }); 

                            }
                        })
                    } else {
                        displayTask(activityID);

                    }

                    // alert(activityID)
                    
                },
                error: function(error) {
                    alert('Error fetching data from the database.');
                }
            });  
            
        }
    })
});
$("#liRemoveSubtask").click(function(){
    let subtaskID = $(this).attr("data-task-id");
    let taskID = $("#hiddenDisplayTaskID").val();
    let activityID = $("#hiddenDisplayActivityID").val();

    Swal.fire({
        title: 'Are you sure you want to remove the Sub Task?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            // console.log("TASK ID "+taskID);
            // console.log("ACTIVITY ID "+activityID);
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeTask.php',
                type: 'POST',
                data: {
                    taskID: subtaskID,
                    userCode: userCode
                },
                success: function(data) {
                    displaySubtask(activityID, taskID);
                    // alert(activityID)
                    
                }
            });   
            
        }
    })
});

$("#listCategory").on("click",".btnRemoveCategory", function(){
    let categoryID = $(this).closest(".selectCategory").find(".hiddenCategoryID").val();
    let workspaceID = $("#selectWorkspace").val();

    // alert(categoryID)
    Swal.fire({
        title: 'Are you sure you want to remove the Category?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            // console.log("TASK ID "+taskID);
            // console.log("ACTIVITY ID "+activityID);
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeCategory.php',
                type: 'POST',
                data: {
                    categoryID: categoryID,
                    userCode: userCode
                },
                success: function(data) {
                    displayCategory(workspaceID)
                    
                }
            });   
            
        }
    })
})
$("#containerActivity").on("click",".btnRemoveActivity", function(){
    let activityID = $(this).closest(".panel").find(".hiddenPanelActivityID").val();
    let categoryID = $("#hiddenCategoryID").val();

    // alert(categoryID)
    Swal.fire({
        title: 'Are you sure you want to remove the Activity?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            // console.log("TASK ID "+taskID);
            // console.log("ACTIVITY ID "+activityID);
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeActivity.php',
                type: 'POST',
                data: {
                    activityID: activityID,
                    userCode: userCode
                },
                success: function(data) {
                    displayActivity(categoryID);
                    
                }
            });   
            
        }
    })
})

$("#liRemoveComment").click(function(){
    let commentID = $(this).attr("data-comment-id");
    let taskID = $("#hiddenDisplayTaskID").val();

    Swal.fire({
        title: 'Are you sure you want to remove the Comment?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeComment.php',
                type: 'POST',
                data: {
                    commentID: commentID,
                    userCode: userCode
                },
                success: function(data) {
                    displayTaskComment(taskID)
                    // console.log(data);
                }
            });   
            
        }
    })
    
    // alert(commentID)
});