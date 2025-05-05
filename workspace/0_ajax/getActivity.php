<?php
include "connection.php";

// $id = $_POST['categoryID']."0";
$id = $_POST['categoryID'];

//$sql = "SELECT `RID`, `ACTIVITY_DESC`, `CATEGORY_ID`, `ACTIVITY_DETAILS`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP`, `UPDATED_AT`, `UPDATED_BY`, `UPDATED_IP`, `DELETED_AT`, `DELETED_BY`, `DELETED_IP`, `REALTIME_ACTION` FROM `activity_masterlist` WHERE CONCAT(CATEGORY_ID, DELETED_BY) = $id";

$sql = "SELECT `RID`, `ACTIVITY_DESC`, `CATEGORY_ID`, `ACTIVITY_DETAILS` FROM `activity_masterlist` WHERE CONCAT(CATEGORY_ID, COALESCE(DELETED_BY, '')) = $id ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['ACTIVITY_DESC'],
            "c" => $row['ACTIVITY_DETAILS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>