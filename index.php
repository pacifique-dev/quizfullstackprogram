<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>Contact Us</h2>

    <form method="POST" action="submit.php">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <input type="text" name="username" placeholder="Username" required>
        <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send</button>
    </form>

    <a href="messages.php">View Messages</a>
</div>

</body>
</html>
