
<?php
include "connection.php";

$visitorName = strtoupper($conn->real_escape_string($_POST['visitorName']));

$sql = "SELECT RID FROM `visitor_masterlist` WHERE VISITOR_NAME = '$visitorName'";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

    echo mysqli_fetch_assoc($result)['RID'];
} else {
    $conn->query("INSERT INTO `visitor_masterlist`(`RID`, `VISITOR_NAME`) VALUES (DEFAULT,'$visitorName')");

    $id = $conn->insert_id;
    
    echo $id;
}



?>