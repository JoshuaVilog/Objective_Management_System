<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    // $desc = $conn->real_escape_string($_POST['desc']);

    // $id = $_POST['taskID'];
    // $taskIDList = $data['taskIDList'];
    $id =  $_POST['taskID'];
    $userCode =  $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $sql = "SELECT RID FROM `task_masterlist` WHERE CONCAT(SUBTASK_PARENT_ID, COALESCE(DELETED_AT, '')) = $id";
    $result = $conn->query($sql);

    $records = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $records[] = $row['RID'];
        }

        header('Content-Type: application/json');
        echo json_encode($records);
        
    } else {
        $conn->query("UPDATE
            `task_masterlist`
        SET 
            `DELETED_AT` = '$createdAt',
            `DELETED_BY` = $userCode,
            `DELETED_IP` = '$getIP'
        WHERE
            `RID` = $id
        ");

        echo "DELETED";
    }






    /*
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
    
    */

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>