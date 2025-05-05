$("#menuScheduler").addClass("active");


let userSchedAccess = setUserRole2(userCode);

/* 
if(userSchedAccess == "0"){
    //NORMAL USER
    $("#containerApprovingMenu").hide();

} else if(userSchedAccess == "1"){
    //ADMIN
    $("#containerApprovingMenu").show();

}
 */
if(userRole == "1" && userSchedAccess == "0"){
    $("#aTabApproving").hide();
    $("#aTabOverAllList").hide();

} else if(userRole == "2" && userSchedAccess == "0"){
    
    $("#aTabOverAllList").hide();

} else {
    $("#aTabApproving").show();
    $("#aTabOverAllList").show();

}

let tableAddVisitor = new Tabulator("#table-add-visitor", {
    layout: "fitDataFill",
    columns: [
        {title: "#", formatter: "rownum", headerSort: false,},
        {title: "id", field: "id", headerSort: false, visible:false, },
        {title: "VISITOR NAME", field: "visitor", headerSort: false, formatter: formatterAddVisitorName, },
        {title: "id", field: "rid", headerSort: false, visible: false, formatter: formatterVisitorID, },
        {title: "ACTION", field: "id", frozen: true, headerSort: false, formatter: formatterAddVisitorAction, },
    ],
});

function formatterAddVisitorName(cell, formatterParams, onRendered){
    let value = cell.getValue();
    let rowData = cell.getRow().getData();
    
    
    let formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control");
    input.classList.add("txtVisitor");

    let listAttr = "listReq"+rowData.id;
    input.setAttribute("list", listAttr);
    input.value = cell.getValue();

    // Create datalist element
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", listAttr);

    // Populate datalist with options
    let list = JSON.parse(localStorage.getItem(lsVisitorList));
    
    input.addEventListener("input", function (event) {
        //cell.getRow().update({ name: event.target.value });
        let dataListID = document.getElementById(listAttr);

        if(this.value.trim() === ""){

            dataListID.innerHTML = "";
        } else {

            dataListID.innerHTML = "";
            for (var i = 0; i < list.length; i++) {

                if(list[i].c == rowData.b){
                    var option = document.createElement("option");
                    option.value = list[i].b;
                    datalist.appendChild(option);
                }
            }

        }
    });

    // Append datalist to input element
    input.appendChild(datalist);


    // Return the input element
    formGroup.appendChild(input);
    return formGroup;
}

function formatterVisitorID(cell, formatterParams, onRendered){
    let value = cell.getValue();

    return '<input type="text" class="form-control hiddenVisitorID" value="'+value+'">';
}

function formatterAddVisitorAction(cell, formatterParams, onRendered){
    let value = cell.getValue();
    cell.getElement().style.backgroundColor = "#FFFFFF";

    let remove = '<button class="btn btn-danger btn-minier btnRemove" value="'+value+'">Remove</button>';
    return remove;
}



blankForms();

function blankForms(){
    let date = getCurrentDate();
    $("#txtDescription").val("");
    $("#txtDate").val(date);
    $("#txtStartDate").val(date);
    $("#txtEndDate").val(date);
    $("#txtDate").prop("min", getCurrentDate());
    $("#txtStartDate").prop("min", getCurrentDate());
    // $("#txtStartDate").prop("max", getCurrentDate());
    $("#txtEndDate").prop("min", getCurrentDate());
    $("#selectStartTime").html(populateStartTime(date));
    $("#selectEndTime").html('<option value="">-Select Start Time first-</option>');
    populateRoom($("#selectRoom"));
    populateAttendees();
    populateDepartmentSched();
    populateMeetingCategory();
    populateVisitorType();
    populateChkItemsToPrepared();

    setTimeout(() => {
        
        tableAddVisitor.setData([]);
        $("#containerVisitorForm").hide();
    }, 100);


    $("#divPeriod1").show();
    $("#divPeriod2").hide();
    $("#selectDatePeriod").val("ONE");
    $("#selectDatePeriod option[value=MULTIPLE]").prop("disabled", false);

}

