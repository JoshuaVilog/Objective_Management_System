<?php
    include "connection.php";

    $year = $_POST['year'];
    $user = $_POST['user'];

    $find = $year. '-' .$user;

    $sql = "SELECT `RID` FROM `kpi_masterlist` WHERE CONCAT(YEAR_ID, '-', KPI_USER, COALESCE(DELETED_AT, '')) = '$find'";
    $result = mysqli_query($conn, $sql);
    $value = mysqli_fetch_assoc($result);


    
    if(mysqli_num_rows($result) > 0){
        echo $value['RID'];

    } else {
        echo "";
    }


?>