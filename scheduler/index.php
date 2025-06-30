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
                        <!-- <div class="page-header">
                            <h2>Meeting Scheduler</h2>
                        </div> -->
                        <style>
                            body {
                                font-family: Tahoma, sans-serif;
                            }
                            #table-sched-container{
                                overflow-x: auto;
                                white-space: nowrap;
                            }
                            table {
                                /* width: 100%; */
                                border-collapse: collapse;
                                
                            }
                            #schedule-table th, #schedule-table td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: center;
                                /* position: relative; */
                                min-width: 170px;
                                max-width: 170px;
                            }
                            #tableColorMenu td{
                                border: 1px solid black;
                                padding: 8px;
                                text-align: center;
                                min-width: 100px;
                                max-width: 100px;
                            }
                            th {
                                background-color: #ddd;
                            }
                            .thTime{
                                max-width:20px;
                                min-width:20px;
                            }
                            .tdMeeting{
                                word-wrap: break-word;
                                white-space: normal;
                                overflow-wrap: break-word;
                                
                            }
                            .pDesc{
                                color: black;
                                text-align: center;

                            }
                            .meeting {
                                
                                background-color: #4A90E2;
                                color: white;
                                padding: 10px;
                                border-radius: 5px;
                                display: block;
                                width: 110px;
                                position: absolute; /* Ensure positioning within the table cell */
                                top: 0; /* Adjust based on start time */
                                height: 100%; /* Adjust based on duration */
                                min-width: 150px;
                                max-width: 150px;
                            }
                            #schedule-table .sticky-column{
                                position: -webkit-sticky; /* For Safari */
                                position: sticky;
                                left: 0;
                                background-color: #E5E4E2; /* Hide the background of the sticky column */
                                z-index: 1; /* Ensure it stays above other columns */
                                border: solid 1px black;
                            }
                            /* #tableColorMenu td{
                                width: 10px;
                            } */

                        </style>
                        <div class="tabbable">
                            <ul class="nav nav-tabs" id="myTab">
                                <li class="active">
                                    <a data-toggle="tab" href="#tab1" aria-expanded="true">
                                        FORM
                                    </a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" href="#tab2" aria-expanded="false" id="aTabApproving">
                                        APPROVING
                                    </a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" href="#tab3" aria-expanded="false" id="aTabOverAll">
                                        OVERALL SCHEDULE
                                    </a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" href="#tab4" aria-expanded="false" id="aTabOverAllList">
                                        OVERALL LIST
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div id="tab1" class="tab-pane fade active in">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="widget-box widget-color-orange ui-sortable-handle">
                                                <div class="widget-header">
                                                    <h6 class="widget-title">FORM</h6>
                                                </div>
                                                <div class="widget-body" style="display: block;">
                                                    <div class="widget-main " >
                                                        <!-- <div class="scroll-track scroll-active" style="display: block; height: 300px;">
                                                            <div class="scroll-bar" style="height: 8px; top: 0px;"></div>
                                                        </div> -->
                                                        <div class="" >
                                                            <div class="content" style="padding: 10px">
                                                                <div class="row">
                                                                    <div class="col-sm-6 col-xs-12">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>SUBJECT:</strong>
                                                                            </label>
                                                                            <input type="text" id="txtDescription" class="form-control">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-4 col-xs-12">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>DEPARTMENT:</strong>
                                                                            </label>
                                                                            <select id="selectDepartmentSched" class="form-control"></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-sm-3 col-xs-12">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>DATE PERIOD:</strong>
                                                                            </label>
                                                                            <select id="selectDatePeriod" class="form-control">
                                                                                <option value="ONE">ONE DATE ONLY</option>
                                                                                <option value="MULTIPLE">MULTIPLE DATES</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div id="divPeriod1">
                                                                        <div class="col-sm-3 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>DATE:</strong>
                                                                                </label>
                                                                                <input type="date" id="txtDate" class="form-control">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="divPeriod2" style="display: none;">
                                                                        <div class="col-sm-3 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>START DATE:</strong>
                                                                                </label>
                                                                                <input type="date" id="txtStartDate" class="form-control">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-3 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>END DATE:</strong>
                                                                                </label>
                                                                                <input type="date" id="txtEndDate" class="form-control">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-sm-3 col-xs-12">
                                                                        <label for="">
                                                                            <strong>START TIME:</strong>
                                                                        </label>
                                                                        <select id="selectStartTime" class="form-control"></select>
                                                                        <!-- <input type="time" id="txtStartTime" class="form-control"> -->
                                                                    </div>
                                                                    <div class="col-sm-3 col-xs-12">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>END TIME:</strong>
                                                                            </label>
                                                                            <select id="selectEndTime" class="form-control"></select>
                                                                            <!-- <input type="time" id="txtEndTime" class="form-control"> -->
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="col-sm-4 col-xs-12">
                                                                        <label for="">
                                                                            <strong>ROOM:</strong>
                                                                        </label>
                                                                        <select id="selectRoom" class="form-control"></select>
                                                                    </div>
                                                                    <div class="col-sm-6 col-xs-12">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>ATTENDEES:</strong>
                                                                            </label>
                                                                            <select id="selectAttendees" class="form-control" multiple></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <div class="form-group">
                                                                            <label for="">
                                                                                <strong>CATEGORY:</strong>
                                                                            </label>
                                                                            <select id="selectCategory" class="form-control"></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="containerVisitorForm">
                                                                    <hr>
                                                                    <div class="row">
                                                                        <div class="col-sm-6">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>VISITOR TYPE:</strong>
                                                                                </label>
                                                                                <select id="selectVisitorType" class="form-control"></select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-sm-12">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>VISITORS:</strong>
                                                                                </label>
                                                                                <div id="table-add-visitor"></div>
                                                                                <button class="btn btn-primary btn-sm" id="btnAddVisitorRow">Add Visitor +</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr>
                                                                    <div class="row">
                                                                        <div class="col-sm-12">
                                                                            <div class="form-group">
                                                                                <label for="">
                                                                                    <strong>ITEMS TO BE PREAPRED:</strong>
                                                                                </label>
                                                                                <div id="containerChkBoxItemToPrepared"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                


                                                                <hr>
                                                                <input type="hidden" id="hiddenEditSchedID">
                                                                <button id="btnSave" class="btn btn-success btn-lg">Submit</button>
                                                                <button id="btnUpdateSched" class="btn btn-success btn-lg" style="display: none;">Update</button>
                                                                <button id="btnCancelUpdateSched" class="btn btn-danger btn-lg" style="display: none;">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="widget-box widget-color-orange" style="min-height: 500px;" id="containerApprovingMenu" style="display: none;">
                                                <div class="widget-header">
                                                    <h5 class="widget-title bigger lighter">Request List</h5>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div id="table-request-list"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab2" class="tab-pane fade">
                                    <div class="widget-box widget-color-orange" style="min-height: 500px;" id="containerApprovingMenu" style="display: none;">
                                        <div class="widget-header">
                                            <h5 class="widget-title bigger lighter">Approving Menu</h5>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <!-- <button class="btn btn-success" id="btnExport">Export</button> -->
                                                <div id="table-approving-sched"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab3" class="tab-pane fade">
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="form-group">
                                                        <label>
                                                            <strong>SELECT:</strong>
                                                        </label>
                                                        <select id="selectTypeRange" class="form-control">
                                                            <option value="DAY">SELECT DAY</option>
                                                            <option value="CUSTOM">CUSTOM RANGE</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="containerTypeRangeDay">
                                                <div class="row">
                                                    <div class="col-sm-12 col-xs-12">
                                                        <label for="">
                                                            <strong>SELECT DAY:</strong>
                                                        </label>
                                                        <input type="date" id="dateSelectDay" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="containerTypeRangeCustom" style="display:none;">
                                                <div class="row">
                                                    <div class="col-sm-12 col-xs-12">
                                                        <label for="">
                                                            <strong>START DATE:</strong>
                                                        </label>
                                                        <input type="date" id="dateStartDateSched" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12 col-xs-12">
                                                        <div class="form-group">
                                                            <label for="">
                                                                <strong>END DATE:</strong>
                                                            </label>
                                                            <input type="date" id="dateEndDateSched" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <button class="btn btn-primary" id="btnSyncData">Sync Data</button> -->
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="form-group">
                                                        <label>
                                                            <strong>Filter Room:</strong>
                                                        </label>
                                                        <div class="checkbox">
                                                            <label><input type="checkbox" id="chkSelectAll" value="" checked>Select/Unselect All</label>
                                                        </div>
                                                        <div id="containerChkBoxRoom"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="tableColorMenu">
                                                        <tbody>
                                                            <tr>
                                                                <td style="background-color: #fce4d6;"></td>
                                                                <td>HRGA</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #F67280;"></td>
                                                                <td>FACILITIES</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #C3FDB8;"></td>
                                                                <td>SCM</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #b4c6e7;"></td>
                                                                <td>SALES</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #92d050;"></td>
                                                                <td>INJECTION</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #E799A3"></td>
                                                                <td>PLANNING</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #00ffff;"></td>
                                                                <td>QM</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #FF6347;"></td>
                                                                <td>ENGINEER</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #C48793;"></td>
                                                                <td>SPA</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="background-color: #ffff99;"></td>
                                                                <td>MANCOM</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-10">
                                            <div id="table-sched-container">
                                                <table id="schedule-table"></table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab4" class="tab-pane fade">
                                    <div class="widget-box widget-color-orange" style="min-height: 500px;">
                                        <div class="widget-header">
                                            <h5 class="widget-title bigger lighter">LIST</h5>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <button class="btn btn-success" id="btnExport">Export</button>
                                                <div id="table-overall-sched"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- <div class="widget-box transparent ui-sortable-handle" id="widget-box-12">
                            <div class="widget-header">
                                <h1 class="widget-title lighter">Meeting Scheduler</h1>
                                <div class="widget-toolbar no-border">
                                    <a href="#" data-action="collapse">
                                        <i class="ace-icon fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="widget-body" style="display: block; padding:10px;">
                                
                        
                            </div>
                        </div> -->
					</div>
				</div>
			</div>

			<?php include "../footer.php";?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>

            <!-- MODAL  -->
            <?php
            include "modal/modalCheckSched.php";
            include "modal/modalViewStatus.php";
            ?>
		</div>
        <?php include "../script.php";?>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/display.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
