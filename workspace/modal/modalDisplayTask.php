<div id="modalDisplayTask" class="modal fade">
    <div class="modal-dialog" style="width: 95%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 id="spanDisplayTaskDesc">
                </h4>
            </div>
            <div class="modal-body" id="modal-body-display-task">
                <input type="hidden" id="hiddenDisplayTaskID">
                <input type="hidden" id="hiddenDisplayActivityID">

                <p>
                    <button class="btn btn-yellow btn-sm text-dark" id="btnBackToTask">
                        <i class="ace-icon fa fa-reply icon-only"></i>
                        Back to Task
                    </button>
                </p>
                <p>
                    <button class="btn btn-yellow btn-sm text-dark" id="btnBackToSubtask">
                        <i class="ace-icon fa fa-reply icon-only"></i>
                        Back to Subtask
                    </button>
                </p>
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
                                                <select class="form-control" id="selectDisplayTaskStatus"></select>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-3">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Priority</strong>
                                                </label>
                                                <select class="form-control" id="selectDisplayTaskPriority"></select>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Due Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="txtDisplayTaskDueDate">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Start Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="txtDisplayTaskStartDate">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Finish Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="txtDisplayTaskFinishDate">
                                            </div>
                                        </div>
                                        

                                    </div>

                                    <div class="row">
                                        <div class="col-xl-12 col-sm-4">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Assignee</strong>
                                                </label>
                                                <!-- <select class="" id="selectDisplayTaskAssignee" style="width: 100%; height:36px"></select> -->
                                                <select class="form-control" id="selectDisplayTaskAssignee" style="width: 100%"></select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="form-group">
                                        <label>
                                            <strong>Details:</strong>
                                        </label>
                                         <textarea class="form-control" id="txtDisplayTaskDetails" rows="5"></textarea>
                                    </div>

                                    <hr>
                                    <div id="containerSubtaskRecord">
                                        <div id="containerButtonSubtask">
                                            <p>
                                                <button class="btn btn-primary" id="btnOpenAddSubtask">Add Subtask</button>
                                            </p>
                                        </div>
                                        <div id="containerAddSubtask">
                                            <div class="col-sm-6">
                                                <p>
                                                    <div class="form-group">
                                                        <label>Add Subtask Description:</label>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="txtSubtaskDesc">
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-success btn-sm" id="btnAddSubtask">
                                                                    <span>Save</span>
                                                                </button>
                                                                <button class="btn btn-danger btn-sm" id="btnCancelAddSubtask">
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
                                                <div id="tableRecordSubtask"></div>
                                            </div>
                                        </div>
                                    </div>

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
                                                            <input placeholder="Type your message here ..." type="text" class="form-control" id="txtTaskCommentDesc" />
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-sm btn-info no-radius" type="button" id="btnAddTaskComment">
                                                                    <i class="ace-icon fa fa-share"></i>
                                                                    Send
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div class="dialogs" id="containerComment" style="height: 350px"></div>

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
                                                <div class="dialogs" id="containerTaskActivityHistory" style="height: 300px"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <?php 

                include "modal/dropDownSubtask.php";
                include "modal/dropDownComment.php";

                ?>

            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div> -->
        </div>
    </div>
</div>

<!-- THIS CODE IS NOT USING, THE NEW CODE IS LOCATED IN 1_OKRMS/getModals/modalDisplayTask/-->