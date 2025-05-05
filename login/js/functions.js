$(document).ready(function(){
    
    $("#btnLogin").click(function(){
        let txtUsername = $("#txtUsername").val();
        let txtPassword = $("#txtPassword").val();
    
        //alert("heyyy");
        
        $.ajax({
            url: "ajax/login.php",
            method: "POST",
            data: { 
                username: txtUsername,
                password: txtPassword 
            },
            success: function(response) {
    
                //console.log(response);
                if(response == "False"){
                    Swal.fire({
                        title: 'Incorrect Username or Password!',
                        text: 'Please check your username or password.',
                        icon: 'warning'
                    })
                    $("#txtPassword").val("");
                } else if(response == "disabled"){
                    Swal.fire({
                        title: 'The account is restricted!',
                        text: 'Ask the administrator to unrestrict your account',
                        icon: 'warning'
                    })
                } else {
                    let user = JSON.parse(response);
    
                    // console.log(user.USER_ID);
                    
                    localStorage.setItem(lsUserId, JSON.stringify(user));

                    localStorage.removeItem(lsSavedWorkspace);
                    

                    Swal.fire({
                        title: 'Successfully Login!',
                        text: 'Proceed to Homepage!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed!'
                        }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/"+rootFolder+"/dashboard/index.php";
                        }
                        window.location.href = "/"+rootFolder+"/dashboard/index.php";
                    })
                    


                }
                
            }
        });
        
        // Swal.fire({
        //     title: 'Incorrect Username or Password!',
        //     text: 'Please check your username or password.',
        //     icon: 'warning'
        // })
    });
});