setTimeout(() => {
    
    let now = new Date();
    let hours = (now.getMinutes() <= 30) ? String(now.getHours()).padStart(2, "0"): String(now.getHours() + 1).padStart(2, "0");
    let minutes = (now.getMinutes() <= 30) ? "30" : "00";
    let time = `${hours}:${minutes}`;

    // console.log(31 <= 30 ? "30" : "00");
    // $("#selectStartTime").val(time);
    // $("#selectEndTime").val(time);
   
}, 500);

$("#txtDate").change(function(){
    let value = $(this).val();

    setTimeout(() => {
        
        $("#selectStartTime").html(populateStartTime(value));
    }, 500);
    $("#selectEndTime").html('<option value="">-Select Start Time first-</option>');
});
$("#selectStartTime").change(function(){
    let value = $(this).val();

    $("#selectEndTime").html(populateEndTime(value));
    
    
});
$("#txtChkDate").change(function(){
    let value = $(this).val();

    $("#selectChkStartTime").html(populateStartTime(value));
    $("#selectChkEndTime").html('<option value="">-Select Start Time first-</option>');
});
$("#selectChkStartTime").change(function(){
    let value = $(this).val();

    $("#selectChkEndTime").html(populateEndTime(value));
});


// FUNCTIONS FOR OVERALL SCHED
$("#selectTypeRange").change(function(){
    let value = $(this).val();

    if(value == "DAY"){
        $("#containerTypeRangeDay").show();
        $("#containerTypeRangeCustom").hide();
        $("#dateSelectDay").val(getCurrentDate());
        let date = $("#dateSelectDay").val();

        generateSchedule(date, date);
    } else if(value == "CUSTOM"){
        $("#dateStartDateSched").val(getCurrentDate());
        $("#dateEndDateSched").val(getCurrentDate());

        $("#containerTypeRangeDay").hide();
        $("#containerTypeRangeCustom").show();

        let startDate = $("#dateStartDateSched").val();
        let endDate = $("#dateEndDateSched").val();
        
        generateSchedule(startDate, endDate);
    }
});



/* setTimeout(() => {
    let date1 = $("#dateStartDateSched").val();
    let date2 = $("#dateEndDateSched").val();

    $("#dateStartDateSched").prop("max", date1);
    $("#dateEndDateSched").prop("min", date1);

    // console.log(date1 + date2);
    // syncData(date1, date2);
}, 500); */
$("#dateSelectDay").change(function(){
    let date = $(this).val();

    generateSchedule(date, date);
});
$("#dateStartDateSched").change(function(){
    let startDate = $(this).val();
    let endDate = $("#dateEndDateSched").val();

    $("#dateEndDateSched").prop("min", startDate);
    generateSchedule(startDate, endDate);
});
$("#dateEndDateSched").change(function(){
    let endDate = $(this).val();
    let startDate = $("#dateStartDateSched").val();

    $("#dateStartDateSched").prop("max", endDate);
    generateSchedule(startDate, endDate);
});
$("#chkSelectAll").click(function(){
    let check = $(this).is(":checked");
    let type = $("#selectTypeRange").val();

    if(check == true){

        $("#containerChkBoxRoom .chkRooms").prop("checked", true);
    } else if(check == false){

        $("#containerChkBoxRoom .chkRooms").prop("checked", false);
    }
    
    
    if(type == "DAY"){
        let date = $("#dateSelectDay").val();

        generateSchedule(date, date);
    } else if(type == "CUSTOM"){
        let startDate = $("#dateStartDateSched").val();
        let endDate = $("#dateEndDateSched").val();

        generateSchedule(startDate, endDate);
    }

    
});



