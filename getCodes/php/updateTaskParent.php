<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $moveTaskID = $_POST['moveTaskID'];
    $selectTaskID = $_POST['selectTaskID'];
    $selectActivityID = $_POST['selectActivityID'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();


    $sql = "SELECT RID FROM `task_masterlist` WHERE CONCAT(TASK_PARENT_ID, COALESCE(DELETED_AT, '')) = $moveTaskID";
    $result = $conn->query($sql);

    $records = array();
    if ($result->num_rows > 0 && $selectTaskID != 0) {
        /*
        while ($row = $result->fetch_assoc()) {
            $records[] = $row['RID'];
        }

        header('Content-Type: application/json');
        echo json_encode($records);
        */
        echo "CANCEL";
        
    } else {
        
        $conn->query("UPDATE
        `task_masterlist`
            SET
                `ACTIVITY_ID` = $selectActivityID,
                `TASK_PARENT_ID` = $selectTaskID,
                `UPDATED_BY` = $userCode,
                `UPDATED_IP` = '$getIP'
            WHERE
                `RID` = $moveTaskID
        ");
        

        echo "MOVED";
    }

    // echo $conn->insert_id;
    // echo $moveTaskID;

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>