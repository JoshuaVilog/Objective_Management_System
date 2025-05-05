<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $desc = $conn->real_escape_string($_POST['desc']);
    $taskID = $_POST['taskID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("INSERT INTO `task_comment`(
        `RID`,
        `COMMENT_DESC`,
        `TASK_ID`,
        `CREATED_BY`,
        `CREATED_IP`
    )
    VALUES(
        DEFAULT,
        '$desc',
        $taskID,
        $userCode,
        '$getIP'
    )");


    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>