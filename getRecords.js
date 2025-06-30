
let lsDepartmentList = "okrms_department_list";
let lsPositionList = "okrms_position_list";
let lsUserList = "okrms_user_list";
let lsUserRoleList = "okrms-role-list";
// let lsProjectMemberList = "okrms-project-member-list"; //Remove na lang
let lsSelectedProject = "okrms-selected-project";
// let lsTaskList = "okrms-task-list"; // Remove na lang
let lsPriorityList = "okrms-priority-list";
let lsYearList = "okrms-year-list";
let lsTaskStatusList = "okrms-task-status-list";
let lsKPIlist = "okrms-kpi-list"; // Remove na lang
let lsDARCategorylist = "okrms-darCategory-list";
let lsDARMasterList = "okrms-dar-masterlist"; // Remove na lang
var lsSavedWorkspace = "okrms-saved-workspace";
var lsWorkspaceList = "okrms-workspace-list";
let lsAllTaskList = "okrms-alltask-list";
let lsAllPendingTaskList = "okrms-allpendingtask-list";
let lsWorkspaceMemberRoleList = "okrms-workspace-member-role-list";
let lsHRISEmployeeList = "okrms-hris-employee-masterlist";
let lsHRISJobPositionList = "okrms-hris-jobposition-list";
let lsHRISCompanyList = "okrms-hris-company-list";
let lsHRISDepartmentList = "okrms-hris-department-list";
let lsRoomList = "okrms-room-list";
let lsVisitorList = "okrms-visitor-list";

let lsActiveYear = "okrms-active-year";
let lsDashboardWorkspaceOrder = "okrms-dashboard-workspace-order";

getUserRole();
getDepartment();
getPosition();
getUser();
getPriority();
getYear();
getActiveYear();
getTaskStatus();
getWorkspaceMemberRole()
getHRISEmployeeMasterlist();
getHRISJobPositionlist();
getHRISDepartmentlist();
getHRISCompanylist();
getWorkspace();
getRoomlist();
getVisitor();

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ////

function setDepartmentName(deptCode){
    let deptList = JSON.parse(localStorage.getItem(lsDepartmentList));
    let deptDesc = "";

    for(let index = 0; index < deptList.length; index++){
        if(deptList[index].a == deptCode){
            deptDesc = deptList[index].c;
            break;
        }
    }

    return deptDesc;

}
function setDepartmentCodeByDeptID(deptCode){
    let deptList = JSON.parse(localStorage.getItem(lsDepartmentList));
    let deptDesc = "";

    for(let index = 0; index < deptList.length; index++){
        if(deptList[index].a == deptCode){
            deptDesc = deptList[index].c;
            break;
        }
    }

    return deptDesc;

}
function setUserFullName(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === id;
    });

    return result.c + " " + result.b;

}
function setUserUserRole(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === id;
    });

    return result.h;

}
function setUserRole(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === id;
    });

    return result.h;

}
function setUserRole2(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === id;
    });

    return result.l;

}
function setUserDepartment(userID){
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let deptList = JSON.parse(localStorage.getItem(lsDepartmentList));

    if(userID == "" || userID == "0"){
        
        return "";
    } else {

        var user = userList.find(function(value){
            return value.a === userID;
        });
    
        if(user.e == ""){

            return "";
        } else {

            var result = deptList.find(function(value){
                return value.a === user.e;
            });
        
            return result.c;
        }
        // return userID;
    }
}

