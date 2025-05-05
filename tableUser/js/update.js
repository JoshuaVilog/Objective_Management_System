
$("#btnEditUser").click(function(){
    let lastname = $("#txtEditLastname").val();
    let firstname = $("#txtEditFirstname").val();
    let middlename = $("#txtEditMiddlename").val();
    let email = $("#txtEditEmail").val();
    let username = $("#txtEditUsername").val();
    let department = $("#selectEditDepartment").val();
    let department2 = ($("#selectEditDepartment2").val() != null)? $("#selectEditDepartment2").val() : "";
    let position = $("#selectEditPosition").val();
    let role = $("#selectEditRole").val();
    let status = $("#selectEditStatus").val();
    let id = $("#hiddenId").val();

    if(lastname == "" || username == "" || role == "" || department == "" || position == ""){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up all the information',
            icon: 'warning'
        })
     } else {
        $.ajax({
            url: "ajax/editUser.php",
            method: "POST",
            data: { 

                lastname: lastname,
                firstname: firstname,
                middlename: middlename,
                username: username,
                department: department,
                // position: position,
                position: 0,
                role: role,
                status: status,
                userId: id,
                email: email,
                department2: JSON.stringify(department2),
            },
            success: function(response) {
                console.log(response);
                
                
                Swal.fire({
                    title: 'User Updated Successfully!',
                    text: 'Proceed to User Page!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // window.location.href = "/"+rootFolder+"/tableUser/";
                        doneUpdate()
                    }
                    // window.location.href = "/"+rootFolder+"/tableUser/";
                    doneUpdate()
                })
                
            }
        });
     }
});

function doneUpdate(){

    $("#txtEditLastname").val("");
    $("#txtEditFirstname").val("");
    $("#txtEditMiddlename").val("");
    $("#txtEditEmail").val("");
    $("#txtEditUsername").val("");
    $("#selectEditDepartment").val("");
    $("#selectEditPosition").val("");
    $("#selectEditRole").val("");
    $("#selectEditStatus").val("");
    fetchDataAndInitializeTable("");
    $("#modalEditUser").modal("hide");

}
