
$("#formAdd").on("input", "input[required]", function(){
    let input = $(this);
    let value = input.val();

    if(value == ""){
        input.closest(".form-group").addClass("has-error");
        input.closest(".form-group").removeClass("has-success");
    } else {
        input.closest(".form-group").removeClass("has-error");
        input.closest(".form-group").addClass("has-success");
    }

});


$("#btnAdd").click(function(){
    let desc = $("#txtDesc").val();
    let department = $("#selectDepartment").val();
    let targetDate = $("#txtTargetDate").val();
    let projectDetails = $("#txtProjectDetails").val();

    var form = document.getElementById('formAdd');
    var inputs = form.querySelectorAll('input[required]');
    var select = form.querySelectorAll('select[required]');
    var textarea = form.querySelectorAll('textarea[required]');

    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            // input.classList.add('is-invalid');
            // input.classList.remove('is-valid');
            input.closest(".form-group").classList.add("has-error");
            input.closest(".form-group").classList.remove("has-success");
        } else {
            // input.classList.remove('is-invalid');
            // input.classList.add('is-valid');
            input.closest(".form-group").classList.remove("has-error");
            input.closest(".form-group").classList.add("has-success");
        }
    });
    select.forEach(function(select) {
        if (select.value == "") {
            // select.classList.add('is-invalid');
            select.closest(".form-group").classList.add("has-error");
            select.closest(".form-group").classList.remove("has-success");
        } else {
            // select.classList.remove('is-invalid');
            select.closest(".form-group").classList.remove("has-error");
            select.closest(".form-group").classList.add("has-success");
        }
    });
    /*
    textarea.forEach(function(textarea) {
        if (textarea.value == "") {
            textarea.classList.add('is-invalid');
        } else {
            textarea.classList.remove('is-invalid');
        }
    });
    */

    var isValid = form.querySelectorAll('.has-error').length === 0;
    
    if(!isValid){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up all the information',
            icon: 'warning'
        })
    } else {
        let departmentList = JSON.parse(localStorage.getItem(lsDepartmentList));

        var result = departmentList.find(function(value) {
            return value.a === department;
        });
        
        var sendData = {
            desc:desc,
            department: department,
            deptCode: result.c,
            targetDate: targetDate,
            projectDetails: projectDetails,
            userCode: userCode,
            members: insertMembers(),
        }

        console.log(sendData);
        
        
        $.ajax({
            url: "ajax/insert.php",
            method: "POST",
            data: JSON.stringify(sendData),
            success: function(response) {
                console.log(response);
                
                
                Swal.fire({
                    title: 'Record Added Successfully!',
                    text: 'Proceed to Record Page!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                        doneInsert()
                    }
                    // window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                    doneInsert()
                })
                
            }
        });
        
    }
});

function insertMembers(){
    var container = document.getElementById("tbody-selected-user");
    var rows = container.getElementsByClassName("selectedRow");
    var dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var member = rows[i].querySelector(".txtSelectedUser").value;

        dataArray.push({
            member:member,
            // role:"",
        });
    }
    return dataArray;
}

function doneInsert(){
    $("#txtDesc").val("");
    $("#selectDepartment").val("");
    $("#txtTargetDate").val("");
    $("#txtProjectDetails").val("");
    $("#modalAdd").modal("hide");
    fetchDataAndInitializeTable();

}
