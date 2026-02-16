<?php
$filename = "messages.txt";

if (!file_exists($filename)) {
    file_put_contents($filename, "");
}

/* ---------- DELETE MESSAGE ---------- */
if (isset($_GET['delete'])) {
    $lines = file($filename, FILE_IGNORE_NEW_LINES);
    $messages = [];
    $temp = [];

    foreach ($lines as $line) {
        if (trim($line) === "------------------------") {
            $messages[] = $temp;
            $temp = [];
        } else {
            $temp[] = $line;
        }
    }

    $index = (int) $_GET['delete'];

    if (isset($messages[$index])) {
        unset($messages[$index]);

        $newContent = "";
        foreach ($messages as $msg) {
            foreach ($msg as $line) {
                $newContent .= $line . "\n";
            }
            $newContent .= "------------------------\n";
        }

        file_put_contents($filename, $newContent, LOCK_EX);
    }

    header("Location: messages.php");
    exit;
}

/* ---------- READ MESSAGES ---------- */
$lines = file($filename, FILE_IGNORE_NEW_LINES);
$messages = [];
$temp = [];

foreach ($lines as $line) {
    if (trim($line) === "------------------------") {
        $messages[] = $temp;
        $temp = [];
    } else {
        $temp[] = $line;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>View Messages</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="custom-container">
    <h2 class="custom-heading">View Messages</h2>

    <div class="custom-messages-wrapper">
      <?php if(count($messages) === 0): ?>
          <p class="custom-no-messages">No messages yet.</p>
      <?php else: ?>
          <?php foreach($messages as $i => $msg): ?>
              <div class="custom-message-card">
                  <p><strong>Name:</strong> <?php echo htmlspecialchars($msg[0] ?? '', ENT_QUOTES, 'UTF-8'); ?></p>
                  <p><strong>Email:</strong> <?php echo htmlspecialchars($msg[1] ?? '', ENT_QUOTES, 'UTF-8'); ?></p>
                  <p><strong>Username:</strong> <?php echo htmlspecialchars($msg[2] ?? '', ENT_QUOTES, 'UTF-8'); ?></p>
                  <p><strong>Message:</strong> <?php echo nl2br(htmlspecialchars($msg[3] ?? '', ENT_QUOTES, 'UTF-8')); ?></p>
                  <a href="?delete=<?php echo $i; ?>" class="custom-delete-btn">Delete</a>
              </div>
          <?php endforeach; ?>
      <?php endif; ?>
    </div>

    <a href="index.php" class="custom-back-link">Back</a>
  </div>
</body>
</html>
