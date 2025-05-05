<?php
include "connection.php";

$id = $_POST['categoryID'];

$sql = "";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        

        $records[] = array(
            "a" => $row['RID'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);


/*
SELECT
    task_masterlist.RID,
    task_masterlist.TASK_DESC,
    task_masterlist.ACTIVITY_ID,
    activity_masterlist.ACTIVITY_DESC,
    activity_masterlist.CATEGORY_ID,
    category_masterlist.CATEGORY_DESC,
    CONCAT(activity_masterlist.CATEGORY_ID, COALESCE(activity_masterlist.DELETED_IP), COALESCE(task_masterlist.DELETED_IP, ''))
FROM
    `task_masterlist`
INNER JOIN `activity_masterlist` ON task_masterlist.ACTIVITY_ID = activity_masterlist.RID
INNER JOIN category_masterlist ON activity_masterlist.CATEGORY_ID = category_masterlist.RID
WHERE
    CONCAT(activity_masterlist.CATEGORY_ID, COALESCE(activity_masterlist.DELETED_IP), COALESCE(task_masterlist.DELETED_IP, '')) = 1
    
*/
?>