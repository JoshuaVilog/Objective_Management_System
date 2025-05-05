
//alert("Hello Baby!");

let rootFolder = "1_OKRMS";
let pluginFolder = "2_VILOG_ASSETS";
let documentsFolder = "FILES_OMS";
let lsUserId = "okrms_user_id";
let lsUserStatusList = "okrms-user-status-list";
let version = "1";
let lsLoginDate = "okrms-login-date";


let userLname = "";
let userFname = "";
let userRole = "";
let userRole2 = "";
let status = "";
let userCode = "";
let userDept = "";
let userEmail = "";
let userUsername = "";

let userFullName = "";


if(localStorage.getItem(lsUserId) != null){
    let userID = localStorage.getItem(lsUserId)
    let currentUrl = location.pathname;
    let loginUrl = "/"+rootFolder+"/login/index.php";

    if(currentUrl == loginUrl && userID != 0){
        window.location.href = "/"+rootFolder+"/dashboard/index.php";

    } else if(currentUrl != loginUrl && userID == 0){
        window.location.href = "/"+rootFolder+"/login/index.php";
    }

    getUserInformation();
    // console.log("DETECT USER ID:"+userID);
    // console.log("URL:"+currentUrl);

} else {
    localStorage.setItem(lsUserId, 0);
    window.location.href = "/"+rootFolder;
    // console.log("LOG OUT");
}



function getUserInformation(){
    let user = JSON.parse(localStorage.getItem(lsUserId));
    
    if(user != 0){

        // userID = user.USER_ID;
        userUsername = user.USERNAME;
        userLname = user.USER_LNAME;
        userFname = user.USER_FNAME;
        // userMname = user.USER_MNAME;
        userRole = user.USER_ROLE;
        userCode = user.USER_ID;
        userDept = user.DEPARTMENT_ID;
        userEmail = user.EMAIL;
        userFullName = user.USER_FNAME + " " + user.USER_LNAME;
        // userRole2 = user.USER_ROLE_2;
    }
}


$("#btnLogout").click(function(){

    Swal.fire({
        title: 'Are you sure you want to Log out?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
    }).then((result) => {
        
        if (result.isConfirmed) {
            
            logOutAccount();
        }
    })
});

displayUserFullName();

function displayUserFullName(){
    let user = JSON.parse(localStorage.getItem(lsUserId));
    
    if(user != 0){

        $("#displayUserFullName").text(user.USER_FNAME +" " +user.USER_LNAME);
    
    }
}


function logOutAccount(){
    localStorage.setItem(lsUserId, 0);
    window.location.href = "/"+rootFolder+"/";

    localStorage.removeItem(lsUserList);

}

















// ============================================================================ //


// updateSystem();

function updateSystem(){
    let userId = JSON.parse(localStorage.getItem(lsUserId));
    let isNotFound = "";
    // console.log(userId);

    if(userId != 0){
        isNotFound = !userId.hasOwnProperty("UPDATED_VERSION");

    }

    if(isNotFound){
        logOutAccount();
    } else {
        if(userId != 0){
            if(userId["UPDATED_VERSION"] != version){
                Swal.fire({
                    title: 'System Updated!',
                    text: 'The system has been updated. Your account will be Log out!',
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
    }
    //updated Version list
}

function checkRestriction(){
    $.ajax({
        url: "/"+rootFolder+"/restriction.php",
        type: "POST",
        data: { 
            userCode: userCode
        },
        success: function(response) {
            //alert(response);
            if(response == 0){
                logOutAccount();
            }
        }
    });
}