function setNameAssignee(id){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    if(id == "" || id == "[]" || id == null || id == "0"){
        return "";

    } else {
        var result = userList.find(function(value){
            let userID = '["'+value.a+'"]';
            return userID === id;
        });

        return result.c + " " + result.b;
    }
    
}
function setPriority(id){
    let priorityList = JSON.parse(localStorage.getItem(lsPriorityList));

    if( id == null || id == ""){
        return "";
    } else {
        var result = priorityList.find(function(value){
            return value.a === id;
        });

        return result.b;
    }
}
function setStatus(id){
    let statusList = JSON.parse(localStorage.getItem(lsTaskStatusList));

    if( id == null || id == ""){
        return "";
    } else {
        var result = statusList.find(function(value){
            return value.a === id;
        });

        return result.b;
    }
}
function setYear(id){
    let list = JSON.parse(localStorage.getItem(lsYearList));

    if( id == null || id == ""){
        return "";
    } else {
        var result = list.find(function(value){
            return value.a === id;
        });

        return result.b;
    }
}
function setWorkspaceDesc(id){
    let list = JSON.parse(localStorage.getItem(lsWorkspaceList));

    if( id == null || id == ""){
        return "";
    } else {
        var result = list.find(function(value){
            return value.a === id;
        });

        return result.b;
    }
}
function setWorkspaceYearID(id){
    let list = JSON.parse(localStorage.getItem(lsWorkspaceList));

    if( id == null || id == ""){
        return "";
    } else {
        var result = list.find(function(value){
            return value.a === id;
        });

        return result.d;
    }
}

function calculateDelayDate(targetDate, status) {

    if(targetDate == "" || targetDate == null){
        return "";
    } else {

        if(status == "3"){
            return "";
        } else {
            // Parse the target date string
            const target = new Date(targetDate);
                
            // Get the current date
            const currentDate = new Date();
    
            // Calculate the difference in milliseconds
            const differenceMs = currentDate - target;
    
            // Convert milliseconds to days
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
            let delay = differenceDays - 1;
            let desc = (delay > 1)? "DAYS":"DAY";
            
            if(delay > 0){
                return delay + " " + desc;
            } else {
                return "";
            }
        }
    }
}

