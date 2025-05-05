
<?php
include "connection.php";

$projectCode = $_POST['projectCode'];

$sql = "SELECT
    `PROJECT_CODE`,
    `PROJECT_DESC`,
    `DEPARTMENT_ID`,
    `TARGET_DATE`,
    `STATUS`,
    `REMARKS`,
    `CREATED_AT`,
    `CREATED_BY`
    FROM
    `project_masterlist`
    WHERE
    `PROJECT_CODE` = '$projectCode'
    ";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['PROJECT_CODE'],
            "b"=>$row['PROJECT_DESC'],
            "c"=>$row['DEPARTMENT_ID'],
            "d"=>$row['TARGET_DATE'],
            "e"=>$row['STATUS'],
            "f"=>$row['REMARKS'],
            "g"=>$row['CREATED_AT'],
            "h"=>$row['CREATED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>