
var table1;
var table2;
var table3;
var table4;
var table5;
let noCreateKPI = 0;

// displayTable1()

// CREATE KPI
function displayTable1(){
    
    table1 = new Tabulator("#table-create-kpi", {
        layout: "fitDataFill", // Adjust table height based on the data
        movableRows: true, 
        data: [],
        // rowHeader:{headerSort:false, rowHandle:true, resizable: false, formatter:"handle"},
        columns: [
            {title: "#", field: "", formatter: "rownum", headerSort:false, rowHandle:true, headerTooltip: "Drag to reorder",},
            {title: "ID", field: "id", visible: false,},
            {title: "CATEGORY", field: "a", formatter: formatterCreateCategory, width:300, headerSort:false, visible: false},
            {title: "OBJECTIVE", field: "b", formatter: formatterCreateKPI, width:300, headerSort:false, },
            {title: "KEY RESULT", field: "e", formatter: formatterCreateGoal, headerSort:false,},
            {title: "WEIGH", field: "c", formatter: formatterCreateWeigh, headerSort:false,},
            {title: "FORMULA", field: "f", formatter: formatterCreateFormula, headerSort:false,},
            {
                title:"LAST YEAR RESULT",
                hozAlign:"center",
                columns:[
                {title:"SCORE", field:"lastS", formatter: formatterEditLastScore, width: 100},
                {title:"GRADE", field:"lastG", formatter: formatterEditLastGrade, width: 100},
                ],
            },
            {
                title:"1ST QUARTER",
                hozAlign:"center",
                columns:[
                {title:"RESULT", field:"Q1R", formatter: formatterEdit1QResult, width: 100},
                {title:"SCORE", field:"Q1S", formatter: formatterEdit1QScore, width: 100},
                {title:"GRADE", field:"Q1G", formatter: formatterEdit1QGrade, width: 100},
                ],
            },
            {
                title:"2ND QUARTER",
                hozAlign:"center",
                columns:[
                {title:"RESULT", field:"Q2R", formatter: formatterEdit2QResult, width: 100},
                {title:"SCORE", field:"Q2S", formatter:formatterEdit2QScore, width: 100},
                {title:"GRADE", field:"Q2G", formatter:formatterEdit2QGrade, width: 100},
                ],
            },
            {
                title:"3RD QUARTER",
                hozAlign:"center",
                columns:[
                {title:"RESULT", field:"Q3R", formatter: formatterEdit3QResult, width: 100},
                {title:"SCORE", field:"Q3S", formatter: formatterEdit3QScore, width: 100},
                {title:"GRADE", field:"Q3G", formatter: formatterEdit3QGrade, width: 100},
                ],
            },
            {
                title:"4TH QUARTER",
                hozAlign:"center",
                columns:[
                {title:"RESULT", field:"Q4R", formatter: formatterEdit4QResult, width: 100},
                {title:"SCORE", field:"Q4S", formatter: formatterEdit4QScore, width: 100},
                {title:"GRADE", field:"Q4G", formatter: formatterEdit4QGrade, width: 100},
                ],
            },
            {
                title:"RESULT",
                hozAlign:"center",
                columns:[
                {title:"RESULT", field:"resultR", formatter: formatterEditResultResult, width: 100},
                {title:"SCORE", field:"resultS", formatter: formatterEditResultScore, width: 100},
                {title:"GRADE", field:"resultG", formatter: formatterEditResultGrade, width: 100},
                ],
            },
            {title: "Action",field: "d", formatter: removeButtonFormatter, hozAlign: "left", frozen: true, },
        ],
    });
}

function formatterCreateCategory(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtCategory");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ a: value });
    });
    
    
    return input;
}
function formatterCreateKPI(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtKPIDesc");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ b: value });
    });
    
    
    return input;
}
function formatterCreateWeigh(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var qty = cell.getValue();
    
    input.type = "number";
    input.value = qty;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtWeigh");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ c: qty });

        computeTotalWeight()
        
    });
    
    
    return input;
}
function formatterCreateGoal(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtGoal");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ e: value });
    });
    
    
    return input;
}
function formatterCreateFormula(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtFormula");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ f: value });
    });
    
    
    return input;
}

function removeButtonFormatter(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();

    let remove = '<button class="btn btn-danger btn-sm btnRemoveItem" onclick="removeRowKPI('+rowData.d+')">Remove</button>';
    let id = '<input type="hidden" class="hiddenID" value="'+rowData.d+'">';

    return remove + " " + id;
}

function removeRowKPI(id){
   
    table1.deleteRow(id);
    computeTotalWeight()
    
}

