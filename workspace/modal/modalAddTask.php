<div id="modalAddTask" class="modal fade">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add Task</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Task Description:</label>
                    <input type="text" class="form-control" id="txtTaskDesc">
                </div>
                <div class="form-group">
                    <label>Task Due Date:</label>
                    <input type="date" class="form-control" id="txtTaskDueDate" max="2999-12-31">
                </div>
                <input type="hidden" id="hiddenActivityID">
                <input type="hidden" id="hiddenTaskID">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btnAddTask">Submit</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>
    </div>
</div>