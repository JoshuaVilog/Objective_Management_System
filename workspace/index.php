<!DOCTYPE html>
<html lang="en">
	
    <?php include "../header.php";?>

	<body class="no-skin">
		<?php include "../navbar.php";?>

		<div class="main-container ace-save-state" id="main-container">
			<script type="text/javascript">
				try{ace.settings.loadState('main-container')}catch(e){}
			</script>

			<?php include "../sidebar.php";?>
			<div class="main-content">
				<div class="main-content-inner">
					<div class="page-content">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-3">
                                        <div class="row">
                                            <div class="col-sm-4 col-xs-12">
                                                <div class="form-group">
                                                    <label for="">
                                                        <strong>Year:</strong>
                                                    </label>
                                                    <select id="selectYear" style="width:100%; height:45px; font-size: 20px"></select>
                                                </div>
                                            </div>
                                            <div class="col-sm-8 col-xs-12">
                                                <div class="form-group">
                                                    <label for="">
                                                        <strong>Select Workspace:</strong>
                                                    </label>
                                                    <select class="form-control" id="selectWorkspace" style="width:100%; height:45px; font-size: 20px"></select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div style="margin:15px">
                                            <ul class="nav nav-pills">
                                                <li class="active" id="liTabWorkspace1">
                                                    <a href="#tabWorkspace1" data-toggle="tab" id="aTabWorkspace1">Workspace</a>
                                                </li>

                                                <li class="" id="liTabWorkspace2">
                                                    <a href="#tabWorkspace2" data-toggle="tab" id="aTabWorkspace2">Dashboard</a>
                                                </li>

                                                <li>
                                                    <a href="#tabWorkspace3" data-toggle="tab" id="aTabWorkspace3">Calendar</a>
                                                </li>
                                                <!-- <li>
                                                    <a href="#tabWorkspace4" data-toggle="tab">Dashboard</a>
                                                </li> -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style="margin-top:5px; margin-bottom:5px">
                        
                        <div class="tab-content no-border">
                            <div id="tabWorkspace1" class="tab-pane fade active in">
                                <div class="row" id="workspaceFullDiv">
                                    <div class="col-xs-12 col-sm-2" style="">
                                        <div class="widget-box widget-color-orange " id="workspaceFirstDiv" style="min-height: 1000px; ">
                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <div id="containerCategory">
                                                        <div class="tabbable">
                                                            <ul class="nav nav-tabs" id="myTab">
                                                                <li class="active">
                                                                    <a data-toggle="tab" href="#tabCategory" aria-expanded="true">
                                                                        Categories
                                                                    </a>
                                                                </li>

                                                                <li class="">
                                                                    <a data-toggle="tab" href="#tabMember" aria-expanded="false">
                                                                        Members
                                                                    </a>
                                                                </li>
                                                            </ul>

                                                            <div class="tab-content">
                                                                <div id="tabCategory" class="tab-pane fade active in">
                                                                    <p>Categories:</p>
                                                                    <button class="btn btn-primary form-control" id="btnOpenModalAddCategory">
                                                                        Add Category
                                                                    </button>
                                                                    <hr>
                                                                    <div id="listCategory">
                                                                        <!-- 
                                                                        <li class="dd-item selectCategory">
                                                                            <div class="dd-handle">
                                                                                <span>Category 1</span>
                                                                                <div class="pull-right action-buttons">
                                                                                    <a class="blue btnEditCategory" href="#">
                                                                                        <i class="ace-icon fa fa-pencil-square-o"></i>
                                                                                    </a>

                                                                                    <a class="red" href="#">
                                                                                        <i class="ace-icon fa fa-trash-o"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        -->

                                                                        <!-- <li class="dd-item">
                                                                            <div class="dd-handle">
                                                                                <span>Category 2</span>
                                                                                <div class="pull-right action-buttons">
                                                                                    <a class="blue btnEditCategory" href="#">
                                                                                        <i class="ace-icon fa fa-pencil-square-o"></i>
                                                                                    </a>

                                                                                    <a class="red" href="#">
                                                                                        <i class="ace-icon fa fa-trash-o"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div class="dd-handle">
                                                                                <div class="input-group">
                                                                                    <input type="text" class="form-control txtEditCategory">
                                                                                    <span class="input-group-btn">
                                                                                        <button class="btn btn-success btn-xs">
                                                                                            <i class="ace-icon glyphicon glyphicon-ok"></i>
                                                                                        </button>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </li> 
                                                                        -->
                                                                        
                                                                    </div>
                                                                </div>

                                                                <div id="tabMember" class="tab-pane fade">
                                                                    <h4>Members:</h4>
                                                                    <ul id="listMembers">

                                                                    </ul>
                                                                    <input type="hidden" id="txtArrayMembers">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <!-- 2nd TABLE -->
                                    <div class="col-xs-12 col-sm-10">
                                        <div class="widget-box widget-color-orange" id="workspaceSecondDiv" style="min-height: 1000px">
                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <div id="containerActivity">
                                                        <h3 id="displayCategoryName"></h3>
                                                        <input type="hidden" id="hiddenCategoryID">
                                                        <hr>
                                                        <p>
                                                            <button class="btn btn-primary" id="btnOpenModalAddActivity">Add Activity</button>
                                                        </p>
                                                        
                                                        <div class="tabbable">
                                                            <ul class="nav nav-tabs" id="myTab">
                                                                <li class="active">
                                                                    <a data-toggle="tab" href="#tabActivity1" aria-expanded="true">
                                                                        List
                                                                    </a>
                                                                </li>

                                                                <li class="">
                                                                    <a data-toggle="tab" href="#tabActivity2" aria-expanded="false" id="aSelectDashboard">
                                                                        Dashboard
                                                                    </a>
                                                                </li>

                                                            </ul>

                                                            <div class="tab-content">
                                                                <div id="tabActivity1" class="tab-pane fade active in">
                                                                
                                                                    <div id="listActivity" class="panel-group accordion-style-1 accordion-style-2">

                                                                        <!-- <div class="panel panel-default">
                                                                            <div class="panel-heading">
                                                                                <a href="#panelActivity" data-parent="#listActivity" data-toggle="collapse" class="text-dark accordion-toggle collapsed selectActivityPanel" aria-expanded="false">
                                                                                    <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                                                    <span class="spanActivityDesc"></span>
                                                                                    <input type="text" class="hiddenPanelActivityID" value="">
                                                                                </a>
                                                                                <div class="pull-right action-buttons">
                                                                                    <a class="blue" href="#">
                                                                                        <i class="ace-icon fa fa-pencil bigger-130 btnEditActivity"></i>
                                                                                    </a>

                                                                                    <a class="red" href="#">
                                                                                        <i class="ace-icon fa fa-trash-o bigger-130 btnRemoveActivity"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div class="panel-collapse collapse" id="panelActivity" aria-expanded="false">
                                                                                <div class="panel-body">
                                                                                    <div id="containerTask" class="allContainerTask">
                                                                                        <p>
                                                                                            <button class="btn btn-primary btnOpenModalAddTask" value="">Add Task</button>
                                                                                        </p>
                                                                                        <hr>
                                                                                        <div id="#tableTaskRecords"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div> -->

                                                                    </div>
                                                                </div>

                                                                <div id="tabActivity2" class="tab-pane fade">
                                                                    <div class="row">
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Total Task</strong>
                                                                                </h4>
                                                                                <h3 id="countTotalTask">0</h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Incompleted Task</strong>
                                                                                </h4>
                                                                                <h3 id="countIncompleteTask">0</h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Completed Task</strong>
                                                                                </h4>
                                                                                <h3 id="countCompletedTask">0</h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Task without Assignee</strong>
                                                                                </h4>
                                                                                <h3 id="countTaskNoAssignee">0</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Pending Task</strong>
                                                                                </h4>
                                                                                <h3 id="countPendingTask">0</h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class='col-xs-12 col-sm-3 mb-4'>
                                                                            <div class='well well-lg'>
                                                                                <h4>
                                                                                    <strong>Task w/o Target Date</strong>
                                                                                </h4>
                                                                                <h3 id="countTaskNoTargetDate">0</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xs-12 col-sm-6">
                                                                            <div id="chart1">Charts will load here!</div>
                                                                        </div>
                                                                        <div class="col-xs-12 col-sm-6">
                                                                            <div id="chart2">Charts will load here!</div>
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

                            <div id="tabWorkspace2" class="tab-pane fade">

                                <div class="widget-box widget-color-orange" id="" style="min-height: 1000px">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <h4>Dashboard</h4>
                                            
                                            <div class="row">
                                                <div class='col-xs-12 col-sm-3 mb-4'>
                                                    <div class='well well-lg'>
                                                        <h4>
                                                            <strong>Completed Task</strong>
                                                        </h4>
                                                        <h3 id="countWorkspaceTotalCompleted">0</h3>
                                                    </div>
                                                </div>
                                                <div class='col-xs-12 col-sm-3 mb-4'>
                                                    <div class='well well-lg'>
                                                        <h4>
                                                            <strong>Incompleted Task</strong>
                                                        </h4>
                                                        <h3 id="countWorkspaceTotalIncompleted">0</h3>
                                                    </div>
                                                </div>
                                                <div class='col-xs-12 col-sm-3 mb-4'>
                                                    <div class='well well-lg'>
                                                        <h4>
                                                            <strong>For Approval</strong>
                                                        </h4>
                                                        <h3 id="countWorkspaceTotalForApproval">0</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-8">
                                                    <div id="chart3"></div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div id="chart4"></div>
                                                </div>
                                            </div>
                                            <hr>
                                            <p>
                                                <button class="btn btn-success btn-sm" id="btnExportAllTask">Export Task</button>
                                            </p>
                                            <div class="panel-group accordion">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <a href="#panelForApproving" data-parent="#" data-toggle="collapse" class="text-dark accordion-toggle collapsed" aria-expanded="false">
                                                            <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                            <span class="">FOR APPROVAL</span>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse in" id="panelForApproving" aria-expanded="false">
                                                        <div class="panel-body">
                                                            <div id="tableDashboardTaskForApproving"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <a href="#panelPending" data-parent="#" data-toggle="collapse" class="text-dark accordion-toggle collapsed" aria-expanded="false">
                                                            <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                            <span class="">PENDING</span>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse in" id="panelPending" aria-expanded="false">
                                                        <div class="panel-body">
                                                            <div id="tableDashboardTaskPending"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <a href="#panelOnGoing" data-parent="#" data-toggle="collapse" class="text-dark accordion-toggle collapsed" aria-expanded="false">
                                                            <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                            <span class="">ON-GOING</span>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse in" id="panelOnGoing" aria-expanded="false">
                                                        <div class="panel-body">
                                                            <div id="tableDashboardTaskOngoing"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <a href="#panelToDo" data-parent="#" data-toggle="collapse" class="text-dark accordion-toggle collapsed" aria-expanded="false">
                                                            <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                            <span class="">TO-DO</span>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse in" id="panelToDo" aria-expanded="false">
                                                        <div class="panel-body">
                                                            <div id="tableDashboardTaskTodo"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <a href="#panelComplete" data-parent="#" data-toggle="collapse" class="text-dark accordion-toggle collapsed" aria-expanded="false">
                                                            <i class="smaller-80 ace-icon fa fa-chevron-right" data-icon-hide="ace-icon fa fa-chevron-down align-top" data-icon-show="ace-icon fa fa-chevron-right"></i>&nbsp; 
                                                            <span class="">COMPLETED</span>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="panelComplete" aria-expanded="false">
                                                        <div class="panel-body">
                                                            <div id="tableDashboardTaskCompleted"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>

                                
                                
                            </div>

                            <div id="tabWorkspace3" class=""><!-- tab-pane fade -->
                                <div id="containerCalendar">
                                    <h3>Calendar</h3>
                                    <div class="row">
                                        <div class="col-sm-10">
                                            <div id="calendar"></div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div id="external-events">
                                                <div class="external-event label-grey">
                                                    <i class="ace-icon fa fa-bookmark"></i>
                                                    For Approving
                                                </div>
                                                <div class="external-event label-important">
                                                    <i class="ace-icon fa fa-bookmark"></i>
                                                    Delay
                                                </div>
                                                <div class="external-event label-success">
                                                    <i class="ace-icon fa fa-bookmark"></i>
                                                    Done
                                                </div>
                                                <div class="external-event label-yellow">
                                                    <i class="ace-icon fa fa-bookmark"></i>
                                                    To-Do
                                                </div>
                                                <div class="external-event label-primary">
                                                    <i class="ace-icon fa fa-bookmark"></i>
                                                    On-going
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div id="tabWorkspace4" class="tab-pane fade">
                                <h3>Dashboard</h3>
                            </div> -->
                        </div>
					</div>
				</div>
			</div>

            

			<?php include "../footer.php";?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>

            <!-- MODAL  -->
            <?php
            include "modal/modalAddCategory.php";
            include "modal/modalAddActivity.php";
            include "modal/modalAddTask.php";
            // include "modal/modalDisplayTask.php"; // SHOW MODAL TASK INFO
            // include "modal/modalDisplayActionItem.php";
            include "../getModals/modalDisplayTask/modalDisplayTask.php";
            // include "../getModals/modalAddAssignee/modalAssignee.php"; //USELESS CODE
            include "../getModals/modal/modalMoveTask.php";

            include "modal/modalEditCategory.php";
            include "modal/modalEditActivity.php";

            include "../getModals/dropdown/dropDownTask.php";
            include "../getModals/dropdown/dropDownDiv1.php";
            include "../getModals/dropdown/dropDownDiv2.php";
            include "../getModals/dropdown/dropDownDiv3.php";
            ?>
		</div>
        <?php include "../script.php";?>

        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/calendar.js?v=<?php echo $generateRandomNumber; ?>"></script>
        
        <!-- <script src="js/dashboard.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/display.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/select.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/remove.js?v=<?php echo $generateRandomNumber; ?>"></script> -->
        
	</body>
</html>
