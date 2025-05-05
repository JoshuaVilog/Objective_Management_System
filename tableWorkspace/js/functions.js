
// $("#menuTableUser").addClass("active");
let folderLoc = "tableWorkspace";
let tableCreate;
let tableModify;
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// ADD WORKSPACE

$("#btnOpenModalAdd").click(function(){

    populateDepartment();
    populateUserRow()
    // $("#tbody-search-user").html(populateUserRow());

    let year = JSON.parse(localStorage.getItem(lsActiveYear));

    populateYear(year.RID);

    $("#modalAdd").modal("show");
});

function populateUserRow(){

    let userList = JSON.parse(localStorage.getItem(lsUserList));

    userList = userList.filter(user => user.a != 1);

    userList.forEach(item => {
        item.NAME = item.c +' '+ item.b;
        item.DEPT = setDepartment(item.e);
        item.BTN = "";
        item.id = item.a;
    });

    // console.log(userList);

    tableCreate = new Tabulator("#table-create", {
        pagination: "local", // Enable local pagination
        paginationSize: 5, // Number of rows per page
        paginationSizeSelector: [5,10, 25], // Page size options
        page: 1, // Initial page number
        data: userList,
        layout: "fitDataFill", // Adjust table height based on the data
        columns: [
            {title: "RID", field: "a", headerFilter: "input", visible: false},
            {title: "#", formatter: "rownum", headerFilter: "input"},
            {title: "NAME", field: "NAME", headerFilter: "input"},
            {title: "DEPARTMENT", field: "DEPT", headerFilter: "input"},
            {title: "Action", field:"BTN", formatter: function(cell){
                let rowData = cell.getRow().getData();
                return '<button class="btn btn-success selectUser" value="'+rowData.a+'" '+rowData.BTN+'>Select</button>';
            },  hozAlign: "left", headerSort: false, frozen:true},
        ],
    });

    /* var row = '';

    for (var i = 0; i < userList.length; i++) {
        if(userCode != userList[i].a){
            row += '<tr class="rowUser"> <td>'+userList[i].b+', '+userList[i].c+'</td> <td>'+setDepartment(userList[i].e)+'</td> <td><button class="btn btn-success selectUser" value="'+userList[i].a+'">Select</button></td> </tr>';
        }
    }
    
    return row; */
}
function setDepartment(id){
    let desc = "";
    let list = JSON.parse(localStorage.getItem(lsDepartmentList));

    for(let index = 0; index < list.length; index++){
        if(list[index].a == id){
            desc = list[index].c;
            break;
        }
    }

    return desc;
}

//Select User
$("#table-create").on("click",".selectUser",function(){
    let selected = $(this).val();
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === selected;
    });

    let container = $("#tbody-selected-user");

    let element = '<tr class="selectedRow"> <td>'+result.b+', '+result.c+'</td> <td>'+setDepartment(result.e)+'</td> <td><button class="btn btn-danger removeUser" value="'+result.a+'">Remove</button> <input type="hidden" class="txtSelectedUser" value="'+result.a+'"></td>  </tr>';

    //console.log(result.b);
    container.append(element);
    $(this).prop("disabled", true);
    tableCreate.updateOrAddData([{id: selected, BTN:"disabled"}]);
    tableCreate.redraw();

});

//Unselect User
$("#tbody-selected-user").on("click",".removeUser",function(){
    // alert($(this).val())
    let removedValue = $(this).closest("tr").find(".removeUser").val();
    let container = $("#table-create");
    var rows = container.find(".tabulator-row");

    console.log(removedValue);
    tableCreate.updateOrAddData([{id:removedValue, BTN:""}]);
    tableCreate.redraw();
    /* let row = tableCreate.getRow(removedValue);  
    if (row) {
        row.update({BTN: "disabled"});  
    } */

    
    /* for (var i = 0; i < rows.length; i++){
        
        if(removedValue == rows.eq(i).find(".selectUser").val()){
            rows.eq(i).find(".selectUser").prop("disabled", false);
        }
    } */
    // console.log(rows.length)
    $(this).closest("tr").remove();

});

//Search User
$("#txtSearchAddMember").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableSearchUser tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// EDIT WORKSPACE

