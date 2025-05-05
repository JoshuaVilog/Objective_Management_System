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
                            <h1>Inbox</h1>
                        </div>
						<div class="row">
                            
                            <div class="col-xs-6 col-sm-6 pricing-box">
                                <div class="widget-box widget-color-orange" style="min-height: 1000px">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Task Request</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <!-- <div id="table-records"></div> -->
                                            <div id="containerTaskRequest">

                                                <!-- <li class="dd-item dd2-item" data-id="13">
													<div class="dd-handle dd2-handle">
														<i class="normal-icon ace-icon fa fa-comments bigger-130"></i>

														<i class="drag-icon ace-icon fa fa-arrows bigger-125"></i>
													</div>
													<div class="dd2-content">You accepted the Task Request for Joshua Vilog. 
                                                        <a href="#">Show the task</a>
                                                    </div> 
                                                    <div class="pull-right action-buttons"> 
                                                        <a class="blue btnEditCategory" href="#"> 
                                                            <i class="ace-icon fa fa-pencil-square-o"></i> 
                                                        </a>  
                                                    </div>
												</li> -->

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 pricing-box">
                                <div class="widget-box widget-color-orange" style="min-height: 1000px">
                                    <div class="widget-header">
                                        <h5 class="widget-title bigger lighter">Task Approval</h5>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <!-- <div id="table-records"></div> -->
                                            <div id="containerTaskApproval" class="">

                                                <!-- <div class="itemdiv dialogdiv">
                                                    <div class="user"> </div> 
                                                    <div class="body"> 
                                                        
                                                        <div class="text"> MHARK JOSHUA LEONYLL VILOG is assigning a Task for you. Show the task</div>
                                                        <div class="time"> 
                                                            <span>2024-04-24 00:00:00</span> 
                                                            <i class="ace-icon fa fa-cog"></i> 
                                                        </div> 
                                                        <div class="name">
                                                            
                                                            <a href="#" class="">Show the Task</a>
                                                            <span>TASK</span>
                                                        </div>
                                                    </div> 
                                                </div> -->

                                                

                                                <!-- <li class="dd-item dd2-item" data-id="13">
													<div class="dd-handle dd2-handle">
														<i class="normal-icon ace-icon fa fa-comments bigger-130"></i>

														<i class="drag-icon ace-icon fa fa-arrows bigger-125"></i>
													</div>
													<div class="dd2-content">You accepted the Task Request for Joshua Vilog. 
                                                        <a href="#">Show the task</a>
                                                    </div> 
                                                    <div class="pull-right"> 
                                                        <span>2024-04-24 00:00:00</span>
                                                    </div>
												</li> -->

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
            // include "modal/modalAdd.php";
            // include "modal/modalEdit.php";
            include "../getModals/modalDisplayTask/modalDisplayTask.php";
            include "../getModals/modalDisplayTask/modalDisplayTaskRequest.php";
            ?>
		</div>
        <?php include "../script.php";?>
        <script src="js/display.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
        <script src="js/insert.js?v=<?php echo $generateRandomNumber; ?>"></script>
		<script src="js/update.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
