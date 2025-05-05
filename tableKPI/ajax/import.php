<?php
include "connection.php";
require($_SERVER['DOCUMENT_ROOT']."/".$pluginFolder.'/spreadsheet/php-excel-reader/excel_reader2.php');
require($_SERVER['DOCUMENT_ROOT']."/".$pluginFolder.'/spreadsheet/SpreadsheetReader.php');

/*
$sql = "SELECT `USER_ID`, `USER_LNAME`, `USER_FNAME`, `USER_MNAME` FROM `user`";
$result = $conn->query($sql);
$userRecords = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $userRecords[] = $row;
    }
}
*/

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

                        // $row[0] = ( $row[0] != "") ? identifyDateFormat($row[0]) : "";
                        // $row[8] = ( $row[8] != "") ? identifyDateFormat($row[8]) : "";
                        // $row[1] = findDepartment($row[1]);

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


function findDepartment($selected){
    $list = json_decode($_POST['listDepartment'], true);
    $id = null;


    foreach ($list as $item) {
        if (strtoupper($item['b']) == strtoupper($selected)) {
            $id = $item['a'];
            break;
        } else if (strtoupper($item['c']) == strtoupper($selected)) {
            $id = $item['a'];
            break;
        }
    }

    if($id !== null) {
        return $id;
    } else {
        return "";
    }
}
?>