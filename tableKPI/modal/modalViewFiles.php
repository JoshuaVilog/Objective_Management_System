<div id="modalViewFiles" class="modal fade">
    <div class="modal-dialog" style="width:50%">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">View Attachments</h4>
            </div>
            <div class="modal-body" id="">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="">
                                <strong>Upload Attachment:</strong>
                            </label>
                            <div class="input-group">
                                <input type="file" id="fileUploadAttachment" class="form-control" multiple>
                                <div class="input-group-btn">
                                    <button class="btn btn-success btn-sm" id="btnUploadAttachment">Upload Attachment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style="margin:5px;">
                <div id="containerKpiListFileAttachments"></div>

                <input type="hidden" id="hiddenKPIListID">
            </div>
            <div class="modal-footer">
                <!-- <button class="btn btn-primary" id="btnEdit">Submit</button> -->
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>

    </div>
</div>
