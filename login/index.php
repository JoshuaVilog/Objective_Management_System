<!DOCTYPE html>
<html lang="en">
    
    <?php include "../header.php";?>
    <body id="loginBody" class="">
        <!-- <div class="container">
            <h2>Login</h2>
            <div class="form-group">
                <div class="col">
                    <input type="text" class="form-control" id="txtUsername">
                </div>
            </div>
            <div class="form-group">
                <div class="col">
                    <input type="password" class="form-control" id="txtPassword">
                </div>
            </div>
            <button id="btnLogin" class="btn btn-primary">Login</button>
        </div> -->
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="col-sm-5"></div>
            <div class="card-body p-0 col-sm-2">
                <div class="row">
                    <div class="col">
                        <div class="p-5">
                            <div class="center">
                                <img src="/<?php echo $pluginFolder; ?>/images/gallery/logo.png" id="imgLogo" alt="">
                                <h3 class="" style="color:black">
                                    <span>Objective and Key Result Management System</span>
                                </h3>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control form-control-user input-lg" id="txtUsername" placeholder="Enter Username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-user input-lg" id="txtPassword" placeholder="Password">
                            </div>
                            <div class="form-group">
                            </div>
                            <button  class="btn btn-primary btn-user btn-block" id="btnLogin">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-5"></div>
        </div>
        <!-- JavaScript -->
        <?php include "../script.php"; ?>
        <script src="js/functions.js?v=<?php echo $generateRandomNumber; ?>"></script>
    </body>
</html>