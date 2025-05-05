<div id="modalEdit" class="modal fade">
  <div class="modal-dialog" style="width:85%">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Edit Description</h4>
        </div>
        <div class="modal-body" id="modal-body-edit">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label>Description:</label>
                        <input type="text" class="form-control" id="txtEditDesc" oninput="this.value = this.value.toUpperCase()">
                    </div>
                    <div class="form-group">
                        <label>Department:</label>
                        <select class="form-control" id="selectEditDepartment"></select>
                    </div>
                </div>
            </div>
            <input type="hidden" id="hiddenID">
            <div class="row">
                <div class="col-sm-6 col-sm-12">
                    <h4>Add Contributor</h4>
                    <div id="table-modify"></div>
                    <!-- <div class="form-group">
                        <label for="">Search User:</label>
                        <input type="text" class="form-control" id="txtEditSearchAddMember" placeholder="Search User...">
                    </div>
                    
                    <div id="tableEditSearchUser">
                        <div class="table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Department</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-edit-search-user">
                                    
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
                    <div id="tableEditSelectedUser">
                            <div class="table table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Department</th>
                                            <th>Member Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-edit-selected-user">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnEdit">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>