$("#table-create-kpi").on("input", ".txtNumberOnly", function(){
    let value = $(this).val();

    $(this).val(value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
});

///////=================================================================================//////

// DIPLAY KPI
function displayTable2(user){
    
    $.ajax({
        url: '/'+rootFolder+'/getRecords/getUserKPI.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           user: user,
        },
        dataType: 'json',
        success: function(data) {

            let kpiID = data.a;
            
            $("#hiddenDisplayKPI").val(kpiID);

            $("#tdDisplay1QR").text((userRole != "1") ? data.Q1R : "-");
            $("#tdDisplay1QS").text((userRole != "1") ? data.Q1S : "-");
            $("#tdDisplay1QG").text((userRole != "1") ? data.Q1G : "-");
            $("#tdDisplay2QR").text((userRole != "1") ? data.Q2R : "-");
            $("#tdDisplay2QS").text((userRole != "1") ? data.Q2S : "-");
            $("#tdDisplay2QG").text((userRole != "1") ? data.Q2G : "-");
            $("#tdDisplay3QR").text((userRole != "1") ? data.Q3R : "-");
            $("#tdDisplay3QS").text((userRole != "1") ? data.Q3S : "-");
            $("#tdDisplay3QG").text((userRole != "1") ? data.Q3G : "-");
            $("#tdDisplay4QR").text((userRole != "1") ? data.Q4R : "-");
            $("#tdDisplay4QS").text((userRole != "1") ? data.Q4S : "-");
            $("#tdDisplay4QG").text((userRole != "1") ? data.Q4G : "-");
            $("#tdDisplayRR").text((userRole != "1") ? data.RR : "-");
            $("#tdDisplayRS").text((userRole != "1") ? data.RS : "-");
            $("#tdDisplayRG").text((userRole != "1") ? data.RG : "-");

            $.ajax({
                url: '/'+rootFolder+'/getRecords/kpi_list.php', // Replace with your server-side script URL
                type: 'POST',
                data:{
                   id: kpiID,
                },
                dataType: 'json',
                success: function(data) {
                    console.log(data)
        
                    table2 = new Tabulator("#table-display-kpi", {
                        layout: "fitDataFill", // Adjust table height based on the data
                        data: data,
                        // rowHeader:{headerSort:false, rowHandle:true, resizable: false, formatter:"handle"},
                        columns: [
                            {title: "#", field: "id", formatter: "rownum", headerSort:false,},
                            {title: "CATEGORY", field: "b", width:300, formatter:"textarea", headerSort:false, visible: false},
                            {title: "OBJECTIVE", field: "c",  width:300, formatter:"textarea", headerSort:false, },
                            {title: "KEY RESULT", field: "f", width:300, headerSort:false, formatter:"textarea",},
                            {title: "WEIGH", field: "d", headerSort:false, formatter:"textarea",},
                            {title: "FORMULA", field: "e", width:300, headerSort:false, formatter:"textarea",},
                            {
                                title:"LAST YEAR RESULT",
                                hozAlign:"center",
                                columns:[
                                {title:"SCORE", field:"lastS", formatter: formatterHideScore, width: 100},
                                {title:"GRADE", field:"lastG", formatter: formatterHideScore, width: 100},
                                ],
                            },
                            {
                                title:"1ST QUARTER",
                                hozAlign:"center",
                                columns:[
                                {title:"RESULT", field:"Q1R", width: 100, formatter: formatterHideScore,},
                                {title:"SCORE", field:"Q1S", width: 100, formatter: formatterHideScore,},
                                {title:"GRADE", field:"Q1G", width: 100, formatter: formatterHideScore,},
                                ],
                            },
                            {
                                title:"2ND QUARTER",
                                hozAlign:"center",
                                columns:[
                                {title:"RESULT", field:"Q2R", width: 100, formatter: formatterHideScore,},
                                {title:"SCORE", field:"Q2S", width: 100, formatter: formatterHideScore,},
                                {title:"GRADE", field:"Q2G",  width: 100, formatter: formatterHideScore,},
                                ],
                            },
                            {
                                title:"3RD QUARTER",
                                hozAlign:"center",
                                columns:[
                                {title:"RESULT", field:"Q3R",  width: 100, formatter: formatterHideScore,},
                                {title:"SCORE", field:"Q3S",  width: 100, formatter: formatterHideScore,},
                                {title:"GRADE", field:"Q3G",  width: 100, formatter: formatterHideScore,},
                                ],
                            },
                            {
                                title:"4TH QUARTER",
                                hozAlign:"center",
                                columns:[
                                {title:"RESULT", field:"Q4R",  width: 100, formatter: formatterHideScore,},
                                {title:"SCORE", field:"Q4S",  width: 100, formatter: formatterHideScore,},
                                {title:"GRADE", field:"Q4G",  width: 100, formatter: formatterHideScore,},
                                ],
                            },
                            {
                                title:"RESULT",
                                hozAlign:"center",
                                columns:[
                                {title:"RESULT", field:"resultR",  width: 100, formatter: formatterHideScore,},
                                {title:"SCORE", field:"resultS",  width: 100, formatter: formatterHideScore,},
                                {title:"GRADE", field:"resultG", width: 100, formatter: formatterHideScore,},
                                ],
                            },
                            {title: "Action",field: "a", hozAlign: "left", headerSort:false, formatter: formatterDisplayAction, frozen: true, },
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
                            columnHeaders:true, //do not include column headers in downloaded table
                            columnGroups:false, //do not include column groups in column headers for downloaded table
                            rowGroups:false, //do not include row groups in downloaded table W
                            columnCalcs:false, //do not include column calcs in downloaded table
                            dataTree:false, //do not include data tree in downloaded table
                        },
                    });
                },
                error: function(error) {
                    alert('Error fetching KPI list data from the database.');
                }
            });
        },
        error: function(error) {
            alert('Error fetching get KPI data from the database.');
        }
    });
}
function formatterHideScore(cell){
    let value = cell.getValue();

    return (userRole != "1")? value : "-";

}
function formatterDisplayAction(cell){
    let rowData = cell.getRow().getData();

    let view = '<button class="btn btn-success btn-minier" onclick="viewAttachment('+rowData.a+')">View Attachment</button>';

    return view;

}



