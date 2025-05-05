

$("#btnEdit").click(function(){
    let desc = $("#txtEditDesc").val();
    let department = $("#selectEditDepartment").val();
    let id = $("#hiddenID").val();
    
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
            id: id,
            userCode: userCode,
            memberList: updateMembers(),
        }
        // console.log(sendData);

        
        $.ajax({
            url: "ajax/update.php",
            method: "POST",
            data: JSON.stringify(sendData),
            success: function(response) {
                console.log(response);
                
                if(response == "duplicate"){
                    Swal.fire({
                        title: 'Duplicate Description!',
                        text: 'Please fill up another description.',
                        icon: 'warning'
                    })
                } else {
                    Swal.fire({
                        title: 'Record Updated Successfully!',
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
            },
            error: function(error) {
                alert('Error:'+ error);
            }
        });
        
    }
});

function updateMembers(){
    var container = document.getElementById("tbody-edit-selected-user");
    var rows = container.getElementsByClassName("selectedRow");
    var dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var member = rows[i].querySelector(".txtEditSelectedUser").value;
        var role = rows[i].querySelector(".selectMemberRole").value;
        var id = rows[i].querySelector(".txtMemberID").value;

        dataArray.push({
            member:member,
            role: role,
            id:id,
        });
    }
    return dataArray;
}