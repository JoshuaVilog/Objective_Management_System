<?php
include "connection.php";
$id = $_POST['userId'];

function generateRandomNumber() {
    $min = 10000; // Minimum value (5-digit number)
    $max = 99999; // Maximum value (5-digit number)

    $randomNumber = rand($min, $max); // or mt_rand($min, $max);

    return $randomNumber;
}

$randomNumber = generateRandomNumber();
$password = md5($randomNumber);

$conn->query("UPDATE `user` SET `PASSWORD`='$password' WHERE `USER_ID`= $id");
echo $randomNumber;

?>