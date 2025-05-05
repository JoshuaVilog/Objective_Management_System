<?php
include "connection.php";

// $year = $_POST['year'];
$userID = $_POST['userCode'];
// $find = '0-'.$year.'-'.$userID;
$find = '0-'.$userID;

/* $sql = "SELECT
    workspace_members.USER_ID,
    workspace_masterlist.RID,
    workspace_masterlist.WORKSPACE_DESC,
    workspace_masterlist.YEAR_ID
    FROM
    `workspace_masterlist`
    INNER JOIN WORKSPACE_MEMBERS ON workspace_masterlist.RID = workspace_members.WORKSPACE_ID
    WHERE
    CONCAT(REMOVED, workspace_members.USER_ID) = $userID"; */
$sql = "SELECT
    workspace_members.USER_ID,
    workspace_masterlist.RID,
    workspace_masterlist.WORKSPACE_DESC,
    workspace_masterlist.YEAR_ID
    FROM
    `workspace_masterlist`
    INNER JOIN WORKSPACE_MEMBERS ON workspace_masterlist.RID = workspace_members.WORKSPACE_ID
    WHERE
    CONCAT(REMOVED,'-', workspace_members.USER_ID) = '$find'";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['WORKSPACE_DESC'],
            "d"=>$row['YEAR_ID'],
            // "c"=>$row['DEPARTMENT_ID'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>