$(document).ready(function() {
    getDepartment();
    fetchDataAndInitializeTable();
});

var table;

function fetchDataAndInitializeTable() {

    // let recordList = JSON.parse(localStorage.getItem(lsDepartmentList));
    $.ajax({
        url: '/'+rootFolder+'/getRecords/workspace_masterlist.php', // Replace with your server-side script URL
        type: 'POST',
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
                    {title: "RID", field: "a", headerFilter: "input"},
                    {title: "WORKSPACE", field: "b", headerFilter: "input"},
                    // {title: "DEPARTMENT", field: "c", headerFilter: "input", formatter: displayDepartment},
                    {title: "DEPARTMENT", field: "c", headerFilter: "input", mutator: lowercaseMutator},
                    {title: "YEAR", field: "d", headerFilter: "input", formatter: function(cell){
                        return setYear(cell.getValue());
                    }},
                    {title: "Action", field:"a", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
                ],
            });
        }
    });
}

function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let edit= '<button class="btn btn-primary btn-sm mx-1" onclick="modifyRecord(\''+ rowData.a +'\')">Modify</button>';
    let remove = '<button class="btn btn-danger btn-sm mx-1" onclick="removeRecord(\''+ rowData.a +'\')">Remove</button>';

    cell.getElement().style.backgroundColor == "#ffffff";

    return edit + " " +remove;
    // return '';
}

function displayDepartment(cell, formatterParams, onRendered) {
    let departmentID = cell.getValue();
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    var result = list.find(function(value) {
        return value.a === departmentID;
    });

    return result.b;
}

function lowercaseMutator(value, data, type, params, component) {
    // Convert the description to lowercase
    let departmentID = value;
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    var result = list.find(function(value) {
        return value.a === departmentID;
    });

    return result.b;
}

function modifyRecord(id){
    // alert(id)
    // console.log(sendData);
    $.ajax({
        url: 'ajax/setEdit.php', // Replace with your server-side script URL
        type: 'POST',
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data)
            
            $("#txtEditDesc").val(data.b);
            populateEditDepartment(data.c);
            $("#hiddenID").val(data.a);
            // $("#tbody-edit-search-user").html(populateEditUserRow(data.memberList));
            populateEditUserRow(data.memberList)
            populateEditSelectedRow(data.memberList);
            $('#modalEdit').modal('show');
            

        },
        error: function(error) {
            alert('Error:'+ error);
        }
    });
}

function removeRecord(id){
    Swal.fire({
        title: 'Are you sure you want to Remove this record?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
    }).then((result) => {
        
        if(result.isConfirmed) {
            
            $.ajax({
                url: "ajax/remove.php",
                method: "POST",
                data: {
                    id: id,
                    userCode: userCode,
                },
                success: function(response) {
                    console.log(response);
                    Swal.fire({
                        title: 'Record Removed!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed!'
                        }).then((result) => {
                        if (result.isConfirmed) {
                            fetchDataAndInitializeTable();
                        }
                        fetchDataAndInitializeTable();
                    })
                }
            });
            
        }  
    })

    // alert(code);
}
