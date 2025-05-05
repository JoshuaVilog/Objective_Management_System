$(document).ready(function() {
    // getDepartment();
    // fetchDataAndInitializeTable();
});

var table = new Tabulator("#table-records", {
    layout: "fitDataFill", // Adjust table height based on the data
    columns: [
        {title: "id", field: "a", formatter:"rownum"},
        {title: "TASK DESCRIPTION", field: "a", formatter: formatterA}, // input text
        {title: "TASK PARENT", field: "b", formatter: formatterB}, // input text
        {title: "STATUS", field: "c", formatter: formatterC}, // select
        {title: "ASSIGNEE", field: "d", formatter: formatterD}, //select multiple
        {title: "PRIORITY", field: "e", formatter: formatterE}, // select
        {title: "DUE DATE", field: "f", formatter: formatterF}, //input date
        {title: "START DATE", field: "g", formatter: formatterG}, // input date
        {title: "FINISH DATE", field: "h", formatter: formatterH}, //input date
        {title: "TASK DETAILS", field: "i", formatter: formatterI}, //textarea
        {title: "Action", formatter: buttonFormatter, hozAlign: "left", frozen: true},
    ],
    
});

function buttonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let remove = '<button class="btn btn-danger btnRemoveItem removeItem">Remove</button>';

    return remove;
}

function formatterA(cell, formatterParams, onRendered) {
    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control");
    input.classList.add("txtTaskDesc");
    input.value = cell.getValue();

    return input;
}

function formatterB(cell, formatterParams, onRendered) {
    var list = JSON.parse(localStorage.getItem(tempTaskLS));
    var select = document.createElement("select");
    // select.type = "text";
    select.classList.add("form-control");
    select.classList.add("selectTaskParent");
    // select.value = cell.getValue();

    var option = document.createElement("option");
    option.text = "-Select-";
    option.value = "";
    select.appendChild(option);
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.text = list[i].b;
        option.value = list[i].a;
        if(list[i].b == cell.getValue()){
            option.selected = true;
        }
        select.appendChild(option);
    }




    return select;
}

function formatterC(cell, formatterParams, onRendered) {
    var list = JSON.parse(localStorage.getItem(lsTaskStatusList));
    var select = document.createElement("select");
    select.classList.add("selectStatus");
    select.value = cell.getValue();

    var option = document.createElement("option");
    option.text = "-Select-";
    option.value = "";
    select.appendChild(option);
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.text = list[i].b;
        option.value = list[i].a;
        if(list[i].a == cell.getValue()){
            option.selected = true;
        }
        select.appendChild(option);
    }

    return select;
}

function formatterD(cell, formatterParams, onRendered) {
    var list = JSON.parse(localStorage.getItem(lsUserList));
    var listAssignee = cell.getValue();

    
    var select = document.createElement("select");
    select.setAttribute("multiple","multiple");
    select.classList.add("selectAssignee");

    var options = '<option></option>';
    for (var i = 0; i < list.length; i++) {
        let isSelected = false;

        for(var j = 0; j < listAssignee.length; j++){
            if(listAssignee[j] == list[i].a){
                isSelected = true;
                break;
            }
        }

        let selectedDesc = (isSelected == true)? "selected":"";
        
        options += '<option value="'+ list[i].a +'" '+selectedDesc+'>'+list[i].c+ " "+list[i].b +'</option>';
        
    }
    select.innerHTML = options;

    return select;
     
}

function formatterE(cell, formatterParams, onRendered) {
    var list = JSON.parse(localStorage.getItem(lsPriorityList));
    var select = document.createElement("select");
    select.classList.add("selectPriority");
    select.value = cell.getValue();

    var option = document.createElement("option");
    option.text = "-Select-";
    option.value = "";
    select.appendChild(option);
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.text = list[i].b;
        option.value = list[i].a;
        if(list[i].a == cell.getValue()){
            option.selected = true;
        }
        select.appendChild(option);
    }

    return select;
}


function formatterF(cell, formatterParams, onRendered) {
    var input = document.createElement("input");
    input.type = "date";
    input.classList.add("form-control");
    input.classList.add("txtTaskDueDate");
    input.value = cell.getValue();

    return input;
}
function formatterG(cell, formatterParams, onRendered) {
    var input = document.createElement("input");
    input.type = "date";
    input.classList.add("form-control");
    input.classList.add("txtTaskStartDate");
    input.value = cell.getValue();

    return input;
}
function formatterH(cell, formatterParams, onRendered) {
    var input = document.createElement("input");
    input.type = "date";
    input.classList.add("form-control");
    input.classList.add("txtTaskFinishDate");
    input.value = cell.getValue();

    return input;
}
function formatterI(cell, formatterParams, onRendered) {
    var input = document.createElement("textarea");
    input.classList.add("form-control");
    input.classList.add("txtTaskDetails");
    input.value = cell.getValue();

    return input;
}



















/*
var table;

function fetchDataAndInitializeTable() {

    let recordList = JSON.parse(localStorage.getItem(lsDepartmentList));
    
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
            {title: "DESCRIPTION", field: "b", headerFilter: "input"},
            {title: "CODE", field: "c", headerFilter: "input"},
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
*/