<?php
include "connection.php";

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");

$oldDatetime = $_POST['oldDatetime'];
$newDatetime = $createdAt;


$sql = "SELECT `RID` FROM `scheduler_masterlist` WHERE REALTIME_ACTION >= '$oldDatetime' AND REALTIME_ACTION <= '$newDatetime'";


$result = $conn->query($sql);


echo $result->num_rows;

?>