<div id="modalCheckSched" class="modal fade">
  <div class="modal-dialog" style="width: 60%">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" id="headerChkTitle"></h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="">
                            <strong>SUBJECT:</strong>
                        </label>
                        <input type="text" id="txtChkDescription" class="form-control disabled">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label for="">
                            <strong>DATE:</strong>
                        </label>
                        <input type="date" id="txtChkDate" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3 col-xs-12">
                    <label for="">
                        <strong>START TIME:</strong>
                    </label>
                    <select id="selectChkStartTime" class="form-control"></select>
                </div>
                <div class="col-sm-3 col-xs-12">
                    <div class="form-group">
                        <label for="">
                            <strong>END TIME:</strong>
                        </label>
                        <select id="selectChkEndTime" class="form-control"></select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-xs-12">
                    <label for="">
                        <strong>ROOM:</strong>
                    </label>
                    <select id="selectChkRoom" class="form-control"></select>
                </div>
                <div class="col-sm-6 col-xs-12"></div>
            </div>
            <hr>
            <input type="hidden" id="hiddenSchedID">
            <div class="row">
                <div class="col-sm-6 col-xs-12" style="display: inline-flex;">
                    <button class="btn btn-primary" id="btnCheckAvailability">CHECK RESERVATIONS</button>
                    <!-- <i class="ace-icon fa fa-spinner fa-spin orange bigger-125" id="iSpinner"></i> -->
                    <h4 id="displayAvailStatus" style="margin-left: 10px;"></h4>
                </div>
                <div class="col-sm-6">
                    <div style="float: right;">
                        <button class="btn btn-primary" id="btnChkAccept" disabled>ACCEPT</button>
                        <button class="btn btn-danger" id="btnChkDecline" disabled>DECLINE</button>
                        <button class="btn btn-primary" id="btnChkUpdate" style="display: none;" disabled>UPDATE</button>
                    </div>
                    <input type="hidden" id="hiddenChkStatus">
                </div>
            </div>
            <hr>
            <h4>Schedule for&nbsp;<span id="spanDisplayDate"></span></h4>
            <div id="table-record-sched-by-date"></div>
        </div>
    </div>

  </div>
</div>