$(document).ready(function() {
    getPosition();
    setTimeout(fetchDataAndInitializeTable, 1000);
});

var table;

function fetchDataAndInitializeTable() {

    let recordList = JSON.parse(localStorage.getItem(lsYearList));
    
    table = new Tabulator("#table-records", {
        pagination: "local", // Enable local pagination
        paginationSize: 10, // Number of rows per page
        paginationSizeSelector: [10, 25, 50, 100], // Page size options
        page: 1, // Initial page number
        ajaxURL: "your_data_endpoint_here.json",
        data: recordList,
        layout: "fitDataFill", // Adjust table height based on the data
        columns: [
            {title: "ID", field: "a", headerFilter: "input"},
            {title: "YEAR", field: "b", headerFilter: "input"},
            {title: "Action", field:"c", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
        ],
    });
    
}

function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();
    let value = cell.getValue();
    let change = "";

    if(value == "1"){
        change = "-";
    } else {
        change = '<button class="btn btn-success btn-minier mx-1" onclick="changeYear(\''+ rowData.a +'\')">Change Year</button>';
    }

    cell.getElement().style.backgroundColor == "#ffffff";

    return change;
}

function changeYear(id){
    Swal.fire({
        title: 'Are you sure you want to change the year on the system?',
        text: '',
        icon: 'question',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'ajax/update.php', 
                type: 'POST',
                data: {
                    id: id,
                },
                success: function(data) {
                    Swal.fire({
                        title: 'Year changed Successfully!',
                        text: '',
                        icon: 'success',
                        timer: 2000,
                        willClose: () => {
                            window.location.href = "/"+rootFolder+"/"+folderLoc+"/index.php";
                        },
                    })
                },
                error: function(error) {
                  alert('Error geting data');
                }
            });
        }
    })
}

/* 
function modifyRecord(code) {
    let positionList = JSON.parse(localStorage.getItem(lsPositionList));

    var result = positionList.find(function(value) {
        return value.a === code;
    });
    // var sendData = {
    //     result: result
    // };
    //console.log(sendData);
    $.ajax({
        url: 'ajax/modalBodyEdit.php', // Replace with your server-side script URL
        type: 'POST',
        data: {
            id: result.a,
            title: result.b,
            desc: result.c
        },
        success: function(data) {
            //console.log(data);
            
            var modalBody = document.querySelector('#modal-body-edit');
            modalBody.innerHTML = data;
            
            // Show the modal
            $('#modalEdit').modal('show');

        }
    });
    
    
} */