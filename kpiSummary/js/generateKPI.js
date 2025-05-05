// let lsJobLevelList = "hris_job_level_list";
// let lsJobPositionList = "hris_job_position_list";
// let lsEmployeeList = "hris_employee_list";

// getJobLevel()
// getJobPosition()
// getEmployee()


let kpiID = urlParams.get('kpiID');

if(kpiID == null || kpiID == "null" || kpiID == ""){
    console.log("No KPI ID!");
    window.close()

} else {
    // console.log(kpiID);
    
    setTimeout(() => {
        getUserKPI(kpiID)
        addRow(kpiID)
    }, 500);

    setTimeout(() => {
        window.print();
    }, 1000);
}

// CODE TO HIDE INDEX URL // MERON NA PALA CODE NETO
// window.history.replaceState({}, document.title, window.location.pathname);



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
            // console.log(list);
            let no = 1;
            let container = $("#tbody-kpi-list");
            let element = '';

            for(let index = 0; index < list.length; index++){
                // element += '<tr> <td class="center">'+no+'</td> <td>'+list[index].c+'</td> <td>'+list[index].f+'</td> <td class="center">'+list[index].d+'</td> <td>'+list[index].e+'</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>';
                element += '<tr> <td class="center">'+no+'</td> <td>'+list[index].c+'</td> <td>'+list[index].f+'</td> <td class="center">'+list[index].d+'</td> <td>'+list[index].e+'</td> <td>'+list[index].Q1R+'</td> <td>'+list[index].Q1S+'</td> <td>'+list[index].Q1G+'</td> <td>'+list[index].Q2R+'</td> <td>'+list[index].Q2S+'</td> <td>'+list[index].Q2G+'</td> <td>'+list[index].Q3R+'</td> <td>'+list[index].Q3S+'</td> <td>'+list[index].Q3G+'</td> <td>'+list[index].Q4R+'</td> <td>'+list[index].Q4S+'</td> <td>'+list[index].Q4G+'</td> <td>'+list[index].resultR+'</td> <td>'+list[index].resultS+'</td> <td>'+list[index].resultG+'</td> </tr>';



                no++;
            }
            
            container.html(element)

            
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


