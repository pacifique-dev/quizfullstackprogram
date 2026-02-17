<!DOCTYPE html>
<html>
<head>
    <title>Student Grade Calculator</title>
</head>
<body>
    <h2>Enter Student Marks</h2>

    <form method="post">
        Percentage: <input type="number" name="marks" step="0.01" min="0" max="100" required>
        <input type="submit" name="submit" value="Display Grade">
    </form>

    <?php
    if (isset($_POST['submit'])) {
        $marks = $_POST['marks'];
        $grade = "";

        $marks_group = floor($marks / 10);

        switch ($marks_group) {
            case 10:
            case 9:
                $grade = "A";
                break;
            case 8:
                $grade = "B";
                break;
            case 7:
                $grade = "C";
                break;
            case 6:
                $grade = "D";
                break;
            case 5:
                $grade = "E";
                break;
            case 4:
                $grade = "F";
                break;
            case 3:
                $grade = "S";
                break;
            default:
                $grade = "U";
        }

        echo "<h3>Percentage: $marks%</h3>";
        echo "<h3>Grade: $grade</h3>";
    }
    ?>
</body>
</html>
