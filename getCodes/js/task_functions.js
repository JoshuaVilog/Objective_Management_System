
// $("#menuWorkspace").addClass("active");



// IDENTIFY IF THE URL PARAMETER HAS TASK_ID ON IT

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let urlParTaskID = urlParams.get('taskID');
let urlParWorkspaceID = urlParams.get('workspaceID');



if(urlParTaskID == null || urlParTaskID == "null" || urlParTaskID == ""){
    console.log("No Task ID!");
} else {
    console.log(urlParTaskID);
    displayTaskInfo(urlParTaskID)
}

// DITO NA NAGPOPOPULATE NG SELECT DROPDOWN NG YEAR AT MONTH

if(urlParWorkspaceID == null || urlParWorkspaceID == "null" || urlParWorkspaceID == ""){
    console.log("No Workspace ID");

    setTimeout(() => {

        reloadSavedWorkspace("WORKSPACE");
    }, 500);
} else {
    // KAPAG NAGPINDOT SI USER SA DASHBOARD TABLES

    console.log(urlParWorkspaceID);

    $("#liTabWorkspace1").removeClass("active");
    $("#liTabWorkspace2").addClass("active");

    $("#tabWorkspace1").removeClass("active");
    $("#tabWorkspace2").addClass("active");
    $("#tabWorkspace1").removeClass("in");
    $("#tabWorkspace2").addClass("in");

    setTimeout(() => {
        
        reloadSavedWorkspace("DASHBOARD");
    }, 500);
}

// CODE TO HIDE INDEX URL
window.history.replaceState({}, document.title, window.location.pathname);


// ========================================================== //
// CATEGORY

$("#btnOpenModalAddCategory,  #liOpenModalAddCategory").click(function(){
    $("#txtCategoryDesc").val("");
    $("#modalAddCategory").modal("show");

})

$("#listCategory").on("click", ".selectCategory", function(){
    let desc = $(this).find(".spanCategoryDesc").text();
    let id = $(this).find(".hiddenCategoryID").val();
    
    $("#displayCategoryName").text(desc);
    $("#hiddenCategoryID").val(id);
    $("#containerActivity").show();
    displayActivity(id);
    generateDashboard1(id)
    generateChart2(id);
    

    //Highlight Selected Category
    $('.selectCategory').each(function () {
        $(this).removeClass("btn-yellow");
    });
    $(this).addClass("btn-yellow");


    //// save categoryID on local storage
    let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
    savedWorkspace.categoryID = id;
    savedWorkspace.categoryDesc = desc;
    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedWorkspace));

});

$("#containerCategory").on("click", ".btnEditCategory", function(){
    let categoryID = $(this).closest(".selectCategory").find(".hiddenCategoryID").val();

    // alert(categoryID);
    setUpdateCategory(categoryID);
    $("#modalEditCategory").modal("show");

});





// ========================================================== //
// ACTIVITY

// $("#containerActivity").on("click", "#btnOpenModalAddActivity", function(){

//     $("#txtActivityDesc").val("");
//     $("#modalAddActivity").modal("show");

// });
$("#btnOpenModalAddActivity,  #liOpenModalAddActivity").click(function(){
    $("#txtActivityDesc").val("");
    $("#modalAddActivity").modal("show");

})

$("#containerActivity").on("click", ".selectActivityPanel", function(){
    let activityID = $(this).find(".hiddenPanelActivityID").val();

    $(".allContainerTask").empty();
    displayTask(activityID);

    var target = $(this).attr('href');
    $(target).collapse('toggle');

});
$("#listActivity").on("click", ".btnEditActivity", function(){
    let activityID = $(this).closest(".panel").find(".hiddenPanelActivityID").val();

    // alert(activityID)
    setUpdateActivity(activityID);
    $("#modalEditActivity").modal("show");

});

$("#aSelectDashboard").click(function(){
    let categoryID = $("#hiddenCategoryID").val();
    generateDashboard1(categoryID);
    generateChart2(categoryID);

});


// ========================================================== //
// TASK
$("#listActivity").on("click", ".btnOpenModalAddTask", function(){
    let activityID = $(this).val();
    $("#hiddenActivityID").val(activityID);
    $("#hiddenTaskID").val("0");
    $("#modalAddTask").modal("show");

});
$("#btnBackToTask").click(function(){
    // alert("BACK");
    let taskID = $(this).val();
    let activityID = $("#hiddenDisplayActivityID").val();

    // alert(taskID)
    displayTaskInfo(taskID)
    // displaySubtask(activityID, taskID)

});
$("#btnBackToSubtask").click(function(){
    let subtaskID = $(this).val();
    let activityID = $("#hiddenDisplayActivityID").val();

    displayTaskInfo(subtaskID)
    // displaySubtask(activityID, subtaskID)

});



$("#btnOpenModalAssignee").click(function(){

    // $("#modalAddAssignee").modal("show");
    // $("#modalDisplayTask").modal("show");
    
});



