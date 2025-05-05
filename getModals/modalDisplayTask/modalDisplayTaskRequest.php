<div id="modalDisplayTaskRequest" class="modal fade">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Task Request</h4>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>TASK:</label>
                <input type="text" class="form-control disabled text-dark" id="txtDisplayTaskRequestDesc">
            </div>
            <div class="form-group">
                <label>TARGET DATE:</label>
                <input type="text" class="form-control disabled text-dark" id="txtDisplayTaskRequestTargetDate" >
            </div>
            <div class="form-group">
                <label>REQUESTED BY:</label>
                <input type="text" class="form-control disabled text-dark" id="txtDisplayTaskRequestRequestedBy">
            </div>
            <input type="hidden" id="hiddenMessageRequestRemarks">
            <input type="hidden" id="hiddenMessageRequestRemarksTaskID">
            <input type="hidden" id="hiddenMessageRequestID">
            <input type="hidden" id="hiddenMessageRequestorID">
        </div>
        <div class="modal-footer">
            <button class="btn btn-success" id="btnTaskRequestApprove">Confirm</button>
            <!-- <button class="btn btn-danger" id="btnTaskRequestDecline">Decline</button> -->
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>