function viewAttachment(id){

    displayFileAttachments(id)
    $("#hiddenKPIListID").val(id);
    $("#modalViewFiles").modal("show");
}








function displayAllKPIUsers(filterDept){
    let data = JSON.parse(localStorage.getItem(lsHRISEmployeeList));

    data = data.filter(item => item.active == "1");

    if(filterDept != undefined){
        data = data.filter(item => filterDept.includes(String(item.e)));

    }

    console.log(data);


    data.forEach(item => {
        let userID = item.a;

        item.name = setHRISEmployeeName(userID);
        item.dept = setHRISDepartmentCode(setHRISEmployeeDept(userID));
        item.POSITION = setHRISJobTitle(setHRISEmployeeJobPosition(userID));
        item.JOB_TITLE = setHRISJobLevel(setHRISEmployeeJobPosition(userID));

    });

    table4 = new Tabulator("#table-all-kpi", {
        layout: "fitDataFill", // Adjust table height based on the data
        data: data,
        pagination: "local", // Enable local pagination
        paginationSize: 25,
        paginationSizeSelector: [25, 50, 100], // Page size options
        page: 1, // Initial page number
        // rowHeader:{headerSort:false, rowHandle:true, resizable: false, formatter:"handle"},
        columns: [
            {title: "#", field: "id", formatter: "rownum", headerSort:false,},
            {title: "NAME", field: "name", headerSort:false, headerFilter: "input"},
            {title: "DEPARTMENT", field: "dept", headerSort:false, headerFilter: "input"},
            {title: "POSITION", field: "POSITION", headerSort:false, headerFilter: "input"},
            {title: "JOB TITLE", field: "JOB_TITLE", headerSort:false, headerFilter: "input"},
            {title: "NAMES", field: "a", headerSort:false, headerFilter: "input", formatter: function(cell){
                return '<input type="text" class="getNames" value="'+cell.getValue()+'">';

            }, visible: false, },
            

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
            columnHeaders:true, //do not include column headers in downloaded table
            columnGroups:false, //do not include column groups in column headers for downloaded table
            rowGroups:false, //do not include row groups in downloaded table W
            columnCalcs:false, //do not include column calcs in downloaded table
            dataTree:false, //do not include data tree in downloaded table
        },
    });
    table4.on("rowClick", function(e, row) {
        // Get the row data for the clicked row
        var rowData = row.getData();

        table4.deselectRow(); // Remove highlight from previously clicked row
        row.select();        // Highlight the clicked row: .tabulator-row.tabulator-selected change color css
        

        selectMember(rowData.a);
        // console.log(rowData.user);
       
    });

    /* $.ajax({
        url: '/'+rootFolder+'/getRecords/overall_kpi.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           
        }, 
        dataType: 'json',
        success: function(data) {

            

        },
        error: function(error) {
            alert('Error fetching KPI list data from the database.');
        }
    }); */
}
// EXPORt

