<?php
include "connection.php";

$user = $_POST['user'];
$year = $_POST['year'];
$id = "";

$sql = "SELECT `RID` FROM `kpi_masterlist` WHERE CONCAT(KPI_USER,'-', YEAR_ID, COALESCE(DELETED_AT, '')) = '$user-$year'";
$result = mysqli_query($conn, $sql);
$fetch = mysqli_fetch_assoc($result);

if(mysqli_num_rows($result) > 0){

    $id = $fetch['RID'];
}

echo $id;

?>