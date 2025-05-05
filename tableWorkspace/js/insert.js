

$("#btnAdd").click(function(){
    let desc = $("#txtDesc").val();
    let department = $("#selectDepartment").val();
    let year = $("#selectYear").val();
    
    if(desc == "" || department == ""){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up all the information',
            icon: 'warning'
        })
    } else {
        var sendData = {
            desc:desc,
            department: department,
            year: year,
            userCode: userCode,
            memberList: insertMembers(),
        }
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
});

function insertMembers(){
    var container = document.getElementById("tbody-selected-user");
    var rows = container.getElementsByClassName("selectedRow");
    var dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var member = rows[i].querySelector(".txtSelectedUser").value;
        
        dataArray.push({
            member:member
        });
    //    dataArray.push(member);
    }
    return dataArray;
}