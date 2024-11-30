<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    // От кого письмо
    $mail->setFrom('alosins.matvejs@gmail.com', 'Фрилансер по жизни');
    // Кому отправить
    $mail->addAddress('alosins.matvejs@gmail.com');
    // Тема письма
    $mail->Subject = 'Привет! Это "Фрилансер по жизни"';

    // Тело письма
    $body = '<h1>Встречайте супер письмо!</h1>';

    if (trim(!empty($_POST['name']))) {
        $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
    }

    if(!&mail->send()){
        $message = 'Ошибка';
    } else{
        $message = "Данные отправлены!";
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
