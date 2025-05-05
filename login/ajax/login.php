<?php

include "connection.php";

$username = $_POST['username'];
$password = md5($_POST['password']);

$query = "SELECT * FROM user WHERE USERNAME = '$username' && PASSWORD = '$password'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);

if(mysqli_num_rows($result) == 0){
    echo "False";
} else {
    if($row['USER_STATUS'] == "0"){
        echo "disabled";
    } else {
        echo json_encode($row);
        $userID = $row['USER_ID'];

        $conn->query("INSERT INTO `login_history`(`RID`, `USER_ID`)
        VALUES(
            DEFAULT,
            '$userID'
        )");
    }
}

?>