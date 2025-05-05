<?php
include "connection.php";

$sql = "SELECT `RID`, `WORKSPACE_DESC`, `DEPARTMENT_ID`, `YEAR_ID`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP`, `UPDATED_AT`, `UPDATED_BY`, `UPDATED_IP`, `DELETED_AT`, `DELETED_BY`, `DELETED_IP`, `REALTIME_ACTION` FROM `workspace_masterlist` WHERE DELETED_BY IS NULL ORDER BY RID DESC";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['WORKSPACE_DESC'],
            "c"=>$row['DEPARTMENT_ID'],
            "d"=>$row['YEAR_ID'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>