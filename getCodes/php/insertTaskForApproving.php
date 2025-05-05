<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $taskID = $_POST['taskID'];
    $status = $_POST['status'];
    $comment = $_POST['comment'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();


    $conn->query("INSERT INTO `task_approving`(
        `RID`,
        `TASK_ID`,
        `APPROVER`,
        `STATUS`,
        `COMMENT`,
        `CREATED_BY`,
        `CREATED_IP`
    )
    VALUES(
        DEFAULT,
        '$taskID',
        '$userCode',
        '$status',
        '$comment',
        '$userCode',
        '$getIP'
    )");


    //ETO YUNG CODE NA NAGPAPALIT NG STATUS NG TASK
    if($status == "1"){
        //APPROVED
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `STATUS` = '3',
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $taskID
        ");


    } else if($status == "2"){
        //DISAPPROVED

        $conn->query("UPDATE
            `task_masterlist`
        SET
            `STATUS` = '2',
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $taskID
        ");

    }
    



    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>