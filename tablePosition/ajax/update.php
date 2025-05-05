<?php
include "connection.php";

$title = $_POST['title'];
$desc = $_POST['desc'];
$id = $_POST['id'];

$conn->query("UPDATE `position` SET `JOB_TITLE`='$title', `JOB_DESC`='$desc', `UPDATED_BY`='',`UPDATED_AT`='' WHERE `RID`= $id");

// echo $title.$desc.$id;

?>