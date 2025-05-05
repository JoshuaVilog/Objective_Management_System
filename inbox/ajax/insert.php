<?php
include "connection.php";

$desc = $_POST['desc'];
$code = $_POST['code'];


$sql = "SELECT * FROM `department` WHERE DEPARTMENT_DESC = '$desc'";
$result = $conn->query($sql);


if(mysqli_num_rows($result) != 0){
    echo "duplicate";
} else {
    $conn->query("INSERT INTO `department`(
        `DEPARTMENT_ID`,
        `DEPARTMENT_DESC`,
        `DEPARTMENT_CODE`
    )
    VALUES(
        DEFAULT,
        '$desc',
        '$code'
    )");
}