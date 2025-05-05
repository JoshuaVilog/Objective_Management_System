
// populateWorkspace2();


$("#selectWorkspace2").change(function(){
    let value = $(this).val();
    // console.log(value);
    if(value == ""){
        $("#containerDashboard2").hide();
        $("#chart2").empty();
    } else {
        $("#containerDashboard2").show();

        displayMembers(value)
        generateChart3(value)

        $.ajax({
            url: '/'+rootFolder+'/getRecords/getAllTaskByWorkspace.php', // Replace with your server-side script URL
            type: 'POST',
            data: {
                workspaceID: value
            },
            dataType: 'json',
            success: function(list) {
                console.log(list);

                table = new Tabulator("#tableRecord2", {
                
                    data: list,
                    layout: "fitDataFill", // Adjust table height based on the data
                    groupBy: function(data){
                        return data.f
                    },
                    groupStartOpen: function(value, count, data, group){
                        //value - the value all members of this group share
                        //count - the number of rows in this group
                        //data - an array of all the row data objects in this group
                        //group - the group component for the group
                    
                        return value != "3"; //all groups with more than three rows start open, any with three or less start closed
                    }, 
                    groupValues:[
                        ["4", "1", "2", "3"],
                    ],
                    groupHeader: [
                        function(value, count, data){
    
                            let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));
        
                            var result = statusList.find(function(item) {
                                return item.a === value;
                            });
                                
                            return result.b + " ("+count+")";
                        },
                    ],
                    columns: [
                        {title: "ID", field: "a", visible: false},
                        {title: "TASK", field: "b"},
                        {title: "ASSIGNEE", field: "k", formatter:displayTaskAssignee},
                        {title: "DUE DATE", field: "d"},
                        {title: "TARGET DATE", field: "d"},
                        {title: "STATUS", field: "f", formatter:formatterStatus},
                        {title: "DELAY", field: "", formatter: displayTaskDelayDashboard2},
                        {title: "START DATE", field: "l"},
                        {title: "FINISH DATE", field: "h"},
                        {title: "TASK CREATED BY", field: "n", formatter:displayTaskCreatedBy},
                        {title: "ACTIVITY", field: "o"},
                        {title: "CATEGORY", field: "p"},
                        {title: "WORKSPACE", field: "q"},
                    ],
                });
                table.on("rowClick", function(e, row) {
                    // Get the row data for the clicked row
                    var rowData = row.getData();
            
                    displayTaskInfo(rowData.a);
                    
                });

                let countIncompleteTask = 0;
                let countCompletedTask = 0;

                for(let index = 0; index < list.length; index++){
                    if(list[index].f == "3"){
                        countCompletedTask++;
                    } else {
                        countIncompleteTask++;
                    }

                }

                
                FusionCharts.ready(function() {
                    var myChart = new FusionCharts({
                        type: "pie2d",
                        renderAt: "chart2",
                        width: "100%",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {
                            chart: 
                            {
                                caption: "Total Task By Status",
                                subcaption: "",
                                decimals: "1",
                                theme: "fusion"
                            },
                            data: [
                                {
                                    label: "INCOMPLETE TASK",
                                    value: countIncompleteTask
                                },
                                {
                                    label: "COMPLETED",
                                    value: countCompletedTask
                                },
                            ]
                        }
                    }).render();
                });
                

            },
            error: function(error) {
                alert('Error fetching data from the database.');
            }
        });


    }
});
function displayTaskDelayDashboard2(cell, formatterParams, onRendered){
    var rowData = cell.getRow().getData();
    let target = rowData.d;
    let status = rowData.f;

    return "<span class='red'>" + calculateDelayDate(target, status) + "</span>";
}


// $('#selectWorkspace').select2({});
setTimeout(() => {
    let workspaceID = $("#selectWorkspace3").val();
    displayMembersOnTask(workspaceID);
}, 500);



$("#selectWorkspace3").change(function(){
    let value = $(this).val();
    // alert(value)
    displayTaskForApprovingByWorkspace(value)
});

// ================================================================= //

function populateWorkspace2(){

    $.ajax({
        url: '/'+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            // console.log(list);

           var options = '<option value="">-Select-</option>';
           for (var i = 0; i < list.length; i++) {
               options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
           }
           
           $('#selectWorkspace2').html(options);
           $("#countWorkspace").text(list.length);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

setTimeout(populateWorkspace3, 700);

function populateWorkspace3(){
    let yearID = $('#selectYearDashboardUser').val();

    $.ajax({
        url: '/'+rootFolder+'/getRecords/selected_workspace_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            userCode: userCode,
        },
        dataType: 'json',
        success: function(list) {
            // console.log(list);
            // var options = '<option value="">-Select-</option>';
            var options = '';

            for (var i = 0; i < list.length; i++) {
                if(yearID == list[i].d){
                    options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
                }
            }
            
            $('#selectWorkspace3').html(options);



            setTimeout(() => {
                // $('#selectWorkspace').select2({});
                // $("#selectWorkspace3").select2({});
            }, 500);

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

    // console.log(workspace);
    setTimeout(() => {
        let workspace = $('#selectWorkspace3').val();

        displayTaskForApprovingByWorkspace(workspace)
    }, 1000);
    
}

