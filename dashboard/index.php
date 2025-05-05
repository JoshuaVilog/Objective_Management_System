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
						<h2 class="text-warning">Dashboard</h2>

						<!-- ==================DASHBOARD USER========================= -->
						<div id="dashboardUser">
							<div class="row">
								<div class="col-sm-2 col-xs-12">
									<div class="form-group">
										<label for="">SELECT YEAR:</label>
										<select id="selectYearDashboardUser" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>My Total Task</strong>
										</h4>
										<h2 id="countMyTotalTask">0</h2>
									</div>
								</div>
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>My Incomplete Task</strong>
										</h4>
										<h2 id="countMyIncompleteTask">0</h2>
									</div>
								</div>
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>My Completed Task</strong>
										</h4>
										<h2 id="countMyCompletedTask">0</h2>
									</div>
								</div>
							</div>

							
							<div class="row">
								<div class='col-xs-12 col-sm-6'>
									<div class="widget-box widget-color-orange " style="">
										<div class="widget-body">
											<div class="widget-main">
												<p><h3>My Task</h3></p>
												<div class="row">
													<div class="col-xs-12 col-sm-12">
														<div id="tableRecord1"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class='col-xs-12 col-sm-6'>
									<div class="row">
										<div class="col-sm-12">
											<div class="widget-box widget-color-orange ">
												<div class="widget-body">
													<div class="widget-main">
														<div id="chart1"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12">
											<div class="widget-box widget-color-orange " id="containerTaskForApproving" style="display:none">
												<div class="widget-body">
													<div class="widget-main">
														<h4>LIST OF TASK "FOR APPROVING"</h4>
														<hr>
														<div class="row">
															<div class="col-xs-12 col-sm-5">
																<div class="form-group">
																	<label for="">Select Workspace:</label>
																	<select class="" id="selectWorkspace3" style="width:100%"></select>
																	<input type="hidden" id="txtMemberListWorkspace">
																</div>
															</div>
															<div class="col-xs-12 col-sm-7">
																<div class="pull-right" style="margin: 5px">
																	<button class="btn btn-success btn-sm" id="btnApproveAllTask">Approve All</button>
																</div>
															</div>
														</div>
														<div id="taskForApprovingByWorkspaceRecord"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ================== DASHBOARD ADMIN ========================= -->
						<div id="dashboardAdmin">
							<div class="row">
								<div class="col-sm-2 col-xs-12">
									<div class="form-group">
										<label for="">SELECT YEAR:</label>
										<select id="selectYearDashboardAdmin" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>Workspace</strong>
										</h4>
										<h2 id="countWorkspace">0</h2>
									</div>
								</div>
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>Total Task</strong>
										</h4>
										<h2 id="countTotalTask">0</h2>
									</div>
								</div>
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>Incomplete Task</strong>
										</h4>
										<h2 id="countIncompleteTask">0</h2>
									</div>
								</div>
								<div class='col-xs-12 col-sm-3 mb-4'>
									<div class='well well-lg'>
										<h4>
											<strong>Completed Task</strong>
										</h4>
										<h2 id="countCompletedTask">0</h2>
									</div>
								</div>
							</div>
							<hr>
							
							<div class="row" id="containerDashboardWorkspace"></div>
							<!-- <div class="row" id="containerDashboardWorkspaces">
								<div class="col-xs-12 col-sm-3 widget-container-col ui-sortable" id="widget-container-col-5" style="min-height: 104px;">
									<div class='widget-box ui-sortable-handle'>
										<div class="widget-body">
											<table class="table table-bordered">
												<thead>
													<tr>
														<th colspan="4" class="dbText center">SCH24_MIS</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class="dbText center">TO-DO</td>
														<td class="dbText center">ON-GOING</td>
														<td class="dbText center">COMPLETE</td>
														<td class="dbText center">PENDING</td>
													</tr>
													<tr>
														<td class="dbText center">1</td>
														<td class="dbText center">2</td>
														<td class="dbText center">3</td>
														<td class="dbText center">3</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-xs-12 col-sm-3 widget-container-col ui-sortable" id="widget-container-col-5" style="min-height: 104px;">
									<div class='widget-box ui-sortable-handle'>
										<div class="widget-body">
											<table class="table table-bordered">
												<thead>
													<tr>
														<th colspan="4" class="dbText center">SCH24_MIS</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class="dbText center">TO-DO</td>
														<td class="dbText center">ON-GOING</td>
														<td class="dbText center">COMPLETE</td>
														<td class="dbText center">PENDING</td>
													</tr>
													<tr>
														<td class="dbText center">1</td>
														<td class="dbText center">2</td>
														<td class="dbText center">3</td>
														<td class="dbText center">3</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-xs-12 col-sm-4 widget-container-col ui-sortable" id="widget-container-col-5">
									<div class='widget-box ui-sortable-handle'>
										<div class="widget-body">
											<table class="table table-bordered">
												<thead>
													<tr>
														<th colspan="4" class="dbText center">SCH24_MIS</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class="dbText center">TO-DO</td>
														<td class="dbText center">ON-GOING</td>
														<td class="dbText center">COMPLETE</td>
														<td class="dbText center">PENDING</td>
													</tr>
													<tr>
														<td class="dbText center">1</td>
														<td class="dbText center">2</td>
														<td class="dbText center">3</td>
														<td class="dbText center">3</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>

								
							</div> -->

							<!-- <div class="row">
								<div class="col-xs-12">
									<div id="main-widget-container" class="invisible">
										<div class="row">
											<div class="col-sm-4 col-xs-12 .widget-container-col ui-sortable-handle " >
												<div class="widget-box widget-color-dark light-border ui-sortable-handle" id="widget-box-6" style="opacity: 1;">
													<div class="widget-header">
														<h5 class="widget-title smaller">With Badge</h5>

														<div class="widget-toolbar">
															<span class="badge badge-danger">Alert</span>
														</div>
													</div>

													<div class="widget-body">
														<div class="widget-main padding-6">
															<div class="alert alert-info"> Hello World! </div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-sm-4 col-xs-12 .widget-container-col ui-sortable-handle ">
												<div class="widget-box widget-color-dark light-border ui-sortable-handle" id="widget-box-6" style="opacity: 1;">
													<div class="widget-header">
														<h5 class="widget-title smaller">With Badge</h5>

														<div class="widget-toolbar">
															<span class="badge badge-danger">Alert</span>
														</div>
													</div>

													<div class="widget-body">
														<div class="widget-main padding-6">
															<div class="alert alert-info"> Hello World! </div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> -->
							<hr>
							<!-- <h2>Overall Task Record</h2> -->
							<h2>WORKSPACE</h2>
							<div class="row">
								<div class='col-xs-12 col-sm-12'>
									<div class="widget-box widget-color-orange">
										<div class="widget-body">
											<div class="widget-main">
												<button class="btn btn-success btn-sm" id="btnExportAllTask">Export Task</button>
												<div class="pull-right">
													<button class="btn btn-info btn-sm" id="btnOpenAllTask">Open All</button>
													<button class="btn btn-warning btn-sm" id="btnCloseAllTask">Close All</button>
												</div>
												
												<div id="tableRecord3"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<hr>
							<!-- <h2>Workspace</h2> -->
							<!-- <div class="row">
								<div class='col-xs-12 col-sm-12'>
									<div class="widget-box widget-color-orange">
										<div class="widget-body">
											<div class="widget-main">
												<div class="row">
													<div class="col-xs-12 col-sm-2">
														<div class="form-group">
															<label>Select Workspace:</label>
															<select class="form-control" id="selectWorkspace2"></select>
														</div>
													</div>
												</div>
												<div class="row">
													<div class='col-xs-12 col-sm-6'>
														<div class="widget-box widget-color-orange ">
															<div class="widget-body">
																<div class="widget-main">
																	<div id="chart2"></div>
																</div>
															</div>
														</div>
													</div>
													<div class='col-xs-12 col-sm-6'>
														<div class="widget-box widget-color-orange ">
															<div class="widget-body">
																<div class="widget-main">
																	<input type="hidden" id="txtArrayMembers">
																	<div id="chart3"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="row" id="containerDashboard2">
													<div class='col-xs-12 col-sm-12'>
														<div class="widget-box widget-color-orange ">
															<div class="widget-body">
																<div class="widget-main">
																	<p><h3>All Task</h3></p>
																	<div class="row">
																		<div class="col-xs-12 col-sm-12">
																			<div id="tableRecord2"></div>
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
							</div> -->
						</div>
						

						
					</div>
				</div>
			</div>
			<?php
			include "../getModals/modalDisplayTask/modalDisplayTask.php";
			include "../getModals/modalDisplayAllTaskByWorkspace/modalDisplayAllTaskByWorkspace.php";
 
			include "../getModals/dropdown/dropDownTask.php";
			?>

			<?php include "../footer.php";?>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->
        <?php include "../script.php";?>
		<script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<script src="js/table.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<script src="js/select.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<script src="js/widget.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
