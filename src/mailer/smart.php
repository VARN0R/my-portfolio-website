<?php

$name = $_POST['name'];
$email = $_POST['E-mail'];
$textarea = $_POST['textarea'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'vladmalchevskiyportfolio@yandex.ru';                 // почта, с которой отправляем
$mail->Password = '';                             // Пароль от приложения (ВАЖНО! ПАРОЛЬ НУЖЕН ИМЕННО ПРИЛОЖЕНИЯ,
                                                    // А НЕ САМОЙ ПОЧТЫ) почты, с которой отправляем
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('vladmalchevskiyportfolio@yandex.ru', 'MyPortfolio');   // От кого письмо
$mail->addAddress('vladislav.malchevskiy.work@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил cообщение: ' . $textarea . '  <br> 
	Имя: ' . $name . ' <br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>