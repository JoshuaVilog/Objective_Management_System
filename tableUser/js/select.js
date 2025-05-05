
// populateDepartment();
// populatePosition();


/* $('#selectDepartment, #selectPosition').select2({
    minimumInputLength: 0, // Set to 0 to always show the search bar
    allowClear: true, 
    placeholder: 'Select an option'
}); */

function populateDepartment(id){

    let list = JSON.parse(localStorage.getItem(lsDepartmentList));
    var options = '<option value="">-Select-</option>';

    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            if(id == list[i].a){
                selected = "selected";
            }
        }
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].c + ' - ('+list[i].b+')' +'</option>';
    }
    
    // return options;
    if(id == undefined){

        $('#selectDepartment').html(options);
        
        $('#selectDepartment').select2({
            minimumInputLength: 0,
            allowClear: true, 
            placeholder: 'Select an option'
        });
    } else {
        $('#selectEditDepartment').html(options);
        
        $('#selectEditDepartment').select2({
            minimumInputLength: 0,
            allowClear: true, 
            placeholder: 'Select an option'
        });
    }


}
function populatePosition(id){

    let list = JSON.parse(localStorage.getItem(lsPositionList));
    var options = '<option value="">-Select-</option>';

    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            if(id == list[i].a){
                selected = "selected";
            }
        }
        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    // return options;
    $('#selectPosition').html(options);

    $('#selectPosition').select2({
        minimumInputLength: 0, // Set to 0 to always show the search bar
        allowClear: true, 
        placeholder: 'Select an option'
    });
}

function populateRole(id){
    let list = JSON.parse(localStorage.getItem(lsUserRoleList));
    var options = '';

    for (var i = 0; i < list.length; i++) {
        let selected = "";
        if(id != undefined){
            if(id == list[i].a){
                selected = "selected";
            }
        }

        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
        /* if(list[i].a != "0"){
            options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
        } */
    }
    
    return options;
}

function populateDepartment2(){

    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    var options = '<option value="">-Select-</option>';

    // console.log(list);

    for (var i = 0; i < list.length; i++) {
        options += '<option value="' + list[i].a + '">' + list[i].b + '</option>';
    }
    
    $('#selectDepartment2').html(options);

    setTimeout(() => {
        $('#selectDepartment2').select2({
            multiple: true,
            placeholder: '-Select Department-',
        });
    }, 500);
}

function populateEditDepartment2(selectedList){

    let list = JSON.parse(localStorage.getItem(lsHRISDepartmentList));
    var options = '<option value="">-Select-</option>';
    selectedList = (selectedList != "")? JSON.parse(selectedList) : [];

    // console.log(selectedList);

    for (var i = 0; i < list.length; i++) {
        let selected = "";

        for(var j = 0; j < selectedList.length; j++){
            if(list[i].a == selectedList[j]){
                selected = "selected";
                break;
            }
        }


        options += '<option value="' + list[i].a + '" '+selected+'>' + list[i].b + '</option>';
    }
    
    $('#selectEditDepartment2').html(options);

    setTimeout(() => {
        $('#selectEditDepartment2').select2({
            multiple: true,
            placeholder: '-Select Department-',
        });
    }, 500);
}

