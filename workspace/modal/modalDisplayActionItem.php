<div id="modalDisplayTask" class="modal fade">
    <div class="modal-dialog" style="width: 75%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 id="">
                </h4>
            </div>
            <div class="modal-body" id="modal-body-display-action-item">
                <!-- <input type="hidden" id="hiddenDisplayTaskID">
                <input type="hidden" id="hiddenDisplayActivityID"> -->

                <div class="row">
                    <div class="col-sm-8">
                        <div class="widget-box widget-color-orange" style="min-height: 800px">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="row">
                                        <div class="col-xl-12 col-sm-3">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Status</strong>
                                                </label>
                                                <select class="form-control" id=""></select>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-3">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Priority</strong>
                                                </label>
                                                <select class="form-control" id=""></select>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Due Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Start Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Finish Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="">
                                            </div>
                                        </div>
                                        

                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12 col-sm-3">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Assignee</strong>
                                                </label>
                                                <select class="" id="" style="width: 100%; height:36px"></select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="form-group">
                                        <label>
                                            <strong>Details:</strong>
                                        </label>
                                         <textarea class="form-control" id="" rows="5"></textarea>
                                    </div>

                                    <hr>

                                    <div id="containerActionItemRecord">
                                        <div id="containerButtonActionItem">
                                            <p>
                                                <button class="btn btn-primary" id="btnOpenAddActionItem">Add Action Item</button>
                                            </p>
                                        </div>
                                        <div id="containerAddActionItem">
                                            <div class="col-sm-6">
                                                <p>
                                                    <div class="form-group">
                                                        <label>Add Action Item Description:</label>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="txtActionItemDesc">
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-success btn-sm" id="btnAddActionItem">
                                                                    <span>Save</span>
                                                                </button>
                                                                <button class="btn btn-danger btn-sm" id="btnCancelAddActionItem">
                                                                    <span>Cancel</span>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div id="tableRecordActionItem"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">

                        <div class="widget-box widget-color-orange" style="min-height: 800px">
                            <div class="widget-body">
                                <div class="widget-main">

                                    <!-- Comment -->
                                    <div class="widget-box" >
                                        <div class="widget-header">
                                            <h4 class="widget-title lighter smaller">
                                                <i class="ace-icon fa fa-comment blue"></i>
                                                Conversation
                                            </h4>
                                        </div>

                                        <div class="widget-body">
                                            <div class="widget-main no-padding">
                                                <form>
                                                    <div class="form-actions">
                                                        <div class="input-group">
                                                            <input placeholder="Type your message here ..." type="text" class="form-control" id="" />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-sm btn-info no-radius" type="button" id="">
                                                                    <i class="ace-icon fa fa-share"></i>
                                                                    Send
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div class="dialogs" id="" style="height: 350px"></div>

                                            </div>
                                        </div>
                                    </div>
                                    <hr style="margin-top: 10px; margin-bottom: 10px">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4 class="widget-title lighter smaller">
                                                Task Activity History
                                            </h4>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main no-padding">
                                                <div class="dialogs" id="" style="height: 300px"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <?php 

                // include "modal/dropDownSubtask.php";
                // include "modal/dropDownComment.php";

                ?>

            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div> -->
        </div>
    </div>
</div>