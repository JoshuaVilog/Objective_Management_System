<?php
include "connection.php";

$kpilistID = $_POST['kpilistID'];

$sql = "SELECT
`RID`,
`KPI_LIST_ID`,
`FILENAME_OLD`,
`FILENAME_NEW`,
`EXTENSION`,
`CREATED_AT`,
`CREATED_BY`
FROM
`kpi_list_files`
WHERE CONCAT(KPI_LIST_ID, COALESCE(DELETED_AT, '')) = '$kpilistID'
ORDER BY RID DESC
";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['FILENAME_OLD'],
            "c"=>$row['FILENAME_NEW'],
            "d"=>$row['EXTENSION'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>