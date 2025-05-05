<?php
include "connection.php";

$taskCode = $_POST['taskCode'];

$sql = "SELECT `ID`, `TASK_CODE`, `DOCUMENT_CODE`, `DOCUMENT_DESC`, `CREATED_AT`, `CREATED_BY`, `DELETED`, `DELETED_AT`, `DELETED_BY` FROM task_documents WHERE `TASK_CODE` = '$taskCode'";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['ID'],
            "b"=>$row['DOCUMENT_CODE'],
            "c"=>$row['DOCUMENT_DESC'],
            "d"=>$row['CREATED_AT'],
            "e"=>$row['CREATED_BY'],
            "f"=>$row['DELETED_AT'],
            "g"=>$row['DELETED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);
// echo $projectCode;

?>