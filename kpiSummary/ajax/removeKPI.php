<?php
include "connection.php";

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");

$id = $_POST['id'];
$userCode = $_POST['userCode'];

$conn->query("UPDATE
    `kpi_masterlist`
SET
    `DELETED_AT` = '$createdAt',
    `DELETED_BY` = '$userCode'
WHERE
    `RID` = $id
");


?>