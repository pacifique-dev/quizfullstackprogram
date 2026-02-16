<?php
// submit.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and clean user input
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
$message = isset($_POST['message']) ? strip_tags($_POST['message']) : '';


    // Prepare data to store in file
    $data = "Name: $name\nEmail: $email\nMessage: $message\n------------------------\n";

    // Append to messages.txt
    file_put_contents("messages.txt", $data, FILE_APPEND);

    // Confirmation
    echo "<h2>Thank you! Your message has been saved.</h2>";
    echo "<a href='index.php'>Back to Contact Form</a><br>";
    echo "<a href='messages.php'>View All Messages</a>";
}
?>
