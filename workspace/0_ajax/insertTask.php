<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $desc = $conn->real_escape_string($_POST['desc']);
    $dueDate = $_POST['dueDate'];
    $activity = $_POST['activity'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    if($dueDate == ""){
        // KAPAG EMPTY YUNG DUE DATE, GAGAWING NULL YUNG DATE SA QUERY
        $conn->query("INSERT INTO `task_masterlist`(
            `RID`,
            `ACTIVITY_ID`,
            `TASK_PARENT_ID`,
            `TASK_DESC`,
            `DUE_DATE`,
            `STATUS`,
            `CREATED_BY`,
            `CREATED_IP`
        )
        VALUES(
            DEFAULT,
            $activity,
            0,
            '$desc',
            null, 
            1,
            $userCode,
            '$getIP'
        )");
    } else {
        // KAPAG MAY VALUE YUNG DATE, EDI LALAGYAN
        $conn->query("INSERT INTO `task_masterlist`(
            `RID`,
            `ACTIVITY_ID`,
            `TASK_PARENT_ID`,
            `TASK_DESC`,
            `DUE_DATE`,
            `STATUS`,
            `CREATED_BY`,
            `CREATED_IP`
        )
        VALUES(
            DEFAULT,
            $activity,
            0,
            '$desc',
            '$dueDate', 
            1,
            $userCode,
            '$getIP'
        )");
    }
    


    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>