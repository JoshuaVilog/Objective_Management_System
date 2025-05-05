<?php include "path.php";?>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>Objective and Key Result Management System</title>

    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="description" content="Draggabble Widget Boxes with Persistent Position and State" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/<?php echo $pluginFolder; ?>/images/gallery/icon.png" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Joshua Vilog">
    <!-- <meta name="generator" content="HDS v1.0"> -->
    <meta name="description" content="overview &amp; stats" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">

    
    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/bootstrap.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/font-awesome/4.5.0/css/font-awesome.min.css?v=<?php echo $generateRandomNumber; ?>" />

    <!-- CALENDAR -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/fullcalendar.min.css?v=<?php echo $generateRandomNumber; ?>" />

    <!-- ace styles -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace.min.css?v=<?php echo $generateRandomNumber; ?>" class="ace-main-stylesheet" id="main-ace-style" />

    <!--[if lte IE 9]>
        <link rel="stylesheet" href="assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
    <![endif]-->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace-skins.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace-rtl.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/select2.min.css?v=<?php echo $generateRandomNumber; ?>" />

    <!-- ace settings handler -->
    <script src="/<?php echo $pluginFolder; ?>/js/ace-extra.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Tabulator -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder;?>/tabulator-master/dist/css/tabulator_bootstrap3.min.css?v=<?php echo $generateRandomNumber; ?>">
    <script src="/<?php echo $pluginFolder;?>/tabulator-master/dist/js/tabulator.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Sweet Alert 2 -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder;?>/sweetalert/dist/sweetalert2.min.css?v=<?php echo $generateRandomNumber; ?>">
    <script src="/<?php echo $pluginFolder;?>/sweetalert/dist/sweetalert2.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Include fusioncharts core library -->
    <script type="text/javascript" src="/<?php echo $pluginFolder; ?>/fusioncharts/fusioncharts.js?v=<?php echo $generateRandomNumber; ?>"></script>
    <!-- Include fusion theme -->
    <script type="text/javascript" src="/<?php echo $pluginFolder; ?>/fusioncharts/themes/fusioncharts.theme.fusion.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <style>
        body {
            font-family: Tahoma, sans-serif;
        }
        .disabled {
            pointer-events: none; /* Disable pointer events, preventing interaction */
            background-color: #ffffff; /* Set the background color to match the enabled field */
            border: 1px solid #ced4da; /* Add a border to mimic the enabled field */
            color: #212529; /* Set the text color to match the enabled field */
            cursor: text; /* Set the cursor to text to mimic an enabled field */
        }
        #tableSearchUser, #tableSelectedUser, #tableEditSearchUser, #tableEditSelectedUser{
            height: 300px;
            overflow-y: scroll;
        }
        #table-task-records, #table-subtask-records, #table-subtaskhistory-records {
            height: 600px;
            overflow-y: scroll;
        }
        #widgetTaskList, #widgetSubTaskList{
            height: 1200px;
        }
        #containerComment, #containerTaskActivityHistory {
            /* height: 650px; */
            overflow-y: scroll;
        }
        #containerTaskRequest, #containerTaskApproval{
            overflow-y: scroll;
            height: 1000px;
        }

        #loginBody {
            background-image: url('/<?php echo $pluginFolder; ?>/images/gallery/PRIMATECHPHILSFRONT.jpg'); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            
        }
        #imgLogo{
            width:300px
        }
        g .raquel-groupDyzKxlLt {
            background-color: aqua;
        }


        #listCategory .spanCategoryDesc {
            font-size: calc(1px + 1vh);
        }
        #containerDashboardWorkspace .dbText{
            font-size: calc(1px + 1vh);
        }
        /* .tabulator-table .tabulator-col-resize-handle{
            border-left: 1px dotted;
        } */

        .tabulator-table .tabulator-group-level-0{
            background-color: #ffd21f;
        }

        .spanActivityDesc{
            font-size: 18px;
            font-weight: 600;
        }
        .tabulator-row .tabulator-cell {
            border-right: 1px #ced4da solid;
        }
        .tabulator-row .tabulator-row-even {
            background-color: #efefef;

        }

        /* SELECT 2 */
        .select2-container .select2-selection--single {
            height: 40px; /* Adjust to your desired height */
            font-size: 16px; /* Adjust text size */
        }
        /* Align the selected text vertically in the larger container */
        .select2-container .select2-selection--single .select2-selection__rendered {
            line-height: 40px; /* Same as the container height */
        }
        .select2-container .select2-results {
            max-height: 300px; /* Set the desired height */
            overflow-y: auto; /* Add scroll if content overflows */
        }
        .select2-container .select2-results__option {
            height: 40px; /* Adjust this value as needed */
            line-height: 40px; /* Align the text vertically */
        }
        .select2-container .select2-search--dropdown .select2-search__field {
            height: 40px; /* Adjust this value as needed */
        }

        /*
        @media only screen and (max-width: 100px) {
            #listCategory .spanCategoryDesc {
                font-size: calc(1px + 0.5vh);
            }
        }
        */

        /* DASHBOARD */




        

    </style>

</head>