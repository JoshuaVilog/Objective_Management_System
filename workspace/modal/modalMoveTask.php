<div id="modalMoveTask" class="modal fade">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Move Task</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Select Category:</label>
                    <select class="" id="selectMT_Category" style="width:100%"></select>
                </div>
                <div class="form-group">
                    <label>Select Activity:</label>
                    <select class="" id="selectMT_Activity" style="width:100%"></select>
                </div>
                <div class="form-group">
                    <label>Select Task:</label>
                    <select class="" id="selectMT_Task" style="width:100%"></select>
                </div>
                <input type="hidden" id="hiddenMoveTaskID">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btnMoveTask">Move</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>
    </div>
</div>