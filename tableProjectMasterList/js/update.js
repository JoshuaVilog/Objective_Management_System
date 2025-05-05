

$("#btnEdit").click(function(){
    let desc = $("#txtEditDesc").val();
    let targetDate = $("#txtEditTargetDate").val();
    let details = $("#txtEditDetails").val();
    let id = $("#hiddenEditId").val();
    
    if(desc == ""){
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill up all the information',
            icon: 'warning'
        })
    } else {
        $.ajax({
            url: "ajax/update.php",
            method: "POST",
            data: {
                desc:desc,
                targetDate: targetDate,
                details: details,
                id: id,
                userCode: userCode,
            },
            success: function(response) {
                console.log(response);
                
                Swal.fire({
                    title: 'Record Updated Successfully!',
                    text: 'Proceed to Record Page!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                        doneUpdate()
                        
                    }
                    // window.location.href = "/"+rootFolder+"/"+folderLoc+"/";
                    doneUpdate()
                })
            }
        });
    }
});

function doneUpdate(){
    $("#txtEditDesc").val("");
    $("#txtEditTargetDate").val("");
    $("#txtEditDetails").val("");
    $("#hiddenEditId").val("");
    $('#modalEdit').modal('hide');

}