//////////// SELECT PERIOD DATE/////////////
$("#selectDatePeriod").change(function(){
    let value = $(this).val();
    let date = getCurrentDate();

    if(value == "ONE"){

        $("#divPeriod1").show();
        $("#divPeriod2").hide();
        $("#selectStartTime").html(populateStartTime(date));
        $("#selectEndTime").html('<option value="">-Select Start Time first-</option>');
    } else if(value == "MULTIPLE"){
        
        $("#divPeriod1").hide();
        $("#divPeriod2").show();
        $("#selectStartTime").html(populateStartTime());
        $("#selectEndTime").html('<option value="">-Select Start Time first-</option>');
    }
});
$("#txtStartDate").change(function(){
    let startDate = $(this).val();
    let endDate = $("#txtEndDate").val();

    // $("#txtEndDate").val(startDate);
    $("#txtEndDate").prop("min", startDate);
});
$("#txtEndDate").change(function(){
    let endDate = $(this).val();
    let startDate = $("#txtStartDate").val();

    $("#txtStartDate").prop("max", endDate);
});

//////////////////////////////////////////////////////////////////////////////////////////////


$("#containerChkBoxRoom").on("click", ".chkRooms", function(){
    let type = $("#selectTypeRange").val();
    
    if(type == "DAY"){
        let date = $("#dateSelectDay").val();

        generateSchedule(date, date);
    } else if(type == "CUSTOM"){
        let startDate = $("#dateStartDateSched").val();
        let endDate = $("#dateEndDateSched").val();

        generateSchedule(startDate, endDate);
    }
    
    // console.log("TEST");
    // console.log(getSelectedRooms());
});

function getSelectedRooms(){
    let values = $(".chkRooms:checked").map(function() {
        return $(this).val();
    }).get();  

    return values;

}
function getSelectedItemsToPrepared(){
    let values = $(".chkItemsToPrepared:checked").map(function() {
        return $(this).val();
    }).get();  

    return values;

}

//================================================= //
// POPULATE SELECT OPTIONS

function populateStartTime(date, id){
    let list = timeList();
    // let date = $("#txtDate").val();
    // console.log(date + " "+ getCurrentDate());

    let now = new Date();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = now.getMinutes();
    let time = `${hours}:${minutes}`;
    
    let options = '<option value="">-Select-</option>';

    // console.log(date);
    for(let index = 0; index < list.length; index++){
        let selected = "";
        if(id != undefined){
            if(list[index].b == id){
                selected = "selected";
                // console.log(list[index].b);
            }

            options += '<option value="'+list[index].b+'" '+selected+'>'+list[index].c+'</option>'

        } else {
            if(date == getCurrentDate()){
                let disable = (list[index].b <= time) ? "disabled" : "";
            
                if(list[index].b >= time){
                    options += '<option value="'+list[index].b+'" '+disable+' '+selected+'>'+list[index].c+'</option>'
                }
            } else {
                options += '<option value="'+list[index].b+'" '+selected+'>'+list[index].c+'</option>'
                
            }
        }
    }

    return options;
}
function populateEndTime(startTime, id){
    let list = timeList();

    let options = '<option value="">-Select-</option>';

    for(let index = 0; index < list.length; index++){
        let disable = (list[index].b <= startTime) ? "disabled" : "";
        let selected = "";

        if(id != undefined){
            if(list[index].b == id){
                selected = "selected";
            }

            // console.log(startTime);
        }
    
        if(list[index].b >= startTime){
            options += '<option value="'+list[index].b+'" '+disable+' '+selected+'>'+list[index].c+'</option>'
        }
    }

    return options;
}

function populateRoom(container, id){
    let list = JSON.parse(localStorage.getItem(lsRoomList));
    let options = '<option value="">-Select-</option>';

    for(let index = 0; index < list.length; index++){
        let selected = ""
        if(id != undefined){
            if(id == list[index].a){

                selected = "selected"
            }
        
        }

            options += '<option value="'+list[index].a +'" '+selected+'>'+ list[index].b +'</option>';
    }

    container.html(options);

    setTimeout(() => {
        
        container.select2({})
    }, 500);
}
function populateChkBoxRoom(){
    let list = JSON.parse(localStorage.getItem(lsRoomList));
    // let options = '<div class="checkbox"> <label><input type="checkbox" value="ALL">ALL</label> </div>';
    let options = '';

    for(let index = 0; index < list.length; index++){
        
        options += '<div class="checkbox"> <label><input type="checkbox" class="chkRooms" value="'+list[index].a+'" checked>'+list[index].b+'</label> </div>';
    }

    $("#containerChkBoxRoom").html(options);

}

