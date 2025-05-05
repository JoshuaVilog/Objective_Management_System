<?php
include "connection.php";

$desc = $_POST['desc'];
$code = $_POST['code'];
$id = $_POST['id'];

$conn->query("UPDATE
    `department`
    SET
    `DEPARTMENT_DESC` = '$desc',
    `DEPARTMENT_CODE` = '$code'
    WHERE
    `DEPARTMENT_ID` = $id
");

?>