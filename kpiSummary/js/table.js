
// let table;
//////////////////////////////////////////////////////////
let list = JSON.parse(localStorage.getItem(lsYearList));
var options = '<option value="">-Select-</option>';
let activeYear = JSON.parse(localStorage.getItem(lsActiveYear)).RID;

for (var i = 0; i < list.length; i++) {
    let selected = "";
    if(activeYear != undefined){
        selected = (list[i].a == activeYear)? "selected": "";
    }
    options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
}
$('#selectYearOKRSummary').html(options);


$("#selectYearOKRSummary").change(function(){
    let year = $(this).val();

    displayKPISummary(year);
    generateTable(year);

});

displayKPISummary(activeYear)
generateTable(activeYear)

function generateTable(year){

    $.ajax({
        url: '/'+rootFolder+'/getRecords/overall_kpi.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           year: year
        },
        dataType: 'json',
        success: function(data) {
    
            data.forEach(item => {
                let userID = item.user;
    
                item.name = setHRISEmployeeName(userID);
                item.dept = setHRISDepartment(item.dept);
    
                item.DATE_HIRED = setHRISEmployeeDateHired(userID);
                item.RFID = setHRISRFID(userID);
                item.SERVICE_TENURE = calculateYearsOfService(setHRISEmployeeDateHired(userID));
                item.COMPANY = setHRISCompany(setHRISEmployeeCompany(userID));
                item.POSITION = setHRISJobTitle(setHRISEmployeeJobPosition(userID));
                item.JOB_TITLE = setHRISJobLevel(setHRISEmployeeJobPosition(userID));
    
                item.e1 = (item.e1 == "" || item.e1 == null) ? "" : setHRISEmployeeFName(item.e1);
                item.e2 = (item.e2 == "" || item.e2 == null) ? "" : setHRISEmployeeFName(item.e2);
                // item.e3 = (item.e3 == "" || item.e3 == null) ? "" : item.e3;
                // item.e4 = (item.e4 == "" || item.e4 == null) ? "" : item.e4;

                item.e3 = "KR";
                item.e4 = "PD";

                item.fqs = setNumberDecimal(item.fqs); 
                // item.fqg = setNumberDecimal(item.fqg); 
    
            });
    
            // console.log(data);
    
            table = new Tabulator("#table-records", {
                layout: "fitDataFill", // Adjust table height based on the data
                data: data,
                pagination: "local", // Enable local pagination
                paginationSize: 25,
                paginationSizeSelector: [25, 50, 100], // Page size options
                page: 1, // Initial page number
                columns: [
                    {title: "#", field: "id", formatter: "rownum", headerSort:false,},
                    {title: "RFID", field: "RFID", headerSort:false, headerFilter: "input"},
                    {title: "NAME", field: "name", headerSort:false, headerFilter: "input"},
                    {title: "DATE OF START", field: "DATE_HIRED", headerSort:false, headerFilter: "input"},
                    {title: "SERVICE TENURE", field: "SERVICE_TENURE", headerSort:false, headerFilter: "input"},
                    {title: "COMPANY", field: "COMPANY", headerSort:false, headerFilter: "input"},
                    {title: "DEPARTMENT", field: "dept", headerSort:false, headerFilter: "input"},
                    {title: "POSITION", field: "POSITION", headerSort:false, headerFilter: "input"},
                    {title: "JOB TITLE", field: "JOB_TITLE", headerSort:false, headerFilter: "input"},
                    {title: "FUNCTION", field: "", headerSort:false, headerFilter: "input"},
                    {
                        title:"1ST QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"SCORE", field:"qs1", width: 100},
                        {title:"GRADE", field:"qg1", width: 100},
                        ],
                    },
                    {
                        title:"2ND QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"SCORE", field:"qs2", width: 100},
                        {title:"GRADE", field:"qg2",  width: 100},
                        ],
                    },
                    {
                        title:"3RD QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"SCORE", field:"qs3",  width: 100},
                        {title:"GRADE", field:"qg3",  width: 100},
                        ],
                    },
                    {
                        title:"4TH QUARTER",
                        hozAlign:"center",
                        columns:[
                        {title:"SCORE", field:"qs4",  width: 100},
                        {title:"GRADE", field:"qg4",  width: 100},
                        ],
                    },
                    {
                        title:"SELF EVALUATION",
                        hozAlign:"center",
                        columns:[
                        {title:"RESULT", field:"",  width: 100},
                        {title:"SCORE", field:"",  width: 100},
                        {title:"GRADE", field:"", width: 100},
                        ],
                    },
                    {
                        title:"GROSS RESULT",
                        hozAlign:"center",
                        columns:[
                        {title:"SCORE", field:"fqs",  width: 100, },
                        {title:"GRADE", field:"fqg", width: 100},
                        ],
                    },
                    {
                        title:"EVALUATOR",
                        hozAlign:"center",
                        columns:[
                        {title:"1", field:"e1",  width: 100, },
                        {title:"2", field:"e2",  width: 100, },
                        {title:"3", field:"e3",  width: 100, },
                        {title:"4", field:"e4",  width: 100, },
                        ],
                    },
                    // {title: "Action",field: "a", hozAlign: "left", headerSort:false, formatter: formatterDisplayAction, frozen: true, },
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
                    columnGroups:true, //do not include column groups in column headers for downloaded table
                    rowGroups:false, //do not include row groups in downloaded table W
                    columnCalcs:false, //do not include column calcs in downloaded table
                    dataTree:false, //do not include data tree in downloaded table
                },
            });

            table.on("rowClick", function(e, row) {
                // Get the row data for the clicked row
                var rowData = row.getData();
        
                table.deselectRow(); // Remove highlight from previously clicked row
                row.select();        // Highlight the clicked row: .tabulator-row.tabulator-selected change color css
                
                // console.log(rowData.rid);
                console.log(rowData.user);
                displayUserKPI(rowData.user)
                $("#modalView").modal("show");
               
            });
        },
        error: function(error) {
            alert('Error fetching KPI list data from the databaseeeeeeeeeeeeee.');
        }
    });
}
$("#btnExport").click(function(){
    table.download("xlsx", "KPI List.xlsx", { sheetName: "Sheet1" });
});

