<?php
include "connection.php";

try {
    // Begin a transaction
    $conn->begin_transaction();

    $data = json_decode(file_get_contents("php://input"), true);

    $desc = $data['desc'];
    $department = $data['department'];
    $id = $data['id'];
    $userCode = $data['userCode'];

    $selectedMembers = $data['memberList'];

    date_default_timezone_set('Asia/Manila');
    $datetime = date("Y-m-d H:i:s");
    $getIP = getClientIP();

    $conn->query("UPDATE
        `workspace_masterlist`
        SET
        `WORKSPACE_DESC` = '$desc',
        `DEPARTMENT_ID` = $department,
        `UPDATED_BY` = $userCode,
        `UPDATED_IP` = '$getIP'
        WHERE
        `RID` = $id
    ");

    // KUKUNIN YUNG MGA LUMANG MEMBERS DATI 
    $idMember = $id."-"."0";
    $sqlMember = "SELECT `RID`, `USER_ID`, `WORKSPACE_ID`, `MEMBER_ROLE`, `REMOVED` FROM `workspace_members` WHERE CONCAT(WORKSPACE_ID, '-', REMOVED) = '$idMember'";
    $resultMember = $conn->query($sqlMember);

    $memberOldList = array();

    if ($resultMember->num_rows > 0) {
        while ($rowMember = $resultMember->fetch_assoc()) {
            $memberOldList[] = $rowMember;
        }
    }
    
    // ICHECHECK MUNA KUNG MAY LAMAN ANG OLD MEMBER LIST
    if(count($memberOldList) > 0) {
        foreach($memberOldList as $oldMember){
            $isRemoved = true;
            $isComeback = false;
            
            // PAG YUNG OLD MEMBER AY WALA SA NEW LIST, REMOVED NA
            foreach($selectedMembers as $selectedMember){
                if($oldMember['USER_ID'] == $selectedMember['member']){
                    $isRemoved = false;
                    break;
                }
            }
            
            // ICHECHECK MUNA YUNG OLD MEMBER KUNG REMOVED BA OR HINDI
            if($oldMember['REMOVED'] == 1){
                // THEN KAPAG REMOVED YUNG STATUS, ICHECHECK YUNG OLD MEMBER KUNG NASA NEW LIST... THEN KAPAG MERON, BABAGUHIN YUNG REMOVED STATUS NIYA INTO 0
                foreach($selectedMembers as $selectedMember){
                    if($oldMember['USER_ID'] == $selectedMember['member']){
                        $isComeback = true;
                        break;
                    }
                }
            }
    
            if($isRemoved == true){
                // REMOVE THE MEMBER
                $conn->query("UPDATE
                        `workspace_members`
                    SET
                        `REMOVED` = 1,
                        `UPDATED_BY` = $userCode,
                        `UPDATED_IP` = '$getIP'
                    WHERE
                        `RID` = $oldMember[RID]
                ");
            }
    
            if($isComeback == true){
                // INVITE AGAIN THE MEMBER
                $conn->query("UPDATE
                    `workspace_members`
                SET
                    `REMOVED` = 0,
                    `UPDATED_BY` = $userCode,
                    `UPDATED_IP` = '$getIP',
                WHERE
                    `RID` = $oldMember[RID]
                ");
    
            }
        }
    }



    if(count($memberOldList) > 0) {
        // KAPAG MAY LAMAN YUNG OLD LIST, ICHECHECK NIYA KUNG MAY BAGONG MEMBER SA NEW LIST
        foreach($selectedMembers as $selectedMember){
            $isNew = true;
    
            foreach($memberOldList as $oldMember){
                if($selectedMember['member'] == $oldMember['USER_ID']){
                    $isNew = false;
                    break;
                }
            }
            
            $newMemberID = $selectedMember['member'];
            $oldMemberID = $selectedMember['id'];
            $newMemberRole = $selectedMember['role'];

            if($isNew == true){
                
                
    
                // INSERT NEW MEMBER
                $conn->query("INSERT INTO `workspace_members`(
                    `RID`,
                    `USER_ID`,
                    `WORKSPACE_ID`,
                    `MEMBER_ROLE`,
                    `REMOVED`,
                    `CREATED_BY`,
                    `CREATED_IP`
                )
                VALUES(
                    DEFAULT,
                    $newMemberID,
                    $id,
                    $newMemberRole,
                    0,
                    $userCode,
                    '$getIP'
                )");
            } else {
                // KAPAG HINDI BAGO YUNG MEMBER

                $conn->query("UPDATE
                    `workspace_members`
                SET
                    `MEMBER_ROLE` = '$newMemberRole',
                    `UPDATED_BY` = '$userCode',
                    `UPDATED_IP` = '$getIP'
                WHERE
                    `RID` = $oldMemberID");

            }
        }
    } else if(count($memberOldList) == 0){
        // KAPAG WALANG LAMAN ANG OLD MEMBER LIST, IIINSERT LAHAT NG NASA NEW LIST
        foreach($selectedMembers as $selectedMember){
            $newMemberID = $selectedMember['member'];
            $newMemberRole = $selectedMember['role'];
    
            // INSERT NEW MEMBER
            $conn->query("INSERT INTO `workspace_members`(
                `RID`,
                `USER_ID`,
                `WORKSPACE_ID`,
                `MEMBER_ROLE`,
                `REMOVED`,
                `CREATED_BY`,
                `CREATED_IP`
            )
            VALUES(
                DEFAULT,
                $newMemberID,
                $id,
                $newMemberRole,
                0,
                $userCode,
                '$getIP'
            )");

        }
    }
    
    

    // header('Content-Type: application/json');
    // echo json_encode($memberOldList);

    $conn->commit();

} catch (Exception $e) {
    // If any query fails, roll back the transaction to prevent partial data insertion
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}

$conn->close();


?>