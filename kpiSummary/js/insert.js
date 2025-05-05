

$("#btnSubmit").click(function(){
    
    let department = $("#hiddenDisplayUserDepartment").val();
    let user = $("#hiddenDisplayUserFullName").val();
    // let head = $("#selectHead").val();
    // let manager = $("#selectManager").val();
    // let od = $("#selectOD").val();
    // let pd = $("#selectPD").val();
    let Q1R = $("#txtAdd1QR").val();
    let Q1S = $("#txtAdd1QS").val();
    let Q1G = $("#txtAdd1QG").val();
    let Q2R = $("#txtAdd2QR").val();
    let Q2S = $("#txtAdd2QS").val();
    let Q2G = $("#txtAdd2QG").val();
    let Q3R = $("#txtAdd3QR").val();
    let Q3S = $("#txtAdd3QS").val();
    let Q3G = $("#txtAdd3QG").val();
    let Q4R = $("#txtAdd4QR").val();
    let Q4S = $("#txtAdd4QS").val();
    let Q4G = $("#txtAdd4QG").val();
    let RR = $("#txtAddRR").val();
    let RS = $("#txtAddRS").val();
    let RG = $("#txtAddRG").val();

    var container = document.getElementById("table-create-kpi");
    var rows = container.getElementsByClassName("tabulator-row");
    var totalWeigh = $("#displayTotal1").text();
    
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
            kpiList: insertKpiList(),
            userCode: userCode,
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
            if(insertKpiList() == "null"){
                Swal.fire({
                    title: 'Invalid!',
                    text: 'Some in KPI description are blank.',
                    icon: 'warning'
                })
            } else {
                console.log(sendData)
                
                $.ajax({
                    url: "ajax/insert.php",
                    method: "POST",
                    data: JSON.stringify(sendData),
                    success: function(response) {
                        console.log(response);

                        noCreateKPI = 1;
                        $("#modalAdd").modal("hide");

                        displayTable2(user)
                        $("#kpiContainer1").hide();
                        $("#kpiContainer2").show();
                        
                        // if(response == "duplicate"){
                        //     Swal.fire({
                        //         title: 'Duplicate Description!',
                        //         text: 'Please fill up another description.',
                        //         icon: 'warning'
                        //     })
                        // } else {
                        //     Swal.fire({
                        //         title: 'Record Added Successfully!',
                        //         text: 'Proceed to Record Page!',
                        //         icon: 'success',
                        //         confirmButtonColor: '#3085d6',
                        //         confirmButtonText: 'Proceed!'
                        //         }).then((result) => {
                        //         if (result.isConfirmed) {
                        //             window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                        //         }
                        //         window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                        //     })
                        // }
                        
                    }
                });
                
                
            }
        }
    }
});

function insertKpiList(){
    var container = document.getElementById("table-create-kpi");
    var rows = container.getElementsByClassName("tabulator-row");
    var dataArray = [];
    let isNull = false;
    let rowCount = 1;

    for (var i = 0; i < rows.length; i++){
        var category = rows[i].querySelector(".txtCategory").value;
        var desc = rows[i].querySelector(".txtKPIDesc").value;
        var weigh = rows[i].querySelector(".txtWeigh").value;
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

        if(desc == "" || weigh == ""){
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

$("#btnUploadExcel").click(function(){
    let fileInput = document.getElementById('fileUploadExcel');
    let file = fileInput.files[0];

    if (file) {
        let formData = new FormData();
        formData.append('excelFile', file);

        $.ajax({
            type: 'POST',
            url: 'ajax/import.php',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {

                console.log(data);
                
                let dataArray = [];

                // noCreateKPI = noCreateKPI;

                data.forEach(function(value) {
                    noCreateKPI++;

                    var newRowData = {
                        // a: value[0],

                        category:"", // WALA KWINTA
                        id: noCreateKPI,
                        d: noCreateKPI,
                        b: (value[0] != undefined) ? value[0] : "",
                        e: (value[1] != undefined) ? value[1] : "",
                        c: (value[2] != undefined) ? value[2] : "",
                        f: (value[3] != undefined) ? value[3] : "",

                        Q1R: (value[4] != undefined) ? identifyValueType(value[4]) : "",
                        Q1S: (value[5] != undefined) ? identifyValueType(value[5]) : "",
                        Q1G: (value[6] != undefined) ? identifyValueType(value[6]) : "",
                        Q2R: (value[7] != undefined) ? identifyValueType(value[7]) : "",
                        Q2S: (value[8] != undefined) ? identifyValueType(value[8]) : "",
                        Q2G: (value[9] != undefined) ? identifyValueType(value[9]) : "",
                        Q3R: (value[10] != undefined) ? identifyValueType(value[10]) : "",
                        Q3S: (value[11] != undefined) ? identifyValueType(value[11]) : "",
                        Q3G: (value[12] != undefined) ? identifyValueType(value[12]) : "",
                        Q4R: (value[13] != undefined) ? identifyValueType(value[13]) : "",
                        Q4S: (value[14] != undefined) ? identifyValueType(value[14]) : "",
                        Q4G: (value[15] != undefined) ? identifyValueType(value[15]) : "",
                        resultR: (value[16] != undefined) ? identifyValueType(value[16]) : "",
                        resultS: (value[17] != undefined) ? identifyValueType(value[17]) : "",
                        resultG: (value[18] != undefined) ? identifyValueType(value[18]) : "",

                        // id: rowCounter++,
                        // d:"",
                    };
                    dataArray.push(newRowData);

                    
                });

                table1.addData(dataArray);
                
                computeTotalWeight()
                $("#fileInput").val("");

            },
            error: function(response) {
                alert('Error uploading file.');
                console.log(response);
            }
        });
    }
});

function identifyValueType(value) {
    if (typeof value === "number") {
        return value.toFixed(2);
    } else if (typeof value === "string") {
        return value;
    } else {
    	return value;
    }
}
$('#fileUploadAttachment').change(function(){
    var files = $(this)[0].files;

    if (files.length > 0) {
        $("#btnUploadAttachment").prop("disabled", false);
       
    } else {
        $("#btnUploadAttachment").prop("disabled", true);
    }
});

$("#btnUploadAttachment").click(function(){
    var files = $('#fileUploadAttachment')[0].files;
    var kpiListID = $("#hiddenKPIListID").val();

    if (files.length > 0) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        formData.append('rootFolder', rootFolder);
        formData.append('userCode', userCode);
        formData.append('kpiListID', kpiListID);
        
        $.ajax({
            url: 'ajax/insertKpiListFiles.php', // URL to your PHP script
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                $("#btnUploadAttachment").prop("disabled", true);
                $('#fileUploadAttachment').val("");
                
                displayFileAttachments(kpiListID);
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error(xhr);
            }
        });
        

        console.log("UPLOADED");
        
       
    } else {
        console.log("NOT UPLOADED");
    }
    
});