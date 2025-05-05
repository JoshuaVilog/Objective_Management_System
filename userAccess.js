
if(userRole != 0){
    // KAPAG HINDI ADMIN YUNG USER
    $("#menuUtilities").hide();
    $("#menuTableUser").hide();
    $("#menuKPISummary").hide();
}


checkLoginDate();

async function checkLoginDate(){
    let getDateTime = getCurrentDate();

    if(localStorage.getItem(lsLoginDate) != null){
        let loginData = localStorage.getItem(lsLoginDate);
        let currentUrl = location.pathname;
        let loginUrl = "/"+rootFolder+"/login/index.php";
    
        // console.log(loginData);
        // console.log(getDateTime);
        
        // KAPAG HINDI ADMIN 
        if(userRole != "0"){
            
            if(loginData != getDateTime){
                localStorage.setItem(lsLoginDate, getDateTime);
                localStorage.setItem(lsUserId, 0);
                
                if(currentUrl != loginUrl){
                    Swal.fire({
                        title: 'Login Session Expired!',
                        text: 'Proceed to Login Page!',
                        timer: 2000,
                        willClose: () => {
                            window.location.href = "/"+rootFolder;
                        },
                        
                    })
                }
            }
        }
    
    } else {
        localStorage.setItem(lsUserId, 0);
        localStorage.setItem(lsLoginDate, getDateTime);
        window.location.href = "/"+rootFolder;
        
    }
}



// if(userRole == 0){
//     console.log("The User is ADMIN");
// } else {
//     console.log("The user is a normal User");
// }



