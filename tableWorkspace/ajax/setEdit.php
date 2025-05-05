<?php
include "connection.php";

$id = $_POST['id'];



$sql = "SELECT `RID`, `WORKSPACE_DESC`, `DEPARTMENT_ID` FROM `workspace_masterlist` WHERE RID = $id";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records['a'] = $row['RID'];
        $records['b'] = $row['WORKSPACE_DESC'];
        $records['c'] = $row['DEPARTMENT_ID'];
    }
}

$idMember = $id."-"."0";
$sqlMember = "SELECT `RID`, `USER_ID`, `WORKSPACE_ID`, `MEMBER_ROLE`, `REMOVED` FROM `workspace_members` WHERE CONCAT(WORKSPACE_ID,'-', REMOVED) = '$idMember'";
$resultMember = $conn->query($sqlMember);

$memberList = array();

if ($resultMember->num_rows > 0) {
    while ($rowMember = $resultMember->fetch_assoc()) {
        // $memberList['a'] = $rowMember['RID'];
        // $memberList['b'] = $rowMember['USER_ID'];

        $memberList[] = array(
            "a" => $rowMember['RID'],
            "b" => $rowMember['USER_ID'],
            "c" => $rowMember['MEMBER_ROLE'],
        );
    }
}

$records['memberList'] = $memberList;


header('Content-Type: application/json');
echo json_encode($records);
// echo $projectCode;






?>