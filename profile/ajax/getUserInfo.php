<?php
include "connection.php";

$userID = $_POST['userCode'];

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
    `USER_STATUS`
    FROM
    `user`
    WHERE USER_ID = $userID";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>