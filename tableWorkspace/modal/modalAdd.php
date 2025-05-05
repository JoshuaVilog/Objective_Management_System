<div id="modalAdd" class="modal fade">
  <div class="modal-dialog" style="width: 75%">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add Workspace</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label>Description:</label>
                        <input type="text" class="form-control" id="txtDesc" oninput="this.value = this.value.toUpperCase()">
                    </div>
                    <div class="form-group">
                        <label>Department:</label>
                        <select class="form-control" id="selectDepartment"></select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>Year:</label>
                        <select class="form-control" id="selectYear"></select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-12">
                    <h4>Add Contributor</h4>
                    <div id="table-create"></div>
                    <!-- <div class="form-group">
                        <label for="">Search User:</label>
                        <input type="text" class="form-control" id="txtSearchAddMember" placeholder="Search User...">
                    </div>
                    <div id="tableSearchUser">
                        <div class="table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Department</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-search-user">
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Department</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div> -->
                </div>
                <div class="col-sm-6 col-sm-12">
                    <h4>Selected Contributor</h4>
                    <div id="tableSelectedUser">
                            <div class="table table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Department</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-selected-user">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnAdd">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>