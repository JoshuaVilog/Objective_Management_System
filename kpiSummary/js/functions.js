
$("#menuKPISummary").addClass("active");

if(userRole != 0){
    Swal.fire({
        title: 'You are not allowed to access here',
        text: '',
        icon: 'warning',
        timer: 2000,
        willClose: () => {
            window.location.href = "/"+rootFolder+"/dashboard";
        },
    })

} else {
    // generateTable();
}






