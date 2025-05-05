<div id="modalAddAssignee" class="modal fade">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add Assignee</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="radio">
                    <label><input type="radio" name="rdoAssigneeType" checked>Members Only</label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="rdoAssigneeType">All</label>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <select class="" id="selectAssignee"></select>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnUpdateAssignee">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>