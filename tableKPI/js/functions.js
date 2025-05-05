
$("#menuKPI").addClass("active");



$("#btnOpenModalAdd").click(function(){
    // let member = $("#selectMember").val();
    // let department = $("#selectDepartment").val();

    let department = $("#hiddenSelectedDepartmentID").val();
    let member = $("#hiddenSelectedEmployeeID").val();

    $("#txtDisplayCreateUserFullName").val(setHRISEmployeeName(member));
    $("#txtDisplayCreateUserDepartment").val(setHRISDepartment(department));
    $("#hiddenDisplayUserDepartment").val(department);
    $("#hiddenDisplayUserFullName").val(member);
    displayTable1();
    populateYearPrevious()

    $("#modalAdd").modal("show");
});
$("#btnGenerateKPI").click(function(){
    let hiddenKPIID = $("#hiddenDisplayKPI").val();
    let url = "generateKPI.php?kpiID="+hiddenKPIID;

    window.open(url)
});

$('#btnDownloadFormat').click(function() {
    var url = "ajax/downloadKPIFormat.php";
    window.open(url);

});

$("#txtSearchMember").on("change", function(){
    let list = JSON.parse(localStorage.getItem(lsHRISEmployeeList));
    let result = list.find(element => element.c === $(this).val());
    let memberID = result ? result.a:"";

    // console.log(memberID);
    selectMember(memberID); // NASA select.js YUNG FUNCTION NETO

    $("#hiddenSelectedDepartmentID").val(setHRISEmployeeDept(memberID));
    $("#hiddenSelectedEmployeeID").val(memberID);


});

$("#btnAddKpiRow").click(function(){

    noCreateKPI++;

    var newRowData = {
        a: "",
        b: "",
        c: "",
        d: noCreateKPI,
        e: "",
        f: "",
        id: noCreateKPI,
        Q1R: "",
        Q1S: "",
        Q1G: "",
        Q2R: "",
        Q2S: "",
        Q2G: "",
        Q3R: "",
        Q3S: "",
        Q3G: "",
        Q4R: "",
        Q4S: "",
        Q4G: "",
        resultR: "",
        resultS: "",
        resultG: "",
        lastS: "",
        lastG: "",

    };
    
    // savedItemListLocalStorage();
    table1.addData(newRowData);
    
    computeTotalWeight()
})
$("#btnAddKpiRowEdit").click(function(){

    noCreateKPI++;

    var newRowData = {
        a: "0",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        status: "NEW",
        id: noCreateKPI,
        Q1R: "",
        Q1S: "",
        Q1G: "",
        Q2R: "",
        Q2S: "",
        Q2G: "",
        Q3R: "",
        Q3S: "",
        Q3G: "",
        Q4R: "",
        Q4S: "",
        Q4G: "",
        resultR: "",
        resultS: "",
        resultG: "",
        lastS: "",
        lastG: "",
    };
    
    // savedItemListLocalStorage();
    table3.addData(newRowData);
    
    computeTotalWeight2()
})

$("#table-create-kpi").on("input", ".txtWeigh", function(){
    // let total = $("#displayTotal").text();
    computeTotalWeight();

});
$("#table-edit-kpi").on("input", ".txtWeigh", function(){
    // let total = $("#displayTotal").text();
    computeTotalWeight2();

});

function computeTotalWeight(){
    let total = 0;

    $('#table-create-kpi .txtWeigh').each(function () {
        var inputValue = parseFloat($(this).val()) || 0;
        total += inputValue;
    });

    $("#displayTotal1").text(total);

}
function computeTotalWeight2(){
    let total = 0;

    $('#table-edit-kpi .txtWeigh').each(function () {
        var inputValue = parseFloat($(this).val()) || 0;
        total += inputValue;
    });

    $("#displayTotal2").text(total);

}



function displayFileAttachments(kpilistID){
    $.ajax({
        url: '/'+rootFolder+'/getRecords/kpilist_files.php', // Replace with your server-side script URL
        type: 'POST',
        data:{
            kpilistID: kpilistID
        },
        dataType: 'json',
        success: function(data) {
            console.log(data);
            let container = $("#containerKpiListFileAttachments");
    
            let element = '';
            for(let index = 0; index < data.length; index++){
                let descOld = data[index].b;
                let descNew = data[index].c;
                let id = data[index].a;
                
                element += '<div class="dd-handle divKpiListFile"> <a href="#" class="openTaskFile">'+descOld+'</a> <div class="pull-right action-buttons"> <a class="red removeKpiFile" href="#"> <i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div><input type="hidden" class="hiddenKpiListFileID" value="'+id+'"> <input type="hidden" class="hiddenKpiListFileDescNew" value="'+descNew+'"> </div>';
            }
        
            container.html(element)
            
        },
        error: function(error) {
            alert('Error: Comment');
        }
    });
}

$("#containerKpiListFileAttachments").on("click", ".openTaskFile", function(){
    let descNew = $(this).closest(".divKpiListFile").find(".hiddenKpiListFileDescNew").val();

    // alert(id)
    let url = "/"+documentsFolder+"/KPI/"+descNew;
    // let encryptedUrl = btoa(url); // Base64 encoding
    window.open(url);

});

$("#containerKpiListFileAttachments").on("click", ".removeKpiFile", function(){
    let id = $(this).closest(".divKpiListFile").find(".hiddenKpiListFileID").val();
    var kpiListID = $("#hiddenKPIListID").val();

    Swal.fire({
        title: 'Are you sure you want to remove the File?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            
            $.ajax({
                url: 'ajax/removeKpiListFile.php',
                type: 'POST',
                data: {
                    taskID: id,
                    userCode: userCode
                },
                success: function(data) {
                    displayFileAttachments(kpiListID);
                    // console.log(data);
                }
            });   
            
        }
    })
});

$("#btnRemoveKPI").click(function(){
    let id = $("#hiddenDisplayKPI").val();

    Swal.fire({
        title: 'Are you sure you want to remove the KPI of user?',
        icon: 'question',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "ajax/removeKPI.php",
                method: "POST",
                data:{
                    userCode: userCode,
                    id:id,
                },
                success: function(response) {
                    
                    console.log(response);
                    $("#kpiContainer1").hide();
                    $("#kpiContainer2").hide();
                    $("#containerUserInfo").hide();
                    $("#txtSearchMember").val("");
                    
                    
                }
            });
        }
    })
    
})
















