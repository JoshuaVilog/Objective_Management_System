
$("#btnAddCategory").click(function(){
    let desc = $("#txtCategoryDesc").val();
    let workspace = $("#selectWorkspace").val();

    if(desc != ""){
        $.ajax({
            url: 'ajax/insertCategory.php', 
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
            url: 'ajax/insertActivity.php', 
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

    if(desc != ""){
        $.ajax({
            url: 'ajax/insertTask.php', 
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

    if(desc != ""){
    
        $.ajax({
            url: 'ajax/insertSubtask.php', 
            type: 'POST',
            data:{
                desc: desc,
                activityID: activityID,
                taskID: taskID,
                userCode: userCode,
            },
            success: function(response) {
                
                // cancelAddSubtask();
                $("#txtSubtaskDesc").val("");
                $("#txtSubtaskDesc").focus();
                displaySubtask(activityID, taskID);
                displayTask(activityID);
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

    if(desc != ""){
        
        $.ajax({
            url: 'ajax/insertActionItem.php', 
            type: 'POST',
            data:{
                desc: desc,
                activityID: activityID,
                taskID: taskID,
                subtaskID: subtaskID,
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
            url: 'ajax/insertTaskComment.php', 
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
        url: 'ajax/insertTaskActivityHistory.php', 
        type: 'POST',
        data:{
            desc: desc,
            taskID: taskID,
            userCode: userCode,
        },
        success: function(response) {
            console.log(response);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}