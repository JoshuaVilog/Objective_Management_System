<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    // $desc = $conn->real_escape_string($_POST['desc']);
    // $id = $_POST['id'];
    $userCode = $data['userCode'];
    $taskIDList = $data['taskIDList'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    foreach($taskIDList as $value){

        // echo $value." ";
        $conn->query("UPDATE
            `task_masterlist`
        SET
            `STATUS` = '3',
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
        WHERE
            `RID` =  $value");
    }



    // $conn->query("");
    // echo $conn->insert_id;

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>