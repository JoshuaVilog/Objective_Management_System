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
                            <h1>Import</h1>
                        </div>
						<div class="row">
                            <div class="col-xs-6 col-sm-12 pricing-box">
                                <div class="widget-box widget-color-orange">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Import Task</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <!-- <div class="row">
                                                <p><span class="text-danger">NOTE: &nbsp;</span> Yung task muna na ang iimport bago ang subtask</p>
                                            </div> -->
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="">Select Workspace:</label>
                                                        <select class="" id="selectWorkspace" style="width: 100%"></select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="">Select Category:</label>
                                                        <select class="" id="selectCategory" style="width: 100%"></select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="">Select Activity:</label>
                                                        <select class="" id="selectActivity" style="width: 100%"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <form class="form-group">
                                                        <label class ="control-label">Import Excel:</label>
                                                        <input type="file" class="" id="fileInput">
                                                        <button type="button" class="btn btn-success" id="btnImport">Import</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div id="table-records"></div>
                                            
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <button class="btn btn-success" id="btnSubmit">Submit</button>
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

			<?php include "../footer.php";?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>

            <!-- MODAL  -->
            <?php
            include "modal/modalAdd.php";
            include "modal/modalEdit.php";
            ?>
		</div>
        <?php include "../script.php";?>
        <script src="js/table.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<!-- <script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script> -->
	</body>
</html>
