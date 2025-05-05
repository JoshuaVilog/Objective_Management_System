<div id="modalEdit" class="modal fade">
    <div class="modal-dialog" style="width:90%">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit KPI</h4>
            </div>
            <div class="modal-body" id="modal-body-edit">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label>Department:</label>
                            <input type="text" id="txtDisplayEditUserDepartment" class="form-control disabled">
                            <input type="hidden" id="hiddenDisplayEditUserDepartment" class="form-control disabled">
                        </div>
                        <div class="form-group">
                            <label>User:</label>
                            <input type="text" id="txtDisplayEditUserFullName" class="form-control disabled">
                            <input type="hidden" id="hiddenDisplayEditUserFullName" class="form-control disabled">
                        </div>
                        <!-- <div class="form-group">
                            <label>Head:</label>
                            <select class="" id="" style="width: 100%;"></select>
                        </div> -->
                    </div>
                    <div class="col-sm-6"></div>
                    <div class="col-sm-3">
                        
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div id="table-edit-kpi"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <button class="btn btn-primary btn-sm form-control" id="btnAddKpiRowEdit" style="margin:10px">Add KPI +</button>
                    </div>
                    <div class="col-sm-8">
                        <table class="table table-bordered">
                            <tr>
                                <td colspan="2" class="center">1Q</td>
                                <td colspan="2" class="center">2Q</td>
                                <td colspan="2" class="center">3Q</td>
                                <td colspan="2" class="center">4Q</td>
                                <td colspan="2" class="center">Result</td>
                            </tr>
                            <tr>
                                <!-- <td class="center">Result</td> -->
                                <td class="center">Score</td>
                                <td class="center">Grade</td>
                                <!-- <td class="center">Result</td> -->
                                <td class="center">Score</td>
                                <td class="center">Grade</td>
                                <!-- <td class="center">Result</td> -->
                                <td class="center">Score</td>
                                <td class="center">Grade</td>
                                <!-- <td class="center">Result</td> -->
                                <td class="center">Score</td>
                                <td class="center">Grade</td>
                                <!-- <td class="center">Result</td> -->
                                <td class="center">Score</td>
                                <td class="center">Grade</td>
                                
                            </tr>
                            <tr>
                                <!-- <td>
                                    <input type="text" id="txtEdit1QR" class="form-control">
                                </td> -->
                                <td>
                                    <input type="text" id="txtEdit1QS" class="form-control">
                                </td>
                                <td>
                                    <input type="text" id="txtEdit1QG" class="form-control">
                                </td>
                                <!-- <td>
                                    <input type="text" id="txtEdit2QR" class="form-control">
                                </td> -->
                                <td>
                                    <input type="text" id="txtEdit2QS" class="form-control">
                                </td>
                                <td>
                                    <input type="text" id="txtEdit2QG" class="form-control">
                                </td>
                                <!-- <td>
                                    <input type="text" id="txtEdit3QR" class="form-control">
                                </td> -->
                                <td>
                                    <input type="text" id="txtEdit3QS" class="form-control">
                                </td>
                                <td>
                                    <input type="text" id="txtEdit3QG" class="form-control">
                                </td>
                                <!-- <td>
                                    <input type="text" id="txtEdit4QR" class="form-control">
                                </td> -->
                                <td>
                                    <input type="text" id="txtEdit4QS" class="form-control">
                                </td>
                                <td>
                                    <input type="text" id="txtEdit4QG" class="form-control">
                                </td>
                                <!-- <td>
                                    <input type="text" id="txtEditRR" class="form-control">
                                </td> -->
                                <td>
                                    <input type="text" id="txtEditRS" class="form-control">
                                </td>
                                <td>
                                    <input type="text" id="txtEditRG" class="form-control">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group m-3">
                            <h4>Total Weigh: <span id="displayTotal2"></span></h4>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="hiddenKPIID">

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btnUpdateKPI">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                
            </div>
        </div>

    </div>
</div>