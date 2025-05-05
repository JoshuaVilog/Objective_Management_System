// let lsJobLevelList = "hris_job_level_list";
// let lsJobPositionList = "hris_job_position_list";
// let lsEmployeeList = "hris_employee_list";

// getJobLevel()
// getJobPosition()
// getEmployee()


let kpiID = urlParams.get('kpiID');

if(kpiID == null || kpiID == "null" || kpiID == ""){
    // console.log("No KPI ID!");
    window.close()

} else {
    // console.log(kpiID); 
    
    setTimeout(() => {
        getUserKPI(kpiID)
        addRow(kpiID)
    }, 500);

    setTimeout(() => {
        // window.print();
        tableToExcel("containerKPI", "TestingFile")
    }, 2000);
}

// CODE TO HIDE INDEX URL // MERON NA PALA CODE NETO
// window.history.replaceState({}, document.title, window.location.pathname);

// ===================================================== //
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,' , template = '<!DOCTYPE html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/html40"><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><style type="text/css"> .border-black{ border: 0.5px solid black; font-family:"Tahoma";} .okrHeader td{ background-color: #808080; font-family:"Tahoma"; border: 0.5px solid black; color:white; } .okrFooter td{ background-color: #808080; border: 0.5px solid black; color: white; font-family:"Tahoma"; } .trMain td{ min-width: 100px; max-width:100px; font-family:"Tahoma";} table { table-layout: fixed; font-family:"Tahoma";} #tbody-kpi-list td{font-size: clamp(10px, 1vw, 16px); text-align: center; }</style><body><div>{table}</div></body></html>', base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s))) 
    }, format = function(s, c) { 
        return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) 
    }

    return function(table, name) {
    if (!table.nodeType) 
        table = document.getElementById(table)
        const date = new Date();
        var datetime = date.getFullYear()+'_'+("0"+date.getMonth()+1).slice(-2)+'_'+("0"+date.getDate()).slice(-2)+'_'+date.getHours()+'_'+date.getMinutes()+'_'+("0" + date.getSeconds()).slice(-2);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        const element = window.document.createElement('a');
        // window.location.href = uri + base64(format(template, ctx))
        element.href = uri + base64(format(template, ctx),);
        // dito ka mag lagay ng custom name ng excel, okay? huh. hotdog.
        element.download = "OKR_"+datetime;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
})();





/// ========================================================= ///

function getUserKPI(kpiID){
    $.ajax({
        url: '/'+rootFolder+'/getRecords/getKpiByID.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
           id: kpiID,
        },
        dataType: 'json',
        success: function(data) {
            console.log(data);

            // let userList = JSON.parse(localStorage.getItem(lsUserList));
            // let employeeList = JSON.parse(localStorage.getItem(lsEmployeeList));
            // let positionList = JSON.parse(localStorage.getItem(lsJobPositionList));
            // let joblevelList = JSON.parse(localStorage.getItem(lsJobLevelList));

            // var result = userList.find(function(value){
            //     return value.a === data.c;
            // });
            // var employee = employeeList.find(function(value){
            //     return value.a === result.g;
            // });
            // var position = positionList.find(function(value){
            //     return value.a === employee.d;
            // });
            // var joblevel = joblevelList.find(function(value){
            //     return value.a === position.c;
            // });

            $("#tdDisplayDepartment").text(setHRISDepartment(data.b));
            $("#tdDisplayName").text(setHRISEmployeeName(data.c));
            $("#tdDisplayPosition").text(setHRISJobTitle(setHRISEmployeeJobPosition(data.c)));
            $("#tdDisplayJobTitle").text(setHRISJobLevel(setHRISEmployeeJobPosition(data.c)));
            $("#tdDisplayDateOfStart").text(setHRISEmployeeDateHired(data.c));
            $("#tdDisplayServiceTenure").text(calculateYearsOfService(setHRISEmployeeDateHired(data.c)));


            // $("#tdDisplay1QR").text(data.Q1R);
            $("#tdDisplay1QS").text(data.Q1S);
            $("#tdDisplay1QG").text(data.Q1G);
            // $("#tdDisplay2QR").text(data.Q2R);
            $("#tdDisplay2QS").text(data.Q2S);
            $("#tdDisplay2QG").text(data.Q2G);
            // $("#tdDisplay3QR").text(data.Q3R);
            $("#tdDisplay3QS").text(data.Q3S);
            $("#tdDisplay3QG").text(data.Q3G);
            // $("#tdDisplay4QR").text(data.Q4R);
            $("#tdDisplay4QS").text(data.Q4S);
            $("#tdDisplay4QG").text(data.Q4G);
            // $("#tdDisplayRR").text(data.RR);
            $("#tdDisplayRS").text(data.RS);
            $("#tdDisplayRG").text(data.RG);
        },
        error: function(error) {
            alert('Error fetching get KPI data from the database.');
        }
    });

}

