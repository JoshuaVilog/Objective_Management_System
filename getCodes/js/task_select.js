


/* 
setTimeout(() => {
    let year = JSON.parse(localStorage.getItem(lsActiveYear));

    populateWorkspace(year.RID);
    populateYear(year.RID);
}, 500);
 */

$("#selectWorkspace").change(function(){
    let value = $(this).val();
    let url = location.pathname;
    

    if(url == "/1_OKRMS/workspace/index.php"){
        selectWorkspace(value)
        // console.log('workspace');

    } else if(url == '/1_OKRMS/dashboard/index.php'){

        displayTaskForApprovingByWorkspace(value)

        // console.log('dashboard');
    } 
});
$("#selectYear").change(function(){
    let value = $(this).val();
    
    populateWorkspace(value);
    $("#containerCategory").hide();
    $("#containerActivity").hide();

    // save workspaceID on local storage
    let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
    savedWorkspace.yearID = value;
    savedWorkspace.workspaceID = 0;
    savedWorkspace.categoryID = 0;
    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedWorkspace));

});

function selectWorkspace(id){
    
    if(id == ""){
        $("#containerCategory").hide();
    } else {
        $("#containerCategory").show();
        $("#containerActivity").hide();
        displayCategory(id);
        displayMembers(id);
        displayAllTaskByWorkspace(id)
        generateChart3(id)
        // displayTaskForApprovingByWorkspace(workspaceID)
    }


    // save workspaceID on local storage
    let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
    savedWorkspace.workspaceID = id;
    savedWorkspace.categoryID = 0;
    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedWorkspace));
    
//    alert(id)

}



// $('#selectWorkspace').select2({}); // NILIPAT KO YUNG CODE NA TO SA reloadSavedWorkspace() FUNCTION

// =============================== //
// MOVE TASK
$("#selectMT_Category").change(function(){
    let value = $(this).val();

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getActivity.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            categoryID: value,
        },
        dataType: 'json',
        success: function(data) {

            let container = $("#selectMT_Activity");
            let element = '<option>-Select-</option>';

            for(let index = 0; index < data.length; index++){
                element += '<option value="'+data[index].a+'">'+data[index].b+'</option>';
            }

            container.html(element)
            $("#selectMT_Task").html("");


        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

});

