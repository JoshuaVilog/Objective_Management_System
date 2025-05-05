<?php
include "connection.php";

$desc = $_POST['desc'];

date_default_timezone_set('Asia/Manila'); // Set the timezone to Philippines 
$createdAt = date('Y-m-d H:i:s'); // Format: Year-Month-Day Hour:Minute:Second

$sql = "SELECT `RID` FROM `year` WHERE YEAR_DESC = '$desc'";
$result = $conn->query($sql);


if(mysqli_num_rows($result) != 0){
    echo "duplicate";
} else {
    $conn->query("INSERT INTO `year`(`RID`, `YEAR_DESC`, `STATUS`) VALUES (DEFAULT,'$desc','0')");
}