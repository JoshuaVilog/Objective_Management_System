<?php
include "connection.php";

$sql = "SELECT `RID`, `YEAR_DESC` FROM `year` WHERE STATUS = '1';";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

echo json_encode($row);

?>