<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    $dueDate = $_POST['desc'];
    $id = $_POST['taskID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    if($dueDate == ""){
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `DUE_DATE` = null,
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $id
        ");
    } else {
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `DUE_DATE` = '$dueDate',
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $id
        ");
    }
    $data = array();

    $data[] = array(
        "a" => $id,
        "d" => $dueDate,
    );



    header('Content-Type: application/json');
    echo json_encode($data);

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>