function populateAttendees(selectedList){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let options = '';
    list = list.filter(item => item.active == "1");
    selectedList = (selectedList != undefined) ? JSON.parse(selectedList) : [];

    // console.log(selectedList);

    for(let index = 0; index < list.length; index++){
        let selected = false;
        let selectedDesc = "";

        for(let j = 0; j < selectedList.length; j++){

            if(list[index].a == selectedList[j]){
                selected = true;
            }
        }

        if(selected == true){
            selectedDesc = "selected";
        }

        options += '<option value="'+list[index].a +'" '+selectedDesc+'>'+ list[index].c +'</option>';
    }

    $("#selectAttendees").html(options);

    setTimeout(() => {
        
        $("#selectAttendees").select2({})
    }, 500);
}
function populateDepartmentSched(id){
    // let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let list = JSON.parse(setOKRMSDepartment(userCode));
    let options = '';
    // list = list.filter(item => item.active == "1");

    for(let index = 0; index < list.length; index++){
        let selected = "";

        if(id != undefined && id == list[index]){
            
            selected = "selected";
        }
        options += '<option value="'+list[index] +'" '+selected+'>'+ setHRISDepartmentCode(list[index])+'</option>';
    }

    $("#selectDepartmentSched").html(options);

    // $("#selectDepartmentSched").select2({})
}
function populateMeetingCategory(){
    let list = getMeetingCategory();
    let options = '';

    for(let index = 0; index < list.length; index++){
        options += '<option value="'+list[index].a +'">'+ list[index].b +'</option>';
    }

    $("#selectCategory").html(options);

    // $("#selectDepartmentSched").select2({})
}
function populateVisitorType(id){
    let list = getVisitorType();
    let options = '<option>-Select-</option>';

    for(let index = 0; index < list.length; index++){
        let selected = "";
        if(id != undefined && id == list[index].a){
            selected = "selected"
        }
        options += '<option value="'+list[index].a +'" '+ selected +'>'+ list[index].b +'</option>';
    }

    $("#selectVisitorType").html(options);

    // $("#selectVisitorInfo").select2({})
}
function populateChkItemsToPrepared(selectedItems){
    let list = getItemsToPrepared();
    let options = '';

    if(selectedItems != undefined){

        selectedItems = JSON.parse(selectedItems);

        for(let index = 0; index < list.length; index++){
            let checked = "";
            
            for(let j = 0; j < selectedItems.length; j++){

                if(list[index].a == selectedItems[j]){

                    checked = "checked";
                    break;
                }

            }

            options += '<div class="checkbox"> <label><input type="checkbox" class="chkItemsToPrepared" value="'+list[index].a+'" '+checked+'>'+list[index].b+'</label> </div>';
        }
    } else {
        for(let index = 0; index < list.length; index++){
        
            options += '<div class="checkbox"> <label><input type="checkbox" class="chkItemsToPrepared" value="'+list[index].a+'" >'+list[index].b+'</label> </div>';
        }

    }

    

    $("#containerChkBoxItemToPrepared").html(options);

}

