<?php
include "connection.php";

$sql = "SELECT `RID`, `ROOM_DESC`, `ROW_COUNT` FROM `room_masterlist` ORDER BY ROW_COUNT ASC";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['ROOM_DESC'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>