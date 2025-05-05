
// $("#menuTableUser").addClass("active");
let folderLoc = "importWorkspace";
let tempTaskLS = "okrms-temp-task-list";

populateWorkspace();

$("#selectWorkspace").change(function(){
    let value = $(this).val();

    displayCategory(value);
    
});
$("#selectCategory").change(function(){
    let value = $(this).val();

    displayActivity(value);
    
});
$("#selectActivity").change(function(){
    let value = $(this).val();

    displayTask(value);
    
});



// FUNCTIONS
function populateWorkspace(){

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
           $('#selectWorkspace').select2({});

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}

function displayCategory(workspaceID){

    $.ajax({
        url: 'ajax/getCategory.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            workspaceID: workspaceID,
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            let container = $("#selectCategory");

            if(data.length > 0){
                let options = '<option value="">-Select-</option>';

                for(let index = 0; index < data.length; index++){
                    options += '<option value="'+ data[index].a +'">'+data[index].b+'</option>';
                }
            
                container.html(options)
            } else {
                container.html('<option value="">-Select-</option>');
            }
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function displayActivity(categoryID){

    $.ajax({
        url: 'ajax/getActivity.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            categoryID: categoryID,
        },
        dataType: 'json',
        success: function(data) {
            // console.log(data);

            let container = $("#selectActivity");

            if(data.length > 0){
                let options = '<option value="">-Select-</option>';

                for(let index = 0; index < data.length; index++){
                    options += '<option value="'+ data[index].a +'">'+data[index].b+'</option>';
                }
            
                container.html(options)
            } else {
                container.html('<option value="">-Select-</option>');
            }
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function displayTask(activityID){
    // console.log("Display Task: "+activityID);
    $.ajax({
        url: 'ajax/getTask.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            activityID: activityID
        },
        dataType: 'json',
        success: function(data) {
            localStorage.setItem(tempTaskLS, JSON.stringify(data));

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}


















// $("#btnOpenModalAdd").click(function(){

//     $("#modalAdd").modal("show");
// });