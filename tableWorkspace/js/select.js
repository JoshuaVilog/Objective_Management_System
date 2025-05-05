


function populateDepartment(){
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
    }
    
    $('#selectDepartment').html(options);

}

function populateEditDepartment(selectedID){
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        let selected = (list[i].a == selectedID)? "selected":"";
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectEditDepartment').html(options);

}

function populateYear(id){
    let list = JSON.parse(localStorage.getItem(lsYearList));
    

    var options = '<option value="">-Select-</option>';
    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            selected = (list[i].a == id)? "selected": "";
        }
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectYear').html(options);

}