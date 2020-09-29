<?php
    header("Location: ../collection.html"); 

    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    // echo 'Sending mail . . .';
    $emailFrom = $_POST['mail'];
    $emailMessage= $_POST['message'];
    $emailImg = $_POST['attachment'];

    $emailContent = $emailMessage.$emailImg;
    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    $recipientMail = 'your.email@gmail.com';
    try {
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                   // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = $recipientMail;                         // SMTP username
        $mail->Password   = 'your.password';                             // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        // Recipients
        $mail->setFrom($recipientMail, $emailFrom);
        $mail->addAddress($recipientMail);     // Add a recipient

        // Attachments
        // $mail->addAttachment('path/to/attachment.ext', 'optionalName.ext');         // Add attachment

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Art Gallery: New message from '.$emailFrom;
        $mail->Body    = nl2br($emailContent);
        $mail->AltBody = $emailMessage;

        $mail->send();
        // echo 'Message has been sent';
    } catch (Exception $e) {
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>