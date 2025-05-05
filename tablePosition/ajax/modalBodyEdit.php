<?php
include "connection.php";

// $data = json_decode(file_get_contents("php://input"), true);

// $row = $data['result'];

//echo json_encode($user);

$id = $_POST['id'];
$title = $_POST['title'];
$desc = $_POST['desc'];

?>
<div class="form-group">
    <label>Job Title:</label>
    <input type="text" class="form-control" id="txtEditTitle" value="<?php echo $title; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<div class="form-group">
    <label>Job Description:</label>
    <select class="form-control" id="txtEditDesc">
        <?php
        $list = ["RANK AND FILE", "SUPERVISORY", "MANAGEMENT","MANAGERIAL","KOREAN DIRECTOR"];

        foreach($list as $value){
            $selected = ($value == $desc)? "selected":"";
            echo '<option value="'.$value.'" '.$selected.'>'.$value.'</option>';
        }
        ?>
    </select>
    <!-- <input type="text" class="form-control" id="txtEditDesc" value="<?php echo $desc; ?>" oninput="this.value = this.value.toUpperCase()"> -->
</div>
<input type="hidden" id="hiddenId" value="<?php echo $id; ?>">