function timeList(){
    let list = [
        {a:1, b:"06:00", c:"06:00 AM",},
        {a:2, b:"06:30", c:"06:30 AM",},
        {a:3, b:"07:00", c:"07:00 AM",},
        {a:4, b:"07:30", c:"07:30 AM",},
        {a:5, b:"08:00", c:"08:00 AM",},
        {a:6, b:"08:30", c:"08:30 AM",},
        {a:7, b:"09:00", c:"09:00 AM",},
        {a:8, b:"09:30", c:"09:30 AM",},
        {a:9, b:"10:00", c:"10:00 AM",},
        {a:10, b:"10:30", c:"10:30 AM",},
        {a:11, b:"11:00", c:"11:00 AM",},
        {a:12, b:"11:30", c:"11:30 AM",},
        {a:13, b:"12:00", c:"12:00 PM",},
        {a:14, b:"12:30", c:"12:30 PM",},
        {a:15, b:"13:00", c:"01:00 PM",},
        {a:16, b:"13:30", c:"01:30 PM",},
        {a:17, b:"14:00", c:"02:00 PM",},
        {a:18, b:"14:30", c:"02:30 PM",},
        {a:19, b:"15:00", c:"03:00 PM",},
        {a:20, b:"15:30", c:"03:30 PM",},
        {a:21, b:"16:00", c:"04:00 PM",},
        {a:22, b:"16:30", c:"04:30 PM",},
        {a:23, b:"17:00", c:"05:00 PM",},
        {a:24, b:"17:30", c:"05:30 PM",},
        {a:25, b:"18:00", c:"06:00 PM",},
        {a:26, b:"18:30", c:"06:30 PM",},
        {a:27, b:"19:00", c:"07:00 PM",},
        {a:28, b:"19:30", c:"07:30 PM",},
        {a:29, b:"20:00", c:"08:00 PM",},
    ];

    return list;
}

$("#schedule-table").on("click", ".tdMeeting", function(){

    // console.log("TEST");
    
});





// ======================= //
// FOR APPROVE


$("#table-approving-sched").on("click", ".btnApproveHead", function(){
    let value = $(this).val();

    Swal.fire({
        title: 'Are you sure you want to APPROVE the meeting schedule?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatusByDeptHead.php",
                method: "POST",
                data: { 
                    id: value,
                    status: "1",
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    
                    displayTableSchedule();
                    displayTableUserSchedule();
                }
            });
        }
    })
});


$("#btnCancelUpdateSched").click(function(){
    $("#btnSave").show();
    $("#btnUpdateSched").hide();
    $("#btnCancelUpdateSched").hide();

    blankForms();
});

function testFunction(id, status){

    alert(status)
}

function approveSchedGA(value, status){
    // alert(status)
    $("#btnChkAccept").prop("disabled", true);
    $("#btnChkDecline").prop("disabled", true);
    $("#btnChkUpdate").prop("disabled", true);

    if(status == "EDIT"){
        
        $("#headerChkTitle").text("Update Schedule");
        $("#btnChkUpdate").show();
        $("#btnChkAccept").hide();
        $("#btnChkDecline").hide();
        $("#hiddenChkStatus").val("EDIT");
        $("#hiddenChkSchedID").val(value);
        
        
    } else if(status == "APPROVE"){
        
        $("#headerChkTitle").text("Approving of Room Reservation");
        $("#btnChkAccept").show();
        $("#btnChkDecline").show();
        $("#btnChkUpdate").hide();
        $("#hiddenChkStatus").val("APPROVE");
        $("#hiddenChkSchedID").val("0");
    }

    $.ajax({
        url: "/"+rootFolder+'/getRecords/getSelectedScheduler.php',
        method: "POST",
        data: { 
            id: value,
        },
        success: function(data) {
            console.log(data);

            $("#displayAvailStatus").text("");
            $("#txtChkDescription").val(data.desc);
            populateRoom($("#selectChkRoom"), data.room);

            
            $("#hiddenSchedID").val(data.rid);

            $("#txtChkDate").val(data.date);
            $("#selectChkStartTime").html(populateStartTime(data.date, data.starttime));
            $("#selectChkEndTime").html(populateEndTime(data.starttime, data.endtime));

            displayScheduleByDate(data.date);
            $("#spanDisplayDate").text(data.date);

            checkAvailability();


        }
    });

    $("#modalCheckSched").modal("show");
}



