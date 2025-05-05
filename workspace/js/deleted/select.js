
populateWorkspace();


$("#selectWorkspace").change(function(){
    let value = $(this).val();

    if(value == ""){
        $("#containerCategory").hide();
    } else {
        $("#containerCategory").show();
        $("#containerActivity").hide();
        displayCategory(value);
        displayMembers(value);
    }



    // save workspaceID on local storage
    let savedWorkspace = JSON.parse(localStorage.getItem(lsSavedWorkspace));
    savedWorkspace.workspaceID = value;
    savedWorkspace.categoryID = 0;
    localStorage.setItem(lsSavedWorkspace, JSON.stringify(savedWorkspace));
    
});

// $('#selectWorkspace').select2({}); // NILIPAT KO YUNG CODE NA TO SA reloadSavedWorkspace() FUNCTION


$("#selectMT_Category").change(function(){
    let value = $(this).val();

    $.ajax({
        url: 'ajax/getActivity.php', // Replace with your server-side script URL
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
        url: 'ajax/getTask.php', // Replace with your server-side script URL
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

function populateWorkspace(){

    if(userRole == 0){
        $.ajax({
            url: '/'+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
            type: 'POST',
            dataType: 'json',
            success: function(list) {
    
               var options = '<option value="">-Select-</option>';
               for (var i = 0; i < list.length; i++) {
                   options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
               }
               
               $('#selectWorkspace').html(options);
    
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });


        console.log("ADMIN");
    } else {
        $.ajax({
            url: '/'+rootFolder+'/getRecords/selected_workspace_masterlist.php', // Replace with your server-side script URL
            type: 'POST',
            data:{
                userCode: userCode
            },
            dataType: 'json',
            success: function(list) {
    
               var options = '<option value="">-Select-</option>';
               for (var i = 0; i < list.length; i++) {
                   options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
               }
               
               $('#selectWorkspace').html(options);
    
            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });


        console.log("NORMAL USER");
    }

    
}

function populateStatus(selectedStatus){

    let list = JSON.parse(localStorage.getItem(lsTaskStatusList));

    var options = '';
    for (var i = 0; i < list.length; i++) {
        let selected = (selectedStatus == list[i].a)? "selected":"";
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectDisplayTaskStatus').html(options);
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


function populateUser(selectedUsersList){
    let workspaceID = $("#selectWorkspace").val();

    $.ajax({
        url: 'ajax/getMembers.php', // Replace with your server-side script URL
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

            // console.log(userList);

            //Changing Arrays
            var myUserID = userList.find(element => element.a === userCode);
            userList = userList.filter(element => element !== myUserID);
            userList.unshift(myUserID); // yung Login User nilagay ko sa unahan

            var adminID = userList.find(element => element.a === "1");
            userList = userList.filter(element => element !== adminID);
            userList.push(adminID); // yung admin nilagay ko sa huli
            
            var options = '<option></option>';
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
                }
                let meDesc = (userCode == userList[i].a)? "(ME) - ":"";
                // console.log(isSelected);
                options += '<option value="' + userList[i].a + '" '+selectedDesc+'>'+ meDesc + userList[i].b + '</option>';
                
            }
            
            $('#selectDisplayTaskAssignee').html(options);
            
            $('#selectDisplayTaskAssignee').select2({
                multiple: true,
                placeholder: '-Select Assignee-',
            });


            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}


/*
function populateUser(selectedUsersList){
    let selectedUsersLists = (selectedUsersList == "")? "[]":selectedUsersList;

    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let selectedUsers = JSON.parse(selectedUsersLists);

    console.log(userList);

    
    //Changing Arrays
    var myUserID = userList.find(element => element.a === userCode);
    userList = userList.filter(element => element !== myUserID);
    userList.unshift(myUserID); // yung Login User nilagay ko sa unahan

    var adminID = userList.find(element => element.a === "1");
    userList = userList.filter(element => element !== adminID);
    userList.push(adminID); // yung admin nilagay ko sa huli

    // console.log(userCode);
    // console.log(userList);
    
    var options = '<option></option>';
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
        }
        let meDesc = (userCode == userList[i].a)? "(ME) - ":"";
        // console.log(isSelected);
        options += '<option value="' + userList[i].a + '" '+selectedDesc+'>'+ meDesc +userList[i].c +" "+ userList[i].b + '</option>';
        
    }
    
    $('#selectDisplayTaskAssignee').html(options);
    
    $('#selectDisplayTaskAssignee').select2({
        multiple: true,
        placeholder: '-Select Assignee-',
    });

    // console.log(JSON.parse(selectedUsersList));
    
    
}
*/
































// $('#mySelect').select2({
//     multiple: true
// });



// $("#btnGetSelects").click(function(){
//     var selectedValues = $('#mySelect').val();

//     // Iterate over the selected values
//     if (selectedValues) {
//         // selectedValues.forEach(function(value) {
//         //     console.log('Selected value:', value);
//         //     // Perform any action with the selected value
//         // });
//         // console.log(JSON.stringify(selectedValues));
//         alert("hey")
//     } else {
//         console.log('No values selected');
//     }
// })