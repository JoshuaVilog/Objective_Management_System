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
                            <h1>Profile</h1>
                        </div>
						<div class="row">
                            <div class="col-xs-6 col-sm-12 pricing-box">
                                <div class="widget-box widget-color-orange">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Account Profile</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="row">
                                                <div class="col-xs-6 col-sm-4">
                                                    <div class="form-group">
                                                        <label>Last Name:</label>
                                                        <input type="text" id="txtLastName" class="form-control">
                                                    </div>
                                                </div>
                                                <div class=" col-xs-6 col-sm-4">
                                                    <div class="form-group">
                                                        <label>First Name:</label>
                                                        <input type="text" id="txtFirstName" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-sm-4">
                                                    <div class="form-group">
                                                        <label>Middle Name:</label>
                                                        <input type="text" id="txtMiddleName" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Username:</label>
                                                <input type="text" id="txtUsername" class="form-control">
                                            </div>
                                            <hr />
                                            <div>
                                                <button class="btn btn-primary" id="btnSaveUsername">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>

                        <div class="row">
                            <div class="col-xs-6 col-sm-12 pricing-box">
                                <div class="widget-box widget-color-orange">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Email</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="form-group">
                                                <label>Email:</label>
                                                <input type="text" id="txtEmail" class="form-control">
                                            </div>
                                            <div>
                                                <button class="btn btn-primary" id="btnSaveEmail">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>

                        <div class="row">
                            <div class="col-xs-6 col-sm-12 pricing-box">
                                <div class="widget-box widget-color-orange">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Account Password</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="form-group">
                                                <label>Old Password:</label>
                                                <input type="password" id="txtOldPassword" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>New Password:</label>
                                                <input type="password" id="txtNewPassword" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Retype Password:</label>
                                                <input type="password" id="txtRetypePassword" class="form-control">
                                            </div>
                                            <hr />
                                            <div>
                                                <button class="btn btn-primary" id="btnSavePassword">Save</button>
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
		</div><!-- /.main-container -->
        <?php include "../script.php";?>
        <script src="js/functions.js"></script>
		
	</body>
</html>