// HINDI NA TO GINAGAMIT.. WAG MUNA BURAHIN, NILIPAT KO NA YUNG FUNCTION NETO.
$("#table-approving-sched").on("click", ".btnApproveGAA", function(){
    let value = $(this).val();

    $.ajax({
        url: "/"+rootFolder+'/getRecords/getSelectedScheduler.php',
        method: "POST",
        data: { 
            id: value,
        },
        success: function(data) {
            // console.log(data);

            $("#displayAvailStatus").text("");
            $("#txtChkDescription").val(data.desc);
            populateRoom($("#selectChkRoom"), data.room);

            $("#btnChkAccept").prop("disabled", true);
            $("#btnChkDecline").prop("disabled", true);
            $("#hiddenSchedID").val(data.rid);

            $("#txtChkDate").val(data.date);
            $("#selectChkStartTime").html(populateStartTime(data.date, data.starttime));
            $("#selectChkEndTime").html(populateEndTime(data.starttime, data.endtime));

            /* 
            if(data.date < getCurrentDate()){
                $("#txtChkDate").val(getCurrentDate());
                $("#txtChkDate").prop("min", getCurrentDate());
                $("#selectChkStartTime").html(populateStartTime(getCurrentDate()));
                $("#selectChkEndTime").html('<option value="">-Select Start Time first-</option>');

            } else {
                $("#txtChkDate").val(data.date);
                $("#txtChkDate").prop("min", getCurrentDate());
    
                $("#selectChkStartTime").html(populateStartTime(data.date, data.starttime));
                $("#selectChkEndTime").html(populateEndTime(data.starttime, data.endtime));

            } 
            */

            setTimeout(() => {

            }, 1000);
            checkAvailability();
        }
    });

    $("#modalCheckSched").modal("show");
});
$("#txtChkDate, #selectChkStartTime, #selectChkEndTime, #selectChkRoom").change(function(){
    let status = $("#hiddenChkStatus").val();

    if(status == "EDIT"){

        $("#btnChkUpdate").prop("disabled", true);
    } else if(status == "APPROVE"){
        $("#btnChkAccept").prop("disabled", true);
        $("#btnChkDecline").prop("disabled", true);

    }
    
    $("#displayAvailStatus").text("");
})
$("#txtChkDate").change(function(){
    let value = $(this).val();

    displayScheduleByDate(value);
    $("#spanDisplayDate").text(value)
});

/* 
$("#table-approving-sched").on("click", ".btnApprove", function(){
    let value = $(this).val();

    // console.log(value);
    Swal.fire({
        title: 'Are you sure you want to APPROVE the meeting schedule?',
        text: '',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatus.php",
                method: "POST",
                data: { 
                    id: value,
                    status: "2",
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    if(response == "CONFLICT"){
                        Swal.fire({
                            title: "Conflict Schedule!",
                            text: 'The meeting is already scheduled. Do you want to disapprove it?',
                            icon:'question',
                            // showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Yes, DISAPPROVE the meeting schedule",
                            // denyButtonText: `Don't save`
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Swal.fire("Schedule meeting disapproved.", "", "success");
                                disapproveSchedMeeting(value);
                            }
                        });
                    } else {

                        displayTableSchedule();
                    }
                }
            });
        }
    })
});
$("#table-approving-sched").on("click", ".btnDisapprove", function(){
    let value = $(this).val();

    Swal.fire({
        title: 'Are you sure you want to DISAPPROVE the meeting schedule?',
        text: '',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {

            disapproveSchedMeeting(value);

        }
    })
});
 */


$("#btnCheckAvailability").click(function(){

    checkAvailability();
    
});

$("#btnChkAccept").click(function(){
    let id = $("#hiddenSchedID").val();
    let date = $("#txtChkDate").val();
    let startTime = $("#selectChkStartTime").val();
    let endTime = $("#selectChkEndTime").val();
    let room = $("#selectChkRoom").val();

    Swal.fire({
        title: 'Are you sure you want to APPROVE the meeting schedule?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatusByGA.php",
                method: "POST",
                data: { 
                    id: id,
                    status: "2",
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                    room: room,
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    
                    displayTableSchedule();
                    displayTableUserSchedule();
                    $("#modalCheckSched").modal("hide");
                }
            });
        }
    })
    
});
$("#btnChkDecline").click(function(){
    let id = $("#hiddenSchedID").val();

    Swal.fire({
        title: 'Are you sure you want to DECLINE the meeting schedule?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatusByGA.php",
                method: "POST",
                data: { 
                    id: id,
                    status: "3",
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    
                    displayTableSchedule();
                    displayTableUserSchedule();
                    $("#modalCheckSched").modal("hide");
                }
            });
        }
    })
});

