

var table;
var tableOverall;

displayTableSchedule();
displayTableUserSchedule();

sessionStorage.setItem("mis-datetime", getPhilippinesDateTime());

setInterval(() => {
    let datetime = sessionStorage.getItem("mis-datetime");

    $.ajax({
        url: "/"+rootFolder+'/getRecords/realtime_schedule_masterlist.php', 
        type: 'POST',
        data:{
            oldDatetime: datetime,
        },
        success: function(data) {
            // console.log(data);
            
            sessionStorage.setItem("mis-datetime", getPhilippinesDateTime());

            if(data > 0){
                displayTableSchedule();
                displayTableUserSchedule();
                
                /* Swal.fire({
                    title: "New IT Support Request",
                    icon: "info",
                    toast: true,
                    position: "top-end",
                    // timer: 3000,
                    showConfirmButton: false,
                }); */
            }
    
        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
    
}, 5000);



function displayTableSchedule(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/meeting_scheduler_masterlist.php', //Replace with your server-side script URL
        type: 'POST',
        data: {
            
        },
        success: function(list) {

            list = list.map(item => ({
                
                rid: item.rid,
                desc: item.desc,
                date:item.date,
                department: item.department,
                departmentCode: setHRISDepartmentCode(item.department),
                category: item.category,
                categoryDesc: setMeetingCategory(item.category),
                room : setRoom(item.room),
                attendees: item.attendees,
                starttime: item.starttime,
                endtime: item.endtime,
                STATUS: item.STATUS,
                STATUSS: setStatusMeetingSched(item.STATUS),
                STATUS_AT: item.STATUS_AT,
                STATUS_IP: item.STATUS_IP,
                CREATED_AT: item.CREATED_AT,
                CREATED_BY: setUserFullName(item.CREATED_BY),
                CREATED_IP: item.CREATED_IP,
                DURATION: getMinuteDuration(item.starttime, item.endtime),


                
            }))
            
            // console.log(list);

            let forApprovingList = list.filter(item => item.STATUS == "0" || item.STATUS == "1");

            if(userSchedAccess == "0"){
                //NORMAL USER
                
                // list = list.filter(item => item.CREATED_BY == userCode);
                if(userRole == "1"){
                    list = list.filter(item => item.CREATED_BY == userCode);
                } else if(userRole == "0"){
    
                } else if(userRole == "2"){
                    let deptList = JSON.parse(setOKRMSDepartment(userCode));
                    
                    forApprovingList = forApprovingList.filter(item => deptList.includes(item.department));
                    // list = list.filter(item => deptList.includes(item.department));

                    // console.log();
                }

            } else if(userSchedAccess == "1"){
                //ADMIN
                
            }
            
            // console.log(list);

            table = new Tabulator("#table-approving-sched", {
                data: forApprovingList,
                layout: "fitDataFill",
                // pagination: "local",
                // paginationSize: 10, 
                // paginationSizeSelector: [10, 25, 50, 100], 
                // page: 1, 
                columns: [
                    {title: "RID", field: "rid", visible: false, },
                    {title: "DESCRIPTION", field: "desc", headerFilter: "input",},
                    {title: "REQUESTOR", field: "CREATED_BY", headerFilter: "input", 
                    /* mutator: function(cell){
                        // return setUserFullName(cell.getValue());
                        return setUserFullName(cell);
                    } */
                    },
                    {title: "DEPARTMENT", field: "departmentCode", headerFilter: "input", 
                    /* mutator: function(cell){
                        // return setHRISDepartmentCode(cell.getValue());
                        return setHRISDepartmentCode(cell);
                    } */
                    },
                    {title: "CATEGORY", field: "categoryDesc", headerFilter: "input", 
                    /* mutator: function(cell){
                        // return setHRISDepartmentCode(cell.getValue());
                        return setHRISDepartmentCode(cell);
                    } */
                    },
                    {title: "DATE", field: "date", headerFilter: "input",},
                    {title: "ROOM", field: "room", headerFilter: "input",
                    /* mutator: function(cell){
                        // return setRoom(cell.getValue());
                        return setRoom(cell);
                    } */
                    },
                    {title: "START", field: "starttime", headerFilter: "input", },
                    {title: "END", field: "endtime", headerFilter: "input", },
                    /* {title: "STATUS", field: "STATUS", headerFilter: "input", frozen: true, visible:false, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let list = getStatusMeetingSched();
                        let result = list.find(element => element.a === cell.getValue());
        
                        return result ? result.b:"";
                    }}, */
                    {title: "STATUS", field: "STATUSS", headerFilter: "input", frozen: true, formatter: function(cell){

                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        return cell.getValue();
                    },},
                    {title: "ACTION", field: "rid", hozAlign: "left", frozen:true, download:false, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let rowData = cell.getRow().getData();
                        let rid = cell.getValue();

                        let approve = '<button class="btn btn-minier btn-success btnApprove" value="'+rid+'">Approve</button>';
                        let disapprove = '<button class="btn btn-minier btn-danger btnDisapprove" value="'+rid+'">Disapprove</button>';

                        let approveByHead = '<button class="btn btn-minier btn-success btnApproveHead" value="'+rid+'">Approve</button>';
                        // let approveByGA = '<button class="btn btn-minier btn-success btnApproveGA" value="'+rid+'">Noted</button>';
                        let approveByGA = '<button class="btn btn-minier btn-success" onclick="approveSchedGA(\''+ rid +'\', \'APPROVE\')">Noted</button>';
                        let viewStatus = '<button class="btn btn-minier btn-info " value="'+rid+'" onclick="viewSchedStatus(\''+ rid +'\')">View</button>';
                        let cancel = '<button class="btn btn-minier btn-danger " value="'+rid+'" onclick="cancelSched(\''+ rid +'\')">Cancel</button>';
                        let done = '<button class="btn btn-minier btn-success " value="'+rid+'" onclick="doneSched(\''+ rid +'\')">Done</button>';

                        
                        if(userRole == "1"){
                            // NORMAL USER

                            if(rowData.STATUS == "1" && userSchedAccess == "1"){
                                // KAPAG IPAPA APPROVE NA KAY GA
                                return viewStatus +" "+approveByGA +" "+ cancel;
                            } else if (rowData.STATUS == "2") {
                                // APPROVED NA NG GA
                                return viewStatus + " " + done + " "+ cancel;
                            }
                            else if(rowData.STATUS == "0"){
                                // 
                                return viewStatus + " "+ cancel;
                            } else if(rowData.STATUS == "3" || rowData.STATUS == "4" || rowData.STATUS == "5"){
                                // DONE, DECLINE, CANCELLED
                                return viewStatus;
                            }
                        } else if(userRole == "2"){
                            if(rowData.STATUS == "0"){

                                return viewStatus +" "+ approveByHead +" "+ cancel;
                            } else if(rowData.STATUS == "1" && userSchedAccess == "1"){
                                
                                return viewStatus +" "+approveByGA +" "+ cancel;
                            } else {
                                
                                return viewStatus;
                            }
                        } else if(userRole == "0"){
                            if(rowData.STATUS == "0"){

                                return viewStatus +" "+ approveByHead +" "+ cancel;
                            } else if(rowData.STATUS == "1"){
                                //APPROVE NA NG HEAD THEN IPAPA APPROVE NA KAY GA
                                return viewStatus +" "+approveByGA +" "+ cancel;
                            } else if (rowData.STATUS == "2") {
                                // APPROVED NA NG GA
                                return viewStatus + " " + done + " "+ cancel;
                            } else {

                                return viewStatus;
                            }
                        }
                    }},
                ],
                
            });


            // console.log(list);
            
            // TABLE OVERALL
            tableOverall = new Tabulator("#table-overall-sched", {
                data: list,
                layout: "fitDataFill",
                pagination: "local",
                paginationSize: 10, 
                paginationSizeSelector: [10, 25, 50, 100], 
                page: 1, 
                columns: [
                    {title: "RID", field: "rid", visible: false, },
                    {title: "DESCRIPTION", field: "desc", headerFilter: "input",},
                    {title: "REQUESTOR", field: "CREATED_BY", headerFilter: "input",},
                    {title: "DEPT.", field: "departmentCode", headerFilter: "input",},
                    {title: "CATEGORY", field: "categoryDesc", headerFilter: "input",},
                    {title: "DATE", field: "date", headerFilter: "input",},
                    {title: "ROOM", field: "room", headerFilter: "input", },
                    {title: "START", field: "starttime", headerFilter: "input", },
                    {title: "END", field: "endtime", headerFilter: "input", },
                    {title: "DURATION", field: "DURATION", headerFilter: "input", },
                    {title: "STATUS", field: "STATUSS", headerFilter: "input", frozen: true, formatter: function(cell){

                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        return cell.getValue();
                    },},
                    {title: "ACTION", field: "rid", hozAlign: "left", frozen:true, download:false, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let rowData = cell.getRow().getData();
                        let rid = cell.getValue();

                        let edit = '<button class="btn btn-minier btn-primary" onclick="approveSchedGA(\''+ rid +'\', \'EDIT\')">Edit</button>';
                        let viewStatus = '<button class="btn btn-minier btn-info " value="'+rid+'" onclick="viewSchedStatus(\''+ rid +'\')">View</button>';
                        let cancel = '<button class="btn btn-minier btn-danger " value="'+rid+'" onclick="cancelSched(\''+ rid +'\')">Cancel</button>';
                        let done = '<button class="btn btn-minier btn-success " value="'+rid+'" onclick="doneSched(\''+ rid +'\')">Done</button>';

                        if(rowData.STATUS == "0"){

                            return viewStatus +" "+ cancel;
                        } else if(rowData.STATUS == "1"){
                            //APPROVE NA NG HEAD THEN IPAPA APPROVE NA KAY GA
                            return viewStatus +" "+ cancel;
                        } else if (rowData.STATUS == "2") {
                            // APPROVED NA NG GA
                            return viewStatus + " " + edit +" "+ done + " "+ cancel;
                        } else {

                            return viewStatus;
                        }
                        // return viewStatus + " " + approveByGA + " " + cancel;
                    },},
                ],
                
            });

            

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}
$("#btnExport").click(function(){
    let filename = "Schedule Report.xlsx";

    tableOverall.download("xlsx", filename, { sheetName: "Sheet1" });
});


function setStatusMeetingSched(id){
    let list = getStatusMeetingSched();
    let result = list.find(element => element.a === id);

    return result ? result.b:"";
}

function displayTableUserSchedule(){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/meeting_scheduler_masterlist.php', //Replace with your server-side script URL
        type: 'POST',
        data: {
            
        },
        success: function(list) {
            list = list.filter(item => item.CREATED_BY == userCode);

            list = list.map(item => ({
                
                rid: item.rid,
                desc: item.desc,
                date:item.date,
                department: item.department,
                departmentCode: setHRISDepartmentCode(item.department),
                category: item.category,
                categoryDesc: setMeetingCategory(item.category),
                room : setRoom(item.room),
                attendees: item.attendees,
                starttime: item.starttime,
                endtime: item.endtime,
                STATUS: item.STATUS,
                STATUSS: setStatusMeetingSched(item.STATUS),
                STATUS_AT: item.STATUS_AT,
                STATUS_IP: item.STATUS_IP,
                CREATED_AT: item.CREATED_AT,
                CREATED_BY: setUserFullName(item.CREATED_BY),
                CREATED_IP: item.CREATED_IP,
                DURATION: getMinuteDuration(item.starttime, item.endtime),

                
            }))


            let utable = new Tabulator("#table-request-list", {
                data: list,
                layout: "fitDataFill",
                pagination: "local",
                paginationSize: 10, 
                paginationSizeSelector: [10, 25, 50, 100], 
                page: 1, 
                columns: [
                    {title: "RID", field: "rid", visible: false, },
                    {title: "DESCRIPTION", field: "desc", headerFilter: "input",},
                    /* {title: "DEPARTMENT", field: "department", headerFilter: "input", formatter: function(cell){
                        return setHRISDepartmentCode(cell.getValue());
                    }}, */
                    {title: "CATEGORY", field: "categoryDesc", headerFilter: "input",},
                    {title: "DATE", field: "date", headerFilter: "input", },
                    {title: "ROOM", field: "room", headerFilter: "input", },
                    {title: "START", field: "starttime", headerFilter: "input", },
                    {title: "END", field: "endtime", headerFilter: "input", },
                    {title: "DURATION", field: "DURATION", headerFilter: "input", },
                    {title: "STATUS", field: "STATUS", headerFilter: "input", frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let list = getStatusMeetingSched();
                        let result = list.find(element => element.a === cell.getValue());
        
                        return result ? result.b:"";
                    }},
                    {title: "ACTION", field: "rid", hozAlign: "left", frozen:true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let rowData = cell.getRow().getData();
                        let rid = cell.getValue();

                        let approve = '<button class="btn btn-minier btn-success btnApprove" value="'+rid+'">Approve</button>';
                        let disapprove = '<button class="btn btn-minier btn-danger btnDisapprove" value="'+rid+'">Disapprove</button>';

                        let approveByHead = '<button class="btn btn-minier btn-success btnApproveHead" value="'+rid+'">Approve</button>';
                        let approveByGA = '<button class="btn btn-minier btn-success btnApproveGA" value="'+rid+'">Noted</button>';
                        let edit = '<button class="btn btn-minier btn-primary btnEditSched" value="'+rid+'">Edit</button>';
                        let viewStatus = '<button class="btn btn-minier btn-info " value="'+rid+'" onclick="viewSchedStatus(\''+ rid +'\')">View</button>';
                        let cancel = '<button class="btn btn-minier btn-danger " value="'+rid+'" onclick="cancelSched(\''+ rid +'\')">Cancel</button>';
                        let done = '<button class="btn btn-minier btn-success " value="'+rid+'" onclick="doneSched(\''+ rid +'\')">Done</button>';

                        if(rowData.STATUS == "1"){
                            // KAPAG IPAPA APPROVE NA KAY GA
                            return edit + " " + viewStatus +" "+ cancel;
                        } else if (rowData.STATUS == "2") {
                            // APPROVED NA NG GA
                            return viewStatus + " " + done + " "+ cancel;
                        }
                        else if(rowData.STATUS == "0"){
                            // IPAPA APPROVE PA LANG SA HEAD
                            return edit + " " + viewStatus + " "+ cancel;
                        } else if(rowData.STATUS == "3" || rowData.STATUS == "4" || rowData.STATUS == "5"){
                            // DONE, DECLINE, CANCELLED
                            return viewStatus;
                        }

                    }},
                ],
            });

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

function displayScheduleByDate(date){

    $.ajax({
        url: "/"+rootFolder+'/getRecords/meeting_scheduler_ByDates.php', //Replace with your server-side script URL
        type: 'POST',
        data: {
            startDate: date,
            endDate: date,
        },
        success: function(list) {
            // list = list.filter(item => item.CREATED_BY == userCode);
            console.log(list);

            let tableByDate = new Tabulator("#table-record-sched-by-date", {
                data: list,
                layout: "fitDataFill",
                columns: [
                    {title: "RID", field: "rid", visible: false, },
                    {title: "DESCRIPTION", field: "desc",},
                    {title: "CATEGORY", field: "category", formatter: function(cell){
                        return setMeetingCategory(cell.getValue());
                    }},
                    {title: "DATE", field: "date", },
                    {title: "ROOM", field: "room", formatter: function(cell){
                        return setRoom(cell.getValue());
                    }},
                    {title: "START", field: "starttime", },
                    {title: "END", field: "endtime",  },
                    {title: "STATUS", field: "STATUS", frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let list = getStatusMeetingSched();
                        let result = list.find(element => element.a === cell.getValue());
        
                        return result ? result.b:"";
                    }},
                    
                ],
            });

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}


function viewSchedStatus(id){
    $.ajax({
        url: "/"+rootFolder+'/getRecords/getSelectedScheduler.php',
        method: "POST",
        data: { 
            id: id,
        },
        success: function(data) {
            // console.log(data);
            $("#viewRequestor").val(setUserFullName(data.CREATED_BY));
            $("#viewDepartment").val(setHRISDepartmentCode(data.department));
            $("#viewSubject").val(data.desc);
            $("#viewDate").val(data.date);
            $("#viewStartTime").val(data.starttime);
            $("#viewEndTime").val(data.endtime);
            $("#viewRoom").val(setRoom(data.room));
            $("#viewCategory").val(setMeetingCategory(data.category));

            let attendeesList = JSON.parse(data.attendees);
            let options1 = '';

            if(attendeesList.length > 0){
                for(let index = 0; index < attendeesList.length; index++){
                    options1 += '<li>'+ setHRISEmployeeName(attendeesList[index]) +'</li>';
    
                }

                $("#ulViewAttendees").html(options1);
            } else {
                $("#ulViewAttendees").html("-");
            }
            

            

            if(data.category == "1"){

                $("#containerViewVisitor").hide();
            } else if(data.category == "2"){
                

                $("#containerViewVisitor").show();
                $("#viewVisitorType").val(setVisitorType(data.visitorType));

                let visitorList = JSON.parse(data.visitors);
                let options2 = '';

                if(visitorList.length > 0){
                    for(let index = 0; index < visitorList.length; index++){
                        options2 += '<li>'+ setVisitorName(visitorList[index]) +'</li>';
    
                    }
                    $("#ulViewVisitors").html(options2);
                } else {

                    $("#ulViewVisitors").html("-");

                }
                

                let itemsToPreparedList = JSON.parse(data.itemsToPrepared);
                let options3 = '';

                if(itemsToPreparedList.length > 0){
                    for(let index = 0; index < itemsToPreparedList.length; index++){
                        options3 += '<li>'+ setItemsToPrepared(itemsToPreparedList[index]) +'</li>';
    
                    }
                    $("#ulViewItemsToPrepared").html(options3);
                } else {
                    $("#ulViewItemsToPrepared").html("-");

                }
                

                
            }


        }
    });

    $.ajax({
        url: "/"+rootFolder+'/getRecords/getSchedStatusList.php',
        method: "POST",
        data: { 
            id: id,
        },
        success: function(list) {
            // console.log(list);

            let tableStatus = new Tabulator("#table-sched-status-list", {
                data: list,
                layout: "fitDataFill",
                // pagination: "local",
                // paginationSize: 10, 
                // paginationSizeSelector: [10, 25, 50, 100], 
                // page: 1, 
                columns: [
                    {title: "RID", field: "rid", visible: false, },
                    {title: "STATUS", field: "status", headerSort: false, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        let list = getStatusMeetingSched();
                        let result = list.find(element => element.a === cell.getValue());
        
                        return result ? result.c:"";
                    }},
                    {title: "USER", field: "user", headerSort: false, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#FFFFFF";
                        
                        return setUserFullName(cell.getValue());
                    }},
                    {title: "DATETIME", field: "datetime", headerSort: false,},
                ],
                
            });

            $("#modalViewStatus").modal("show");
        }
    });
    
}

function getMinuteDuration(start, end) {
    let startTime = start.split(":").map(Number);
    let endTime = end.split(":").map(Number);

    let startMinutes = startTime[0] * 60 + startTime[1]; // Convert hours to minutes
    let endMinutes = endTime[0] * 60 + endTime[1]; // Convert hours to minutes

    return endMinutes - startMinutes; // Calculate the difference
}


/* 
// Meeting Data
let list = [
    {rid: 1, desc: "Meeting 1", date:"2025-02-24", starttime:"08:00", endtime:"08:30", room:1},
    {rid: 1, desc: "Meeting 1", date:"2025-02-24", starttime:"08:30", endtime:"09:30", room:1},
    {rid: 2, desc: "Meeting 2", date:"2025-02-25", starttime:"09:00", endtime:"10:00", room:1},
    {rid: 3, desc: "Meeting 3", date:"2025-02-24", starttime:"08:00", endtime:"10:00", room:2},
    {rid: 4, desc: "Meeting 4", date:"2025-02-25", starttime:"10:00", endtime:"11:00", room:2},
    {rid: 5, desc: "Meeting 5", date:"2025-02-25", starttime:"08:00", endtime:"12:00", room:3},
    {rid: 6, desc: "Meeting 6", date:"2025-02-25", starttime:"13:00", endtime:"17:30", room:1},
    {rid: 7, desc: "Meeting 7", date:"2025-02-26", starttime:"08:00", endtime:"13:30", room:1},
];
 */

$("#btnSyncData").click(function(){
    let startDate = $("#dateStartDateSched").val();
    let endDate = $("#dateEndDateSched").val();

    generateSchedule(startDate, endDate);
});
$("#aTabOverAll").click(function(){
    

    populateChkBoxRoom();
    $("#dateStartDateSched").val(getCurrentDate());
    $("#dateEndDateSched").val(getCurrentDate());
    $("#dateSelectDay").val(getCurrentDate());

    $("#chkSelectAll").prop("checked", true);
    

    $("#containerTypeRangeDay").show();
    $("#containerTypeRangeCustom").hide();

    setTimeout(() => {
        let startDate = $("#dateStartDateSched").val();
        let endDate = $("#dateEndDateSched").val();
        
        generateSchedule(startDate, endDate);

        $("#dateStartDateSched").prop("max", startDate);
        $("#dateEndDateSched").prop("min", startDate);
    }, 1000);
});


function generateSchedule(startDate, endDate) {
    const table = document.getElementById("schedule-table");
    let roomList = JSON.parse(localStorage.getItem(lsRoomList));

    $.ajax({
        url: "/"+rootFolder+'/getRecords/meeting_scheduler_ByDates.php', //Replace with your server-side script URL
        type: 'POST',
        data: {
            startDate: startDate,
            endDate: endDate,
        },
        success: function(list) {
            // console.log(list);

            let listDate = [];
            let currentDate = new Date(startDate);
            let endDatee = new Date(endDate);

            while (currentDate <= endDatee) {
                listDate.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
                currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            }

            // let dates = [...new Set(list.map(m => m.date))];
            // let rooms = [...new Set(list.map(m => m.room))].sort();
            // let rooms = roomList.map(item => item.a);
            let dates = listDate;
            let rooms = getSelectedRooms();

            let dateNum = 1;
            let headerRow1 = `<tr><th rowspan="2" class="thTime sticky-column">TIME</th>`;
            dates.forEach(date => {
                let colorDate = (dateNum % 2 == 0) ? "#C0C6C7" : "#C9C0BB";
                headerRow1 += `<th colspan="${rooms.length}" style="background-color:${colorDate}">${date + " " + getDayOfWeek(date)}</th>`;
                dateNum++;
            });
            headerRow1 += `</tr>`;

            let headerRow2 = "<tr>";
            dates.forEach(() => {
                rooms.forEach(room => {
                    headerRow2 += `<th class="thRoom">${ setRoom(room) }</th>`;
                });
            });
            headerRow2 += "</tr>";

            let times = [];
            for (let hour = 6; hour <= 20; hour++) {
                times.push(`${hour.toString().padStart(2, '0')}:00`);
                times.push(`${hour.toString().padStart(2, '0')}:30`);
            }
            // times.push("17:30");

            let rows = "";
            times.forEach(time => {
                rows += `<tr><td class="sticky-column">${time}</td>`;
                dates.forEach(date => {
                    rooms.forEach(room => {
                        let meeting = list.find(m => m.date === date && m.room === room && m.starttime === time);

                        if (meeting) {
                            let start = new Date(`2000-01-01T${meeting.starttime}`);
                            let end = new Date(`2000-01-01T${meeting.endtime}`);
                            let duration = (end - start) / (30 * 60 * 1000);

                            // rows += `<td rowspan="${duration}"><div class="meeting"><p>${meeting.desc} </p><hr> ${meeting.starttime} - ${meeting.endtime}</div></td>`;
                            rows += `<td rowspan="${duration}" onclick="viewSchedStatus(${meeting.rid})" class="tdMeeting" style="background-color:${setColorDepartment(meeting.department)}; cursor: pointer;"><h5 class="pDesc"><strong>${meeting.desc} </strong></h5> <p><strong>${setUserFullName(meeting.CREATED_BY)}</strong></p> <h5>${setHRISDepartmentCode(meeting.department)}</h5> <h4>${meeting.starttime} - ${meeting.endtime}</h4><h5>${setMeetingCategory(meeting.category)}</h5></td>`;
                        } else {
                            let isInRowspan = list.some(m => {
                                let start = new Date(`2000-01-01T${m.starttime}`);
                                let end = new Date(`2000-01-01T${m.endtime}`);
                                let curr = new Date(`2000-01-01T${time}`);
                                return m.date === date && m.room === room && start < curr && end > curr;
                            });

                            if (!isInRowspan) {
                                rows += `<td></td>`;
                            }
                        }
                    });
                });
                rows += `</tr>`;
            });

            table.innerHTML = headerRow1 + headerRow2 + rows;

        },
        error: function(error) {
            alert('Error fetching data from the database.');
        }
    });
}

// generateSchedule();




































// ========================================================================================================================================== //
/* 
// Function to generate the schedule table
function generateSchedule() {
    const table = document.getElementById("schedule-table");

    // Extract unique dates and rooms
    let dates = [...new Set(list.map(meeting => meeting.date))];
    let rooms = [...new Set(list.map(meeting => meeting.room))].sort();
    let roomList = [
        {a:1, b:"Room 1",},
        {a:2, b:"Room 2",},
        {a:3, b:"Room 3",},
    ]

    // Generate the table header
    let headerRow1 = `<tr><th rowspan="2">TIME</th>`;
    dates.forEach(date => {
        headerRow1 += `<th colspan="${rooms.length}">${date}</th>`;
    });
    headerRow1 += `</tr>`;

    let headerRow2 = "<tr>";
    dates.forEach(() => {
        rooms.forEach(room => {
            headerRow2 += `<th>ROOM ${room}</th>`;
        });
    });
    headerRow2 += "</tr>";

    // Define time slots from 08:00 to 16:00
    let times = [];
    for (let hour = 8; hour <= 20; hour++) {
        let timeStr = hour.toString().padStart(2, '0') + ":00";
        times.push(timeStr);
    }

    // Generate table rows
    let rows = "";
    times.forEach(time => {
        rows += `<tr><td>${time}</td>`;
        dates.forEach(date => {
            rooms.forEach(room => {
                // Find a meeting at this time slot
                let meeting = list.find(m => m.date === date && m.room === room && m.starttime === time);

                if (meeting) {
                    let start = parseInt(meeting.starttime.split(":")[0]);
                    let end = parseInt(meeting.endtime.split(":")[0]);
                    let duration = end - start;

                    rows += `<td rowspan="${duration}"><div class="meeting">${meeting.desc} <hr> ${meeting.starttime} - ${meeting.endtime}</div></td>`;
                } else {
                    // Check if this slot is inside a rowspan (skip cells)
                    let isInRowspan = list.some(m => 
                        m.date === date && m.room === room &&
                        parseInt(m.starttime.split(":")[0]) < parseInt(time.split(":")[0]) &&
                        parseInt(m.endtime.split(":")[0]) > parseInt(time.split(":")[0])
                    );

                    if (!isInRowspan) {
                        rows += `<td></td>`;
                    }
                }
            });
        });
        rows += `</tr>`;
    });

    // Render the table
    table.innerHTML = headerRow1 + headerRow2 + rows;
}

// Run the function to generate the table
generateSchedule(); */

// displayScheduler()

function displayScheduler(){
    let startDate = "2025-02-24";
    let endDate = "2025-02-26";
    let roomList = [
        {a:1, b:"Room 1",},
        {a:2, b:"Room 2",},
        {a:3, b:"Room 3",},
    ]

    let list = [
        {rid: 1, desc: "Meeting 1", date:"2025-02-24", starttime:"08:00", endtime:"09:00", room:"1"},
        {rid: 2, desc: "Meeting 2", date:"2025-02-24", starttime:"09:00", endtime:"10:00", room:"1"},
        {rid: 3, desc: "Meeting 3", date:"2025-02-24", starttime:"08:00", endtime:"10:00", room:"2"},
        {rid: 4, desc: "Meeting 4", date:"2025-02-25", starttime:"10:00", endtime:"11:00", room:"2"},
        {rid: 5, desc: "Meeting 5", date:"2025-02-25", starttime:"08:00", endtime:"12:00", room:"3"},
        {rid: 6, desc: "Meeting 6", date:"2025-02-25", starttime:"13:00", endtime:"15:00", room:"1"},
    ];


    /* 
    let dateList = [];
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    
    while (startDate <= endDate) {
        let formattedDate = startDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
        dateList.push(formattedDate);
        startDate.setDate(startDate.getDate() + 1); // Move to the next day
    }

    // console.log(dateList);

    let tableBody = document.getElementById("tableSchedule")
    let rowth1 = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.textContent = "TIME";
    th1.rowSpan = 2;

    rowth1.appendChild(th1);

    let rowRoom = document.createElement("tr");
    
    for(let index = 0; index < dateList.length; index++){
        let thDates = document.createElement("th");
        thDates.textContent = dateList[index];
        thDates.colSpan = 3;
        rowth1.appendChild(thDates);

        for(let j = 0; j < roomList.length; j++){
            let thRoom = document.createElement("th");
            thRoom.textContent = roomList[j].b;

            rowRoom.appendChild(thRoom);
        }
    } 

    tableBody.appendChild(rowth1);
    tableBody.appendChild(rowRoom);

    let timeList = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',];
    let colNum = dateList.length * roomList.length;

    for(let index = 0; index < timeList.length; index++){

        let trTime = document.createElement("tr");
        let th = document.createElement("td");
        th.textContent = timeList[index];

        trTime.appendChild(th);
        for(let j = 0; j < colNum; j++){
            let th = document.createElement("td");

            trTime.appendChild(th);

        }

        tableBody.appendChild(trTime);
    } */





    //// =================================================================== //





/* 
    function generateTimeSlots(start, end) {
        let times = [];
        let [sh, sm] = start.split(":").map(Number);
        let [eh, em] = end.split(":").map(Number);

        while (sh < eh || (sh === eh && sm < em)) {
            times.push(`${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`);
            sh += 1;
        }
        return times;
    }

    function groupSchedule(list) {
        return list.reduce((acc, { date, room, desc, starttime, endtime }) => {
            if (!acc[date]) acc[date] = {};
            if (!acc[date][room]) acc[date][room] = [];

            acc[date][room].push({ desc, starttime, endtime });
            return acc;
        }, {});
    }

    function generateTable(schedule) {
        let times = generateTimeSlots("08:00", "16:00");
        let dates = Object.keys(schedule).sort();
        let allRooms = [...new Set(Object.values(schedule).flatMap(obj => Object.keys(obj)))].sort();

        let tableHTML = `<table>
            <tr>
                <th rowspan="2" class="time-col">TIME</th>`;

        // Generate date headers
        dates.forEach(date => {
            tableHTML += `<th colspan="${allRooms.length}">${date}</th>`;
        });
        tableHTML += `</tr><tr>`;

        // Generate room headers
        dates.forEach(date => {
            allRooms.forEach(room => {
                tableHTML += `<th>Room ${room}</th>`;
            });
        });
        tableHTML += `</tr>`;

        // Generate time slots
        times.forEach(time => {
            tableHTML += `<tr><td class="time-col">${time}</td>`;

            dates.forEach(date => {
                allRooms.forEach(room => {
                    let meeting = schedule[date]?.[room]?.find(m => m.starttime === time);
                    if (meeting) {
                        let duration = generateTimeSlots(meeting.starttime, meeting.endtime).length;
                        tableHTML += `<td class="meeting" rowspan="${duration}">${meeting.desc}</td>`;
                    } else if (!Object.values(schedule[date]?.[room] || {}).some(m => m.starttime < time && m.endtime > time)) {
                        tableHTML += `<td></td>`;
                    }
                });
            });

            tableHTML += `</tr>`;
        });

        tableHTML += `</table>`;
        document.getElementById("schedule").innerHTML = tableHTML;
    }

    const groupedSchedule = groupSchedule(list);
    generateTable(groupedSchedule);
      */

    /* // console.log(list);
    let schedule = list.reduce((acc, { date, room, desc, starttime, endtime }) => {
        if (!acc[date]) acc[date] = {};
        if (!acc[date][room]) acc[date][room] = [];
        
        acc[date][room].push({ desc, starttime, endtime });
        return acc;
    }, {});


    let tableHTML = `<table>
                <tr>
                    <th>Date</th>
                    <th>Room</th>
                    <th>Meeting</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>`;

            for (let date in schedule) {
                tableHTML += `<tr class="date-header"><td colspan="5">${date}</td></tr>`;
                
                for (let room in schedule[date]) {
                    tableHTML += `<tr class="room-header"><td></td><td colspan="4">Room ${room}</td></tr>`;
                    
                    schedule[date][room].forEach(meeting => {
                        tableHTML += `<tr>
                            <td></td>
                            <td></td>
                            <td>${meeting.desc}</td>
                            <td>${meeting.starttime}</td>
                            <td>${meeting.endtime}</td>
                        </tr>`;
                    });
                }
            }

            tableHTML += `</table>`;
            document.getElementById("schedule").innerHTML = tableHTML;

 */
}

