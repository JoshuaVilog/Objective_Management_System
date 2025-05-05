
$("#btnAddCategory").click(function(){
    let desc = $("#txtCategoryDesc").val();
    let workspace = $("#selectWorkspace").val();

    if(desc != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertCategory.php', 
            type: 'POST',
            data:{
                desc: desc,
                workspace: workspace,
                userCode: userCode,
            },
            success: function() {

                $("#txtCategoryDesc").val("");
                $("#modalAddCategory").modal("hide");
                displayCategory(workspace)

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});

$("#btnAddActivity").click(function(){
    let desc = $("#txtActivityDesc").val();
    let category = $("#hiddenCategoryID").val();

    if(desc != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertActivity.php', 
            type: 'POST',
            data:{
                desc: desc,
                category: category,
                userCode: userCode,
            },
            success: function(response) {
                // console.log(response)
                $("#txtActivityDesc").val("");
                $("#modalAddActivity").modal("hide");
                displayActivity(category);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});

$("#btnAddTask").click(function(){
    let desc = $("#txtTaskDesc").val();
    let dueDate = $("#txtTaskDueDate").val();
    let activity = $("#hiddenActivityID").val();

    if(desc != "" && dueDate != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertTask.php', 
            type: 'POST',
            data:{
                desc: desc,
                dueDate: dueDate,
                activity: activity,
                userCode: userCode,
            },
            success: function(response) {
                // console.log(response)
                $("#txtTaskDesc").val("");
                $("#txtTaskDueDate").val("");
                $("#modalAddTask").modal("hide");
                displayTask(activity);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});
$("#btnAddSubtask").click(function(){
    let desc = $("#txtSubtaskDesc").val();
    let activityID = $("#hiddenDisplayActivityID").val();
    let taskID = $("#hiddenDisplayTaskID").val();
    let dueDate = $("#txtDisplayTaskDueDate").val();

    if(desc != ""){
    
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertSubtask.php', 
            type: 'POST',
            data:{
                desc: desc,
                activityID: activityID,
                taskID: taskID,
                dueDate: dueDate,
                userCode: userCode,
            },
            success: function(response) {
                
                // cancelAddSubtask();
                $("#txtSubtaskDesc").val("");
                $("#txtSubtaskDesc").focus();
                displaySubtask(activityID, taskID);
                // displayTask(activityID);
                $("#hiddenIfTaskUpdate").val("0");
                // displayTaskActivityHistory(taskID)

                //CREATE TASK ACTIVITY HISTORY
                insertTaskActivityHistory(taskID, "created subtask: "+desc);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    }
});
$("#btnAddActionItem").click(function(){
    let desc = $("#txtActionItemDesc").val();
    let activityID = $("#hiddenDisplayActivityID").val(); //ACTIVITY ID
    let taskID = $("#btnBackToTask").val(); // TASK PARENT ID
    let subtaskID = $("#hiddenDisplayTaskID").val(); // SUBTASK PARENT ID
    let dueDate = $("#txtDisplayTaskDueDate").val();

    if(desc != ""){
        
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertActionItem.php', 
            type: 'POST',
            data:{
                desc: desc,
                activityID: activityID,
                taskID: taskID,
                subtaskID: subtaskID,
                dueDate: dueDate,
                userCode: userCode,
            },
            success: function(response) {
                
                // cancelAddSubtask();
                $("#txtActionItemDesc").val("");
                $("#txtActionItemDesc").focus();
                displayActionItem(subtaskID)
                // displaySubtask(activityID, taskID);
                // displayTask(activityID);
                // displayTaskActivityHistory(taskID)

                //CREATE TASK ACTIVITY HISTORY
                insertTaskActivityHistory(taskID, "created subtask: "+desc);

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
        
        
    }
});

function insertTaskComment(){
    let desc = $("#txtTaskCommentDesc").val();
    let taskID = $("#hiddenDisplayTaskID").val();
    
    if(desc.trim() != ""){
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertTaskComment.php', 
            type: 'POST',
            data:{
                desc: desc,
                taskID: taskID,
                userCode: userCode,
            },
            success: function(response) {
                $("#txtTaskCommentDesc").val("");
                displayTaskComment(taskID)

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });
    } else {
        $("#txtTaskCommentDesc").val("");
    }
}

$("#btnAddTaskComment").click(function(){
    insertTaskComment();

});


$('#txtTaskCommentDesc').keydown(function(event) {

    if (event.key === 'Enter') {
        insertTaskComment();
        // alert("eyy")
    }
});

function insertTaskActivityHistory(taskID, desc){

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/insertTaskActivityHistory.php', 
        type: 'POST',
        data:{
            desc: desc,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(response) {
            // console.log(response);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}

$('#fileTaskUpload').ace_file_input({
    style: 'well',
    btn_choose: 'Drop attachments here or click to choose',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'small'//large | fit
    
    ,
    preview_error : function(filename, error_code) {
        //name of the file that failed
        //error_code values
        //1 = 'FILE_LOAD_FAILED',
        //2 = 'IMAGE_LOAD_FAILED',
        //3 = 'THUMBNAIL_FAILED'
        //alert(error_code);
    }

}).on('change', function(){
    //console.log($(this).data('ace_input_files'));
    //console.log($(this).data('ace_input_method'));

});


$('#txtDisplayTaskFile').change(function(){
    var files = $(this)[0].files;

    if (files.length > 0) {
        $("#btnUploadFiles").prop("disabled", false);
       
        
    } else {
        $("#btnUploadFiles").prop("disabled", true);
    }
});

$("#btnUploadFiles").click(function(){
    var files = $('#txtDisplayTaskFile')[0].files;
    var taskID = $("#hiddenDisplayTaskID").val();
    var workspaceID = $("#hiddenDisplayWorkspaceID").val();

    if (files.length > 0) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        formData.append('rootFolder', rootFolder);
        formData.append('userCode', userCode);
        formData.append('taskID', taskID);
        formData.append('workspaceID',workspaceID);
        
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/insertTaskFile.php', // URL to your PHP script
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                $("#btnUploadFiles").prop("disabled", true);
                $('#txtDisplayTaskFile').val("");
                displayFileAttachments(taskID)
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error(xhr);
            }
        });
        

        console.log("UPLOADED");
       
    } else {
        console.log("NOT UPLOADED");
    }
    
});

