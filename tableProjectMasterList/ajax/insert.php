<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $desc = $conn->real_escape_string($data['desc']);
    $department = $data['department'];
    $deptCode = $data['deptCode'];
    $targetDate = $data['targetDate'];
    $projectDetails = $conn->real_escape_string($data['projectDetails']);
    $user = $data['userCode'];

    $members = $data['members'];

    date_default_timezone_set('Asia/Manila'); // Set the timezone to Philippines 
    $createdAt = date('Y-m-d H:i:s'); // Format: Year-Month-Day Hour:Minute:Second

    $timestamp = strtotime($createdAt);
    $month = date("m", $timestamp);
    $year = date("Y", $timestamp);

    $findCode = $deptCode ."-".substr($year,-2) . $month . "-";

    $sql = "SELECT PROJECT_CODE FROM project_masterlist WHERE PROJECT_CODE LIKE '%$findCode%'";
    $result = mysqli_query($conn, $sql);
    $no = mysqli_num_rows($result) + 1;

    $code = $deptCode ."-".substr($year,-2) . $month . "-" . formatNumber($no, 3);

    // INSERT PROJECT ON MASTERLIST
    $conn->query("INSERT INTO `project_masterlist`(
        `PROJECT_ID`,
        `PROJECT_CODE`,
        `PROJECT_DESC`,
        `PROJECT_DETAILS`,
        `DEPARTMENT_ID`,
        `TARGET_DATE`,
        `STATUS`,
        `REMARKS`,
        `CREATED_AT`,
        `CREATED_BY`,
        `CREATED_IP`,
        `UPDATED_AT`,
        `UPDATED_BY`,
        `UPDATED_IP`,
        `DELETED_AT`,
        `DELETED_BY`,
        `DELETED_IP`,
        `REALTIME_ACTION`
    )
    VALUES(
        DEFAULT,
        '$code',
        '$desc',
        '$projectDetails',
        '$department',
        '$targetDate',
        '',
        '',
        '$createdAt',
        $user,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '$createdAt'
    )");

    $projectID = $conn->insert_id;

    // INSERT THE OWNER
    $conn->query("INSERT INTO `project_member_list`(
        `id`,
        `PROJECT_ID`,
        `USER_ID`,
        `PROJECT_ROLE`,
        `REMOVED`,
        `CREATED_AT`,
        `CREATED_BY`,
        `CREATED_IP`,
        `UPDATED_AT`,
        `UPDATED_BY`,
        `UPDATED_IP`,
        `REALTIME_ACTION`
    )
    VALUES(
        DEFAULT,
        $projectID,
        $user,
        1,
        '',
        '$createdAt',
        $user,
        '',
        '',
        '',
        '',
        '$createdAt'
    )");

    foreach($members as $value) {
        $member = $value['member'];
        // $role = $value['role'];

        $conn->query("INSERT INTO `project_member_list`(
            `id`,
            `PROJECT_ID`,
            `USER_ID`,
            `PROJECT_ROLE`,
            `REMOVED`,
            `CREATED_AT`,
            `CREATED_BY`,
            `CREATED_IP`,
            `UPDATED_AT`,
            `UPDATED_BY`,
            `UPDATED_IP`,
            `REALTIME_ACTION`
        )
        VALUES(
            DEFAULT,
            $projectID,
            $member,
            2,
            '',
            '$createdAt',
            $user,
            '',
            '',
            '',
            '',
            '$createdAt'
        )");
    }

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();

function formatNumber($number, $desiredLength) {
    $formattedNumber = str_pad($number, $desiredLength, '0', STR_PAD_LEFT);
    return $formattedNumber;
}
?>