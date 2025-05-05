<?php
include "connection.php";

$taskID = $_POST['taskID'];

$sql = "SELECT
`RID`,
`FILENAME_OLD`,
`FILENAME_NEW`,
`EXTENSION`
FROM
`task_files`
WHERE CONCAT(task_files.TASK_ID, COALESCE(task_files.DELETED_AT, '')) = '$taskID'
ORDER BY RID DESC
";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['FILENAME_OLD'],
            "c"=>$row['FILENAME_NEW'],
            "d"=>$row['EXTENSION'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>