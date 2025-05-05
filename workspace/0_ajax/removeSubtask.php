<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    // $desc = $conn->real_escape_string($_POST['desc']);

    // $id = $_POST['taskID'];
    $taskIDList = $data['taskIDList'];
    $taskID = $data['taskID'];
    $userCode = $data['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    foreach ($taskIDList as $value) {

        $conn->query("UPDATE
            `task_masterlist`
        SET 
            `DELETED_AT` = '$createdAt',
            `DELETED_BY` = $userCode,
            `DELETED_IP` = '$getIP'
        WHERE
            `RID` = $value
        ");

    }

    $conn->query("UPDATE
        `task_masterlist`
    SET 
        `DELETED_AT` = '$createdAt',
        `DELETED_BY` = $userCode,
        `DELETED_IP` = '$getIP'
    WHERE
        `RID` = $taskID
    ");
    

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>