$("#selectMT_Activity").change(function(){
    let value = $(this).val();

    $.ajax({
        url: '/'+rootFolder+'/getCodes/php/getTask.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            activityID: value
        },
        dataType: 'json',
        success: function(data) {

            let container = $("#selectMT_Task");
            let element = '<option value="0">NONE</option>';

            for(let index = 0; index < data.length; index++){
                element += '<option value="'+data[index].a+'">'+data[index].b+'</option>';
            }

            container.html(element)

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

});




// ================================================================= //

function populateWorkspace(yearID){
    // console.log(userRole);
    if(userRole == 0){
        $.ajax({
            url: '/'+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
            type: 'POST',
            dataType: 'json',
            success: function(list) {
                // console.log(list);
               var options = '<option value="">-Select-</option>';
            //    var options = '';
               for (var i = 0; i < list.length; i++) {
                    if(yearID == list[i].d){
                        options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
                    }
               }
               
               $('#selectWorkspace').html(options);
               $("#selectWorkspace2").html(options);


                setTimeout(() => {
                    $('#selectWorkspace').select2({});
                    $("#selectWorkspace2").select2({});
                }, 500);


            },
            error: function(error) {
                alert('Error fetching data from the database. WORKSPACE');
            }
        });

        console.log("ADMIN");
    } else {
        $.ajax({
            url: '/'+rootFolder+'/getRecords/selected_workspace_masterlist.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                userCode: userCode,
            },
            dataType: 'json',
            success: function(list) {
                // console.log(list);
                var options = '<option value="">-Select-</option>';

                for (var i = 0; i < list.length; i++) {
                    if(yearID == list[i].d){
                        options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
                    }
                }
                
                $('#selectWorkspace').html(options);


                /* var options3 = '';
                for (var i = 0; i < list.length; i++) {
                    if(yearID == list[i].d){
                        options3 += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
                    }
                }
                $('#selectWorkspace3').html(options3); */


                setTimeout(() => {
                    $('#selectWorkspace').select2({});
                    // $("#selectWorkspace3").select2({});
                }, 500);
    
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });

        console.log("NORMAL USER");
    }

    
}
function populateYear(id){
    let list = JSON.parse(localStorage.getItem(lsYearList));
    

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            selected = (list[i].a == id)? "selected": "";
        }
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectYear').html(options);

    setTimeout(() => {
        $("#selectYear").select2({})
    }, 500);

}

function populateStatus(selectedStatus){

    let list = JSON.parse(localStorage.getItem(lsTaskStatusList));
    list = list.filter(element => element.a !== "4");

    if(selectedStatus == 4){
        // FOR APPROVING
        $("#txtDisplayTaskStatus").show();
        $('#selectDisplayTaskStatus').hide();
        $("#txtDisplayTaskStatus").val("FOR APPROVING");
    } else if(selectedStatus == 3){
        // COMPLETED
        $("#txtDisplayTaskStatus").show();
        $('#selectDisplayTaskStatus').hide();
        $("#txtDisplayTaskStatus").val("COMPLETED");

    } else {
        $("#txtDisplayTaskStatus").hide();
        $('#selectDisplayTaskStatus').show();

        var options = '';
        for (var i = 0; i < list.length; i++) {
            let selected = (selectedStatus == list[i].a)? "selected":"";
            options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
        }
        
        $('#selectDisplayTaskStatus').html(options);
    }
    
}
function populatePriority(selectedPriority){

    let list = JSON.parse(localStorage.getItem(lsPriorityList));

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        let selected = (selectedPriority == list[i].a)? "selected":"";
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectDisplayTaskPriority').html(options);

}


async function populateUser(selectedUsersList, workspaceID, taskID){
    // let workspaceID = $("#selectWorkspace").val();
    // console.log(selectedUsersList);
    $("#containerDisplayAssignee").show();
    $("#containerChangeAssignee").hide();
    $("#chkCheckShowAllUser").prop("checked", false);

    if(selectedUsersList == "0"){
        // IF ETONG TASK NA ITO AY MAY NAKA ASSIGN NANG TAO PERO HINDI PA NA AACCEPT
        
        $('#selectDisplayTaskAssignee').html("<option></option>");
        $("#containerChangeAssignee .select2-container").html("");
        $('#selectDisplayTaskAssignee').prop("disabled", true);
        // $('#pDisplayTaskAssignee').text("Waiting for confirmation.");
        $("#btnChangeAssignee").hide()
        $("#btnChangeAssignee").prop("disabled", true);

        //GET LAST REQUEST ID
        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/getLastRequest.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                taskID: taskID,
            },
            dataType: 'json',
            success: function(requestID) {

                $.ajax({
                    url: '/'+rootFolder+'/getCodes/php/getRequest.php', // Replace with your server-side script URL
                    type: 'POST',
                    data:{
                       requestID: requestID,
                    },
                    dataType: 'json',
                    success: function(data) {
        
                        // console.log(data);
                        if(data.c == userCode){
                            $('#pDisplayTaskAssignee').text("You are assigned on this task, Do you want to accept it?");
                            $("#btnAcceptTaskRequest").show();
                            $("#hiddenDisplayTaskRequestorID").val(data.b) // KUNG SINO YUNG NAGREQUEST
                            $("#btnAcceptTaskRequest").val(data.a);

                        } else {
                            $('#pDisplayTaskAssignee').text(setUserFullName(data.c)+" assigned on this task. Waiting to accept the Request.");
                            $("#btnNotifyRequest").show();
                            $("#hiddenDisplayTaskRequestorID").val(data.b)
                            $("#btnNotifyRequest").val(data.c)
                        }
                        
                    },
                    error: function(error) {
                        alert('Error fetching data of TASK REQUEST.');
                    }
                });

                // console.log(requestID);
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });

    } else {
        // ETO NAMAN KAPAG SA TASK AY WALANG NAKA ASSIGN NA HUMAN

        $('#pDisplayTaskAssignee').text("No Assignee Yet");
        $('#selectDisplayTaskAssignee').prop("disabled", false);
        $("#btnChangeAssignee").show()
        $("#btnChangeAssignee").prop("disabled", false);
        $("#hiddenDisplayTaskRequestorID").val("")

        $.ajax({
            url: '/'+rootFolder+'/getCodes/php/getMembers.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                workspaceID: workspaceID,
            },
            dataType: 'json',
            success: function(userList) {
                // console.log(userList);
    
                let selectedUsersLists = (selectedUsersList == "")? "[]":selectedUsersList;
    
                
                // let userList = JSON.parse(localStorage.getItem(lsUserList));
                let selectedUsers = JSON.parse(selectedUsersLists);


                //CHECK IF ACCOUNT EXIST ON SELECTED USER LIST
                let isAccountHere = false;
                let displayAssigneeName = "";

                for(let index = 0; index < userList.length; index++){
                    if(userCode == userList[index].a){
                        isAccountHere = true;
                        break;
                    }
                }

                if(isAccountHere == true){
                    //Changing Arrays
                    var myUserID = userList.find(element => element.a === userCode);
                    userList = userList.filter(element => element !== myUserID);
                    userList.unshift(myUserID); // yung Login User nilagay ko sa unahan
                }
                
                // REMOVE SUPER ADMIN ON ASSIGNEE
                userList = userList.filter(item => item.a !== "1");

                // REMOVE UNACTIVE USER
                userList = userList.filter(item => item.d == "1");
                
                var options = '<option value=""></option>';
                // var options = '';
                for (var i = 0; i < userList.length; i++) {
                    let isSelected = false; 
                    let selectedDesc = "";
    
                    for(let j = 0; j < selectedUsers.length; j++){
                        if(selectedUsers[j] == userList[i].a){
                            isSelected = true;
                            // console.log(selectedUsers[j] + " "+userList[i].a);
                            break;
                        }
                    }
    
                    if(isSelected == true){
                        selectedDesc = "selected";
                        displayAssigneeName = userList[i].b;
                    }
                    
                    let meDesc = (userCode == userList[i].a)? "(ME) - ":"";
                    options += '<option value="' + userList[i].a + '" '+selectedDesc+'>'+ meDesc + userList[i].b + '</option>';
                    
                }
                
                if(displayAssigneeName != ""){
                    $('#pDisplayTaskAssignee').text(displayAssigneeName);
                }
                
                setTimeout(() => {
                    
                    $('#selectDisplayTaskAssignee').html(options);
                }, 500);


            },
            error: function(error) {
                alert('Error fetching data from the database. ASSIGNEE');
            }
        });


    }

    setTimeout(() => {
        $('#selectDisplayTaskAssignee').select2({
            // multiple: true,
            placeholder: '-Select Assignee-',
        });
    }, 1000);

}
