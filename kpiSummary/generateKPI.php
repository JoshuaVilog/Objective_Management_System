<!DOCTYPE html>
<html lang="en">
	
    <?php include "../header.php";?>
    <style>
        #containerKPI{
            margin: 20px;
        }
        #containerSignature th, #containerSignature td{
            width: 100px;
            border: 1px solid black;
            padding: 15px;
            text-align: center;
            
        }
        #containerSignature td{
            border: 1px solid black;
            padding: 15px;
            height: 80px

        }
        #containerUserInfo td{
            padding: 12px;
            /* border: 1px solid black; */

        }
        #containerTableKPI th, #containerTableKPI td{
            border: 1px solid black;
            padding: 12px;
        }
        #containerTableKPI th{
            text-align: center;
        }
        #tr3 th{
            width: 25px;
            font-size: 8px;
            /* text-align: center; */
        }
    </style>

	<body class="no-skin">
        <div id="containerKPI">
            <div class="row">
                <div class="col-sm-6">
                    <h2>
                        <strong>SCH24_KPI and Evaluation Report</strong>
                    </h2>
                </div>
                <div class="col-sm-6">
                    <div class="pull-right" id="containerSignature">
                        <table>
                            <thead>
                                <tr>
                                    <th>PIC</th>
                                    <th>HEAD</th>
                                    <th>MANAGER</th>
                                    <th>OD</th>
                                    <th>PD</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" id="containerUserInfo">
                <div class="col-sm-12">
                    <table style="width:100%">
                        <tr>
                            <td style="text-align: left; width: 120px;"><strong>Department</strong></td>
                            <td style="text-align: left; width: 300px;" id="tdDisplayDepartment"></td>
                            <td style="text-align: left; width: 120px;"><strong>Position</strong></td>
                            <td style="text-align: left" id="tdDisplayPosition"></td>
                            <td style="text-align: left; width: 150px;"><strong>Date of Start</strong></td>
                            <td style="text-align: left" id="tdDisplayDateOfStart"></td>
                            <td style="text-align: left; width: 100px;">Check</td>
                            <td style="text-align: center"></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; width: 120px;"><strong>Name</strong></td>
                            <td style="text-align: left; width: 300px;" id="tdDisplayName"></td>
                            <td style="text-align: left; width: 120px;"><strong>Job Title</strong></td>
                            <td style="text-align: left" id="tdDisplayJobTitle"></td>
                            <td style="text-align: left; width: 150px;"><strong>Service Tenure</strong></td>
                            <td style="text-align: left" id="tdDisplayServiceTenure"></td>
                            <td style="text-align: left; width: 100px;"><strong>Evaluator 1</strong></td>
                            <td style="text-align: center"></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; width: 120px;"></td>
                            <td style="text-align: left; width: 300px;"></td>
                            <td style="text-align: left; width: 120px;"></td>
                            <td style="text-align: left"></td>
                            <td style="text-align: right; width: 150px;"></td>
                            <td style="text-align: center"></td>
                            <td style="text-align: left; width: 100px;"><strong>Evaluator 2</strong></td>
                            <td style="text-align: center"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <h4>
                        <b>1. KPI Evaluation</b>
                    </h4>
                </div>
            </div>
            <div class="row" id="containerTableKPI">
                <div class="col-sm-12">
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <th rowspan="3" style="width: 30px;">No</th>
                                <th rowspan="3" style="width: 700px;">KPI</th>
                                <th rowspan="3" style="width: 150px;">Goal</th>
                                <th rowspan="3"style="width: 60px;">Weigh</th>
                                <th rowspan="3" style="width: 400px;">Formula</th>
                                <!-- <th rowspan="2" colspan="2">SCH23 Result</th> -->
                                <th colspan="15">SCH 24</th>
                            </tr>
                            <tr>
                                <th colspan="3">1Q</th>
                                <th colspan="3">2Q</th>
                                <th colspan="3">3Q</th>
                                <th colspan="3">4Q</th>
                                <th colspan="3">Result</th>
                            </tr>
                            <tr id="tr3">
                                <!-- <th>Score</th>
                                <th>Grade</th> -->
                                <th>Result</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-kpi-list">
                            <!-- <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> -->
                        </tbody>
                        <tbody>
                            <tr>
                                <td colspan="5" style="text-align: center;">Result</td>
                                <td  class="center"></td> <!--id="tdDisplay1QR" -->
                                <td id="tdDisplay1QS" class="center"></td>
                                <td id="tdDisplay1QG" class="center"></td>
                                <td  class="center"></td> <!-- id="tdDisplay2QR" -->
                                <td id="tdDisplay2QS" class="center"></td>
                                <td id="tdDisplay2QG" class="center"></td>
                                <td  class="center"></td> <!-- id="tdDisplay3QR" -->
                                <td id="tdDisplay3QS" class="center"></td>
                                <td id="tdDisplay3QG" class="center"></td>
                                <td  class="center"></td> <!-- id="tdDisplay4QR" -->
                                <td id="tdDisplay4QS" class="center"></td>
                                <td id="tdDisplay4QG" class="center"></td>
                                <td  class="center"></td> <!-- id="tdDisplayRR" -->
                                <td id="tdDisplayRS" class="center"></td>
                                <td id="tdDisplayRG" class="center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <?php include "../script.php";?>
        <script src="js/generateKPI.js?v=<?php echo $generateRandomNumber; ?>"></script>
	</body>
</html>
