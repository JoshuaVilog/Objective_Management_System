<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $desc = $conn->real_escape_string($_POST['desc']);
    $category = $_POST['category'];
    $userCode = $_POST['userCode'];

    date_default_timezone_set('Asia/Manila');
    $createdAt = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("INSERT INTO `activity_masterlist`(
        `RID`,
        `ACTIVITY_DESC`,
        `CATEGORY_ID`,
        `ACTIVITY_DETAILS`,
        `CREATED_BY`,
        `CREATED_IP`
    )
    VALUES(
        DEFAULT,
        '$desc',
        $category,
        '',
        $userCode,
        '$getIP'
    )");

    echo $category;

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();











?>