<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$row = $data['user'];
$departmentList = $data['departmentList'];
$positionList = $data['positionList'];
$roleList = $data['roleList'];
$statusList = $data['statusList'];

//echo json_encode($user);

?>
<div class="form-group">
    <label>Last Name:</label>
    <input type="text" class="form-control" id="txtEditLastname" value="<?php echo $row['b']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<div class="form-group">
    <label>First Name:</label>
    <input type="text" class="form-control" id="txtEditFirstname" value="<?php echo $row['c']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<div class="form-group">
    <label>Middle Name:</label>
    <input type="text" class="form-control" id="txtEditMiddlename" value="<?php echo $row['d']; ?>" oninput="this.value = this.value.toUpperCase()">
</div> 
<div class="form-group">
    <label>Email:</label>
    <input type="text" class="form-control" id="txtEditEmail" value="<?php echo $row['j']; ?>">
</div>
<div class="form-group">
    <label>Username:</label>
    <input type="text" class="form-control" id="txtEditUsername" value="<?php echo $row['g']; ?>">
</div>
<div class="form-group">
    <label>Position:</label>
    <select class="" id="selectEditPosition" style="width:100%;">
        <?php

        foreach($positionList as $value):?>
            <option value="<?php echo $value['a']; ?>"
                <?php if($row['f'] == $value['a']) echo "selected"; ?>>
                <?php echo $value['b']; ?>
            </option>
        <?php endforeach;?>
    </select>
</div>
<div class="form-group">
    <label>Department:</label>
    <select class="" id="selectEditDepartment" style="width:100%;">
        <?php

        foreach($departmentList as $value):?>
            <option value="<?php echo $value['a']; ?>"
                <?php if($row['e'] == $value['a']) echo "selected"; ?>>
                <?php echo $value['b']; ?>
            </option>
        <?php endforeach;?>
    </select>
</div>
<div class="form-group">
    <label>User Role:</label>
    <select class="form-control" id="selectEditRole">
        <?php
        // $roleList = [
        //     ["a" => "1", "b" => "ADMIN"],
        // ];

        foreach($roleList as $value):?>
            <option value="<?php echo $value['a']; ?>"
                <?php if($row['h'] == $value['a']) echo "selected"; ?>>
                <?php echo $value['b']; ?>
            </option>
        <?php endforeach;?>
    </select>
</div>
<div class="form-group">
    <label>User Status:</label>
    <select class="form-control" id="selectEditStatus">
        <?php

        foreach($statusList as $value):?>
            <option value="<?php echo $value['a']; ?>"
                <?php if($row['i'] == $value['a']) echo "selected"; ?>>
                <?php echo $value['b']; ?>
            </option>
        <?php endforeach;?>
    </select>
</div>
<div class="form-group">
    <label class="">Department2:</label>
    <select class="" id="selectEditDepartment2" style="width:100%;" multiple></select>
</div>
<input type="hidden" id="hiddenId" value="<?php echo $row['a']; ?>">