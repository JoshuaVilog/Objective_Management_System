<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $taskID = $_POST['taskID'];
    $requestor = $_POST['userCode'];
    $assignee = $_POST['assignee'];
    $remarks = "1";

    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("INSERT INTO `task_request`(
        `RID`,
        `TASK_ID`,
        `REQUESTOR`,
        `ASSIGNEE`,
        `REMARKS`,
        `CREATED_BY`
    )
    VALUES(
        DEFAULT,
        '$taskID',
        '$requestor',
        '$assignee',
        '$remarks',
        '$userCode'
    )");

    $conn->query("UPDATE
    `task_masterlist`
    SET
        `TASK_ASSIGNEE` = '0',
        `UPDATED_BY` = $userCode,
        `UPDATED_IP` = '$getIP'
    WHERE
    `RID` =  $taskID
    ");

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>