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
                        <div class="page-header">
                            <h1>OKR</h1>
                        </div>
                        <div class="row" id="containerSelect1" style="display: none;">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="">
                                        <strong>Select Department:</strong>
                                    </label>
                                    <select class="form-control" id="selectDepartment" style="width:100%; height:45px; font-size: 18px"></select>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="">
                                        <strong>Select Members:</strong>
                                    </label>
                                    <select class="form-control" id="selectMember" style="width:100%; height:45px; font-size: 18px">
                                    <option value="">-Select-</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="hiddenSelectedDepartmentID">
                        <input type="hidden" id="hiddenSelectedEmployeeID">
                        
						<div class="row">
                            <div class="col-sm-4" id="containerKPIList">
                                <div class="widget-box widget-color-orange" style="min-height: 1000px">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label for="">
                                                            <strong>Year:</strong>
                                                        </label>
                                                        <select id="selectYear" class="form-control"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary btn-minier" id="btnExport">Export</button>
                                            <div id="table-all-kpi"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8 pricing-box" id="containerKPI">
                                <div class="widget-box widget-color-orange" style="min-height: 1000px">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div id="containerUserInfo" style="display: none; font-size: 20px">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <b>Name:</b>
                                                        <span id="spanDisplayName"></span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <b>Department:</b>
                                                        <span id="spanDisplayDepartment"></span>
                                                    </div>
                                                </div>
                                                <hr>
                                            </div>
                                            <!-- CONTAINER 1 -->
                                            <div id="kpiContainer1" style="display: none">
                                                <button id="btnOpenModalAdd" class="btn btn-primary">CREATE KPI</button>
                                            </div>

                                            <!-- CONTAINER 2 -->
                                            <div id="kpiContainer2" style="display: none">
                                                
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <button id="btnOpenModalEdit" class="btn btn-primary btn-minier">Edit KPI</button>
                                                        <button id="btnGenerateKPI" class="btn btn-success btn-minier">Print KPI</button>
                                                        <button id="btnRemoveKPI" class="btn btn-danger btn-minier">Delete KPI</button>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="pull-right">
                                                            <!-- <button id="btnExport" class="btn btn-success btn-minier">Export to Excel</button> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <input type="hidden" id="hiddenDisplayKPI">
                                                <div id="table-display-kpi"></div>
                                                <div class="row">
                                                    <div class="col-sm-4"></div>
                                                    <div class="col-sm-8">
                                                        <table class="table table-bordered">
                                                            <tr>
                                                                <td colspan="2" class="center">1Q</td>
                                                                <td colspan="2" class="center">2Q</td>
                                                                <td colspan="2" class="center">3Q</td>
                                                                <td colspan="2" class="center">4Q</td>
                                                                <td colspan="2" class="center">Result</td>
                                                            </tr>
                                                            <tr>
                                                                <!-- <td class="center">Result</td> -->
                                                                <td class="center">Score</td>
                                                                <td class="center">Grade</td>
                                                                <!-- <td class="center">Result</td> -->
                                                                <td class="center">Score</td>
                                                                <td class="center">Grade</td>
                                                                <!-- <td class="center">Result</td> -->
                                                                <td class="center">Score</td>
                                                                <td class="center">Grade</td>
                                                                <!-- <td class="center">Result</td> -->
                                                                <td class="center">Score</td>
                                                                <td class="center">Grade</td>
                                                                <!-- <td class="center">Result</td> -->
                                                                <td class="center">Score</td>
                                                                <td class="center">Grade</td>
                                                                
                                                            </tr>
                                                            <tr>
                                                                <!-- <td id="tdDisplay1QR" class="center"></td> -->
                                                                <td id="tdDisplay1QS" class="center"></td>
                                                                <td id="tdDisplay1QG" class="center"></td>
                                                                <!-- <td id="tdDisplay2QR" class="center"></td> -->
                                                                <td id="tdDisplay2QS" class="center"></td>
                                                                <td id="tdDisplay2QG" class="center"></td>
                                                                <!-- <td id="tdDisplay3QR" class="center"></td> -->
                                                                <td id="tdDisplay3QS" class="center"></td>
                                                                <td id="tdDisplay3QG" class="center"></td>
                                                                <!-- <td id="tdDisplay4QR" class="center"></td> -->
                                                                <td id="tdDisplay4QS" class="center"></td>
                                                                <td id="tdDisplay4QG" class="center"></td>
                                                                <!-- <td id="tdDisplayRR" class="center"></td> -->
                                                                <td id="tdDisplayRS" class="center"></td>
                                                                <td id="tdDisplayRG" class="center"></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>

                        <div class="row" id="containerGenerateSelectedKPI">
                            <div class="col-sm-12">
                                <div id="table-generate-selected-user-kpi"></div>
                            </div>
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
            include "modal/modalAdd.php";
            include "modal/modalEdit.php";
            include "modal/modalViewFiles.php";
            // include "modal/modalView.php";
            ?>
		</div>
        <?php include "../script.php";?>
        <script src="js/table.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/select.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
