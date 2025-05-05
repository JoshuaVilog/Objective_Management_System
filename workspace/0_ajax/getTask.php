<?php
include "connection.php";

$activityID = $_POST['activityID'];
$id = "0".$activityID; // ACTIVITY ID ITOOOOO

$sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `SUBTASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE CONCAT(TASK_PARENT_ID, ACTIVITY_ID, COALESCE(DELETED_IP, '')) = '$id' ORDER BY CREATED_AT DESC";
$result = $conn->query($sql);

$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $subtaskID = $row['RID']; // TASK ID ITOOOOO
        $subtaskRecords = array();

        $sqlSubtask = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `SUBTASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE CONCAT(SUBTASK_PARENT_ID, TASK_PARENT_ID,COALESCE(DELETED_BY, '')) = 0$subtaskID";
        $resultSubtask = $conn->query($sqlSubtask);
        while ($rowSub = $resultSubtask->fetch_assoc()) {
            
            $actionItemID = $rowSub['RID']; // SUBTASK ID ITOOOOO
            $actionItemRecords = array();
            
            $sqlActionItem = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `SUBTASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE CONCAT(SUBTASK_PARENT_ID, COALESCE(DELETED_BY, '')) = $actionItemID ORDER BY CREATED_AT DESC";
            $resultActionItem = $conn->query($sqlActionItem);
            while ($rowItem = $resultActionItem->fetch_assoc()) {

                $actionItemRecords[] = array(
                    "a" => $rowItem['RID'],
                    "b" => $rowItem['TASK_DESC'],
                    "c" => $rowItem['TASK_DETAILS'],
                    "d" => $rowItem['DUE_DATE'],
                    "e" => $rowItem['PRIORITY_ID'],
                    "f" => $rowItem['STATUS'],
                    "g" => $rowItem['START_DATE'],
                    "h" => $rowItem['FINISH_DATE'],
                    'i'=> "",
                    "j" => $rowItem['TASK_PARENT_ID'],
                    "k" => $rowItem['TASK_ASSIGNEE'],
                    "l" => $rowItem['SUBTASK_PARENT_ID'],
                    "subsubtask" => "1",
                );
            }
            

            //KAYA NASA ILALIM AY PARA MAILGAY YUNG MGA CHILDREN
            $subtaskRecords[] = array(
                "a" => $rowSub['RID'],
                "b" => $rowSub['TASK_DESC'],
                "c" => $rowSub['TASK_DETAILS'],
                "d" => $rowSub['DUE_DATE'],
                "e" => $rowSub['PRIORITY_ID'],
                "f" => $rowSub['STATUS'],
                "g" => $rowSub['START_DATE'],
                "h" => $rowSub['FINISH_DATE'],
                'i'=> "", // 'i'=> $rowNoOfRows['NO_OF_ROWS'],
                "j" => $rowSub['TASK_PARENT_ID'],
                "k" => $rowSub['TASK_ASSIGNEE'],
                "l" => $rowSub['SUBTASK_PARENT_ID'],
                "_children" => (count($actionItemRecords) != 0)? $actionItemRecords: "",
                "subsubtask" => "",
            );


        }
        
        //KAYA NASA ILALIM AY PARA MAILGAY YUNG MGA CHILDREN
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['TASK_DESC'],
            "c" => $row['TASK_DETAILS'],
            "d" => $row['DUE_DATE'],
            "e" => $row['PRIORITY_ID'],
            "f" => $row['STATUS'],
            "g" => $row['START_DATE'],
            "h" => $row['FINISH_DATE'],
            'i'=> $resultSubtask->num_rows,
            "j" => $row['TASK_PARENT_ID'],
            "k" => $row['TASK_ASSIGNEE'],
            "l" => $row['SUBTASK_PARENT_ID'],
            "_children" => (count($subtaskRecords) != 0)? $subtaskRecords: "",
            "subsubtask" => "",
            
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>