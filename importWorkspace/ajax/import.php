<?php
include "connection.php";
require($_SERVER['DOCUMENT_ROOT']."/".$pluginFolder.'/spreadsheet/php-excel-reader/excel_reader2.php');
require($_SERVER['DOCUMENT_ROOT']."/".$pluginFolder.'/spreadsheet/SpreadsheetReader.php');


$sql = "SELECT `USER_ID`, `USER_LNAME`, `USER_FNAME`, `USER_MNAME` FROM `user`";

$result = $conn->query($sql);

$userRecords = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $userRecords[] = $row;
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_FILES['excelFile']['error'] === UPLOAD_ERR_OK) {
        $uploadFilePath = '../uploads/' . basename($_FILES['excelFile']['name']);
        
        if (move_uploaded_file($_FILES['excelFile']['tmp_name'], $uploadFilePath)) {
            // File uploaded successfully; you can process it further here
            $Reader = new SpreadsheetReader($uploadFilePath);
            $firstRow = true;

            $data = array();

            foreach ($Reader as $row){
                if (!$firstRow) {
                    if($row[0] != ""){

                        $row[2] = findStatus($row[2]);
                        $row[3] = getAssignee($row[3]);
                        $row[4] = findPriority($row[4]);
                        $row[5] = ( $row[5] != "") ? identifyDateFormat($row[5]) : "";
                        $row[6] = ( $row[6] != "") ? identifyDateFormat($row[6]) : "";
                        $row[7] = ( $row[7] != "") ? identifyDateFormat($row[7]) : "";
                        $row[8] = isset( $row[8] ) ? $row[8] :"";



                        $data[] = $row;


                    }
                } else {
                    $firstRow = false;
                }
            }

            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }
}



function identifyDateFormat($dateString) {
    $formats = [
        'Y-m-d',
        'm-d-Y',
        'Y/m/d',
        'm/d/Y',
        'm-d-y',
        'm/d/y',
    ];
    $date = "";

    foreach ($formats as $format) {
        $dateTime = DateTime::createFromFormat($format, $dateString);
        if ($dateTime && $dateTime->format($format) === $dateString) {
            $date = $format;
        }
    }

    $dateCreateFormat = DateTime::createFromFormat($date, $dateString);
    $date = $dateCreateFormat->format('Y-m-d');

    return $date;
}

function getAssignee($assignees) {
    $userRecords = $GLOBALS['userRecords'];

    $arrayAssignees = array_map('trim', explode(',', $assignees)); // Split the string by the comma and trim each element
    $arrayAssigneesID = array();

    foreach($arrayAssignees as $value) {
        $isFound = false;
        $userFound = 0;
        
        foreach ($userRecords as $user) {
            $fullName = strtoupper($user['USER_FNAME']." ".$user['USER_LNAME']);

            if ($fullName == strtoupper($value)) {
                $isFound = true;
                break;
            }

        }

        if($isFound == true) {
            $userFound = $user['USER_ID'];
            $arrayAssigneesID[] = $userFound;
        }

    }

    return $arrayAssigneesID;
}

function findStatus($status){
    $listStatus = json_decode($_POST['listStatus'], true);
    $statusID = null;


    foreach ($listStatus as $item) {
        if (strtoupper($item['b']) == strtoupper($status)) {
            $statusID = $item['a'];
            break;
        }
    }

    if($statusID !== null) {
        return $statusID;
    } else {
        return "";
    }
}

function findPriority($priority){
    $listPriority = json_decode($_POST['listPriority'], true);
    $priorityID = null;


    foreach ($listPriority as $item) {
        if (strtoupper($item['b']) == strtoupper($priority)) {
            $priorityID = $item['a'];
            break;
        }
    }

    if($priorityID !== null) {
        return $priorityID;
    } else {
        return "";
    }
}

?>