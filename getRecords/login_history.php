<?php
include "connection.php";


$sql = "SELECT `RID`, `USER_ID`, `DATETIME` FROM `login_history` ORDER BY DATETIME DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>