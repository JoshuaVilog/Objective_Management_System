<?php
include "connection.php";

$yearID = $_POST['yearID'];

$sql = "SELECT
workspace_masterlist.RID,
workspace_masterlist.YEAR_ID,
task_masterlist.STATUS as label,
COUNT(task_masterlist.STATUS) as count
FROM
`workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(workspace_masterlist.YEAR_ID, COALESCE(task_masterlist.DELETED_AT, '')) = '$yearID'
GROUP BY task_masterlist.STATUS, workspace_masterlist.RID";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['label'],
            "c" => $row['count'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);



/*

[
    {
        "a": "1",
        "b": "1",
        "c": "34"
    },
    {
        "a": "10",
        "b": "1",
        "c": "23"
    },
    {
        "a": "1",
        "b": "2",
        "c": "3"
    },
    {
        "a": "10",
        "b": "2",
        "c": "8"
    },
    {
        "a": "1",
        "b": "3",
        "c": "180"
    },
    {
        "a": "10",
        "b": "3",
        "c": "22"
    }
]


[
    [
        "a": "1",
        [
            "1":"34",
            "2":"3",
            "3":"180",
        ]
    ],
],
[
    [
        "a": "10",
        [
            "1":"23",
            "2":"8",
            "3":"22",
        ]
    ],
]

*/





/*
SELECT
    workspace_masterlist.RID,
    task_masterlist.RID,
    task_masterlist.TASK_DESC,
    task_masterlist.STATUS,
    task_masterlist.DUE_DATE
FROM
    `workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE
    CONCAT(workspace_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) =
*/
?>