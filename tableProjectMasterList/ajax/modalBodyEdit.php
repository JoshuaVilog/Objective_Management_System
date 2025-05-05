<?php
include "connection.php";

$desc = $_POST['desc'];
$code = $_POST['code'];

//echo json_encode($user);

// USELESS CODEEEEEEEEEEE
?>
<div class="form-group">
    <label>Project Description:</label>
    <input type="text" class="form-control" id="txtEditDesc" value="<?php echo $desc; ?>">
</div>
<div class="form-group">
    <label>Target Date:</label>
    <input type="text" class="form-control" id="txtEditTargetDate" value="<?php echo $desc; ?>">
</div>
<div class="form-group">
    <label>Project Details:</label>
    <input type="text" class="form-control" id="txtEditDetails" value="<?php echo $desc; ?>">
</div>
<input type="hidden" id="hiddenId" value="<?php echo $code; ?>">