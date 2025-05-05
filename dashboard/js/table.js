

// ============================================================= //
// ADMIN DASHBOARD

// getWorkspaceRecord(); // WORKSPACE LIST
populateYear();
getAllTask() // ALL TASK LIST
setTimeout(generateDashboard2, 1000);
setTimeout(generateAllTask, 500);


$("#selectYearDashboardAdmin").change(function(){
    let value = $(this).val();

    // console.log(value);
    generateDashboard2();
    generateAllTask();

});

function populateYear(){
    let list = JSON.parse(localStorage.getItem(lsYearList));
    let id = JSON.parse(localStorage.getItem(lsActiveYear)).RID;

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            selected = (list[i].a == id)? "selected": "";
        }
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectYearDashboardAdmin').html(options);
    $('#selectYearDashboardUser').html(options);

}


function generateDashboard2(){
    // let activeYear = JSON.parse(localStorage.getItem(lsActiveYear)).RID;
    let activeYear = $("#selectYearDashboardAdmin").val();

    
    $.ajax({
        url: 'ajax/getAllWorkspaceAndStatus.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            yearID: activeYear,
        },
        dataType: 'json',
        success: function(list) {
            // console.log(list);

            let workspaceList = JSON.parse(localStorage.getItem(lsWorkspaceList));
            let pendingList = JSON.parse(localStorage.getItem(lsAllPendingTaskList));

            workspaceList = workspaceList.filter(item => item.d == activeYear);

            let arrayDashboard = [];

            $("#countWorkspace").text(workspaceList.length);

            let workspaceOrder = localStorage.getItem(lsDashboardWorkspaceOrder);

            // console.log(workspaceList);

            if(workspaceOrder != null){
                let orderArray = JSON.parse(workspaceOrder);

                // Create a map for quick lookup of index positions
                let orderMap = orderArray.reduce((acc, obj, index) => {
                    acc[obj.workspaceID] = index;
                    return acc;
                }, {});

                // Sort arrayOfObject based on the orderMap
                workspaceList.sort((a, b) => orderMap[a.a] - orderMap[b.a]);


            }

            // console.log(workspaceList);

            for(i = 0; i < workspaceList.length; i++){
                let array1 = [];
                let status1 = 0;
                let status2 = 0;
                let status3 = 0;
                
                array1.push(workspaceList[i].b);
                

                for(j = 0; j < list.length; j++){

                    if(workspaceList[i].a == list[j].a){
                        if(list[j].b == "1"){
                            status1 = list[j].c;
                        }
                        if(list[j].b == "2"){
                            status2 = list[j].c;
                        }
                        if(list[j].b == "3"){
                            status3 = list[j].c;
                        }
                    }
                }

                let pendingCount = "0";
                for(let j = 0; j < pendingList.length; j++){
                    if(workspaceList[i].a == pendingList[j].a){
                        pendingCount = pendingList[j].b;
                        break;
                    }
                }

                let array2 = {
                    "1": status1, 
                    "2": status2, 
                    "3": status3, 
                    "4": pendingCount, //PENDING
                };

                array1.push(array2);
                array1.push(workspaceList[i].a);
                arrayDashboard.push(array1);

            }

            // console.log(workspaceList);
            // alert("BADING pendingList");
            


            // console.log(arrayDashboard);

            let container = $("#containerDashboardWorkspace");
            element = '';
            // console.log(arrayDashboard);

            for(let index = 0; index < arrayDashboard.length; index++){
                element += '<div class="col-xs-12 col-sm-2 widget-container-col ui-sortable"> <div class="widget-boxx ui-sortable-handle"><div class="widget-body"><table class="table table-bordered tblShowWorkspace"> <thead> <tr> <th colspan="4" class="dbText center text-primary">'+arrayDashboard[index][0]+'</th> </tr> </thead> <tbody> <tr> <td class="dbText center">TO-DO</td> <td class="dbText center">ON-GOING</td> <td class="dbText center">COMPLETE</td> <td class="dbText center">PENDING</td></tr> <tr> <td class="dbText center"><strong>'+arrayDashboard[index][1][1]+'</strong></td> <td class="dbText center"><strong>'+arrayDashboard[index][1][2]+'</strong></td> <td class="dbText center"><strong>'+arrayDashboard[index][1][3]+'<strong></td><td class="dbText center"><strong>'+arrayDashboard[index][1][4]+'</strong></td> </tr> </tbody><input type="hidden" class="hiddentblWorkspaceID" value="'+arrayDashboard[index][2]+'"> </table> </div></div></div>';
                //element += '<div class="col-xs-12 col-sm-3 widget-container-col ui-sortable" id="widget-container-col-5" style="min-height: 104px;"> <div class="widget-box ui-sortable-handle"> <div class="widget-body"> <table class="table table-bordered"> <thead> <tr> <th colspan="4" class="dbText center">'+arrayDashboard[index][0]+'</th> </tr> </thead> <tbody> <tr> <td class="dbText center">TO-DO</td> <td class="dbText center">ON-GOING</td> <td class="dbText center">COMPLETE</td> <td class="dbText center">PENDING</td> </tr> <tr> <td class="dbText center">1</td> <td class="dbText center">2</td> <td class="dbText center">3</td> <td class="dbText center">3</td> </tr> </tbody> </table> </div> </div> </div>';

            }

            container.html(element)

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

$("#btnOpenAllTask").show();
$("#btnCloseAllTask").hide();

function generateAllTask(statusOpen){
    let table;
    // let list = JSON.parse(localStorage.getItem(lsAllTaskList));


    getAllTask(statusOpen)

    /* table = new Tabulator("#tableRecord3", {
                
        data: list,
        layout: "fitDataFill", // Adjust table height based on the data
        groupBy:["d","g","f","e"],
        groupStartOpen: [
            function(value, count, data, group){
                if(value != 3){
                    return true;
                }

            },
            function(value, count, data, group){
                return true;

            },
            function(value, count, data, group){
                return true;

            },
            function(value, count, data, group){
                return statusOpen;

            },
        ], 
        
        groupValues:[
            ["4", "2", "1", "3"]
        ],
        groupHeader:[
            function(value, count, data){ //generate header contents for gender groups
                let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

                var result = statusList.find(function(item) {
                    return item.a === value;
                });
                let color;
                if(value == "1"){
                    color = "black";
                } else if(value == "2"){
                    color = "#1589FF";
                } else if(value == "3"){
                    color = "#50C878";
                } else if(value == "4"){
                    color = "black";
                }
                    
                return "<span style='color:"+color+"; margin-left:10px; font-size: 18px;'>"+result.b + " ("+count+")</span> ";
                // return value + "<span style='color:#d00; margin-left:10px;'>(" + count + " item)</span>";
            },
            function(value, count, data){ //generate header contents for color groups
                return value + " ("+count+")";
            },
            function(value, count, data){ //generate header contents for color groups
                return value + " ("+count+")";
            },
            function(value, count, data){ //generate header contents for color groups
                return value + " ("+count+")";
            },
        ],
        
        columns: [
            {title: "id", field: "id", visible: false},
            {title: "ID", field: "a", visible: false},
            {title: "#", field: "", formatter: "rownum"},
            {title: "TASK", field: "b"},
            {title: "ASSIGNEE", field: "c", formatter: displayTaskAssignee},
            {title: "TARGET DATE", field: "k"},
            {title: "STATUS", field: "d", formatter: formatterStatus},
            {title: "DELAY", field: "", formatter: displayTaskDelayDashboard1},
            {title: "START DATE", field: "l"},
            {title: "FINISH DATE", field: "m"},
            {title: "TASK CREATED BY", field: "n", formatter:displayTaskCreatedBy},
            {title: "ACTIVITY", field: "e"},
            {title: "CATEGORY", field: "f"},
            {title: "WORKSPACE", field: "g"},
        ],
    });
    table.on("rowClick", function(e, row) {
        // Get the row data for the clicked row
        var rowData = row.getData();

        displayTaskInfo(rowData.a);
        
    }); */
    
}

function displayTaskDelayDashboard1(cell, formatterParams, onRendered){
    var rowData = cell.getRow().getData();
    let target = rowData.k;
    let status = rowData.d;

    return "<span class='red'>" + calculateDelayDate(target, status) + "</span>";
}

$("#btnOpenAllTask").click(function(){
    $("#btnOpenAllTask").hide();
    $("#btnCloseAllTask").show();

    // $(".tabulator-group-level-3").addClass("tabulator-group-visible");
    console.log("OPEN");

    generateAllTask(true)
    
});

$("#btnCloseAllTask").click(function(){

    $("#btnOpenAllTask").show();
    $("#btnCloseAllTask").hide();

    console.log("CLOSE");
    generateAllTask(false)
});

function formatterStatus(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

    if(rowData == "" || rowData == null){
        return "";
    } else {
        var result = statusList.find(function(value) {
            return value.a === rowData;
        });

        return result.b;
    }
}



/*
function displayTaskAssignee(cell, formatterParams, onRendered){
    let rowData = cell.getValue();
    let selectedList = (rowData == "")? "":JSON.parse(rowData);
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let element = '';

    for(let i= 0; i < userList.length; i++){
        let isSelected = false;

        for(let j = 0; j < selectedList.length; j++){
            if(selectedList[j] == userList[i].a){
                isSelected = true
            }
        }
        let fname = userList[i].c;
        let lname = userList[i].b;
        let fnameChar = fname.charAt(0);
        let lnameChar = lname.charAt(0);

        if(isSelected == true){
            element += '<span class="badge badge-info " data-toggle="tooltip" title="'+fname+" "+lname+'">'+fnameChar+lnameChar+'</span>&nbsp;';
        }
    }
    
    return element;
}
*/



// ============================================================= //
// USER DASHBOARD

setTimeout(() => {
    let year = $("#selectYearDashboardUser").val();

    generateDashboard1(year);

}, 1000);
// generateDashboard1();


$("#selectYearDashboardUser").change(function(){
    let value = $(this).val();

    // console.log(value);
    generateDashboard1(value);

}); 

function generateDashboard1(year){
    $.ajax({
        url: '/'+rootFolder+'/getRecords/getAllTaskByUser.php', // Replace with your server-side script URL
        type: 'POST',
        data: {
            userCode: userCode,
            year: year,
        },
        dataType: 'json',
        success: function(list) {
            // console.log(list);

            table = new Tabulator("#tableRecord1", {
                
                data: list,
                layout: "fitDataFill", // Adjust table height based on the data
                // dataTree: true,
                groupBy: function(data){
                    //data - the data object for the row being grouped
                
                    return data.d;
                },
                groupStartOpen:function(value, count, data, group){
                    //value - the value all members of this group share
                    //count - the number of rows in this group
                    //data - an array of all the row data objects in this group
                    //group - the group component for the group
                
                    return value != "3"; //all groups with more than three rows start open, any with three or less start closed
                },
                groupValues:[
                    ["4", "2", "1", "3"],
                ],
                groupHeader: function(value, count, data, group){

                    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

                    var result = statusList.find(function(item) {
                        return item.a === value;
                    });
                        
                    return result.b + " ("+count+")";
                },
                columns: [
                    {title: "ID", field: "a", visible: false},
                    {title: "TASK", field: "b"},
                    {title: "STATUS", field: "d", formatter: formatterStatus},
                    {title: "TARGET DATE", field: "h"},
                    {title: "START DATE", field: "i"},
                    {title: "FINISH DATE", field: "j"},
                    {title: "ACTIVITY", field: "e"},
                    {title: "CATEGORY", field: "f"},
                ],
                
            });
            table.on("rowDblClick", function(e, row) {
                var rowData = row.getData();

                displayTaskInfo(rowData.a);
                // alert(rowData.a)
            });
            table.on("rowContext", function(e, row){
                var rowData = row.getData();

                if(userRole != "1"){
                    $("#liRemoveTask").attr("data-task-id", rowData.a)
                    $("#liMoveTask").attr("data-task-id", rowData.a)
                    $("#liRemoveTask").attr("data-activity-id", rowData.k)
    
                    hideDropDown()
                    
                    contextMenuTask.css({
                        display: "block",
                        left: e.pageX,
                        top: e.pageY
                    });
                    
                    // $("#contextMenuDiv2").hide();
                
                    e.preventDefault(); // prevent the browsers default context menu form appearing.
                }
                
            });


            let countTotalTask = list.length;
            let countIncompleteTask = 0;
            let countCompletedTask = 0;

            for(let index = 0; index < list.length; index++){
                if(list[index].d == "3"){
                    countCompletedTask++;
                } else {
                    countIncompleteTask++;
                }

            }

            $("#countMyIncompleteTask").text(countIncompleteTask);
            $("#countMyCompletedTask").text(countCompletedTask);
            $("#countMyTotalTask").text(countTotalTask);

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "pie2d",
                    renderAt: "chart1",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                        chart: 
                        {
                            caption: "My Total Task By Status",
                            subcaption: "",
                            decimals: "1",
                            theme: "fusion",
                            showLegend: "0",
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





