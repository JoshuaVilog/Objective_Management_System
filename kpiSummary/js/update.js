
$("#btnOpenModalEdit").click(function(){
    let kpiID = $("#hiddenDisplayKPI").val();
    // let member = $("#selectMember").val();
    // let department = $("#selectDepartment").val();

    let department = $("#hiddenSelectedDepartmentID").val();
    let member = $("#hiddenSelectedEmployeeID").val();


    $("#txtDisplayEditUserFullName").val(setHRISEmployeeName(member));
    $("#txtDisplayEditUserDepartment").val(setHRISDepartment(department));
    $("#hiddenDisplayEditUserDepartment").val(department);
    $("#hiddenDisplayEditUserFullName").val(member);
    $("#displayTotal2").text("100");
    $("#hiddenKPIID").val(kpiID);

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getKpiByID.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           id: kpiID,
        },
        dataType: 'json',
        success: function(data) {
            
            $("#txtEdit1QR").val(data.Q1R);
            $("#txtEdit1QS").val(data.Q1S);
            $("#txtEdit1QG").val(data.Q1G);
            $("#txtEdit2QR").val(data.Q2R);
            $("#txtEdit2QS").val(data.Q2S);
            $("#txtEdit2QG").val(data.Q2G);
            $("#txtEdit3QR").val(data.Q3R);
            $("#txtEdit3QS").val(data.Q3S);
            $("#txtEdit3QG").val(data.Q3G);
            $("#txtEdit4QR").val(data.Q4R);
            $("#txtEdit4QS").val(data.Q4S);
            $("#txtEdit4QG").val(data.Q4G);
            $("#txtEditRR").val(data.RR);
            $("#txtEditRS").val(data.RS);
            $("#txtEditRG").val(data.RG);
            
        },
        error: function(error) {
            alert('Error fetching KPI list data from the database.');
        }
    });
    
    $.ajax({
        url: '/'+rootFolder+'/getRecords/kpi_list.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           id: kpiID,
        },
        dataType: 'json',
        success: function(data) {
            
            data.forEach(function (row) {
                
                noCreateKPI++;

                row.status = "OLD";
                row.id = noCreateKPI;

            });

            table3 = new Tabulator("#table-edit-kpi", {
                layout: "fitDataFill", // Adjust table height based on the data
                movableRows: true, 
                data: data,
                // rowHeader:{headerSort:false, rowHandle:true, resizable: false, formatter:"handle"},
                columns: [
                    {title: "#", formatter: "rownum", headerSort:false, rowHandle:true,headerTooltip: "Drag to reorder",},
                    {title: "ID", field: "id", visible: false},
                    {title: "RID", field: "a", visible: false},
                    {title: "CATEGORY", field: "b", width:300, formatter:formatterEditCategory, headerSort:false , visible: false},
                    {title: "KPI DESCRIPTION", field: "c",  width:300, formatter:formatterEditKPI, headerSort:false, },
                    {title: "GOAL", field: "f", headerSort:false, formatter:formatterEditGoal,},
                    {title: "WEIGH", field: "d", headerSort:false, formatter:formatterEditWeigh,},
                    {title: "FORMULA", field: "e", headerSort:false, formatter:formatterEditFormula,},
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
                    {title: "STATUS", field: "status", headerSort:false, formatter:formatterEditStatus, visible: false},
                    {title: "Action",field: "id", formatter: removeButtonFormatterEdit, hozAlign: "left", frozen: true },
                ],
            });
            
        },
        error: function(error) {
            alert('Error fetching KPI list data from the database.');
        }
    });

    $("#modalEdit").modal("show");
});

function formatterEditCategory(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtCategory");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ b: value });
    });
    
    
    return input;
}
function formatterEditKPI(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtKPIDesc");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ c: value });
    });
    
    
    return input;
}
function formatterEditWeigh(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var qty = cell.getValue();
    
    input.type = "number";
    input.value = qty;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtWeigh");
    input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ d: qty });

        computeTotalWeight()
        
    });
    
    
    return input;
}
function formatterEditGoal(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtGoal");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ f: value });
    });
    
    
    return input;
}
function formatterEditFormula(cell, formatterParams, onRendered){
    var input = document.createElement("textarea");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    // input.type = "text";
    input.value = value;
    input.classList.add("form-control"); // Bootstrap class for styling
    input.classList.add("txtFormula");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        
        cell.getRow().update({ e: value });
    });
    
    
    return input;
}

