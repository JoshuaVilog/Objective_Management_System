<?php
include "connection.php";

$rootFolder = $_POST['rootFolder'];
$taskID = $_POST['taskID'];
$workspaceID = $_POST['workspaceID'];
$userCode = $_POST['userCode'];
$getIP = getClientIP();
$currentDate = date('Ymd');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // $upload_dir = $_SERVER['DOCUMENT_ROOT']."/".$rootFolder."/1_documents/"; // Specify your upload folder
    $upload_dir = $_SERVER['DOCUMENT_ROOT']."/FILES_OMS/WORKSPACE/";

    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }
    $sqlWorkspace = "SELECT `WORKSPACE_DESC` FROM `workspace_masterlist` WHERE RID = $workspaceID";
    $resultWorkspace = mysqli_query($conn, $sqlWorkspace);
    $fetchWorkspace = mysqli_fetch_assoc($resultWorkspace);
    $workspaceDesc = $fetchWorkspace['WORKSPACE_DESC'];

    $sql = "SELECT COUNT(RID) AS NUM FROM `task_files` WHERE CONCAT(task_files.TASK_ID, COALESCE(task_files.DELETED_AT, '')) = '$taskID'";
    $result = mysqli_query($conn, $sql);
    $fetch = mysqli_fetch_assoc($result);
    $numOfFiles = $fetch['NUM'] + 1;



    // Loop through each uploaded file
    foreach ($_FILES["files"]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $temp_name = $_FILES["files"]["tmp_name"][$key];
            $name = $_FILES["files"]["name"][$key];
            $extension = pathinfo($name, PATHINFO_EXTENSION);

            // Generate a unique filename or use the original file name
            $new_name = $workspaceDesc."_".$currentDate.$taskID."_". $numOfFiles . "." . $extension;

            
            $extensionDesc = strtoupper($extension);

            // Insert the file name into the database
            $sql = "INSERT INTO `task_files`(
                `RID`,
                `TASK_ID`,
                `FILENAME_OLD`,
                `FILENAME_NEW`,
                `EXTENSION`,
                `CREATED_BY`,
                `CREATED_IP`
            )
            VALUES(
                DEFAULT,
                '$taskID',
                '$name',
                '$new_name',
                '$extensionDesc',
                '$userCode',
                '$getIP'
            )";
            if ($conn->query($sql) === TRUE) {

                // Move the uploaded file to the desired directory
                move_uploaded_file($temp_name, $upload_dir . $new_name);

                echo "File '$name' uploaded and inserted into the database successfully.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $numOfFiles++;
            
        } else {
            echo "File upload failed with error code: " . $error;
        }
    }

    $conn->close();
}

?>
