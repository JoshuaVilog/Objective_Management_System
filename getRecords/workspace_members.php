<?php
include "connection.php";

$userID = "0".$_POST['userCode'];

$sql = "";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>