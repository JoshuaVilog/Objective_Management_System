<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $status = $_POST['desc'];
    $id = $_POST['taskID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("UPDATE
        `task_masterlist`
    SET
        `STATUS` = $status,
        `UPDATED_BY` = $userCode,
        `UPDATED_IP` = '$getIP'
    WHERE
        `RID` =  $id
    ");

    $date = date("Y-m-d");

    if($status == "2"){

        $conn->query("UPDATE
                `task_masterlist`
            SET
                `START_DATE` = '$date'
            WHERE
                `RID` =  $id
        ");

    } else if($status == "3"){

        $conn->query("UPDATE
                `task_masterlist`
            SET
                `FINISH_DATE` = '$date'
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