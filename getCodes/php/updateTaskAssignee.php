<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $assignees = $conn->real_escape_string($_POST['assignees']);
    $id = $_POST['taskID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();


    // $sql = "SELECT `TASK_ASSIGNEE` FROM `task_masterlist` WHERE `RID` = $id";
    // $result = mysqli_query($conn, $sql);
    // $row = mysqli_fetch_assoc($result);

    // $stringArray = ($row['TASK_ASSIGNEE'] != "")? $row['TASK_ASSIGNEE']: "[]";
    // $array = json_decode($stringArray);

    // foreach($array as $value){
    //     echo $value;
    // }

    $conn->query("UPDATE
        `task_masterlist`
    SET
        `TASK_ASSIGNEE` = '$assignees',
        `UPDATED_BY` = $userCode,
        `UPDATED_IP` = '$getIP'
    WHERE
        `RID` =  $id
    ");


    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>