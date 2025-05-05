<div id="modalViewStatus" class="modal fade">
    <div class="modal-dialog" style="width: 60%">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Schedule Information</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>
                                <strong>NAME OF REQUESTOR:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewRequestor">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>
                                <strong>DEPARTMENT:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewDepartment">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>
                                <strong>SUBJECT:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewSubject">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label>
                                <strong>DATE:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewDate">
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <label>
                                <strong>START TIME:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewStartTime">
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <label>
                                <strong>END TIME:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewEndTime">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>
                                <strong>ROOM:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewRoom">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>
                                <strong>CATEGORY:</strong>
                            </label>
                            <input type="text" class="form-control disabled" id="viewCategory">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>
                                <strong>ATTENDEES:</strong>
                            </label>
                            <ul id="ulViewAttendees"></ul>
                        </div>
                    </div>
                </div>
                <div id="containerViewVisitor">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>
                                    <strong>VISITOR TYPE:</strong>
                                </label>
                                <input type="text" class="form-control disabled" id="viewVisitorType">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>
                                    <strong>VISITORS</strong>
                                </label>
                                <ul id="ulViewVisitors"></ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>
                                    <strong>ITEMS TO BE PREPARED:</strong>
                                </label>
                                <ul id="ulViewItemsToPrepared"></ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>

                <h4>Schedule Status:</h4>
                <div id="table-sched-status-list"></div>
            </div>
            <div class="modal-footer">
                <!-- <button class="btn btn-primary" id="btnAdd">Submit</button> -->
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>

    </div>
</div>