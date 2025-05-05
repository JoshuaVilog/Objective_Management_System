<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $dataArray = $data['dataArray'];
    $userCode = $data['userCode'];
    $activity = $data['activity'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();
    
    foreach($dataArray as $data){
        $desc = $conn->real_escape_string($data['taskDesc']);
        $parent = $conn->real_escape_string($data['taskParent']);
        $assignee = $conn->real_escape_string($data['assignee']);
        $status = !empty($data['status']) ? $data['status'] : null;
        $priority = !empty($data['priority']) ? $data['priority'] : null;
        $dueDate =!empty($data['dueDate']) ? $data['dueDate'] : null;
        $startDate = !empty($data['startDate']) ? $data['startDate'] : null;
        $finishDate = !empty($data['finishDate']) ? $data['finishDate'] : null;
        $details = $conn->real_escape_string($data['taskDetails']);

        $conn->query("INSERT INTO `task_masterlist`(
            `RID`,
            `ACTIVITY_ID`,
            `TASK_PARENT_ID`,
            `TASK_DESC`,
            `TASK_DETAILS`,
            `TASK_ASSIGNEE`,
            `DUE_DATE`,
            `PRIORITY_ID`,
            `STATUS`,
            `START_DATE`,
            `FINISH_DATE`,
            `CREATED_BY`,
            `CREATED_IP`
        )
        VALUES(
            DEFAULT,
            '$activity',
            '$parent',
            '$desc',
            '$details',
            '$assignee',
            ". ($dueDate == null ? "NULL" : "'$dueDate'" ) .",
            ". ($priority == null ? "NULL" : $priority ) .",
            ". ($status == null ? "NULL" : $status ) .",
            ". ($startDate == null ? "NULL" : "'$startDate'" ) .",
            ". ($finishDate == null ? "NULL" : "'$finishDate'" ) .",
            '$userCode',
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





// USELESS CODE MUNA, WAG BURAHIN!!!
function getTaskParent($taskDesc){
    $conn = $GLOBALS['conn'];
    $activity = $GLOBALS['activity'];

    if($taskDesc == ""){
        return 0;
    } else {
        $search = $activity.$taskDesc;

        $sql = "SELECT RID, TASK_DESC FROM `task_masterlist` WHERE CONCAT(ACTIVITY_ID,TASK_DESC) = '$search'";
        $result = mysqli_query($conn, $sql);
        $desc = mysqli_fetch_assoc($result);
        $numOfRow = mysqli_num_rows($result);

        if($numOfRow > 0){
            return $desc["RID"];
        } else {
            return "NOT EXIST";
        }
    }

}


?>