<?php
include "connection.php";

$id = $_POST['id'];

$conn->query("UPDATE `year` SET `STATUS`='0'");


$conn->query("UPDATE `year` SET `STATUS` = '1' WHERE `RID` = $id");

// echo $title.$desc.$id;

?>