<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$sql = "SELECT `KPI_ID`, `DEPARTMENT_ID`, `KPI_USER`, `HEAD_USER`, `HEAD_REMARKS`, `MANAGER_USER`, `MANAGER_REMARKS`, `OD_USER`, `OD_REMARKS`, `PD_USER`, `PD_REMARKS` FROM `kpi_masterlist`WHERE KPI_ID = $id";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

//echo json_encode($user);

$sqlKpiList = $conn->query("SELECT `KPI_LIST_ID`, `KPI_CATEGORY`, `KPI_DESC`, `KPI_ID`, `GOAL`, `WEIGH`, `FORMULA` FROM `kpi_list` WHERE KPI_ID = $row[KPI_ID]");


?>
<div class="form-group">
    <label>Department:</label>
    <input type="text" class="form-control disabled" value="<?php echo $row['DEPARTMENT_ID']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<div class="form-group">
    <label>Name:</label>
    <input type="text" class="form-control disabled" value="<?php echo $row['KPI_USER']; ?>" oninput="this.value = this.value.toUpperCase()">
</div>
<!-- <input type="hidden" id="hiddenId" value="<?php echo $row['a']; ?>"> -->
<div class="row">
    <div class="col-sm-12">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>KPI Description</th>
                    <th>Goal</th>
                    <th>Weigh</th>
                    <th>Formula</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($rowKpi = $sqlKpiList->fetch_assoc()) { ?>
                    <tr class="">
                        <td>
                            <textarea class="form-control disabled"><?php echo $rowKpi['KPI_CATEGORY'];?></textarea>
                        </td>
                        <td>
                            <textarea class="form-control disabled"><?php echo $rowKpi['KPI_DESC'];?></textarea>
                        </td>
                        <td>
                            <input type="text" class="form-control disabled" value="<?php echo $rowKpi['GOAL'];?>">
                        </td>
                        <td>
                            <input type="text" class="form-control disabled" value="<?php echo $rowKpi['WEIGH'];?>">
                        </td>
                        <td>
                            <textarea class="form-control disabled"> <?php echo $rowKpi['FORMULA'];?></textarea>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</div>

