<?php
    include "connection.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $userCode = $data['userCode'];
    // $kpiMasterlistID = $data['kpiMasterlistID'];
    // $head = ($data['head'] != "")? $data['head']:0;
    // $manager = ($data['manager'] != "")? $data['manager']:0;
    // $od = ($data['od'] != "")? $data['od']:0;
    // $pd = ($data['pd'] != "")? $data['pd']:0;
    $Q1R = $conn->real_escape_string($data['Q1R']);
    $Q1S = $conn->real_escape_string($data['Q1S']);
    $Q1G = $conn->real_escape_string($data['Q1G']);
    $Q2R = $conn->real_escape_string($data['Q2R']);
    $Q2S = $conn->real_escape_string($data['Q2S']);
    $Q2G = $conn->real_escape_string($data['Q2G']);
    $Q3R = $conn->real_escape_string($data['Q3R']);
    $Q3S = $conn->real_escape_string($data['Q3S']);
    $Q3G = $conn->real_escape_string($data['Q3G']);
    $Q4R = $conn->real_escape_string($data['Q4R']);
    $Q4S = $conn->real_escape_string($data['Q4S']);
    $Q4G = $conn->real_escape_string($data['Q4G']);
    $RR = $conn->real_escape_string($data['RR']);
    $RS = $conn->real_escape_string($data['RS']);
    $RG = $conn->real_escape_string($data['RG']);

    $dataArray = $data['kpiList'];
    $kpiID = $data['id'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("UPDATE
        `kpi_masterlist`
    SET
        `1Q_RESULT` = '$Q1R',
        `1Q_SCORE` = '$Q1S',
        `1Q_GRADE` = '$Q1G',
        `2Q_RESULT` = '$Q2R',
        `2Q_SCORE` = '$Q2S',
        `2Q_GRADE` = '$Q2G',
        `3Q_RESULT` = '$Q3R',
        `3Q_SCORE` = '$Q3S',
        `3Q_GRADE` = '$Q3G',
        `4Q_RESULT` = '$Q4R',
        `4Q_SCORE` = '$Q4S',
        `4Q_GRADE` = '$Q4G',
        `FINAL_RESULT` = '$RR',
        `FINAL_SCORE` = '$RS',
        `FINAL_GRADE` = '$RG',
        `UPDATED_BY` = '$userCode',
        `UPDATED_IP` = '$getIP'
    WHERE
        RID = $kpiID");


    //UPDATE KPI LIST
    foreach($dataArray as $row){
        $category = $conn->real_escape_string($row['category']);
        $desc = $conn->real_escape_string($row['desc']);
        $weigh = $row['weigh'];
        $rowCount = $row['rowCount'];
        $status = $row['status'];
        $id = $row['id'];
        $formula = $conn->real_escape_string($row['formula']);
        $goal = $conn->real_escape_string($row['goal']);

        $Q1Result = $conn->real_escape_string($row['Q1Result']);
        $Q1Score = $conn->real_escape_string($row['Q1Score']);
        $Q1Grade = $conn->real_escape_string($row['Q1Grade']);
        $Q2Result = $conn->real_escape_string($row['Q2Result']);
        $Q2Score = $conn->real_escape_string($row['Q2Score']);
        $Q2Grade = $conn->real_escape_string($row['Q2Grade']);
        $Q3Result = $conn->real_escape_string($row['Q3Result']);
        $Q3Score = $conn->real_escape_string($row['Q3Score']);
        $Q3Grade = $conn->real_escape_string($row['Q3Grade']);
        $Q4Result = $conn->real_escape_string($row['Q4Result']);
        $Q4Score = $conn->real_escape_string($row['Q4Score']);
        $Q4Grade = $conn->real_escape_string($row['Q4Grade']);
        $resultResult = $conn->real_escape_string($row['resultResult']);
        $resultScore = $conn->real_escape_string($row['resultScore']);
        $resultGrade = $conn->real_escape_string($row['resultGrade']);

        //ADD NEW KPI
        if($status == "NEW"){
            
            $conn->query("INSERT INTO `kpi_list`(
                `RID`,
                `KPI_ID`,
                `KPI_CATEGORY`,
                `KPI_DESC`,
                `WEIGH`,
                `FORMULA`,
                `GOAL`,
                `ROW_COUNT`,
                `1Q_RESULT`,
                `1Q_SCORE`,
                `1Q_GRADE`,
                `2Q_RESULT`,
                `2Q_SCORE`,
                `2Q_GRADE`,
                `3Q_RESULT`,
                `3Q_SCORE`,
                `3Q_GRADE`,
                `4Q_RESULT`,
                `4Q_SCORE`,
                `4Q_GRADE`,
                `FINAL_RESULT`,
                `FINAL_SCORE`,
                `FINAL_GRADE`,
                `CREATED_BY`,
                `CREATED_IP`
            )
            VALUES(
                DEFAULT,
                '$kpiID',
                '$category',
                '$desc',
                '$weigh',
                '$formula',
                '$goal',
                '$rowCount',
                '$Q1Result',
                '$Q1Score',
                '$Q1Grade',
                '$Q2Result',
                '$Q2Score',
                '$Q2Grade',
                '$Q3Result',
                '$Q3Score',
                '$Q3Grade',
                '$Q4Result',
                '$Q4Score',
                '$Q4Grade',
                '$resultResult',
                '$resultScore',
                '$resultGrade',
                '$userCode',
                '$getIP'
            )");

            // echo "HEY1";
            
        // UPDATE KPI AS DELETED
        } else if($status == "REMOVE"){
            
            $conn->query("UPDATE
                `kpi_list`
            SET
                `DELETED_AT` = '$createdAt',
                `DELETED_BY` = '$userCode',
                `DELETED_IP` = '$getIP'
            WHERE
                RID = $id");

            // echo "HEY2";
        
        // UPDATE THE KPI
        } else if($status == "OLD"){
            
            $conn->query("UPDATE
                `kpi_list`
            SET
                `KPI_CATEGORY` = '$category',
                `KPI_DESC` = '$desc',
                `WEIGH` = '$weigh',
                `FORMULA` = '$formula',
                `GOAL` = '$goal',
                `ROW_COUNT` = '$rowCount',
                `1Q_RESULT` = '$Q1Result',
                `1Q_SCORE` = '$Q1Score',
                `1Q_GRADE` = '$Q1Grade',
                `2Q_RESULT` = '$Q2Result',
                `2Q_SCORE` = '$Q2Score',
                `2Q_GRADE` = '$Q2Grade',
                `3Q_RESULT` = '$Q3Result',
                `3Q_SCORE` = '$Q3Score',
                `3Q_GRADE` = '$Q3Grade',
                `4Q_RESULT` = '$Q4Result',
                `4Q_SCORE` = '$Q4Score',
                `4Q_GRADE` = '$Q4Grade',
                `FINAL_RESULT` = '$resultResult',
                `FINAL_SCORE` = '$resultScore',
                `FINAL_GRADE` = '$resultGrade',
                `UPDATED_BY` = '$userCode',
                `UPDATED_IP` = '$getIP'
            WHERE
                `RID` = $id
            ");
            
            // echo "HEY3";
        }

        
    }

    

?>