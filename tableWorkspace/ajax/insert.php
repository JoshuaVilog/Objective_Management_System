<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $desc = $conn->real_escape_string($data['desc']);
    $department = $data['department'];
    $year = $data['year'];
    $userCode = $data['userCode'];
    $memberList = $data['memberList'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("INSERT INTO `workspace_masterlist`(
        `RID`,
        `WORKSPACE_DESC`,
        `DEPARTMENT_ID`,
        `YEAR_ID`,
        `CREATED_BY`,
        `CREATED_IP`
    )
    VALUES(
        DEFAULT,
        '$desc',
        $department,
        '$year',
        $userCode,
        '$getIP'
    )");
    
    $workspaceID = $conn->insert_id;
    
    $conn->query("INSERT INTO `workspace_members`(
        `RID`,
        `USER_ID`,
        `WORKSPACE_ID`,
        `MEMBER_ROLE`,
        `REMOVED`,
        `CREATED_BY`,
        `CREATED_IP`
    )
    VALUES(
        DEFAULT,
        $userCode,
        $workspaceID,
        1,
        0,
        $userCode,
        '$getIP'
    )");
    foreach($memberList as $value) {
        $member = $value['member'];

        $conn->query("INSERT INTO `workspace_members`(
            `RID`,
            `USER_ID`,
            `WORKSPACE_ID`,
            `MEMBER_ROLE`,
            `REMOVED`,
            `CREATED_BY`,
            `CREATED_IP`
        )
        VALUES(
            DEFAULT,
            $member,
            $workspaceID,
            2,
            0,
            $userCode,
            '$getIP'
        )");

    }

    echo $workspaceID;
    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>