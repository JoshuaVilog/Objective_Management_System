<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$creatorEmail = $_POST['email'];
$assigneeName = $_POST['name'];
$taskDesc = $_POST['taskDesc'];
$taskID = $_POST['taskID'];

$subject = "Task Notification";
$body = 'Good Day, <br>
You have an approval request for the task named '.$taskDesc.'. <br>
Thank you. 
<br>
<br>
System Link: <a href="http://172.16.1.13:8000/1_OKRMS/workspace/index.php?taskID='.$taskID.'">172.16.1.13:8000/1_OKRMS</a>


<br>
<br>
<b>This email has been sent from an automated system - please do not reply to it.</b>
';


try {
    if($creatorEmail != ""){
        $mail = new PHPMailer(true);                     
        $mail->isSMTP();                                            
        // $mail->Host       = 'mail.primatechphils.com';  
        $mail->Host       = 'cloud-2c25f5.managed-vps.net';                    
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'ptpi_system@primatechphils.com';                     //Original Code
        $mail->Password   = 'prim@t3ch';                               //App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    
        $mail->SMTPSecure = 'ssl';
        $mail->isHTML(true); 
        $mail->setFrom("ptpi_system@primatechphils.com", "OMS Notification");
        $mail->addAddress($creatorEmail);
        //$mail->addReplyTo('vilogmharkjoshualeonyll60@gmail.com', 'Reply Here');
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();

        echo "Email sent";

        /*
        $mail = new PHPMailer(true);                     
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                     
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'juswa.company@gmail.com';                     //Original Code
        $mail->Password   = 'ajrqlkjepurzqcwc';                               //App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    
        $mail->SMTPSecure = 'ssl';
        $mail->isHTML(true); 
        $mail->setFrom($requestorEmail, "OMS Notification");
        $mail->addAddress($requestorEmail);
        //$mail->addReplyTo('vilogmharkjoshualeonyll60@gmail.com', 'Reply Here');
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();

        echo "Email sent";
        */
    } else {
        echo "Assignee No Email";
    }
    

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


























/*
try {
    if($receiverA != ""){
        
        $mail = new PHPMailer(true);                     
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                     
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'juswa.company@gmail.com';                     //Original Code
        $mail->Password   = 'ajrqlkjepurzqcwc';                               //App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    
        $mail->SMTPSecure = 'ssl';
        $mail->isHTML(true); 
        $mail->setFrom($receiverA, $name);
        $mail->addAddress($receiverA);
        //$mail->addReplyTo('vilogmharkjoshualeonyll60@gmail.com', 'Reply Here');
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();
        
        echo "Email1 sent";
    } else {
        echo "No Email for Email1";
    }
    //echo 'Message has been sent';
    if($receiverB != ""){
        $mail = new PHPMailer(true);                     
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                     
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'juswa.company@gmail.com';                     //Original Code
        $mail->Password   = 'ajrqlkjepurzqcwc';                               //App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    
        $mail->SMTPSecure = 'ssl';
        $mail->isHTML(true); 
        $mail->setFrom($receiverB, $name);
        $mail->addAddress($receiverB);
        //$mail->addReplyTo('vilogmharkjoshualeonyll60@gmail.com', 'Reply Here');
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();

        echo"Email2 sent";
    } else {
        echo "No Email for Email2";
    }

    //echo "Message Sent";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

*/

/*
function getEmail($userCode){
    include "connection.php";

    if($userCode != ""){
        $sql = "SELECT USER_CODE, EMAIL FROM user WHERE USER_CODE = '$userCode'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $email = $row['EMAIL'];

        if($email == ""){
            return "";
        } else {
            return $email;
        }
    } else {
        return "";
    }
    
}
*/
?>