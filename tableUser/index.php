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
                            <h1>User Management</h1>
                        </div>

                        <div class="tabbable">
                            <ul class="nav nav-tabs" id="myTab">
                                <li class="active" id="liUserTable">
                                    <a data-toggle="tab" href="#tabUserTable" aria-expanded="true" >
                                        User Management
                                    </a>
                                </li>

                                <li class="" id="liLoginHistory">
                                    <a data-toggle="tab" href="#tabLoginHistory" aria-expanded="false" >
                                        Login History
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div id="tabUserTable" class="tab-pane fade active in">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-12 pricing-box">
                                            <div class="widget-box widget-color-orange">
                                                <div class="widget-header">
                                                    <h5 class="widget-title bigger lighter">User List</h5>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div class="col">
                                                            <button type="button" class="btn btn-primary" id="btnOpenModalAddUser">Add User</button>
                                                            <button type="button" class="btn btn-info" id="btnExport">Export</button>
                                                        </div>
                                                        <div id="table-user"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tabLoginHistory" class="tab-pane fade">
                                    <div id="table-login-history"></div>
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
            include "modal/modalAddUser.php";
            include "modal/modalEditUser.php";
            ?>
		</div>
        <?php include "../script.php";?>
        <script src="js/tableUser.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/select.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
