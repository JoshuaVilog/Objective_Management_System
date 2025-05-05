<div id="navbar" class="navbar navbar-default ace-save-state" style="background-color:#00008b">
    <div class="navbar-container ace-save-state" id="navbar-container">
        <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
            <span class="sr-only">Toggle sidebar</span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>
        </button>

        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <small>
                    Objective and Key Result Management System
                </small>
            </a>
        </div>

        <div class="navbar-buttons navbar-header pull-right" role="navigation" >
            <ul class="nav ace-nav" >

                <!-- <li class="lightblue dropdown-modal">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#" style="background-color:#2b2b94">
                        <i class="ace-icon fa fa-bell icon-animated-bell"></i>
                        <span class="badge badge-important" id="displayNotifBadge">0</span>
                    </a>

                    <ul class="dropdown-menu-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">

                        <li class="dropdown-content">
                            <ul class="dropdown-menu dropdown-navbar navbar-pink">
                                
                                <li id="notif0">
                                    <a href="#">
                                        <i class="btn btn-xs btn-primary fa fa-folder"></i>
                                        No Notification
                                    </a>
                                </li>
                                <li id="notif1">
                                    <a href="#">
                                        <i class="btn btn-xs btn-primary fa fa-folder"></i>
                                        You have <strong id="displayNotifPendingSubTask"></strong> pending Sub Task
                                    </a>
                                </li>
                                <li id="notif2">
                                    <a href="#">
                                        <i class="btn btn-xs btn-primary fa fa-folder"></i>
                                        You have <strong id="displayNotifUnfinishSubTask"></strong> unfinished Sub Task
                                    </a>
                                </li>

                                
                            </ul>
                        </li>
                    </ul>
                </li> -->

                <li class="light-blue dropdown-modal">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle" style="background-color:#00008b">
                        <span class="user-info">
                            <small>Welcome,</small>
                            <span id="displayUserFullName"></span>
                        </span>

                        <i class="ace-icon fa fa-caret-down"></i>
                    </a>

                    <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close" >
                        <li>
                            <a href="/<?php echo $rootFolder; ?>/profile">
                                <i class="ace-icon fa fa-user"></i>
                                Profile
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="#" id="btnLogout">
                                <i class="ace-icon fa fa-power-off"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div><!-- /.navbar-container -->
</div>