
// $("#menuTableUser").addClass("active");
let folderLoc = "tableProjectMasterList";

getUser();
disablePreviousDate($("#txtTargetDate"));

$("#btnOpenModalAdd").click(function(){

    $("#selectDepartment").html(populateDepartment());
    $("#tbody-search-user").html(populateUserRow());
    $("#modalAdd").modal("show");
});


function populateUserRow(){

    let userList = JSON.parse(localStorage.getItem(lsUserList));
    // let departmentList = JSON.parse(localStorage.getItem(lsDepartmentList));

    var row = '';

    for (var i = 0; i < userList.length; i++) {
        if(userCode != userList[i].a){
            row += '<tr class="rowUser"> <td>'+userList[i].b+', '+userList[i].c+'</td> <td>'+setDepartment(userList[i].e)+'</td> <td><button class="btn btn-success selectUser" value="'+userList[i].a+'">Select</button></td> </tr>';
        }
    }
    
    return row;
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

$("#tbody-search-user").on("click",".selectUser",function(){
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

});

$("#tbody-selected-user").on("click",".removeUser",function(){
    // alert($(this).val())
    let removedValue = $(this).closest("tr").find(".removeUser").val();
    let container = $("#tbody-search-user");
    var rows = container.find(".rowUser");
    
    for (var i = 0; i < rows.length; i++){
        
        if(removedValue == rows.eq(i).find(".selectUser").val()){
            rows.eq(i).find(".selectUser").prop("disabled", false);
        }
    }
    // console.log(rows.length)
    $(this).closest("tr").remove();

});

$("#txtSearchAddMember").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableSearchUser tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});