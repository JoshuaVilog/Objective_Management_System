<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$department = $data['department'];
$user = $data['user'];
$userCode = $data['userCode'];
$kpiList = $data['kpiList'];
// $head = ($data['head'] != "")? $data['head']:0;
// $manager = ($data['manager'] != "")? $data['manager']:0;
// $od = ($data['od'] != "")? $data['od']:0;
// $pd = ($data['pd'] != "")? $data['pd']:0;
// $Q1R = $conn->real_escape_string($data['Q1R']); // TINANGGAL KO MUNA TO SA FRONT END
$Q1S = $conn->real_escape_string($data['Q1S']);
$Q1G = $conn->real_escape_string($data['Q1G']);
// $Q2R = $conn->real_escape_string($data['Q2R']); // TINANGGAL KO MUNA TO SA FRONT END
$Q2S = $conn->real_escape_string($data['Q2S']);
$Q2G = $conn->real_escape_string($data['Q2G']);
// $Q3R = $conn->real_escape_string($data['Q3R']); // TINANGGAL KO MUNA TO SA FRONT END
$Q3S = $conn->real_escape_string($data['Q3S']);
$Q3G = $conn->real_escape_string($data['Q3G']);
// $Q4R = $conn->real_escape_string($data['Q4R']); // TINANGGAL KO MUNA TO SA FRONT END
$Q4S = $conn->real_escape_string($data['Q4S']);
$Q4G = $conn->real_escape_string($data['Q4G']);
// $RR = $conn->real_escape_string($data['RR']); // TINANGGAL KO MUNA TO SA FRONT END
$RS = $conn->real_escape_string($data['RS']);
$RG = $conn->real_escape_string($data['RG']);


date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

$conn->query("INSERT INTO `kpi_masterlist`(
    `RID`,
    `DEPARTMENT_ID`,
    `KPI_USER`,
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
    '$department',
    '$user',
    '$Q1R',
    '$Q1S',
    '$Q1G',
    '$Q2R',
    '$Q2S',
    '$Q2G',
    '$Q3R',
    '$Q3S',
    '$Q3G',
    '$Q4R',
    '$Q4S',
    '$Q4G',
    '$RR',
    '$RS',
    '$RG',
    '$userCode',
    '$getIP'
)");

$kpiID = $conn->insert_id;

echo $kpiID;

foreach ($kpiList as $row) {
    $category = $conn->real_escape_string($row['category']);
    $desc = $conn->real_escape_string($row['desc']);
    $weigh = $row['weigh'];
    $goal = $row['goal'];
    $formula = $conn->real_escape_string($row['formula']);
    $rowCount = $conn->real_escape_string($row['rowCount']);

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

}



?>