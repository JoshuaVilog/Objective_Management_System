<?php
include "connection.php";

$id = $_POST['id'];

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
    `USER_STATUS`,
    `DEPARTMENT2`
    FROM
    `user`
    WHERE USER_ID = $id
    ";
    //WHERE USER_ROLE NOT IN ('0')

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records['a'] = $row['USER_ID'];
        $records['b'] = $row['USER_LNAME'];
        $records['c'] = $row['USER_FNAME'];
        $records['d'] = $row['USER_MNAME'];
        $records['e'] = $row['DEPARTMENT_ID'];
        $records['f'] = $row['POSITION_ID'];
        $records['g'] = $row['USERNAME'];
        $records['h'] = $row['USER_ROLE'];
        $records['i'] = $row['USER_STATUS'];
        $records['j'] = $row['EMAIL'];
        $records['k'] = $row['DEPARTMENT2'];
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>