function formatterEval1(cell){
    let value = cell.getValue();

    // cell.getElement().style.backgroundColor = "#FFFFFF";
    if(value == "" || value == null){
        return "";
    } else {
        return value; 
    }

}
function formatterEval2(cell){
    let value = cell.getValue();

    // cell.getElement().style.backgroundColor = "#FFFFFF";
    if(value == "" || value == null){
        return "";
    } else {
        return value; 
    }
    
}
function formatterEval3(cell){
    let value = cell.getValue();

    // cell.getElement().style.backgroundColor = "#FFFFFF";
    if(value == "" || value == null){
        return "";
    } else {
        return value; 
    }
    
}
function formatterEval4(cell){
    let value = cell.getValue();

    // cell.getElement().style.backgroundColor = "#FFFFFF";
    if(value == "" || value == null){
        return "";
    } else {
        return value; 
    }
    
}


function calculateYearsOfService(date_hired) {

    if (!date_hired || date_hired == '' || date_hired === '0000-00-00') {
        return '';
    }

    let today = new Date();
    let dateHired = new Date(date_hired);
    let years = today.getFullYear() - dateHired.getFullYear();
    let monthDiff = today.getMonth() - dateHired.getMonth();
    let daysDiff = today.getDate() - dateHired.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateHired.getDate())) {
        years--;
        monthDiff += 12; // Add 12 months to the month difference
    }

    if (daysDiff < 0) {
        monthDiff--; // Subtract 1 month from the month difference
        // Calculate the correct number of days in the current month
        let lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        daysDiff = lastDayOfPrevMonth - dateHired.getDate() + today.getDate();
    }

    // return years + ' years, ' + monthDiff + ' months, ' + daysDiff + ' days';

    let yearDisplay = '';
    let monthDisplay = '';
    let dayDisplay = '';


    if (years <= 0) {
        yearDisplay = '';
    } else if (years == 1) { 
        yearDisplay = years + ' YEAR, ';
    } else {
        yearDisplay = years + ' YEARS, ';
    }

    if (monthDiff <= 0) {
        monthDisplay = '';
    } else if (monthDiff == 1) { 
        monthDisplay = monthDiff + ' MONTH, ';
    } else {
        monthDisplay = monthDiff + ' MONTHS, ';
    }

    if (daysDiff <= 0) {
        dayDisplay = '';
    } else if (daysDiff == 1) { 
        dayDisplay = daysDiff + ' DAY';
    } else {
        dayDisplay = daysDiff + ' DAYS';
    }

    return yearDisplay + monthDisplay + dayDisplay;
}





