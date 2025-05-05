
$("#menuTableUser").addClass("active");

$("#btnOpenModalAddUser").click(function(){


    // $('#selectDepartment').html(populateDepartment());
    populateDepartment();
    
    $('#selectPosition').html(populatePosition());
    $('#selectRole').html(populateRole());

    populateDepartment2();

    $("#modalAddUser").modal("show");
});

$(document).on('keypress', "#txtEmail", function () {
    var charCode = (event.which) ? event.which : event.keyCode;
    var value = $(this).val();

    if (charCode === 64) {
        $(this).val(value + "@primatechphils.com");

        event.preventDefault();
    }
});
$("#modal-body-edit").on('keypress', "#txtEditEmail", function () {
    var charCode = (event.which) ? event.which : event.keyCode;
    var value = $(this).val();

    if (charCode === 64) {
        $(this).val(value + "@primatechphils.com");

        event.preventDefault();
    }
});

$("#btnExport").click(function(){
    table.download("csv", "userList.csv", { sheetName: "Sheet1" });
});


$("#liUserTable").click(function(){
    fetchDataAndInitializeTable()
});
$("#liLoginHistory").click(function(){
    fetchLoginHistory();
});
