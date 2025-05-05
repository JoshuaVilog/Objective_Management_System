$(document).ready(function() {
    // getDepartment();
    // fetchDataAndInitializeTable();
    // setTimeout(fetchDataAndInitializeTable, 1000);
    fetchDataAndInitializeTable()
});

var table;

function fetchDataAndInitializeTable() {
    // $("#spinnerProjectTable").hide();
    console.log(userRole)
    $.ajax({ 
        url: "/"+rootFolder+'/getRecords/project_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            userRole: userRole,
            userCode: userCode,
        },
        dataType: 'json',
        success: function(list) {
            table = new Tabulator("#table-records", {
                pagination: "local", // Enable local pagination
                paginationSize: 10, // Number of rows per page
                paginationSizeSelector: [10, 25, 50, 100], // Page size options
                page: 1, // Initial page number
                ajaxURL: "your_data_endpoint_here.json",
                data: list,
                layout: "fitDataFill", // Adjust table height based on the data
                columns: [
                    {title: "PROJECT CODE", field: "b", headerFilter: "input"},
                    {title: "PROJECT TITLE", field: "c", headerFilter: "input"},
                    {title: "DEPARTMENT", field: "e", headerFilter: "input", formatter: displayDepartment},
                    {title: "TARGET DATE", field: "f", headerFilter: "input"},
                    {title: "ACTION", field: "a", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
                ],
            });
            
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let view = '<button class="btn btn-success btn-sm mx-1" onclick="viewProject(\''+ rowData.a +'\')">View</button>';
    let edit = '<button class="btn btn-primary btn-sm mx-1" onclick="modifyProject(\''+ rowData.a +'\')">Modify</button>'; 
    let remove = '<button class="btn btn-danger btn-sm mx-1" onclick="removeProject(\''+ rowData.a +'\')">Remove</button>'; 

    // cell.getElement().style.backgroundColor == "#ffffff";

    // if(userRole == "0"){
    //     return view +" "+ edit +" "+ remove;
    // } else {
    //     return view;
    // }
    
    return view +" "+ edit +" "+ remove;
}
function displayDepartment(cell, formatterParams, onRendered) {
    let rowData = cell.getValue();
    let departmentList = JSON.parse(localStorage.getItem(lsDepartmentList));

    var result = departmentList.find(function(value) {
        return value.a === rowData;
    });

    return result.c;

}


function viewProject(code){

    window.location.href = "/"+rootFolder+"/viewProject/index.php?project="+code;
    // alert("NO FUNCTION!");
}

function modifyProject(id){
    // alert(id)
    
    $.ajax({
        url: 'ajax/setProjectUpdate.php', // Replace with your server-side script URL
        type: 'POST',
        data: {
            id: id,
        },
        success: function(data) {
            // console.log(data.a);
            
            $("#hiddenEditId").val(data.a);
            $("#txtEditDesc").val(data.b);
            $("#txtEditTargetDate").val(data.d);
            $("#txtEditDetails").val(data.c);
            
            // // Show the modal
            $('#modalEdit').modal('show');

        }
    });
    
}

function removeProject(id){
    // alert(code)
    Swal.fire({
        title: "Are you sure you want to remove the Project?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            
            $.ajax({
                url: 'ajax/removeProject.php', 
                type: 'POST',
                data: {
                    id: id,
                    userCode: userCode,
                },
                success: function(data) {
                    // window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                    fetchDataAndInitializeTable();
                    Swal.fire("Project removed!", "", "success");
                }
            });
           
        }
      });
}


/*
function modifyRecord(code) {

    let departmentList = JSON.parse(localStorage.getItem(lsDepartmentList));
    
    var result = departmentList.find(function(value) {
        return value.a === code;
    });
    var sendData = {
        result: result
    };
    //console.log(sendData);
    $.ajax({
        url: 'ajax/modalBodyEdit.php', // Replace with your server-side script URL
        type: 'POST',
        data: JSON.stringify(sendData),
        success: function(data) {
            //console.log(data);
            
            var modalBody = document.querySelector('#modal-body-edit');
            modalBody.innerHTML = data;
            
            // Show the modal
            $('#modalEdit').modal('show');

        }
    });
}
*/