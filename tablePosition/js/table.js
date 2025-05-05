$(document).ready(function() {
    getPosition();
    setTimeout(fetchDataAndInitializeTable, 1000);
});

var table;

function fetchDataAndInitializeTable() {

    let recordList = JSON.parse(localStorage.getItem(lsPositionList));
    
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
            {title: "JOB TITLE", field: "b", headerFilter: "input"},
            {title: "JOB DESC", field: "c", headerFilter: "input"},
            {title: "Action", formatter: buttonFormatter, width: 300, hozAlign: "left", headerSort: false, frozen:true},
        ],
    });
    
}

function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let edit= '<button class="btn btn-success btn-sm mx-1" onclick="modifyRecord(\''+ rowData.a +'\')">Modify</button>';

    cell.getElement().style.backgroundColor == "#ffffff";

    return edit;
    // return '';
}

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
    
    
}