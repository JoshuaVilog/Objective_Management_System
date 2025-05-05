<?php
include "connection.php";

$id = $_POST['workspaceID'];

//$sql = "SELECT `RID`, `CATEGORY_DESC`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP`, `UPDATED_AT`, `UPDATED_BY`, `UPDATED_IP`, `DELETED_AT`, `DELETED_BY`, `DELETED_IP`, `REALTIME_ACTION` FROM `category_masterlist` WHERE CONCAT(WORKSPACE_ID, DELETED_BY) = $id";

$sql = "SELECT `RID`, `CATEGORY_DESC`, CONCAT(WORKSPACE_ID, COALESCE(DELETED_BY, '')) FROM `category_masterlist` WHERE CONCAT(WORKSPACE_ID, COALESCE(DELETED_BY, '')) = $id ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['CATEGORY_DESC'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>