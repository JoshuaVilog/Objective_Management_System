<?php
include "connection.php";

$sql = "SELECT
    `COMPANY_ID`,
    `COMPANY_CODE`,
    `COMPANY_NAME`
FROM
    `company_tb`";
$result = $connHRIS->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['COMPANY_ID'],
            "b"=>$row['COMPANY_CODE'],
            "c"=>$row['COMPANY_NAME'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>