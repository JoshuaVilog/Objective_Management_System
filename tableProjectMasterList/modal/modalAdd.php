<div id="modalAdd" class="modal fade">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add Project</h4>
        </div>
        <div class="modal-body" id="formAdd">
            <div class="form-group">
                <label>Project Description: <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="txtDesc" required>
            </div>
            <div class="form-group">
                <label>Department: <span class="text-danger">*</span></label>
                <select id="selectDepartment" style="width: 100%" required></select>
            </div>
            <div class="form-group">
                <label>Target Date: <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="txtTargetDate" required>
            </div>
            <div class="form-group">
                <label>Project Details:</label>
                <textarea class="form-control" id="txtProjectDetails" cols="" rows="3"></textarea>
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-12">
                    <h4>Add Contributor</h4>
                    <div class="form-group">
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
                    </div>
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
                                    <tfoot>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Department</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
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