function setAssigneeUserCode(id){

    let res1 = id.replace("[", ""); 
    let res2 = res1.replace("]", ""); 
    let res3 = res2.replace('"', ""); 
    let res4 = res3.replace('"', ""); 
    return res4;

}
function getCurrentDate(){
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    let day = currentDate.getDate().toString().padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);  // Outputs something like: 2024-05-29
    return formattedDate;

}
function getPhilippinesDateTime() {
    const options = {
        timeZone: "Asia/Manila", 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());

    // Format to YYYY-MM-DD HH:MM:SS
    const year = parts.find(p => p.type === "year").value;
    const month = parts.find(p => p.type === "month").value;
    const day = parts.find(p => p.type === "day").value;
    const hour = parts.find(p => p.type === "hour").value;
    const minute = parts.find(p => p.type === "minute").value;
    const second = parts.find(p => p.type === "second").value;

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function getDayOfWeek(dateString) {
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const date = new Date(dateString);
    return days[date.getDay()];
}


//FROM HRIS
function setHRISEmployeeName(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    // return result ? result.c:"";
    let midname = (result.mname == null || result.mname == "")? "" : result.mname[0];
    return result ? result.lname +", "+result.fname +" "+ midname: "";
}
function setHRISRFID(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b: "";
}
function setHRISEmployeeFName(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.i:"";
}
function setHRISEmployeeIdByRFID(rfid){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.b === rfid);
        
    return result ? result.a:"";
}
function setHRISEmployeeDept(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.e:"";
}
function setHRISEmployeeDateHired(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.d:"";
}
function setHRISEmployeeJobPosition(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.f:"";
}
function setHRISDepartment(id){
    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    let result = list.find(element => element.a === id);
        
    return result ? result.c:"";
}
function setHRISDepartmentCode(id){
    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setHRISDepartmentIDByCode(code){
    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    let result = list.find(element => element.b === code);
        
    return result ? result.a:"";
}

function setHRISJobTitle(id){
    let list = JSON.parse(localStorage.getItem(lsHRISJobPositionList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setHRISJobLevel(id){
    let list = JSON.parse(localStorage.getItem(lsHRISJobPositionList));
    let result = list.find(element => element.a === id);
        
    return result ? result.c:"";
}
function setHRISEmployeeCompany(id){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.a === id);
        
    return result ? result.h:"";
}
function setHRISCompany(id){
    let list = JSON.parse(localStorage.getItem(lsHRISCompanyList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setRoom(id){
    let list = JSON.parse(localStorage.getItem(lsRoomList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setOKRMSDepartment(id){
    let list = JSON.parse(localStorage.getItem(lsUserList));
    let result = list.find(element => element.a === id);
        
    return result ? result.k:"";
}
function setVisitorName(id){
    let list = JSON.parse(localStorage.getItem(lsVisitorList));
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setVisitorID(name){
    let list = JSON.parse(localStorage.getItem(lsVisitorList));
    let result = list.find(element => element.b.toUpperCase() === name.toUpperCase());
        
    return result ? result.a:"";
}
function setColorDepartment(id){
    let list = [
        {a: "1", b:"#fce4d6",}, //HRGA
        {a: "2", b:"#fce4d6",}, //HRGA
        {a: "5", b:"#fce4d6",}, //HRGA
        {a: "13", b:"#fce4d6",}, //HRGA
        {a: "14", b:"#fce4d6",}, //HRGA

        {a: "16", b:"#F67280",}, //FACILITY

        {a: "17", b:"#C3FDB8",}, //SCM/MM/NBD
        {a: "18", b:"#C3FDB8",}, //SCM/MM/NBD
        // {a: "4", b:"#C3FDB8",}, //SCM/MM/NBD

        {a: "3", b:"#b4c6e7",}, //SALES

        {a: "8", b:"#92d050",}, //INJECTION
        {a: "15", b:"#E799A3",}, //PLANNING


        {a: "7", b:"#FF6347",}, //ENGINEER
        {a: "12", b:"#C48793",}, //SPA
        {a: "6", b:"#00ffff",}, // QM
        {a: "22", b:"#ffff99",}, // MANCOM
    ]
    let result = list.find(element => element.a === id);

    return result ? result.b : "#94d3f5"; // OTHERS

}
function setMeetingCategory(id){
    let list = getMeetingCategory();
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";

}
function setItemsToPrepared(id){
    let list = getItemsToPrepared();
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}
function setVisitorType(id){
    let list = getVisitorType();
    let result = list.find(element => element.a === id);
        
    return result ? result.b:"";
}

function setNumberComma(num) {
    return num.toLocaleString();
}
function setNumberDecimal(num) {

    if(num == ""){
        return "";
    } else {
        return parseFloat(num);
    }
}

// console.log(20);


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ////

function getUserRole(){
    let list = [
        {a:"0", b:"SUPERADMIN"},
        {a:"1", b:"USER"},
        {a:"2", b:"POWER USER"},
    ];

    localStorage.setItem(lsUserRoleList, JSON.stringify(list));
}
function getWorkspaceMemberRole(){
    let list = [
        {a:"1", b:"OWNER"},
        {a:"2", b:"MEMBER"},
        {a:"3", b:"SUB-OWNER"},
    ];

    localStorage.setItem(lsWorkspaceMemberRoleList, JSON.stringify(list));
}
function getUserStatus(){
    let list = [
        {a:"0", b:"DISABLE"},
        {a:"1", b:"ENABLE"},
    ];

    return list;
}
function getTaskStatus(){
    let list = [
        {a:"1", b:"TO-DO"},
        {a:"2", b:"ON-GOING"},
        {a:"3", b:"COMPLETE"},
        {a:"4", b:"FOR APPROVAL"},
    ];

    localStorage.setItem(lsTaskStatusList, JSON.stringify(list));
}
function getStatusMeetingSched(){
    let list = [
        {a:"0", b:"FOR APPROVAL OF HEAD", c:"PREPARED BY",},
        {a:"1", b:"TO BE NOTE BY GA", c:"APPROVED BY HEAD",},
        {a:"2", b:"APPROVED", c:"NOTED BY GA",},
        {a:"3", b:"DECLINED", c:"DECLINED",},
        {a:"4", b:"DONE", c:"DONE",},
        {a:"5", b:"CANCELLED", c:"CANCELLED",},
    ]

    return list;

}
function getUserRole2(){
    let list = [
        {a:"0", b:"NORMAL USER"},
        {a:"1", b:"ADMIN"},
    ];

    return list;
}
function getMeetingCategory(){
    let list = [
        {a:"1", b:"INTERNAL"},
        {a:"2", b:"EXTERNAL"},
    ];

    return list;
}
function getVisitorType(){
    let list = [
        {a:"1", b:"NORMAL"},
        {a:"2", b:"LOCAL MANAGERS"},
        {a:"3", b:"VIP (EXPATS)"},
        {a:"3", b:"VVIP(TOP MGT and EXECUTIVES)"},
    ];

    return list;
}
function getItemsToPrepared(){
    let list = [
        {a:"1", b:"WELCOME BOARD"},
        {a:"2", b:"FLAG"},
        {a:"3", b:"SLIPPERS SIZES"},
        {a:"4", b:"MEETING AREA"},
        {a:"5", b:"HOTEL RESERVATION"},
        {a:"6", b:"CHECK-IN"},
        {a:"7", b:"CHECK-OUT"},
        {a:"8", b:"MEALS/SNACKS"},
    ];

    return list;
}

/* let list = [
    {a:"1", b:"Visitor 1"},
    {a:"2", b:"Visitor 2"},
    {a:"3", b:"Visitor 3"},
    {a:"3", b:"Visitor 4"},
]; */



function getUser(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/user.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsUserList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function getDepartment(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/department.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsDepartmentList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getPosition(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/position.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsPositionList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getPriority(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/priority.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsPriorityList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getYear(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/year.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsYearList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getWorkspace(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsWorkspaceList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function getSelectedProject(code){
    $.ajax({
        url: "/"+rootFolder+'/getRecords/selected_project.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            projectCode: code
        },
        dataType: 'json',
        success: function(data) {
            localStorage.setItem(lsSelectedProject, JSON.stringify(data));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getActiveYear(){

    $.ajax({
        url: "/"+rootFolder+'/getCodes/php/getActiveYear.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsActiveYear, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}



function getTaskList(code){
    $.ajax({
        url: "/"+rootFolder+'/getRecords/task_list.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            projectCode: code
        },
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsTaskList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });

}
function getKPIList(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/kpi_evaluation.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            department: (userRole == 0)? "ALL":userDept,
        },
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsKPIlist, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}


function getHRISEmployeeMasterlist(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/hris_employee_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsHRISEmployeeList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getHRISJobPositionlist(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/hris_jobposition_list.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsHRISJobPositionList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getHRISCompanylist(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/hris_company_list.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsHRISCompanyList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getHRISDepartmentlist(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/hris_department_list.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsHRISDepartmentList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getRoomlist(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/room.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsRoomList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getVisitor(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/visitor_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsVisitorList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}



















// test()
function test(){

    let list = [
        {id: 1, b: "desc 1", c: 1,},
        {id: 2, b: "desc 2", c: 2,},
        {id: 3, b: "desc 3", c: 1,},
        {id: 4, b: "desc 4", c: 2,},
    ]
    let selected = "2";
    // let selected = ["3", "2"];

    /* list = list.filter(item => {
        let deptList = JSON.parse(item.c);

        return deptList.includes(selected);

    }); */
    /* list = list.filter(item => {
        let deptList = JSON.parse(item.c);

        return array.some(value => deptList.includes(value));

    }); */
    list = list.filter(item => {
        

    });

    
    console.log(list);
}





/* function testinglang(){
    // Bigyang halaga ang dati mong array
    var array = [
        {a:"1", b:"description1"},
        {a:"2", b:"description2"},
        {a:"3", b:"description3"},
        {a:"4", b:"description4"},
        {a:"5", b:"description5"},
        {a:"6", b:"description6"},
    ];

    // Alisin ang elemento na may description3 mula sa array
    var description3Element = array.find(element => element.b === "2");
    array = array.filter(element => element !== description3Element);

    // Idagdag ang description3 sa unahan ng array
    array.unshift(description3Element);

    // Ilagay ang description1 sa hulihan ng array
    var description1Element = array.find(element => element.b === "description1");
    array = array.filter(element => element !== description1Element);
    array.push(description1Element);

    // I-output ang bagong array
    console.log(array);

} */







