<?php
include "connection.php";

$sql = "SELECT
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
    `USER_ROLE_2`,
    `USER_STATUS`,
    `DEPARTMENT2`
    FROM
    `user`
    ";
    //WHERE USER_ROLE NOT IN ('0')

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['USER_ID'],
            "b"=>$row['USER_LNAME'],
            "c"=>$row['USER_FNAME'],
            "d"=>$row['USER_MNAME'],
            "e"=>$row['DEPARTMENT_ID'],
            "f"=>$row['POSITION_ID'],
            "g"=>$row['USERNAME'],
            "h"=>$row['USER_ROLE'],
            "i"=>$row['USER_STATUS'],
            "j"=>$row['EMAIL'],
            "k"=>$row['DEPARTMENT2'],
            "l"=>$row['USER_ROLE_2'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>