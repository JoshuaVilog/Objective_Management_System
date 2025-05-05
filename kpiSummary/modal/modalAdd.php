<div id="modalAdd" class="modal fade">
  <div class="modal-dialog" style="width:90%">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add KPI Evaluation</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>Department:</label>
                        <input type="text" id="txtDisplayCreateUserDepartment" class="form-control disabled">
                        <input type="hidden" id="hiddenDisplayUserDepartment" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>User:</label>
                        <input type="text" id="txtDisplayCreateUserFullName" class="form-control disabled">
                        <input type="hidden" id="hiddenDisplayUserFullName" class="form-control">
                    </div>
                    <!-- <div class="form-group">
                        <label>Head:</label>
                        <select class="" id="selectHead" style="width: 100%;"></select>
                    </div> -->
                </div>
                <div class="col-sm-6"></div>
                <div class="col-sm-3"></div>
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="">
                            <strong>Import Excel:</strong>
                        </label>
                        <div class="input-group">
                            <input type="file" id="fileUploadExcel" class="form-control">
                            <div class="input-group-btn">
                                <button class="btn btn-success btn-sm" id="btnUploadExcel">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label for="">
                            <strong>Download Format:</strong>
                        </label>
                        <button class="btn btn-primary btn-sm form-control" id="btnDownloadFormat">Download Format</button>
                    </div>
                </div>
                <div class="col-sm-7"></div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-12">
                    <div id="table-create-kpi"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <button class="btn btn-primary btn-sm form-control" id="btnAddKpiRow" style="margin:10px">Add KPI +</button>
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
                                <input type="text" id="txtAdd1QR" class="form-control">
                            </td> -->
                            <td>
                                <input type="text" id="txtAdd1QS" class="form-control">
                            </td>
                            <td>
                                <input type="text" id="txtAdd1QG" class="form-control">
                            </td>
                            <!-- <td>
                                <input type="text" id="txtAdd2QR" class="form-control">
                            </td>-->
                            <td> 
                                <input type="text" id="txtAdd2QS" class="form-control">
                            </td>
                            <td>
                                <input type="text" id="txtAdd2QG" class="form-control">
                            </td>
                            <!-- <td>
                                <input type="text" id="txtAdd3QR" class="form-control">
                            </td> -->
                            <td>
                                <input type="text" id="txtAdd3QS" class="form-control">
                            </td>
                            <td>
                                <input type="text" id="txtAdd3QG" class="form-control">
                            </td>
                            <!-- <td>
                                <input type="text" id="txtAdd4QR" class="form-control">
                            </td> -->
                            <td>
                                <input type="text" id="txtAdd4QS" class="form-control">
                            </td>
                            <td>
                                <input type="text" id="txtAdd4QG" class="form-control">
                            </td>
                            <!-- <td>
                                <input type="text" id="txtAddRR" class="form-control">
                            </td> -->
                            <td>
                                <input type="text" id="txtAddRS" class="form-control">
                            </td>
                            <td>
                                <input type="text" id="txtAddRG" class="form-control">
                            </td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group m-3">
                        <h4>Total Weigh: <span id="displayTotal1"></span></h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnSubmit">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>