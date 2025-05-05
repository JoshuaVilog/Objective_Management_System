<?php

$file = 'KPI FORMAT.xlsx';
$filepath = "format/".$file;

if(file_exists($filepath)){
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment;filename=". basename($file));
    header("Content-Type: application/zip");
    header("Content-Transfer-Emcoding: binary");

    readfile($filepath);
    exit();
    echo "File exist";
} else{
    echo "File not exist";
}