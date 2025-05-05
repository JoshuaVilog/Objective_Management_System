
// populateDepartment();
// populatePosition();


$('#selectDepartment').select2({
    minimumInputLength: 0, // Set to 0 to always show the search bar
    allowClear: true, 
    placeholder: 'Select an option'
});

function populateDepartment(){


    let list = JSON.parse(localStorage.getItem(lsDepartmentList));
    var options = '<option value="">-Select-</option>';

    for (var i = 0; i < list.length; i++) {
        // let selected = (userDept == list[i].a)? "selected":"";
        options += '<option value="' + list[i].a + '">' + list[i].c + ' - ('+list[i].b+')' +'</option>';
    }
    
    return options;
}