function formatterEdit1QResult(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt1QResult");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q1R: value });
        
    });
    return input;
}
function formatterEdit1QScore(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt1QScore");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q1S: value });
        
    });
    return input;
}
function formatterEdit1QGrade(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt1QGrade");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q1G: value });
        
    });
    return input;
}


function formatterEdit2QResult(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt2QResult");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q2R: value });
        
    });
    return input;
}
function formatterEdit2QScore(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt2QScore");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q2S: value });
        
    });
    return input;
}
function formatterEdit2QGrade(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt2QGrade");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q2G: value });
        
    });
    return input;
}


function formatterEdit3QResult(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt3QResult");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q3R: value });
        
    });
    return input;
}
function formatterEdit3QScore(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt3QScore");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q3S: value });
        
    });
    return input;
}
function formatterEdit3QGrade(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt3QGrade");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q3G: value });
        
    });
    return input;
}

function formatterEdit4QResult(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt4QResult");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q4R: value });
        
    });
    return input;
}
function formatterEdit4QScore(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt4QScore");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q4S: value });
        
    });
    return input;
}
function formatterEdit4QGrade(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txt4QGrade");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ Q4G: value });
        
    });
    return input;
}

function formatterEditResultResult(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txtResultResult");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ resultR: value });
        
    });
    return input;
}
function formatterEditResultScore(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txtResultScore");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ resultS: value });
        
    });
    return input;
}
function formatterEditResultGrade(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("form-control");
    input.classList.add("txtResultGrade");
    // input.classList.add("txtNumberOnly");

    // Set up an event listener to capture the input value when changed
    input.addEventListener("input", function (event) {
        cell.getRow().update({ resultG: value });
        
    });
    return input;
}


function formatterEditStatus(cell, formatterParams, onRendered){
    var input = document.createElement("input");
    var rowData = cell.getRow().getData();
    var value = cell.getValue();
    
    input.type = "text";
    input.value = value;
    input.classList.add("hiddenStatus");

    return input;
}

function removeButtonFormatterEdit(cell, formatterParams, onRendered) {
    let rowData = cell.getRow().getData();
    let value = cell.getValue();

    let remove = '<button class="btn btn-danger btn-sm btnRemoveItem">Remove</button>';
    let tableID = '<input type="hidden" class="hiddenTableID" value="'+rowData.id+'">';
    let id = '<input type="hidden" class="hiddenID" value="'+rowData.a+'">';

    return remove + " "+ tableID +" " + id;
}

$("#table-edit-kpi").on("click", ".btnRemoveItem", function(){
    let status = $(this).closest(".tabulator-row").find(".hiddenStatus").val();
    let tableID = $(this).closest(".tabulator-row").find(".hiddenTableID").val();
    let id = $(this).closest(".tabulator-row").find(".hiddenID").val();


    if(status == "NEW"){
       table3.deleteRow(tableID)

    } else if(status == "OLD"){
        $(this).closest(".tabulator-row").find(".hiddenStatus").val("REMOVE");
        $(this).closest(".tabulator-row").find(".txtWeigh").val("");
        $(this).closest(".tabulator-row").hide();

        computeTotalWeight2();
    }
    // $(this).closest(".tabulator-row").hide();

})

/// ======================================================================================= ///


