<?php
include "connection.php";

$id= $_POST['id'];

/*
$sql = "SELECT KPI_EVALUATION_ID FROM `kpi_list` WHERE KPI_LIST_ID = $id";
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
*/

$sql = "SELECT KPI_EVALUATION_ID FROM `kpi_list` WHERE KPI_LIST_ID = $id";
$result = mysqli_query($conn, $sql);
$getId = mysqli_fetch_assoc($result);

echo $getId['KPI_EVALUATION_ID'];
// echo $id;
?>