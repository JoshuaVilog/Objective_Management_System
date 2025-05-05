

$("#btnEdit").click(function(){
    let title = $("#txtEditTitle").val();
    let desc = $("#txtEditDesc").val();
    let id = $("#hiddenId").val();
    
    if(desc == "" || title == ""){
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
                title: title,
                desc:desc,
                id: id,
            },
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
            }
        });
    }
});