function checkAvailability(){

    let date = $("#txtChkDate").val();
    let startTime = $("#selectChkStartTime").val();
    let endTime = $("#selectChkEndTime").val();
    let room = $("#selectChkRoom").val();
    let status = $("#hiddenChkStatus").val();
    let id = $("#hiddenSchedID").val();

    if(date == "" || startTime == "" || endTime == "" || room == "" || startTime == undefined || endTime == undefined || room == undefined){

        $("#displayAvailStatus").text("PLEASE COMPLETE THE FORM.");
        $("#displayAvailStatus").addClass("text-danger");
        $("#displayAvailStatus").removeClass("text-success");

        $("#btnChkAccept").prop("disabled", true);
        $("#btnChkDecline").prop("disabled", true);
    } else {
        $("#displayAvailStatus").text("");
        $("#btnChkAccept").prop("disabled", true);
        $("#btnChkDecline").prop("disabled", true);

        setTimeout(() => {
            $.ajax({
                url: "ajax/checkAvailability.php",
                method: "POST",
                data: { 
                    date: date,
                    starttime: startTime,
                    endtime: endTime,
                    room: room,
                    userCode: userCode,
                    status: status,
                    id: id,
                },
                success: function(response) {
                    console.log(response);
                    
                    if(response == "CONFLICT"){
                        $("#displayAvailStatus").text("CONFLICT");
                        $("#displayAvailStatus").addClass("text-danger");
                        $("#displayAvailStatus").removeClass("text-success");
    
                        $("#btnChkAccept").prop("disabled", true);
                        $("#btnChkDecline").prop("disabled", false);
                        $("#btnChkUpdate").prop("disabled", true);
                    } else if(response == "AVAILABLE"){
                        $("#displayAvailStatus").text("AVAILABLE");
                        $("#displayAvailStatus").removeClass("text-danger");
                        $("#displayAvailStatus").addClass("text-success");
    
                        $("#btnChkAccept").prop("disabled", false);
                        $("#btnChkDecline").prop("disabled", false);
                        $("#btnChkUpdate").prop("disabled", false);
                    } else {
                        $("#displayAvailStatus").text("ERROR ON SYSTEM. ASK FOR SUPPORT OF MIS.");
                        $("#displayAvailStatus").addClass("text-danger");
                        $("#displayAvailStatus").removeClass("text-success");
    
                        $("#btnChkAccept").prop("disabled", true);
                        $("#btnChkDecline").prop("disabled", true);
                        $("#btnChkUpdate").prop("disabled", true);
                    }
                }
            });
        }, 500);
        
    }
}

function cancelSched(id){
    Swal.fire({
        title: 'Are you sure you want to CANCEL the meeting schedule?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatusByGA.php",
                method: "POST",
                data: { 
                    id: id,
                    status: "5",
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    
                    displayTableSchedule();
                    displayTableUserSchedule();
                    // $("#modalCheckSched").modal("hide");
                }
            });
        }
    })
}
function doneSched(id){
    Swal.fire({
        title: 'Are you sure you want to change the status of meeting schedule to DONE?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateStatusByGA.php",
                method: "POST",
                data: { 
                    id: id,
                    status: "4",
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    
                    displayTableSchedule();
                    displayTableUserSchedule();
                    // $("#modalCheckSched").modal("hide");
                }
            });
        }
    })
}










function disapproveSchedMeeting(id){

    $.ajax({
        url: "ajax/updateStatus.php",
        method: "POST",
        data: { 
            id: id,
            status: "3",
            userCode: userCode,
        },
        success: function(response) {
            console.log(response);
            
            displayTableSchedule();
            displayTableUserSchedule();
            
        }
    });
}




/* document.getElementById("txtStartTime").addEventListener("change", function () {
    let time = this.value;
    let [hours, minutes] = time.split(":").map(Number);

    if (minutes !== 0 && minutes !== 30) {
        minutes = minutes < 15 ? 0 : 30; // Round to nearest valid value
    }

    this.value = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}); */