function displayKPISummary(year){
    $.ajax({
        url: '/'+rootFolder+'/getRecords/overall_kpi.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           year: year,
        },
        dataType: 'json',
        success: function(data) {

            let countEval = data.reduce((acc, curr) => {
                if (!acc[curr.dept]) {
                    acc[curr.dept] = { EVAL: 0, NOT: 0 }; // Initialize counts
                }
                if (curr.fqs != "" && curr.fqg != "") {
                    acc[curr.dept].EVAL++; // Increment EVALUATED if grade is not empty
                } else {
                    acc[curr.dept].NOT++; // Increment NOT_YET_EVALUATED if grade is empty
                }
                return acc;
            }, {});

            // console.log(countEval);

            let emplist = JSON.parse(localStorage.getItem(lsHRISEmployeeList));

            let countByDept = emplist.reduce((acc, curr) => {
                if (!acc[curr.e]) {
                    acc[curr.e] = acc[curr.e]; // Initialize counts
                }

                // acc[curr.e] = (acc[curr.e] || 0) + 1; // Increment count for the department
                if(curr.g == "1"){
                    acc[curr.e] = (acc[curr.e] || 0) + 1; // Increment count for the department
                }
                return acc;
            }, {});

            // console.log(countByDept);

            let result = Object.keys(countByDept).map(dept => {
                return {
                    dept: setHRISDepartmentCode(dept), // Convert dept to number for consistency
                    TOTALNUM: countByDept[dept],
                    EVAL: countEval[dept]?.EVAL || 0, // Default to 0 if not present
                    NOT: parseInt(countByDept[dept]) - parseInt(countEval[dept]?.EVAL || 0),
                    // NOT: countEval[dept]?.NOT || 0,   // Default to 0 if not present // DI KO MUNA NILAGAY TO KASE NAGKAKA ERROR
                };
            });
            
            console.log(result);

            table2 = new Tabulator("#table-kpi-summary", {
                data: result,
                layout: "fitDataFill", // Adjust table height based on the data
                columns: [
                    {title: "Department", field: "dept", headerFilter: "input"},
                    {title: "Manpower", field: "TOTALNUM", bottomCalc: commaSumFormatter},
                    {title: "Evaluated", field: "EVAL", bottomCalc: commaSumFormatter},
                    {title: "Not Yet Evaluated", field: "NOT", bottomCalc: commaSumFormatter},
                    
                ],
                downloadConfig: {
                    csv: true, // Enable CSV export
                    excel: true, // Enable Excel export
                    json: true, // Enable JSON export
                    pdf: true, // Enable PDF export
                },
            });
            
            
           /*  for (let dept in countByDept) {
                console.log(`${dept} => ${countByDept[dept]}`);


            }
            */
        },
        error: function(error) {
            alert('Error fetching KPI list data from the database.');
        }
    });
}
$("#btnExport2").click(function(){
    table2.download("xlsx", "KPI Summary.xlsx", { sheetName: "Sheet1" });
});
function commaSumFormatter(values, data, calcParams){
    var calc = 0;

    values.forEach(function(value){
        calc += value;
    });

    return calc.toLocaleString();
}

/* 
[
    1:{}
]

 */


function displayUserKPI(user){

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
                            // {title: "Action",field: "a", hozAlign: "left", headerSort:false, formatter: formatterDisplayAction, frozen: true, },
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








