<?php
include "connection.php";

$id= $_POST['id'];

$sql = "SELECT KPI_ID FROM `kpi_list` WHERE KPI_LIST_ID = $id";
$result = mysqli_query($conn, $sql);
$getId = mysqli_fetch_assoc($result);

echo $getId['KPI_ID'];
// echo $id;
?>