// ========================================================== //
// SUBTASK
$("#btnOpenAddSubtask").click(function(){
    
    $("#txtSubtaskDesc").val("");
    $("#containerButtonSubtask").hide();
    $("#containerAddSubtask").show();
});

$("#btnCancelAddSubtask").click(function(){
    
    cancelAddSubtask();

});

function cancelAddSubtask(){
    $("#txtSubtaskDesc").val("");
    $("#containerButtonSubtask").show();
    $("#containerAddSubtask").hide();
}

// ========================================================== //
// ACTION ITEM
$("#btnOpenAddActionItem").click(function(){
    
    $("#txtActionItemDesc").val("");
    $("#containerButtonActionItem").hide();
    $("#containerAddActionItem").show();
});

$("#btnCancelAddActionItem").click(function(){
    
    cancelAddActionItem();

});

function cancelAddActionItem(){
    $("#txtActionItemDesc").val("");
    $("#containerButtonActionItem").show();
    $("#containerAddActionItem").hide();
}

// ============================================== //
// COMMENT
$("#liEditComment").click(function(){
    let commentID = $(this).attr("data-comment-id");

    

    // alert(commentID)
});


// ============================================= ///////////
// FILE
$("#containerTaskFileAttachments").on("click", ".openTaskFile", function(){
    let descNew = $(this).closest(".divTaskFile").find(".hiddenTaskFileDescNew").val();

    // alert(id)
    let url = "/"+documentsFolder+"/WORKSPACE/"+descNew;
    // let encryptedUrl = btoa(url); // Base64 encoding
    window.open(url);

});





// ============================================= ///////////
// RIGHT CLICK CONTEXT MENU

var contextMenuTask = $("#contextMenuTask");
var contextMenuSubtask = $("#contextMenuSubtask");
var contextMenuComment = $("#contextMenuComment");
var contextMenuDiv1 = $("#contextMenuDiv1");
var contextMenuDiv2 = $("#contextMenuDiv2");
var contextMenuDiv3 = $("#contextMenuDiv3");

$('html').click(function() {
    
    hideDropDown()
});
$("#containerComment").on("contextmenu",".divComment", function(e){
    let value = $(this).find(".hiddenCommentID").val();


    contextMenuComment.css({
        display: "block",
        left: e.pageX-40,
        top: e.pageY-100
    });

    $("#liEditComment").attr("data-comment-id", value);
    $("#liRemoveComment").attr("data-comment-id", value);


    e.preventDefault();

});
$("#listCategory").on("contextmenu",".liCategory", function(e){
    let id = $(this).find(".hiddenCategoryID").val()
    
    if(userRole != "1"){
        $("#liDeleteCategory").show()
    } else {
        $("#liDeleteCategory").hide()
    }
    
    $("#aOpenModalEditCategory").attr("data-edit-category-id", id);
    $("#aDeleteCategory").attr("data-delete-category-id", id);

    contextMenuDiv3.css({
        display: "block",
        left: e.pageX,
        top: e.pageY
    });

    e.preventDefault();
});

$("#liMoveTask").click(function(){
    let taskID = $(this).attr("data-task-id");

    emptySelectMoveTask()
    $("#hiddenMoveTaskID").val(taskID);
    $("#modalMoveTask").modal("show");
});
$("#liMoveSubtask").click(function(){
    let taskID = $(this).attr("data-task-id");

    emptySelectMoveTask()
    $("#hiddenMoveTaskID").val(taskID);
    $("#modalDisplayTask").modal("hide");
    $("#modalMoveTask").modal("show");
});
$("#aOpenModalEditCategory").click(function(){
    let categoryID = $(this).attr("data-edit-category-id");

    // alert(categoryID)
    setUpdateCategory(categoryID);
    $("#modalEditCategory").modal("show");
});

function hideDropDown(){
    contextMenuTask.hide();
    contextMenuSubtask.hide();
    contextMenuComment.hide();
    contextMenuDiv1.hide();
    contextMenuDiv2.hide();
    contextMenuDiv3.hide();
}
function emptySelectMoveTask(){
    $("#selectMT_Activity").html('');
    $("#selectMT_Task").html('');
}

// ============================================= //
// EXPORT TASK

// $('#btnExportTaskForApproving').on('click', function() {
//     console.log('DOWNLOAD EXCEL');
//     // let exportFileName = '<?php echo date('Y-m-d').'_company_list.xlsx';?>';
//     table2.download("xlsx", "for approving", {sheetName:"_company_list"}, "active"); // active rows that pass current filters etc
// });

function exportToExcel(jsonData, fileName) {
    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Convert worksheet to workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert workbook to binary XLSX file
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Convert binary XLSX data to Blob
    const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName + '.xlsx';
    link.click();
}

// Function to convert binary string to ArrayBuffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}




// CALENDAR

