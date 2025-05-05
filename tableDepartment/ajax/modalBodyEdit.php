<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$row = $data['result'];

//echo json_encode($user);

?>
<div class="form-group">
    <label>Description:</label>
    <input type="text" class="form-control" id="txtEditDesc" value="<?php echo $row['b']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<div class="form-group">
    <label>Code:</label>
    <input type="text" class="form-control" id="txtEditCode" value="<?php echo $row['c']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<input type="hidden" id="hiddenId" value="<?php echo $row['a']; ?>">