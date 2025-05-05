<?php
include "connection.php";

$sql = "SELECT `PRIORITY_ID`, `PRIORITY_DESC` FROM `priority`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['PRIORITY_ID'],
            "b"=>$row['PRIORITY_DESC'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>