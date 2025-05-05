<?php include "path.php"; ?>

<div id="sidebar" class="sidebar responsive ace-save-state">
    <!-- <script type="text/javascript">
        try{ace.settings.loadState('sidebar')}catch(e){}
    </script> -->

    <ul class="nav nav-list">
        <li class="" id="menuDashboard">
            <a href="/<?php echo $rootFolder; ?>/dashboard/index.php">
                <i class="menu-icon fa fa-tachometer"></i>
                <span class="menu-text"> Dashboard </span>
            </a>

            <b class="arrow"></b>
        </li>

        <li class="" id="menuTableUser">
            <a href="/<?php echo $rootFolder; ?>/tableUser/index.php">
                <i class="menu-icon fa fa-users"></i>
                <span class="menu-text"> User Management</span>
            </a>
            <b class="arrow"></b>
        </li>

        <li class="" id="menuInbox">
            <a href="/<?php echo $rootFolder; ?>/inbox/index.php">
                <i class="menu-icon fa fa-envelope"></i>
                <span class="menu-text">Inbox</span>
            </a>
            <b class="arrow"></b>
        </li>

        <li class="" id="menuWorkspace">
            <a href="/<?php echo $rootFolder; ?>/workspace/index.php">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">Workspace</span>
            </a>
            <b class="arrow"></b>
        </li>
        <li class="" id="menuKPI">
            <a href="/<?php echo $rootFolder; ?>/tableKPI/index.php">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">OKR</span>
            </a>
            <b class="arrow"></b>
        </li>
        <li class="" id="menuKPISummary">
            <a href="/<?php echo $rootFolder; ?>/kpiSummary/index.php">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">OKR Summary</span>
            </a>
            <b class="arrow"></b>
        </li>
        <li class="" id="menuScheduler">
            <a href="/<?php echo $rootFolder; ?>/scheduler/index.php">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">Scheduler</span>
            </a>
            <b class="arrow"></b>
        </li>

        <!-- <li class="active open"> -->
        <li class="" id="menuUtilities">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-cog"></i>
                <span class="menu-text">Utilities</span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>

            <ul class="submenu">
                <li class="">
                    <a href="/<?php echo $rootFolder; ?>/tableWorkspace/index.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Workspace
                    </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="/<?php echo $rootFolder; ?>/tableYear/index.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Year
                    </a>
                    <b class="arrow"></b>
                </li>

                <li class="">
                    <a href="/<?php echo $rootFolder; ?>/tableDepartment/index.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Department
                    </a>
                    <b class="arrow"></b>
                </li>

                <li class="">
                    <a href="/<?php echo $rootFolder; ?>/tablePosition/index.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Position
                    </a>
                    <b class="arrow"></b>
                </li>

                <li class="">
                    <a href="#" class="dropdown-toggle">
                        <i class="menu-icon fa fa-caret-right"></i>

                        Other
                        <b class="arrow fa fa-angle-down"></b>
                    </a>

                    <b class="arrow"></b>

                    <ul class="submenu">
                        <li class="">
                            <a href="/<?php echo $rootFolder; ?>/importWorkspace/index.php">
                                Import Workspace
                            </a>
                        </li>

                    </ul>
                </li>
            </ul>
        </li>





        <!-- <li class="" id="menuTableKPI">
            <a href="/<?php echo $rootFolder; ?>/tableKPI">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">KPI List</span>
            </a>
            <b class="arrow"></b>
        </li> -->
        <!-- <li class="" id="menuTableKPI">
            <a href="/<?php echo $rootFolder; ?>/tableKpiApproving">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">KPI Approving</span>
            </a>
            <b class="arrow"></b>
        </li> -->
        <!-- <li class="" id="menuTableKPI">
            <a href="/<?php echo $rootFolder; ?>/tableDAR">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">DAR List</span>
            </a>
            <b class="arrow"></b>
        </li> -->
        
        <!-- <li class="" id="menuTableProjectMasterList">
            <a href="/<?php echo $rootFolder; ?>/tableProjectMasterList">
                <i class="menu-icon fa fa-folder"></i>
                <span class="menu-text">Project List</span>
            </a>
            <b class="arrow"></b>
        </li> -->
        


        

    </ul><!-- /.nav-list -->

    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
</div>