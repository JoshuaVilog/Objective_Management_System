<div id="modalAddUser" class="modal fade">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Last Name:</label>
                        <input type="text" class="form-control" id="txtLastname" oninput="this.value = this.value.toUpperCase()">
                    </div>
                    <div class="form-group">
                        <label>First Name:</label>
                        <input type="text" class="form-control" id="txtFirstname" oninput="this.value = this.value.toUpperCase()">
                    </div>
                    <div class="form-group">
                        <label>Middle Name:</label>
                        <input type="text" class="form-control" id="txtMiddlename" oninput="this.value = this.value.toUpperCase()">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="text" class="form-control" id="txtEmail">
                    </div>
                    <div class="form-group">
                        <label class="">Department:</label>
                        <select class="" id="selectDepartment" style="width:100%;"></select>
                    </div>
                    <!-- <div class="form-group">
                        <label>Position:</label>
                        <select class="" id="selectPosition" style="width:100%;"></select>
                    </div> -->
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" class="form-control" id="txtUsername">
                    </div>
                    <div class="form-group">
                        <label>User Role:</label>
                        <select class="form-control" id="selectRole">
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="">Department2:</label>
                        <select class="" id="selectDepartment2" style="width:100%;" multiple></select>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnAddUser">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>