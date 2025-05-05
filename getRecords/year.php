<?php
include "connection.php";

$sql = "SELECT `RID`, `YEAR_DESC`, `STATUS` FROM `year`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['YEAR_DESC'],
            "c"=>$row['STATUS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>