
setTimeout(populateDepartment, 500);
setTimeout(populateMemberDataList, 500);

if(userRole == "0"){
    // IF ADMIN
    $("#containerSelect2").show();
    $("#containerSelect1").show();
} else {
    $("#containerSelect2").hide();
    $("#containerSelect1").show();
}
console.log(userRole);
if(userRole == "1"){
    $("#btnRemoveKPI").hide();
} else {
    $("#btnRemoveKPI").show();
}

function populateDepartment(){
    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    let listUser = JSON.parse(localStorage.getItem(lsUserList));
    var options = '';

    if(userRole == "2"){
        // POWER USER
        var result = listUser.find(function(value){
            return value.a === userCode;
        });
        let userDeptList = JSON.parse(result.k); // ETO YUNG DEPARTMENT NA NAKA ARRAY SA USER TABLE NG DATABASE

        if(userDeptList == ""){
            let deptID = result.e;
            let deptDesc = setDepartmentName(result.e);

            options += '<option value="' + deptID + '">' +deptDesc + '</option>';
        } else {
            // options += '<option value="">-Select-</option>';

            // console.log(userDeptList);


            for (var i = 0; i < list.length; i++) {
                let isSelected = false;
                for(var j = 0; j < userDeptList.length; j++){
                    if(list[i].a == userDeptList[j]){
                        isSelected = true;
                        break;
                    }
                }
    
                if(isSelected == true){
                    
                    options += '<option value="' + list[i].a + '">' +list[i].c + '</option>';
                }
                
            }
        }

        $('#selectDepartment').html(options);

        setTimeout(() => {
            let department =  $("#selectDepartment").val();
            populateMember(department);
            $('#selectMember').select2({
                allowClear: true, 
                placeholder: 'Select Member',
                height:100,
            });
        }, 500);

    } else if(userRole == "1"){
        //NORMAL USER

        for (var i = 0; i < list.length; i++) {
            options += '<option value="' + list[i].a + '">' +list[i].c + '</option>';
        }
        
        $('#selectDepartment').html(options);

        $("#selectDepartment").addClass("disabled");
        // $("#selectMember").addClass("disabled");
        
        // console.log(userDept);
        // console.log(setHRISDepartmentIDByCode(setDepartmentCodeByDeptID(userDept)));

    
        setTimeout(() => {
            let deptID = setHRISDepartmentIDByCode(setDepartmentCodeByDeptID(userDept));
            $("#selectDepartment").val(deptID);
            let department =  $("#selectDepartment").val();
            populateMember(department);
            
            // $("#hiddenSelectedDepartmentID").val(deptID);
        }, 500);
    
        setTimeout(() => {
            let selectedUser = setHRISEmployeeIdByRFID(userUsername);
            $("#selectMember").val(selectedUser)

            $("#hiddenSelectedEmployeeID").val(selectedUser);
            $("#hiddenSelectedDepartmentID").val(setHRISEmployeeDept(selectedUser));
            
        }, 600);
    
        setTimeout(() => {
            let member = $("#selectMember").val();
            findUserKPI(member)

            $('#selectMember').select2({});
            $('#selectMember').prop("disabled", true);
        }, 1000);
            
        
    } else if(userRole == "0"){
        options += '<option value="">-Select-</option>';

        for (var i = 0; i < list.length; i++) {
            options += '<option value="' + list[i].a + '">' +list[i].c + '</option>';
        }
        
        $('#selectDepartment').html(options);
        $('#selectDepartment').select2({
            minimumInputLength: 0, // Set to 0 to always show the search bar
            allowClear: true, 
            placeholder: 'Select an option'
        });
    }
    
    

}
function populateMember(deptID){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    
    var options = '<option value="">-Select-</option>';
    for (var index = 0; index < list.length; index++) {
        if(list[index].e == deptID && list[index].g == "1"){
            
            options += '<option value="' + list[index].a + '">' + list[index].c+'</option>';
        }
    }
    $('#selectMember').html(options);

    setTimeout(() => {

        $('#selectMember').select2({});
    }, 500);

}


function populateMemberDataList(department){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let options = '';

    if(department != undefined){
        for (var index = 0; index < list.length; index++) {
            if(list[index].e == deptID && list[index].g == "1"){
                options += '<option data-id="' + list[index].a + '">' + list[index].c+'</option>';
            }
        }
    } else {
        for (var index = 0; index < list.length; index++) {
            if(list[index].g == "1"){
                options += '<option data-id="' + list[index].a + '">' + list[index].c+'</option>';
            }
        }
    }

    $('#listMember').html(options);
}


$("#selectDepartment").change(function(){
    let deptID = $(this).val();
    
    if(deptID == ""){
        $('#selectMember').html("<option>-Select-</option>")
        $("#kpiContainer1").hide()
    } else {
        populateMember(deptID);
        $("#containerUserInfo").hide();
        $("#kpiContainer2").hide();
        $("#spanDisplayName").text("");
        $("#spanDisplayDepartment").text("");
        $("#kpiContainer1").hide();

        $("#hiddenSelectedDepartmentID").val(deptID);
        $("#txtSearchMember").val("");
    }
    
});

$("#selectMember").change(function(){
    let value = $(this).val();

    selectMember(value);
    
    $("#hiddenSelectedEmployeeID").val(value);
    $("#hiddenSelectedDepartmentID").val(setHRISEmployeeDept(value));
    $("#txtSearchMember").val("");
});


function selectMember(value){

    if(value == ""){
        $("#kpiContainer1").hide();
        $("#kpiContainer2").hide();
        $("#containerUserInfo").hide();
    } else {
        findUserKPI(value)
        $("#kpiContainer2").show();
        $("#containerUserInfo").show();
        $("#spanDisplayName").text(setHRISEmployeeName(value));
        $("#spanDisplayDepartment").text(setHRISDepartment(setHRISEmployeeDept(value)));
    }
}

function findUserKPI(value){

    $.ajax({
        url: "ajax/findUserKPI.php",
        method: "POST",
        data:{
            user: value
        },
        success: function(response) {
            
            if(response == ""){
                // IF WALA PA KPI
                
                $("#kpiContainer1").show();
                $("#kpiContainer2").hide();
            } else {
                // IF MERON NANG KPI, IT WILL SHOW VIEW AND EDIT
                $("#kpiContainer1").hide();
                $("#kpiContainer2").show();
                displayTable2(value);


            }
            
            
        }
    });
}





// $('#selectDepartment').select2({
//     minimumInputLength: 0, // Set to 0 to always show the search bar
//     allowClear: true, 
//     placeholder: 'Select an option'
// });
// $('#selectMember').select2({
//     minimumInputLength: 0, // Set to 0 to always show the search bar
//     allowClear: true, 
//     placeholder: 'Select Member'
// });


// function populateApprover(){
//     let list = JSON.parse(localStorage.getItem(lsUserList));
    
//     var options = '<option value="">-Select-</option>';
//     for (var i = 0; i < list.length; i++) {
//         options += '<option value="' + list[i].a + '">' + list[i].b +", "+ list[i].c +" "+ list[i].d+ '</option>';
//     }
//     $('#selectHead').html(options);
//     $('#selectManager').html(options);
//     $('#selectOD').html(options);
//     $('#selectPD').html(options);

// }

// $('#selectHead, #selectManager, #selectOD, #selectPD').select2({
//     minimumInputLength: 0, // Set to 0 to always show the search bar
//     // allowClear: true, 
//     placeholder: 'Select User'
// });