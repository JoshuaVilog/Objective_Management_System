
$("#table-request-list").on("click", ".btnEditSched", function(){
    let value = $(this).val();

    $.ajax({
        url: "/"+rootFolder+'/getRecords/getSelectedScheduler.php',
        method: "POST",
        data: { 
            id: value,
        },
        success: function(data) {
            // console.log(data);

            $("#txtDescription").val(data.desc);
            $("#selectCategory").val(data.category);
            populateRoom($("#selectRoom"), data.room);
            populateDepartmentSched(data.department);
            populateAttendees(data.attendees);

            // console.log(data.visitors);
            

            // $("#btnChkAccept").prop("disabled", true);
            // $("#btnChkDecline").prop("disabled", true);
            // $("#hiddenSchedID").val(data.rid);
            $("#hiddenEditSchedID").val(data.rid);

            if(data.date < getCurrentDate()){
                $("#txtDate").val(getCurrentDate());
                $("#txtDate").prop("min", getCurrentDate());
                $("#selectStartTime").html(populateStartTime(getCurrentDate()));
                $("#selectEndTime").html('<option value="">-Select Start Time first-</option>');

                // $("#txtDate").val(data.date);
                // $("#selectStartTime").html(populateStartTime(data.date, data.starttime));
                // $("#selectEndTime").html(populateEndTime(data.starttime, data.endtime));

            } else {
                $("#txtDate").val(data.date);
                $("#txtDate").prop("min", getCurrentDate());
    
                $("#selectStartTime").html(populateStartTime(data.date, data.starttime));
                $("#selectEndTime").html(populateEndTime(data.starttime, data.endtime));

            }

            // console.log(data.category);

            if(data.category == "1"){

                $("#containerVisitorForm").hide();
            } else if(data.category == "2"){
                
                let visitors = JSON.parse(data.visitors);
                let visitorList = [];

                // console.log(visitors);

                if(visitors.length > 0){
                    for(let index = 0; index < visitors.length; index++){

                        visitorList.push({
                            id: idNum,
                            rid: visitors[index],
                            visitor: setVisitorName(visitors[index]),

                        })

                        idNum++;
                    }
                } else {
                    visitorList.push({id:"", visitor:"",})
                }
                
                // console.log(visitorList);
                // tableAddVisitor.setData([]);
                tableAddVisitor.setData(visitorList);

                populateChkItemsToPrepared(data.itemsToPrepared);
                populateVisitorType(data.visitorType);
                
                $("#containerVisitorForm").show();
            }

            $("#divPeriod1").show();
            $("#divPeriod2").hide();
            $("#selectDatePeriod").val("ONE");
            $("#selectDatePeriod option[value=MULTIPLE]").prop("disabled", true);
            

            $("#btnSave").hide();
            $("#btnUpdateSched").show();
            $("#btnCancelUpdateSched").show();

            // checkAvailability();

            
        }
    });
});

$("#btnChkUpdate").click(function(){
    let id = $("#hiddenSchedID").val();
    let date = $("#txtChkDate").val();
    let startTime = $("#selectChkStartTime").val();
    let endTime = $("#selectChkEndTime").val();
    let room = $("#selectChkRoom").val();

    Swal.fire({
        title: 'Are you sure you want to update the meeting schedule?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/updateApprovedSched.php",
                method: "POST",
                data: { 
                    id: id,
                    // status: "2",
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


$("#btnUpdateSched").click(function(){
    let desc = $("#txtDescription").val();
    let date = $("#txtDate").val();
    let startTime = $("#selectStartTime").val();
    let endTime = $("#selectEndTime").val();
    let room = $("#selectRoom").val();
    let attendees = $("#selectAttendees").val();
    let department = $("#selectDepartmentSched").val();
    let category = $("#selectCategory").val();
    let id = $("#hiddenEditSchedID").val();
    let itemsToPrepared = (category == "2")? getSelectedItemsToPrepared() : [];
    let visitorType = (category == "2")? $("#selectVisitorType").val() : "0";


    if(desc == "" || date == "" || startTime == "" || endTime == "" || room == ""){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up the required fields.',
            icon: 'warning'
        })
    } else {
        addNewVisitor();

        setTimeout(() => {

            var container = document.getElementById("table-add-visitor");
            var rows = container.getElementsByClassName("tabulator-row");
            let visitorList = [];

            for (var i = 0; i < rows.length; i++){
                var visitor = rows[i].querySelector(".hiddenVisitorID").value;

                if(visitor != ''){

                    visitorList.push(visitor);
                }
            }

            $.ajax({
                url: "ajax/updateSched.php",
                method: "POST",
                data: { 
                    id: id,
                    desc: desc,
                    department: department,
                    category: category,
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                    room: room,
                    attendees: (attendees == null) ? "[]" : JSON.stringify(attendees),
                    visitors: JSON.stringify(visitorList),
                    itemsToPrepared: JSON.stringify(itemsToPrepared),
                    visitorType: visitorType,
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);

                    displayTableSchedule();
                    displayTableUserSchedule();
                    
                    Swal.fire({
                        title: 'Schedule updated successfully',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed',
                    }).then((result) => {
                        blankForms();

                        $("#btnSave").show();
                        $("#btnUpdateSched").hide();
                        $("#btnCancelUpdateSched").hide();
                        
                    })
                    
                }
            });


        }, 500);
    }
});