<!DOCTYPE html>
<html>
<head>
    <title>Factorial Calculator</title>
</head>
<body>

<form method="post">
    Enter a number:
    <input type="number" name="num" min="0" required>
    <input type="submit" value="Calculate Factorial">
</form>

<?php
if (isset($_POST['num'])) {
    $num = (int) $_POST['num'];
    $factorial = 1;

    if ($num < 0) {
        echo "Factorial is not defined for negative numbers";
    } else {
        for ($i = 1; $i <= $num; $i++) {
            $factorial *= $i;
        }
        echo "Factorial of $num is: $factorial";
    }
}
?>

</body>
</html>