//DISPLAY USER ROW BUT DISABLED BUTTON IF SELECTED
function populateEditUserRow(selectedUser){
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    userList = userList.filter(user => user.a != 1);

    userList.forEach(item => {
        item.id = item.a;
        item.NAME = item.c +' '+ item.b;
        item.DEPT = setDepartment(item.e);
        item.BTN = "";
        let isSelected = false;

        for(var j = 0; j < selectedUser.length; j++){
            if(selectedUser[j].b == item.a){
                isSelected = true;
                break;
            }
        }

        if(isSelected == true){
            item.BTN = "disabled";
        }

    });

    // console.log(userList);

    tableModify = new Tabulator("#table-modify", {
        pagination: "local", // Enable local pagination
        paginationSize: 5, // Number of rows per page
        paginationSizeSelector: [5,10, 25], // Page size options
        page: 1, // Initial page number
        data: userList,
        layout: "fitDataFill", // Adjust table height based on the data
        columns: [
            {title: "id", field: "id", visible: false},
            {title: "RID", field: "a", visible: false},
            {title: "#", formatter: "rownum", headerFilter: "input"},
            {title: "NAME", field: "NAME", headerFilter: "input"},
            {title: "DEPARTMENT", field: "DEPT", headerFilter: "input"},
            {title: "Action", field:"BTN", formatter: function(cell){
                let rowData = cell.getRow().getData();

                return '<button class="btn btn-success selectUser" value="'+rowData.a+'" '+cell.getValue()+'>Select</button>';
            },  hozAlign: "left", headerSort: false, frozen:true},
        ],
    });

    /* var row = '';

    for (var i = 0; i < userList.length; i++) {
        let isSelected = false;

        if(userCode != userList[i].a){

            for(var j = 0; j < selectedUser.length; j++){
                if(selectedUser[j].b == userList[i].a){
                    isSelected = true;
                    break;
                }
            }

            let disabledDesc = (isSelected == true)? "disabled":"";

            row += '<tr class="rowUser"> <td>'+userList[i].b+', '+userList[i].c+'</td> <td>'+setDepartment(userList[i].e)+'</td> <td><button class="btn btn-success selectUser" value="'+userList[i].a+'" '+disabledDesc+'>Select</button></td> </tr>';
        }

        // if(isSelected == true)
    }
    
    return row; */
}

function populateEditSelectedRow(selectedUser){
    let userList = JSON.parse(localStorage.getItem(lsUserList));
    let container = $("#tbody-edit-selected-user");
    let row = '';

    for(let i = 0; i < selectedUser.length; i++){
        var result = userList.find(function(value){
            return value.a === selectedUser[i].b;
        });
    
        let element = '<tr class="selectedRow"> <td>'+result.b+', '+result.c+'</td> <td>'+setDepartment(result.e)+'</td><td><select class="form-control selectMemberRole">'+populateEditMemberRole(selectedUser[i].c)+'</select></td> <td><button class="btn btn-danger removeUser" value="'+result.a+'">Remove</button> <input type="hidden" class="txtEditSelectedUser" value="'+result.a+'"><input type="hidden" class="txtMemberID" value="'+selectedUser[i].a+'"> </td>  </tr>';
        
        row += element

    }
    
    container.html(row);

}

function populateEditMemberRole(selectedRole){
    let list = JSON.parse(localStorage.getItem(lsWorkspaceMemberRoleList));

    let element = '';

    for(let index = 0; index < list.length; index++){
        let selectedDesc = (selectedRole == list[index].a)? "selected":"";

        element += '<option value="'+list[index].a +'" '+selectedDesc+'>'+list[index].b +'</option>'

    }

    return element;


}


//Select User
$("#table-modify").on("click",".selectUser",function(){
    let selected = $(this).val();
    let userList = JSON.parse(localStorage.getItem(lsUserList));

    var result = userList.find(function(value){
        return value.a === selected;
    });

    let container = $("#tbody-edit-selected-user");

    let element = '<tr class="selectedRow"> <td>'+result.b+', '+result.c+'</td> <td>'+setDepartment(result.e)+'</td><td><select class="form-control selectMemberRole">'+populateEditMemberRole("2")+'</select></td> <td><button class="btn btn-danger removeUser" value="'+result.a+'">Remove</button> <input type="hidden" class="txtEditSelectedUser" value="'+result.a+'"> <input type="hidden" class="txtMemberID"></td>  </tr>';

    //console.log(result.b);
    container.append(element);
    $(this).prop("disabled", true);
    tableModify.updateOrAddData([{id: selected, BTN:"disabled"}]);
    tableModify.redraw();


});
//Unselect User
$("#tbody-edit-selected-user").on("click",".removeUser",function(){
    // alert($(this).val())
    let removedValue = $(this).closest("tr").find(".removeUser").val();
    let container = $("#table-modify");
    var rows = container.find(".tabulator-row");

    tableModify.updateOrAddData([{id:removedValue, BTN:""}]);
    tableModify.redraw();
    
    /* for (var i = 0; i < rows.length; i++){
        
        if(removedValue == rows.eq(i).find(".selectUser").val()){
            rows.eq(i).find(".selectUser").prop("disabled", false);
            console.log("REMOVED");
        }
    } */
    // console.log(rows.length)
    $(this).closest("tr").remove();

});


//Search User
$("#txtEditSearchAddMember").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableEditSearchUser tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

