<?php
include "connection.php";

// $desc = $_POST['desc'];
$userCode = $_POST['userCode'];
$id = $_POST['id'];
$remarks = $_POST['remarks'];

$conn->query("UPDATE
    `task_request`
    SET
    `REMARKS` = '$remarks',
    `UPDATED_BY` = '$userCode'
    WHERE
    `RID` = $id");


echo $id;
?>

