<div id="modalAdd" class="modal fade">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Add Record</h4>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>JOB TITLE:</label>
                <input type="text" class="form-control" id="txtJobTitle" oninput="this.value = this.value.toUpperCase()">
            </div>
            <div class="form-group">
                <label>JOB DESC:</label>
                <!-- <input type="text" class="form-control" id="txtJobDesc" oninput="this.value = this.value.toUpperCase()"> -->
                <select class="form-control" id="selectJobDesc">
                    <option value="RANK AND FILE">RANK AND FILE</option>
                    <option value="SUPERVISORY">SUPERVISORY</option>
                    <option value="MANAGEMENT">MANAGEMENT</option>
                    <option value="MANAGERIAL">MANAGERIAL</option>
                    <option value="KOREAN DIRECTOR">KOREAN DIRECTOR</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="btnAdd">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            
        </div>
    </div>

  </div>
</div>