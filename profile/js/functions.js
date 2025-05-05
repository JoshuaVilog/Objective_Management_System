// $("#txtUsername").val(userUsername);
// $("#txtLastName").val(userLname);
// $("#txtFirstName").val(userFname);
// $("#txtMiddleName").val(userMname);

getUserInfo();

function getUserInfo(){
    $.ajax({
        url: 'ajax/getUserInfo.php',
        type: 'POST',
        data: {
            userCode: userCode
        },
        success: function(data) {
            $("#txtUsername").val(data[0].USERNAME);
            $("#txtLastName").val(data[0].USER_LNAME);
            $("#txtFirstName").val(data[0].USER_FNAME);
            $("#txtMiddleName").val(data[0].USER_MNAME);
            $("#txtEmail").val(data[0].EMAIL);

            
            console.log(data);
        }
    });

}

$("#btnSaveUsername").click(function(){
    let txtUsername = $("#txtUsername").val();
    let txtLastName = $("#txtLastName").val();
    let txtFirstName = $("#txtFirstName").val();
    let txtMiddleName = $("#txtMiddleName").val();

    if(txtUsername == "" || txtFirstName == "" || txtLastName == ""){
        Swal.fire({
            title: 'Incomplete Form!',
            text: 'Please fill up all the required information',
            icon: 'warning'
        })
    } else {
        $.ajax({
            url: 'ajax/changeUsername.php',
            type: 'POST',
            data: {
                username: txtUsername,
                lastName: txtLastName,
                firstName: txtFirstName,
                middleName: txtMiddleName,
                userCode: userCode
            },
            success: function(data) {
                
                Swal.fire({
                    title: 'Record Updated Successfully!',
                    text: 'Proceed to Login Page!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        logOutAccount();
                    }
                    logOutAccount();
                })
    
                console.log(data);
            }
        });
    }
    
});
$("#btnSavePassword").click(function(){
    let txtOldPassword = $("#txtOldPassword").val();
    let txtNewPassword = $("#txtNewPassword").val();
    let txtRetypePassword = $("#txtRetypePassword").val();

    if(txtOldPassword == "" || txtNewPassword == "" || txtRetypePassword == ""){
        Swal.fire({
            title: 'Incomplete Form!',
            text: 'Please fill up all the required information',
            icon: 'warning'
        })
    } else {
        if(txtNewPassword != txtRetypePassword){
            Swal.fire({
                title: 'Password Does not Match!',
                text: 'Please retype the correct Password',
                icon: 'warning'
            })
            $("#txtNewPassword").val("");
            $("#txtRetypePassword").val("");
        } else {
            
            $.ajax({
                url: 'ajax/changePassword.php', 
                type: 'POST',
                data: {
                    oldPassword: txtOldPassword,
                    newPassword: txtNewPassword,
                    userCode: userCode
                },
                success: function(response) {
                    console.log(response);
                    if(response == "wrong"){
                        Swal.fire({
                            title: 'The Old Password is incorrect!',
                            text: 'Please type the correct Password',
                            icon: 'warning'
                        })
                        $("#txtOldPassword").val("");
                    } else {
                        Swal.fire({
                            title: 'Record Updated Successfully!',
                            text: 'Proceed to Login Page!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Proceed!'
                            }).then((result) => {
                            if (result.isConfirmed) {
                                logOutAccount();
                            }
                            logOutAccount();
                        })
                    }
                }
            });
            
           //alert(userCode);
        }
    }
    
    /*
    $.ajax({
        url: 'ajax/changePassword.php', 
        type: 'POST',
        data: {
            oldPassword: txtOldPassword,
            newPassword: txtNewPassword
        },
        success: function(data) {
            

        }
    });
    */
});

$("#btnSaveEmail").click(function(){
    let txtEmail = $("#txtEmail").val();

    $.ajax({
        url: 'ajax/changeEmail.php',
        type: 'POST',
        data: {
            email: txtEmail,
            userCode: userCode
        },
        success: function(data) {
            
            Swal.fire({
                title: 'Record Updated Successfully!',
                text: '',
                icon: 'success',
            })

            console.log(data);
        }
    });
    
});