function updateKpiList(){
    var container = document.getElementById("table-edit-kpi");
    var rows = container.getElementsByClassName("tabulator-row");
    var dataArray = [];
    let isNull = false;
    let rowCount = 1;

    for (var i = 0; i < rows.length; i++){
        var category = rows[i].querySelector(".txtCategory").value;
        var desc = rows[i].querySelector(".txtKPIDesc").value;
        var weigh = rows[i].querySelector(".txtWeigh").value;
        var status = rows[i].querySelector(".hiddenStatus").value;
        var id = rows[i].querySelector(".hiddenID").value;
        var goal = rows[i].querySelector(".txtGoal").value;
        var formula = rows[i].querySelector(".txtFormula").value;

        var Q1Result = rows[i].querySelector(".txt1QResult").value;
        var Q1Score = rows[i].querySelector(".txt1QScore").value;
        var Q1Grade = rows[i].querySelector(".txt1QGrade").value;
        var Q2Result = rows[i].querySelector(".txt2QResult").value;
        var Q2Score = rows[i].querySelector(".txt2QScore").value;
        var Q2Grade = rows[i].querySelector(".txt2QGrade").value;
        var Q2Result = rows[i].querySelector(".txt2QResult").value;
        var Q2Score = rows[i].querySelector(".txt2QScore").value;
        var Q2Grade = rows[i].querySelector(".txt2QGrade").value;
        var Q3Result = rows[i].querySelector(".txt3QResult").value;
        var Q3Score = rows[i].querySelector(".txt3QScore").value;
        var Q3Grade = rows[i].querySelector(".txt3QGrade").value;
        var Q4Result = rows[i].querySelector(".txt4QResult").value;
        var Q4Score = rows[i].querySelector(".txt4QScore").value;
        var Q4Grade = rows[i].querySelector(".txt4QGrade").value;
        var resultResult = rows[i].querySelector(".txtResultResult").value;
        var resultScore = rows[i].querySelector(".txtResultScore").value;
        var resultGrade = rows[i].querySelector(".txtResultGrade").value;
        
        dataArray.push({
            category:category,
            desc:desc,
            weigh: weigh,
            goal: goal,
            formula: formula,
            rowCount:rowCount,
            status: status,
            id: id,
            
            Q1Result: Q1Result,
            Q1Score: Q1Score,
            Q1Grade: Q1Grade,
            Q2Result: Q2Result,
            Q2Score: Q2Score,
            Q2Grade: Q2Grade,
            Q3Result: Q3Result,
            Q3Score: Q3Score,
            Q3Grade: Q3Grade,
            Q4Result: Q4Result,
            Q4Score: Q4Score,
            Q4Grade: Q4Grade,
            resultResult: resultResult,
            resultScore: resultScore,
            resultGrade: resultGrade,

        });

        if((desc == "" || weigh == "") && status != "REMOVE"){
            isNull = true;
        }

        rowCount++
    }
    
    if(isNull == true){
        return "null";
    } else {
        return dataArray;
    }

}

$("#btnUpdateKPI").click(function(){
    
    let department = $("#hiddenDisplayUserDepartment").val();
    let user = $("#hiddenDisplayEditUserFullName").val();
    let id = $("#hiddenKPIID").val();

    let Q1R = $("#txtEdit1QR").val();
    let Q1S = $("#txtEdit1QS").val();
    let Q1G = $("#txtEdit1QG").val();
    let Q2R = $("#txtEdit2QR").val();
    let Q2S = $("#txtEdit2QS").val();
    let Q2G = $("#txtEdit2QG").val();
    let Q3R = $("#txtEdit3QR").val();
    let Q3S = $("#txtEdit3QS").val();
    let Q3G = $("#txtEdit3QG").val();
    let Q4R = $("#txtEdit4QR").val();
    let Q4S = $("#txtEdit4QS").val();
    let Q4G = $("#txtEdit4QG").val();
    let RR = $("#txtEditRR").val();
    let RS = $("#txtEditRS").val();
    let RG = $("#txtEditRG").val();

    var container = document.getElementById("table-edit-kpi");
    var rows = container.getElementsByClassName("tabulator-row");
    var totalWeigh = $("#displayTotal2").text();
    
    if(rows.length == 0){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up all the information',
            icon: 'warning'
        })
    } else {
        let sendData = {
            department: department,
            user: user,
            kpiList: updateKpiList(),
            userCode: userCode,
            id:id,
            // head: head,
            // manager:manager,
            // od:od,
            // pd:pd,
            Q1R: Q1R,
            Q1S: Q1S,
            Q1G: Q1G,
            Q2R: Q2R,
            Q2S: Q2S,
            Q2G: Q2G,
            Q3R: Q3R,
            Q3S: Q3S,
            Q3G: Q3G,
            Q4R: Q4R,
            Q4S: Q4S,
            Q4G: Q4G,
            RR: RR,
            RS: RS,
            RG: RG,

        };

        if(totalWeigh != "100"){
            Swal.fire({
                title: 'Invalid!',
                text: 'The total Weigh is not accurate. Please make sure to make it total to 100.',
                icon: 'warning'
            })
        } else {
            if(updateKpiList() == "null"){
                Swal.fire({
                    title: 'Invalid!',
                    text: 'Some in KPI description are blank.',
                    icon: 'warning'
                })
            } else {
                console.log(sendData)
                
                $.ajax({
                    url: "ajax/updateKPI.php",
                    method: "POST",
                    data: JSON.stringify(sendData),
                    success: function(response) {
                        console.log(response);

                        noCreateKPI = 1;
                        $("#modalEdit").modal("hide");
                        displayTable2(user)
                        
                        
                    }
                });
                
                
            }
        }
    }
});












