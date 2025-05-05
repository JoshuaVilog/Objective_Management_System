<?php
include "connection.php";

$lastname = $_POST['lastname'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$email = $_POST['email'];
$department = $_POST['department'];
$position = $_POST['position'];
$username = $_POST['username'];
$role = $_POST['selectRole'];
$department2 = $_POST['department2'];


$sql = "SELECT USERNAME FROM user WHERE USERNAME = '$username'";
$result = $conn->query($sql);

$password = md5("1");

if(mysqli_num_rows($result) != 0){
    echo "duplicate";
} else {
    $conn->query("INSERT INTO `user`(
        `USER_ID`,
        `USER_LNAME`,
        `USER_FNAME`,
        `USER_MNAME`,
        `EMAIL`,
        `DEPARTMENT_ID`,
        `POSITION_ID`,
        `USERNAME`,
        `PASSWORD`,
        `USER_ROLE`,
        `USER_STATUS`,
        `DEPARTMENT2`
    )
    VALUES(
        DEFAULT,
        '$lastname',
        '$firstname',
        '$middlename',
        '$email',
        $department,
        $position,
        '$username',
        '$password',
        '$role',
        '1',
        '$department2'
    )");
}

/*
$sql = "SELECT * FROM user";
$result = $conn->query($sql);
$no = mysqli_num_rows($result) + 1;

$code = formatNumber($no, 4);
$isFind = false;

//Put records in Array
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
}

//finds Duplicate description
foreach ($records as $item) {
    if (in_array($username, $item)) {
        $isFind = true;
        break; // Exit the loop if the value is found in any subarray
    }
}

$checkCode = true;
while ($checkCode) {
    $codeExists = false;

    foreach ($records as $item) {
        if ($item["USER_CODE"] === $code) {
            $codeExists = true;
            break; // Exit the loop if the code is found in any record
        }
    }

    if ($codeExists) {
        $no++;
        $code = formatNumber($no, 4);
    } else {
        $checkCode = false;
    }
}
//$code = formatNumber($no, 4);

if($isFind == false){
    $password = md5("abc123");

    $conn->query("INSERT INTO `user`(
        `id`,
        `USER_CODE`,
        `USER_LNAME`,
        `USER_FNAME`,
        `USER_MNAME`,
        `USERNAME`,
        `PASSWORD`,
        `USER_ROLE`,
        `USER_STATUS`
    )
    VALUES(
        DEFAULT,
        '$code',
        '$lastname',
        '$firstname',
        '$middlename',
        '$username',
        '$password',
        '$role',
        '1'
    )");
    //echo "<script>console.log($lastname $firstname $middlename  $username $password  $confirmPassword  $role)</script>";
    
} else {
    echo "duplicate";
}
*/

function formatNumber($number, $desiredLength) {
    $formattedNumber = str_pad($number, $desiredLength, '0', STR_PAD_LEFT);
    return $formattedNumber;
}
?>