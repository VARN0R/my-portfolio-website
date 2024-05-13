<?php
session_start();

$langFilesPath = __DIR__ . '/languages/';

// Check if the language is set in the session. If not, set the default language.
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'en';
    setcookie('lang', $_SESSION['lang'], time() + (86400 * 30), "/");
}

// Check if the language is passed in the request, set it in the session
if (isset($_GET['lang']) && ($_GET['lang'] === 'ru' || $_GET['lang'] === 'en')) {
    $_SESSION['lang'] = $_GET['lang'];
    setcookie('lang', $_SESSION['lang'], time() + (86400 * 30), "/");
}

// Read the contents of the file with the content in the selected language
$langFile = $langFilesPath . $_SESSION['lang'] . '.json';
if (file_exists($langFile)) {
    $langContent = json_decode(file_get_contents($langFile), true);
    header('Content-Type: application/json');
    echo json_encode($langContent);
} else {
    header('HTTP/1.0 404 Not Found');
    echo json_encode(array('error' => 'Language file not found'));
}
?>