function addRow(id){

    $.ajax({
        url: '/'+rootFolder+'/getRecords/kpi_list.php',
        method: "POST",
        data:{
            id: id
        },
        success: function(list) {
            console.log(list);

            let no = 1;
            let container = $("#tbody-kpi-list");
            let element = '';

            const tableBody = document.querySelector("#tbody-kpi-list");
            let lastObjective = "";
            let objNo = 0;
            let keyNo = 1;

            list.forEach((item, index) => {
                let objectiveDesc = item.c;
                let keyResultDesc = item.f;
                let weighDesc = item.d;
                let formulaDesc = item.e;
                let Q1R = item.Q1R;
                let Q1S = item.Q1S;
                let Q1G = item.Q1G;
                let Q2R = item.Q2R;
                let Q2S = item.Q2S;
                let Q2G = item.Q2G;
                let Q3R = item.Q3R;
                let Q3S = item.Q3S;
                let Q3G = item.Q3G;
                let Q4R = item.Q4R;
                let Q4S = item.Q4S;
                let Q4G = item.Q4G;
                let resultR = item.resultR;
                let resultS = item.resultS;
                let resultG = item.resultG;
                let lastS = item.lastS;
                let lastG = item.lastG;

                const row = document.createElement("tr");
                row.style.height = "40px"; // Set height to 30px

                // Merge OBJECTIVE cells only when the objective changes
                if (objectiveDesc !== lastObjective) {
                    objNo = objNo + 1;

                    let elemObjNo = document.createElement("td");
                    elemObjNo.textContent = objNo;
                    elemObjNo.className = "border-black";
                    elemObjNo.rowSpan = list.filter(d => d.c === objectiveDesc).length;
                    row.appendChild(elemObjNo);

                    let elemObjDesc = document.createElement("td");
                    elemObjDesc.textContent = objectiveDesc;
                    elemObjDesc.className = "border-black";
                    elemObjDesc.rowSpan = list.filter(d => d.c === objectiveDesc).length;
                    elemObjDesc.colSpan = 6;
                    row.appendChild(elemObjDesc);

                    keyNo = 1;
                    lastObjective = objectiveDesc;
                }

                const elemKeyResultNo = document.createElement("td");
                elemKeyResultNo.textContent = keyNo;
                elemKeyResultNo.className = "border-black";
                row.appendChild(elemKeyResultNo);

                const elemKeyResultCell = document.createElement("td");
                elemKeyResultCell.textContent = keyResultDesc;
                elemKeyResultCell.className = "border-black";
                elemKeyResultCell.colSpan = 6;
                row.appendChild(elemKeyResultCell);

                const elemWeigh = document.createElement("td");
                elemWeigh.textContent = weighDesc;
                elemWeigh.className = "border-black";
                row.appendChild(elemWeigh);

                const elemFormula = document.createElement("td");
                elemFormula.textContent = formulaDesc;
                elemFormula.className = "border-black";
                elemFormula.colSpan = 3;
                row.appendChild(elemFormula);

                const elemlastS = document.createElement("td");
                elemlastS.textContent = lastS;
                elemlastS.className = "border-black";
                row.appendChild(elemlastS);

                const elemlastG = document.createElement("td");
                elemlastG.textContent = lastG;
                elemlastG.className = "border-black";
                row.appendChild(elemlastG);

                const elemQ1R = document.createElement("td");
                elemQ1R.textContent = Q1R;
                elemQ1R.className = "border-black";
                row.appendChild(elemQ1R);

                const elemQ1S = document.createElement("td");
                elemQ1S.textContent = Q1S;
                elemQ1S.className = "border-black";
                row.appendChild(elemQ1S);

                const elemQ1G = document.createElement("td");
                elemQ1G.textContent = Q1G;
                elemQ1G.className = "border-black";
                row.appendChild(elemQ1G);
                
                const elemQ2R = document.createElement("td");
                elemQ2R.textContent = Q2R;
                elemQ2R.className = "border-black";
                row.appendChild(elemQ2R);

                const elemQ2S = document.createElement("td");
                elemQ2S.textContent = Q2S;
                elemQ2S.className = "border-black";
                row.appendChild(elemQ2S);

                const elemQ2G = document.createElement("td");
                elemQ2G.textContent = Q2G;
                elemQ2G.className = "border-black";
                row.appendChild(elemQ2G);

                const elemQ3R = document.createElement("td");
                elemQ3R.textContent = Q3R;
                elemQ3R.className = "border-black";
                row.appendChild(elemQ3R);

                const elemQ3S = document.createElement("td");
                elemQ3S.textContent = Q3S;
                elemQ3S.className = "border-black";
                row.appendChild(elemQ3S);

                const elemQ3G = document.createElement("td");
                elemQ3G.textContent = Q3G;
                elemQ3G.className = "border-black";
                row.appendChild(elemQ3G);

                const elemQ4R = document.createElement("td");
                elemQ4R.textContent = Q4R;
                elemQ4R.className = "border-black";
                row.appendChild(elemQ4R);

                const elemQ4S = document.createElement("td");
                elemQ4S.textContent = Q4S;
                elemQ4S.className = "border-black";
                row.appendChild(elemQ4S);

                const elemQ4G = document.createElement("td");
                elemQ4G.textContent = Q4G;
                elemQ4G.className = "border-black";
                row.appendChild(elemQ4G);

                const elemresultR = document.createElement("td");
                elemresultR.textContent = resultR;
                elemresultR.className = "border-black";
                row.appendChild(elemresultR);

                const elemresultS = document.createElement("td");
                elemresultS.textContent = resultS;
                elemresultS.className = "border-black";
                row.appendChild(elemresultS);

                const elemresultG = document.createElement("td");
                elemresultG.textContent = resultG;
                elemresultG.className = "border-black";
                row.appendChild(elemresultG);

                const elemDocs = document.createElement("td");
                elemDocs.textContent = "";
                elemDocs.className = "border-black";
                row.appendChild(elemDocs);

                const elemFinal = document.createElement("td");
                elemFinal.textContent = "";
                elemFinal.className = "border-black";
                row.appendChild(elemFinal);







                keyNo++;
                tableBody.appendChild(row);
            });

/* 
            for(let index = 0; index < list.length; index++){
                // element += '<tr> <td class="center">'+no+'</td> <td>'+list[index].c+'</td> <td>'+list[index].f+'</td> <td class="center">'+list[index].d+'</td> <td>'+list[index].e+'</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>';
                //element += '<tr> <td class="center">'+no+'</td> <td>'+list[index].c+'</td> <td>'+list[index].f+'</td> <td class="center">'+list[index].d+'</td> <td>'+list[index].e+'</td> <td>'+list[index].Q1R+'</td> <td>'+list[index].Q1S+'</td> <td>'+list[index].Q1G+'</td> <td>'+list[index].Q2R+'</td> <td>'+list[index].Q2S+'</td> <td>'+list[index].Q2G+'</td> <td>'+list[index].Q3R+'</td> <td>'+list[index].Q3S+'</td> <td>'+list[index].Q3G+'</td> <td>'+list[index].Q4R+'</td> <td>'+list[index].Q4S+'</td> <td>'+list[index].Q4G+'</td> <td>'+list[index].resultR+'</td> <td>'+list[index].resultS+'</td> <td>'+list[index].resultG+'</td> </tr>';



                no++;
            }
            
            container.html(element) */



            
        }
    });
}


/* 
function getJobLevel(){

    $.ajax({
        url: 'ajax/job_level.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsJobLevelList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getJobPosition(){

    $.ajax({
        url: 'ajax/job_position.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsJobPositionList, JSON.stringify(list));
            // console.log(list);
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
function getEmployee(){

    $.ajax({
        url: 'ajax/employee.php', // Replace with your server-side script URL
        type: 'POST',
        dataType: 'json',
        success: function(list) {
            localStorage.setItem(lsEmployeeList, JSON.stringify(list));
            console.log(list);
        },
        error: function(error) {
            alert('Error fetching employee data from the database.');
        }
    });
}
 */

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


