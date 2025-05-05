



let idNum = 1;


$("#selectCategory").change(function(){
    let value = $(this).val();

    if(value == "1"){
        //INTERNAL
        $("#containerVisitorForm").hide();
        tableAddVisitor.setData([]);
        
    } else if(value == "2"){
        //EXTERNAL
        $("#containerVisitorForm").show();
        tableAddVisitor.setData([
            {id: idNum, visitor: "", rid: "",},
        ])
    }
}); 


$("#btnAddVisitorRow").click(function(){

    idNum++;
    let newRowData = {
        id: idNum,
        visitor: "",
        rid: "",
    }
    
    tableAddVisitor.addRow(newRowData);
});

$("#table-add-visitor").on("click", ".btnRemove", function(){
    let value = $(this).val();

    tableAddVisitor.deleteRow(value);
});

/* $("#table-add-visitor").on("change", ".selectVisitor", function(){
    $('.selectVisitor option').prop('disabled', false);
    
    // Loop through each select and disable the selected option in other selects
    $('#table-add-visitor .selectVisitor').each(function() {
        var currentValue = $(this).val();
        if (currentValue) {
            $('.selectVisitor').not(this).find('option[value="' + currentValue + '"]').prop('disabled', true);
        }
    });

}); */
$("#btnAddVisitorRow").click(function(){
    // checkVisitor();
});
$("#table-add-visitor").on("change", ".selectVisitor", function(){
    // checkVisitor();
    console.log("TEST");
});

$("#table-add-visitor").on("blur", ".txtVisitor", function(){
    let isDuplicate = false;
    let value = $(this).val();

    $("#table-add-visitor .txtVisitor").each(function(){

        // console.log($(this).val());
        if(value.toUpperCase() == $(this).val().toUpperCase() && this !== event.target){

            isDuplicate = true;
            return false;
        }

    });
    // console.log("Test");

    if(isDuplicate == true){
        $(this).val("");
        $(this).closest(".tabulator-row").find(".hiddenVisitorID").val("");
    } else {
        $(this).closest(".tabulator-row").find(".hiddenVisitorID").val(setVisitorID(value));
    }

});

function addNewVisitor(){

    let container = document.getElementById("table-add-visitor");
    let rows = container.getElementsByClassName("tabulator-row");

    for (let i = 0; i < rows.length; i++){
        let visitor = rows[i].querySelector(".txtVisitor").value;
        let visitorID = rows[i].querySelector(".hiddenVisitorID").value;

        if(visitor != '' && visitorID == ""){

            $.ajax({
                url: "ajax/insertVisitor.php",
                method: "POST",
                data: {
                    visitorName: visitor,
                },
                success: function(response) {

                    console.log(response);

                    rows[i].querySelector(".hiddenVisitorID").value = response;
                    
                    
                }
            });
            
        }
    }

    getVisitor(); // PARA MAGRESTORE ULIT NG BAGONG LOCAL STORAGE

}

/* 
function checkVisitor(){
    var container = document.getElementById("table-add-visitor");
    var rows = container.getElementsByClassName("tabulator-row");
    let dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var visitor = rows[i].querySelector(".selectVisitor").value;

        if(visitor != ''){

            dataArray.push(visitor)
        }
    }
    $("#table-add-visitor .selectVisitor option").prop("disabled", false);

    $('#table-add-visitor .selectVisitor').each(function() {
        // let option = $(this).find("option").val();
        let value = $(this).val();


        $(".selectVisitor option").each(function() {
            // let isSelected = $(this).is(":selected");
            let val = $(this).val();
            let isSelected = false;


            // console.log(val + " "+ isSelected);
            for(let index = 0; index < dataArray.length; index++){
                if(val == dataArray[index]){
                    // isSelected = true;
                    // break;
                    $(this).prop("disabled", true);
                }
            }


        });



    });
}
 */





// INSERT

