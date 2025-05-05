<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$assigneeEmail = $_POST['assigneeEmail'];
$requestorName = $_POST['requestorName'];
$taskID = $_POST['taskID'];
$taskDesc = $_POST['taskDesc'];

$subject = "Task Assign in Objective Management System";
$body = 'Good Day, <br>
Kindly see the task that assigned to you from '.$requestorName.'. Thank you.
<br>
<br>
TASK NAME: '.$taskDesc.'
<br>
<br>
System Link: <a href="http://172.16.1.13:8000/1_OKRMS/inbox/index.php?taskID='.$taskID.'">172.16.1.13:8000/1_OKRMS/inbox/</a>


<br>
<br>
<b>This email has been sent from an automated system - please do not reply to it.</b>
';


try {
    if($assigneeEmail != ""){
        $mail = new PHPMailer(true);                     
        $mail->isSMTP();                           
        // $mail->Host       = 'mail.primatechphils.com';  
        $mail->Host       = 'cloud-2c25f5.managed-vps.net'; 
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'ptpi_system@primatechphils.com';//Original Code
        $mail->Password   = 'prim@t3ch';//App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;//Enable implicit TLS encryption                                  
        $mail->Port       = 465;                                    
        $mail->SMTPSecure = 'ssl';
        $mail->isHTML(true); 
        $mail->setFrom("ptpi_system@primatechphils.com", "OMS Notification");
        $mail->addAddress($assigneeEmail);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();

        echo "Email sent";
    } else {
        echo "Assignee No Email";
    }
    

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>