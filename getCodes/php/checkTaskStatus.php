<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    // $data = json_decode(file_get_contents("php://input"), true);

    // $taskParent = $_POST['taskParent'];
    // $subtaskParent = $_POST['subtaskParent'];

    // date_default_timezone_set('Asia/Manila');
    // $createdAt = date("Y-m-d H:i:s");
    // $getIP = getClientIP();

    $taskID = $_POST['taskID'];
    $taskType = $_POST['taskType'];

    $find = "NOT".$taskID;

    if($taskType == "TASK"){
        //TASK
        $sql = "SELECT RID FROM `task_masterlist` WHERE CONCAT((CASE WHEN STATUS = '1' OR STATUS = '2' THEN 'NOT' ELSE STATUS END), TASK_PARENT_ID, COALESCE(DELETED_AT, '')) = '$find'";

    } else if($taskType == "SUBTASK"){
        //SUBTASK
        $sql = "SELECT RID FROM `task_masterlist` WHERE CONCAT((CASE WHEN STATUS = '1' OR STATUS = '2' THEN 'NOT' ELSE STATUS END), SUBTASK_PARENT_ID, COALESCE(DELETED_AT, '')) = '$find'";

    }

    $result = $conn->query($sql);

    // Convert result set to JSON
    $records = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($records);

    

    
    // echo $conn->insert_id;

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>