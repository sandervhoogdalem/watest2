<?php
file_put_contents("whatsapp_log.txt", print_r($_SERVER, true) . "\n\n" . print_r($_GET, true), FILE_APPEND);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = 'test1234';
    $mode = $_GET['hub.mode'] ?? $_GET['hub_mode'] ?? '';
    $verify_token = $_GET['hub.verify_token'] ?? $_GET['hub_verify_token'] ?? '';
    $challenge = $_GET['hub.challenge'] ?? $_GET['hub_challenge'] ?? '';

    header("Content-Type: text/plain");

    if ($mode === 'subscribe' && $verify_token === $token) {
        echo $challenge;
        exit;
    }

    http_response_code(403);
    echo "Wrong token";
    exit;
}

http_response_code(405);
echo 'Use GET';
