<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $priority = $_POST['desc'];
    $id = $_POST['taskID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    if($priority == ""){
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `PRIORITY_ID` = null,
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $id
        ");
    } else {
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `PRIORITY_ID` = $priority,
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $id
        ");
    }
    
    // echo $conn->insert_id;

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>