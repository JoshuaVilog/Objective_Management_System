

$("#btnImport").click(function(){
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    var listStatus = JSON.parse(localStorage.getItem(lsTaskStatusList)); 
    var listPriority = JSON.parse(localStorage.getItem(lsPriorityList)); 

    var activity = $("#selectActivity").val();

    if(activity == "" || activity == null){
        Swal.fire({
            title: 'Please Input an Activity!',
            text: '',
            icon: 'warning'
        })
    } else {
        if (file) {
            let formData = new FormData();
            formData.append('excelFile', file);
            formData.append('listStatus', JSON.stringify(listStatus));
            formData.append('listPriority', JSON.stringify(listPriority));
    
            $.ajax({
                type: 'POST',
                url: 'ajax/import.php',
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
    
                    console.log(data);
    
                    data.forEach(function(value) {
    
                        var newRowData = {
                            a: value[0],
                            b: value[1],
                            c: value[2],
                            d: value[3],
                            e: value[4],
                            f: value[5],
                            g: value[6],
                            h: value[7],
                            i: value[8],
                        };
    
                        table.addRow(newRowData);
                    });
    
                    // $('.selectAssignee').select2({
                    //     multiple: true,
                    //     placeholder: '-Select Assignee-',
                    // });
    
    
                },
                error: function(response) {
                    alert('Error uploading file.');
                    console.log(response);
                }
            });
        }
    }

    

});


$("#btnSubmit").click(function(){
    var activity = $("#selectActivity").val();
    var container = document.getElementById("table-records");
    var rows = container.getElementsByClassName("tabulator-row");
    var dataArray = [];
    
    if(activity == "" || activity == null){
        Swal.fire({
            title: 'Please Input an Activity!',
            text: '',
            icon: 'warning'
        })
    } else {
        for (var i = 0; i < rows.length; i++){
            var taskDesc = rows[i].querySelector(".txtTaskDesc").value;
            var taskParent = rows[i].querySelector(".selectTaskParent").value;
            var status = rows[i].querySelector(".selectStatus").value;
            var priority = rows[i].querySelector(".selectPriority").value;
            var dueDate = rows[i].querySelector(".txtTaskDueDate").value;
            var startDate = rows[i].querySelector(".txtTaskStartDate").value;
            var finishDate = rows[i].querySelector(".txtTaskFinishDate").value;
            var taskDetails = rows[i].querySelector(".txtTaskDetails").value;
            var assignee = rows[i].querySelector(".selectAssignee");
            var assignees = [];
    
            for (var j = 0; j < assignee.options.length; j++) {
                if (assignee.options[j].selected) {
                  assignees.push(assignee.options[j].value);
                }
            }
    
    
            dataArray.push({
                taskDesc: taskDesc,
                taskParent: taskParent,
                status: status,
                assignee: JSON.stringify(assignees),
                priority: priority,
                dueDate: dueDate,
                startDate: startDate,
                finishDate: finishDate,
                taskDetails: taskDetails,
    
            });
        }
    
        let sendData = {
            userCode: userCode,
            activity: activity,
            dataArray: dataArray,
        };

        console.log(sendData);

        
        $.ajax({
            url: "ajax/insert.php",
            method: "POST",
            data: JSON.stringify(sendData),
            success: function(response) {
                console.log(response);
                
                Swal.fire({
                    title: 'Record Added Successfully!',
                    text: 'Proceed to Record Page!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/"+rootFolder+"/"+folderLoc+"/index.php";
                    }
                    window.location.href = "/"+rootFolder+"/"+folderLoc+"/index.php";
                })
                
            }
        });



    }
    
    


    // console.log(dataArray);


});


