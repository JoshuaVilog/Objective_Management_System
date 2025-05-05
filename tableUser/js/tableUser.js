$(document).ready(function() {
    // getUser();
    fetchDataAndInitializeTable();
});

var table;

function fetchDataAndInitializeTable() {
    $.ajax({
        url: "/"+rootFolder+'/getRecords/user.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            table = new Tabulator("#table-user", {
                // pagination: "local", // Enable local pagination
                // paginationSize: 10, // Number of rows per page
                // paginationSizeSelector: [10, 25, 50, 100], // Page size options
                // page: 1, // Initial page number
                ajaxURL: "your_data_endpoint_here.json",
                data: list,
                layout: "fitDataFill", // Adjust table height based on the data
                columns: [
                    {title: "Last Name", field: "b", headerFilter: "input"},
                    {title: "First Name", field: "c", headerFilter: "input"},
                    {title: "Middle Name", field: "d", headerFilter: "input"},
                    {title: "Email", field: "j"},
                    {title: "Username", field: "g", headerFilter: "input"},
                    // {title: "Position", field: "f", formatter: displayPosition},
                    {title: "Department", field: "e", mutator: displayDepartment, headerFilter:"input"},
                    {title: "User Role", field: "h", formatter: displayRole},
                    {title: "User Status", field: "i", formatter: displayStatus},
                    {title: "Action", formatter: buttonFormatter, width: 300, hozAlign: "center", headerSort: false, frozen:true},
                ],
                downloadConfig: {
                    // Enable CSV export
                    csv: true,
                    // Enable Excel export
                    excel: true,
                    // Enable JSON export
                    json: true,
                    // Enable PDF export
                    pdf: true,
                },
            });
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}


function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let view = '<button class="btn btn-success btn-sm mx-1" onclick="modifyUser(\''+ rowData.a +'\')">Modify</button>';
    let changePass = '<button class="btn btn-warning btn-sm mx-1" onclick="changePassword(\''+ rowData.a +'\')">Change Password</button>';

    cell.getElement().style.backgroundColor == "#ffffff";

    return view + changePass;
    // return '';
}

function displayPosition(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();
    let status = "";
    let list = JSON.parse(localStorage.getItem(lsPositionList));

    for(let index = 0; index < list.length; index++){
        if(list[index].a == rowData.f){
            status = list[index].b;
            break;
        } 
    }

    return status;
}
function displayDepartment(value, data, type, params, component) {
    // Convert the description to lowercase
    let departmentID = value;
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    var result = list.find(function(value) {
        return value.a === departmentID;
    });

    return result.c;
}

function displayRole(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();
    let status = "";
    let list = JSON.parse(localStorage.getItem(lsUserRoleList));

    for(let index = 0; index < list.length; index++){
        if(list[index].a == rowData.h){
            status = list[index].b;
            break;
        }
    }
    return status;
}

function displayStatus(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();
    let status = "";
    let list = getUserStatus();

    for(let index = 0; index < list.length; index++){
        if(list[index].a == rowData.i){
            status = list[index].b;
            break;
        }
    }

    return status;
}


function modifyUser(code) {
    
    $.ajax({
        url: 'ajax/setUser.php', // Replace with your server-side script URL
        type: 'POST',
        data: {
            id: code,
        },
        success: function(data) {
            // console.log(data);
            
            $("#txtEditLastname").val(data.b);
            $("#txtEditFirstname").val(data.c);
            $("#txtEditMiddlename").val(data.d);
            $("#txtEditEmail").val(data.j);
            $("#txtEditUsername").val(data.g);
            $("#hiddenId").val(data.a);
            $("#selectEditStatus").val(data.i);
            $("#selectEditPosition").html(populatePosition(data.f));
            // $("#selectEditDepartment").html(populateDepartment(data.e));
            $("#selectEditRole").html(populateRole(data.h));
            populateDepartment(data.e);
            // $("#selectEditDepartment2").html(data.k);

            populateEditDepartment2(data.k);
            

            setTimeout(() => {
                $('#selectEditDepartment, #selectEditPosition').select2({
                    minimumInputLength: 0, // Set to 0 to always show the search bar
                    allowClear: true, 
                    placeholder: 'Select an option'
                });
            }, 500);
            
            
            // Show the modal
            $('#modalEditUser').modal('show');

        }
    });
    /* 
    var userList = JSON.parse(localStorage.getItem(lsUserList));
    let departmentList = JSON.parse(localStorage.getItem(lsDepartmentList));
    let positionList = JSON.parse(localStorage.getItem(lsPositionList));
    let roleList = JSON.parse(localStorage.getItem(lsUserRoleList));
    
    var result = userList.find(function(value) {
        return value.a === code;
    });
    var sendData = {
        user: result,
        departmentList: departmentList,
        positionList: positionList,
        roleList: roleList,
        statusList: getUserStatus(),
    };
    //console.log(sendData);
    $.ajax({
        url: 'ajax/modalBodyEditUser.php', // Replace with your server-side script URL
        type: 'POST',
        data: JSON.stringify(sendData),
        success: function(data) {
            // console.log(data);
            
            var modalBody = document.querySelector('#modal-body-edit');
            modalBody.innerHTML = data;

            $('#selectEditDepartment, #selectEditPosition').select2({
                minimumInputLength: 0, // Set to 0 to always show the search bar
                allowClear: true, 
                placeholder: 'Select an option'
            });

            
            // populateEditDepartment2(department2);
            
            // Show the modal
            $('#modalEditUser').modal('show');

        }
    });
    
     */
}

function changePassword(id) {
    //alert(id);
    Swal.fire({
        title: 'Do you want to change your password?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            // Swal.fire('Saved!', '', 'success')
            $.ajax({
                url: 'ajax/changePassword.php', // Replace with your server-side script URL
                type: 'POST',
                data: {
                    userId: id
                },
                success: function(data) {
                    Swal.fire({
                        title: 'Do you want to change your password?',
                        text: 'Your Password is '+data,
                        
                    })
                }
            });
        }
    })
}




function fetchLoginHistory() {
    $.ajax({
        url: "/"+rootFolder+'/getRecords/login_history.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            table = new Tabulator("#table-login-history", {
                data: list,
                layout: "fitDataFill", // Adjust table height based on the data
                pagination: "local", // Enable local pagination
                paginationSize: 10, // Number of rows per page
                paginationSizeSelector: [10, 25, 50, 100], // Page size options
                page: 1, // Initial page number
                columns: [
                    {title: "FULL NAME", field: "USER_ID", headerFilter: "input", formatter: function(cell){
                        return setUserFullName(cell.getValue());
                    }},
                    {title: "DATETIME", field: "DATETIME", headerFilter: "input"},
                ],
                downloadConfig: {
                    // Enable CSV export
                    csv: true,
                    // Enable Excel export
                    excel: true,
                    // Enable JSON export
                    json: true,
                    // Enable PDF export
                    pdf: true,
                },
            });
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

