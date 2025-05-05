<div id="modalEdit" class="modal fade">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modify Project</h4>
            </div>
            <div class="modal-body" id="modal-body-edit">
                <div class="form-group">
                    <label>Project Description:</label>
                    <input type="text" class="form-control" id="txtEditDesc">
                </div>
                <div class="form-group">
                    <label>Target Date:</label>
                    <input type="date" class="form-control" id="txtEditTargetDate">
                </div>
                <div class="form-group">
                    <label>Project Details:</label>
                    <!-- <input type="text" class="form-control" id="txtEditDetails"> -->
                    <textarea class="form-control" id="txtEditDetails" rows="3"></textarea>
                </div>
                <input type="hidden" id="hiddenEditId">

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btnEdit">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>
    </div>
</div>