$("#btnSave").click(function(){
    let desc = $("#txtDescription").val();
    let startTime = $("#selectStartTime").val();
    let endTime = $("#selectEndTime").val();
    let room = $("#selectRoom").val();
    let attendees = $("#selectAttendees").val();
    let department = $("#selectDepartmentSched").val();
    let category = $("#selectCategory").val();
    let datePeriod = $("#selectDatePeriod").val();
    let itemsToPrepared = (category == "2")? getSelectedItemsToPrepared() : [];
    let visitorType = (category == "2")? $("#selectVisitorType").val() : "0";

    let status = "";

    if(userRole == "1"){
        //NORMAL USER
        status = "0";
    
    } else if(userRole == "2" || userRole == "0"){
        //POWER USER
        status = "1";
    
    }

    addNewVisitor();
    $("#btnSave").prop("disabled", true);

    

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

        

        // console.log(JSON.stringify(visitorList));

        $("#btnSave").prop("disabled", false);

        if(desc == "" || startTime == "" || endTime == "" || room == ""){
            Swal.fire({
                title: 'Incomplete Form',
                text: 'Please fill up the required fields.',
                icon: 'warning',
            })

        } else {

            if(datePeriod == "ONE"){
                let date = $("#txtDate").val();

                if(date == ""){
                    Swal.fire({
                        title: 'Incomplete Form',
                        text: 'Please fill up the required fields.',
                        icon: 'warning'
                    })
                } else {


                    $.ajax({
                        url: "ajax/insert.php",
                        method: "POST",
                        data: { 
                            desc: desc,
                            department: department,
                            category: category,
                            date: date,
                            startTime: startTime,
                            endTime: endTime,
                            room: room,
                            attendees: (attendees == null) ? "[]" : JSON.stringify(attendees),
                            userCode: userCode,
                            status: status,
                            visitors: JSON.stringify(visitorList),
                            itemsToPrepared: JSON.stringify(itemsToPrepared),
                            visitorType: visitorType,

                        },
                        success: function(response) {
                            // console.log(response);

                            displayTableSchedule();
                            displayTableUserSchedule();
                            
                            Swal.fire({
                                title: 'Schedule saved successfully',
                                text: 'Please wait for the approval of room schedule.',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Proceed',
                            }).then((result) => {
                                blankForms();
                                
                            })
                            
                        }
                    });
                }
            } else if(datePeriod == "MULTIPLE"){
                let startDate = $("#txtStartDate").val();
                let endDate = $("#txtEndDate").val();
                let listDate = [];
                let currentDate = new Date(startDate);
                let endDatee = new Date(endDate);

                while (currentDate <= endDatee) {
                    listDate.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
                    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
                }

                //console.log(listDate);

                if(listDate.length == 0){
                    Swal.fire({
                        title: 'Incomplete Form',
                        text: 'Please fill up the required fields.',
                        icon: 'warning',
                    })
                } else {
                    let sendData = {
                        desc: desc,
                        department: department,
                        category: category,
                        listDate: listDate,
                        startTime: startTime,
                        endTime: endTime,
                        room: room,
                        attendees: (attendees == null) ? "[]" : JSON.stringify(attendees),
                        userCode: userCode,
                        status: status,
                        visitors: JSON.stringify(visitorList),
                        itemsToPrepared: JSON.stringify(itemsToPrepared),
                        visitorType: visitorType,
                    }

                    $.ajax({
                        url: "ajax/insertMultiple.php",
                        method: "POST",
                        data: JSON.stringify(sendData),
                        success: function(response) {
                            console.log(response);

                            
                            
                        }
                    });

                    displayTableSchedule();
                    displayTableUserSchedule();
                    
                    Swal.fire({
                        title: 'Schedule saved successfully',
                        text: 'Please wait for the approval of room schedule.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed',
                    }).then((result) => {
                        blankForms();
                        
                    })
                }
            }
        }
    
    }, 500);
});