// ETO YUNG PARA MAEXPORT NIYA YUNG KPI LIST SA SELECTED USERS 
$("#btnExport").click(function(){
    // table4.download("xlsx", "KPI.xlsx", { sheetName: "Sheet1" });
    var container = document.getElementById("table-all-kpi");
    var rows = container.getElementsByClassName("tabulator-row");
    var year = $("#selectYear").val();
    var dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var name = rows[i].querySelector(".getNames").value;

        dataArray.push({
            name: name,
            nameDesc: setHRISEmployeeName(name),
            dept: setHRISDepartmentCode(setHRISEmployeeDept(name)),
            position: setHRISJobTitle(setHRISEmployeeJobPosition(name)),
            jobtitle: setHRISJobLevel(setHRISEmployeeJobPosition(name)),

        })

    }

    // console.log(dataArray);

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getUserKPIList.php',
        method: "POST",
        data: {
            dataArray: dataArray,
            year: year,
        },
        dataType: 'json',
        success: function(list) {

            list.forEach(item => {

                item.Q1R = (item.Q1R != 0) ? setNumberDecimal(item.Q1R) : "";
                item.Q1S = (item.Q1S != 0) ? setNumberDecimal(item.Q1S) : "";
                item.Q2R = (item.Q2R != 0) ? setNumberDecimal(item.Q2R) : "";
                item.Q2S = (item.Q2S != 0) ? setNumberDecimal(item.Q2S) : "";
                item.Q3R = (item.Q3R != 0) ? setNumberDecimal(item.Q3R) : "";
                item.Q3S = (item.Q3S != 0) ? setNumberDecimal(item.Q3S) : "";
                item.Q4R = (item.Q4R != 0) ? setNumberDecimal(item.Q4R) : "";
                item.Q4S = (item.Q4S != 0) ? setNumberDecimal(item.Q4S) : "";
                item.resultR = (item.resultR != 0) ? setNumberDecimal(item.resultR) : "";
                item.resultS = (item.resultS != 0) ? setNumberDecimal(item.resultS) : "";
            });

            console.log(list);
            
            $("#containerGenerateSelectedKPI").hide();

            table5 = new Tabulator("#table-generate-selected-user-kpi", {
                layout: "fitDataFill", // Adjust table height based on the data
                data: list,
                // rowHeader:{headerSort:false, rowHandle:true, resizable: false, formatter:"handle"},
                columns: [
                    {title: "#", field: "id", formatter: "rownum", headerSort:false,},
                    {title: "NAME", field: "name", headerSort:false, headerFilter: "input"},
                    {title: "DEPARTMENT", field: "dept", headerSort:false, headerFilter: "input"},
                    {title: "POSITION", field: "position", headerSort:false, headerFilter: "input"},
                    {title: "JOB TITLE", field: "jobtitle", headerSort:false, headerFilter: "input"},
                    {title: "KPI DESCRIPTION", field: "c",  width:300, formatter:"textarea", headerSort:false, },
                    {title: "GOAL", field: "f", width:300, headerSort:false, formatter:"textarea",},
                    {title: "WEIGH", field: "d", headerSort:false, formatter:"textarea",},
                    {title: "FORMULA", field: "e", width:300, headerSort:false, formatter:"textarea",},
                    {
                        title:"1ST QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"Q1R", width: 100, formatter: formatterHideScore,},
                        {title:"SCORE", field:"Q1S", width: 100, formatter: formatterHideScore,},
                        {title:"GRADE", field:"Q1G", width: 100, formatter: formatterHideScore,},
                        ],
                    },
                    {
                        title:"2ND QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"Q2R", width: 100, formatter: formatterHideScore,},
                        {title:"SCORE", field:"Q2S", width: 100, formatter: formatterHideScore,},
                        {title:"GRADE", field:"Q2G",  width: 100, formatter: formatterHideScore,},
                        ],
                    },
                    {
                        title:"3RD QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"Q3R",  width: 100, formatter: formatterHideScore,},
                        {title:"SCORE", field:"Q3S",  width: 100, formatter: formatterHideScore,},
                        {title:"GRADE", field:"Q3G",  width: 100, formatter: formatterHideScore,},
                        ],
                    },
                    {
                        title:"4TH QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"Q4R",  width: 100, formatter: formatterHideScore,},
                        {title:"SCORE", field:"Q4S",  width: 100, formatter: formatterHideScore,},
                        {title:"GRADE", field:"Q4G",  width: 100, formatter: formatterHideScore,},
                        ],
                    },
                    {
                        title:"RESULT",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"resultR",  width: 100, formatter: formatterHideScore,},
                        {title:"SCORE", field:"resultS",  width: 100, formatter: formatterHideScore,},
                        {title:"GRADE", field:"resultG", width: 100, formatter: formatterHideScore,},
                        ],
                    },
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
                    columnHeaders:true, //do not include column headers in downloaded table
                    columnGroups:false, //do not include column groups in column headers for downloaded table
                    rowGroups:false, //do not include row groups in downloaded table W
                    columnCalcs:false, //do not include column calcs in downloaded table
                    dataTree:false, //do not include data tree in downloaded table
                },
            });

            setTimeout(() => {
                table5.download("xlsx", "KPI.xlsx", { sheetName: "Sheet1" });
            }, 1000);

        }
    });

});













