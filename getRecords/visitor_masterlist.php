<?php
include "connection.php";

$sql = "SELECT `RID`, `VISITOR_NAME` FROM `visitor_masterlist`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['VISITOR_NAME'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>