

function removeTaskRow(taskID, activityID, taskParentID, subtaskParentID){

    if(taskParentID == 0){
        //TASK
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
                                title: 'Not able to Remove',
                                text: 'The task has a subtask. Need to remove Subtask',
                                icon: 'error',
                            })
    
                        } else {
                            displayTask(activityID);
    
                        }
    
                        // alert(activityID)
                        
                    },
                    error: function(error) {
                        alert('Error fetching data from the database. DELETEE');
                    }
                });  
            
            }
        })


    } else {
        if(subtaskParentID == 0){
            //SUBTASK
            Swal.fire({
                title: 'Are you sure you want to remove the Subtask?',
                icon: 'question',
                confirmButtonText: 'Yes',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log("TASK ID "+taskID);
                    // console.log("ACTIVITY ID "+activityID);
                    
                    $.ajax({
                        url: '/'+rootFolder+'/getCodes/php/removeSubtask.php',
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
                                    title: 'Not able to Remove',
                                    text: 'The task has a subtask. Need to remove Action Item',
                                    icon: 'error',
                                })
        
                            } else {
                                displayTask(activityID);
        
                            }
        
                            // alert(activityID)
                            
                        },
                        error: function(error) {
                            alert('Error fetching data from the database. DELETEE');
                        }
                    });  
                
                }
            })


        } else {
            //ACTION ITEM
            Swal.fire({
                title: 'Are you sure you want to remove the Action Item?',
                icon: 'question',
                confirmButtonText: 'Yes',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
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
                                    title: 'Not able to Remove',
                                    text: 'The task has a subtask. Need to remove Subtask',
                                    icon: 'error',
                                })
        
                            } else {
                                displayTask(activityID);
        
                            }
        
                            // alert(activityID)
                            
                        },
                        error: function(error) {
                            alert('Error fetching data from the database. DELETEE');
                        }
                    }); 
                
                }
            })


        }
    }

    


    // console.log("TaskID: "+taskID + "activity:"+activityID);
}


$("#aDeleteCategory").click(function(){
    let categoryID = $(this).attr("data-delete-category-id");
    let workspaceID = $("#selectWorkspace").val();

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

                    if(data != "DELETED"){
        
                        Swal.fire({
                            title: 'Not able to Remove',
                            text: 'The category has a activity. Need to remove Activity',
                            icon: 'error',
                        })

                    } else {
                        displayCategory(workspaceID)
                    }
                    
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
                    if(data != "DELETED"){
        
                        Swal.fire({
                            title: 'Not able to Remove',
                            text: 'The activity has a task. Need to remove task',
                            icon: 'error',
                        })

                    } else {
                        displayActivity(categoryID);
                    }
                    
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

$("#containerTaskFileAttachments").on("click", ".removeTaskFile", function(){
    let id = $(this).closest(".divTaskFile").find(".hiddenTaskFileID").val();
    let taskID = $("#hiddenDisplayTaskID").val();


    Swal.fire({
        title: 'Are you sure you want to remove the File?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            
            $.ajax({
                url: '/'+rootFolder+'/getCodes/php/removeTaskFile.php',
                type: 'POST',
                data: {
                    taskID: id,
                    userCode: userCode
                },
                success: function(data) {
                    displayFileAttachments(taskID)
                    console.log(data);
                }
            });   
            
        }
    })

});