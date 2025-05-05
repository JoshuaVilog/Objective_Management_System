<?php
include "connection.php";

$id = $_POST['id'];

$sql = "SELECT `RID`, `CATEGORY_DESC` FROM `category_masterlist` WHERE RID = $id";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records['a'] = $row['RID'];
        $records['b'] = $row['CATEGORY_DESC'];
    }
}

header('Content-Type: application/json');
echo json_encode($records);
// echo $projectCode;






?>