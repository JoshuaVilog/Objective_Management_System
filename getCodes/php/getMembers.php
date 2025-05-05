<?php
include "connection.php";

// $id = $_POST['workspaceID']."2";
// $id = $_POST['workspaceID'];
$id = "0-".$_POST['workspaceID'];


// $sql = "SELECT
//     workspace_members.WORKSPACE_ID,
//     workspace_members.RID,
//     user.USER_LNAME,
//     user.USER_FNAME,
//     workspace_members.MEMBER_ROLE
//     FROM
//     `workspace_members`
//     INNER JOIN `user` ON workspace_members.USER_ID = user.USER_ID
//     WHERE
//     CONCAT(workspace_members.WORKSPACE_ID,workspace_members.MEMBER_ROLE) = $id";

$sql = "SELECT
workspace_members.WORKSPACE_ID,
workspace_members.RID,
user.USER_ID,
user.USER_LNAME,
user.USER_FNAME,
workspace_members.MEMBER_ROLE,
user.USER_STATUS
FROM
`workspace_members`
INNER JOIN `user` ON workspace_members.USER_ID = user.USER_ID
WHERE
CONCAT(workspace_members.REMOVED, '-', workspace_members.WORKSPACE_ID) = '$id'";


$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['USER_ID'],
            "b" => $row['USER_FNAME']. " " . $row['USER_LNAME'],
            "c" => $row['MEMBER_ROLE'],
            "d" => $row['USER_STATUS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>