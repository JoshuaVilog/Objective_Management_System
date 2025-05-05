<div id="modalDisplayTask" class="modal fade">
    <div class="modal-dialog" style="width: 95%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 id="spanDisplayTaskDesc">
                </h4>
            </div>
            <div class="modal-body" id="modal-body-display-task">
                <input type="hidden" id="hiddenIfTaskUpdate">
                <input type="hidden" id="hiddenDisplayTaskID">
                <input type="hidden" id="hiddenDisplayActivityID">
                <input type="hidden" id="hiddenDisplayWorkspaceID">
                <input type="hidden" id="hiddenDisplayTaskParentID">
                <input type="hidden" id="hiddenDisplaySubtaskParentID">

                <div class="row" style="margin-bottom: 5px; margin-top:5px">
                    <div class="col-sm-6">
                        <button class="btn btn-yellow btn-sm text-dark" id="btnBackToTask">
                            <i class="ace-icon fa fa-reply icon-only"></i>
                            Back to Task
                        </button>
                        <button class="btn btn-yellow btn-sm text-dark" id="btnBackToSubtask">
                            <i class="ace-icon fa fa-reply icon-only"></i>
                            Back to Subtask
                        </button>
                    </div>
                    
                </div>
                   

                
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
                                                <input type="text" id="txtDisplayTaskStatus" class="form-control disabled">
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
                                                <input type="date" class="form-control" id="txtDisplayTaskDueDate" max="2999-12-31">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Start Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="txtDisplayTaskStartDate" max="2999-12-31">
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-sm-2">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Finish Date</strong>
                                                </label>
                                                <input type="date" class="form-control" id="txtDisplayTaskFinishDate" max="2999-12-31">
                                            </div>
                                        </div>
                                        

                                    </div>

                                    <div class="row">
                                        
                                        <div class="col-xl-12 col-sm-4">
                                            
                                            <div id="containerDisplayAssignee">
                                                <div class="form-group">
                                                    <label>
                                                        <strong>Assignee</strong>
                                                    </label>
                                                    <!-- <select class="form-control" id="selectDisplayTaskAssignee" style="width: 100%"></select> -->
                                                    <h5 id="pDisplayTaskAssignee"></h5>
                                                    <button class="btn btn-minier btn-primary" id="btnChangeAssignee">Change Assignee</button>
                                                    <button class="btn btn-minier btn-primary" id="btnNotifyRequest">Notify Assignee</button>
                                                    <button class="btn btn-sm btn-primary" id="btnAcceptTaskRequest">Accept Task</button>
                                                    <input type="hidden" id="hiddenDisplayTaskRequestorID">
                                                    <input type="hidden" id="hiddenDisplayTaskAssigneeID">
                                                </div>
                                            </div>

                                            <div id="containerChangeAssignee">
                                                <div class="form-group">
                                                    <label>
                                                        <strong>Select Assignee:</strong>
                                                    </label>
                                                    <select class="form-control" id="selectDisplayTaskAssignee" style="width: 100%"></select>
                                                </div>
                                                <div class="form-group">
                                                    <div class="checkbox">
                                                        <label><input type="checkbox" id="chkCheckShowAllUser" value="">Check to show all users.</label>
                                                    </div>
                                                </div>
                                                <button class="btn btn-minier btn-danger" id="btnCancelChangeAssignee">Cancel Change</button>
                                                
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="col-xl-12 col-sm-4">
                                            <div class="form-group">
                                                <label>
                                                    <strong>Task Created By:</strong>
                                                </label>
                                                <h5 id="pDisplayTaskCreatedBy"></h5>
                                                <input type="hidden" id="hiddenDisplayTaskCreatedBy">
                                            </div>

                                        </div>

                                        <input type="hidden" id="txtMemberListWorkspace">
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

                    <div class="col-sm-4" id="containerDisplay2">
                        <div class="widget-box widget-color-orange" style="min-height: 800px">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="tabbable">
                                        <ul class="nav nav-tabs" id="myTab">
                                            <li class="active" id="liTaskCategory1">
                                                <a data-toggle="tab" href="#tabTaskCategory1" aria-expanded="true">
                                                    Comment
                                                </a>
                                            </li>

                                            <li class="" id="liTaskCategory2">
                                                <a data-toggle="tab" href="#tabTaskCategory2" aria-expanded="false">
                                                    History
                                                </a>
                                            </li>
                                            <li class="" id="liTaskCategory3">
                                                <a data-toggle="tab" href="#tabTaskCategory3" aria-expanded="false">
                                                    Result
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div id="tabTaskCategory1" class="tab-pane fade in active ">

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

                                                            <div class="dialogs" id="containerComment" style="height: 280px"></div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <hr style="margin-top: 10px; margin-bottom: 5px">

                                                
                                                <div class="row">
                                                    <!-- <p>
                                                        <button class="btn btn-sm btn-success" id="btnUploadFiles">Upload</button>
                                                    </p> -->
                                                    <!-- <label class="ace-file-input ace-file-multiple">
                                                        <input multiple="" type="file" id="fileTaskUpload">
                                                    </label> -->
                                                    <div class="col-xs-12">
                                                        <!-- <label class="ace-file-input">
                                                            <input type="file" id="id-input-file-2">
                                                            <span class="ace-file-container" data-title="Choose">
                                                                <span class="ace-file-name" data-title="No File ...">
                                                                    <i class=" ace-icon fa fa-upload"></i>
                                                                </span>
                                                            </span>
                                                            <a class="remove" href="#">
                                                                <i class=" ace-icon fa fa-times"></i>
                                                            </a>
                                                        </label> -->
                                                        <div class="form-group">
                                                            <label>
                                                                <strong>Upload Attachments:</strong>
                                                            </label>
                                                            <div class="input-group">
                                                                <span class="input-group-addon">
                                                                    <i class="ace-icon fa fa-upload"></i>
                                                                </span>
                                                                <input type="file" class="form-control" id="txtDisplayTaskFile" multiple>
                                                                <span class="input-group-btn">
                                                                    <button type="button" class="btn btn-success btn-sm" id="btnUploadFiles">
                                                                        Upload
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="dd-list" style="height:200px; overflow-y:scroll">
                                                            <div id="containerTaskFileAttachments">
                                                                
                                                            </div>
                                                            <!-- <div class="dd-handle">
																<a href="#">item</a>
																<div class="pull-right action-buttons">
																	<a class="red" href="#">
																		<i class="ace-icon fa fa-trash-o bigger-130"></i>
																	</a>
																</div>
															</div> -->
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div id="tabTaskCategory2" class="tab-pane fade">
                                                <div class="widget-box">
                                                    <div class="widget-header">
                                                        <h4 class="widget-title lighter smaller">
                                                            Task Activity History
                                                        </h4>
                                                    </div>
                                                    <div class="widget-body">
                                                        <div class="widget-main no-padding">
                                                            <div class="dialogs" id="containerTaskActivityHistory" style="height: 600px"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="tabTaskCategory3" class="tab-pane fade">
                                                <div id="containerDivTaskApprover">
                                                    <div class="form-group">
                                                        <label>
                                                            <strong>Remarks:</strong>
                                                        </label>
                                                        <textarea class="form-control" id="txtTaskApproverComment" rows="5"></textarea>
                                                    </div>
                                                    <button class="btn btn-success btn-sm text-dark" id="btnApproveTask">
                                                        Approve
                                                    </button>
                                                    &nbsp;
                                                    <button class="btn btn-danger btn-sm text-dark" id="btnDisapproveTask">
                                                        Disapprove
                                                    </button>
                                                </div>
                                                <hr>
                                                <div class="widget-box">
                                                    <div class="widget-header">
                                                        <h4 class="widget-title lighter smaller">
                                                            Approver Comment:
                                                        </h4>
                                                    </div>
                                                    <div class="widget-body">
                                                        <div class="widget-main no-padding">
                                                            <div class="dialogs" id="containerTaskApproverComment" style="height: 400px">

                                                                <!-- <div class="itemdiv dialogdiv divApproverComment"> 
                                                                    <div class="user"> 
                                                                        <img alt="" src="" /> 
                                                                    </div> 
                                                                    <div class="body"> 
                                                                        <div class="time"> 
                                                                            <span>2024-04-30 00:00:00</span> 
                                                                            <i class="ace-icon fa fa-cog"></i> 
                                                                        </div> 
                                                                        <div class="name white">.</div> 
                                                                        <div class="text"><strong>KR KIM approved the task.</strong></div> 
                                                                        <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, quas facere perspiciatis velit ea debitis voluptates. Magni, velit alias quisquam reprehenderit natus cum facere. Nemo vero assumenda harum beatae accusamus!</div> 
                                                                    </div> 
                                                                </div> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <?php 

                include "dropDownSubtask.php";
                include "dropDownComment.php";

                ?>

            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div> -->
        </div>
    </div>
</div>