<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="signup_styles.css">
</head>
<body>
    <div class="leftsidebox">
        <div class="small_signup_box">
            <div class="header_text">
                <p>Sign up</p>
            </div>
            <div class="input_box">
                <input type="text" class="input-box" id="gmail_input" placeholder="Gmail">
                <input type="text" class="input-box" id="username_input" placeholder="Username">
                <input type="password" class="input-box" id="password_input" placeholder="Password ">
                <input type="password" class="input-box" id="confirm_password" placeholder="Confirm Password">
                <div class="incorrect" id="incorrect_password"><p id="incorrect_text"></p></div>
                <button class="sign-in-btn" onclick="submit()">Sign Up</button>
                <div class="small_text_box">
                    <p class="login">Already have an account?<a href="login.html" class="login_link"> Log in</a></p>
                </div>
                <div class="line"></div>
                <div class="google">
                    <a href="#" class="google-signup">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo">
                        Sign Up with Google
                    </a>
                </div>
                
            </div>
        </div>
    </div>
    <div class="rightsidebox">
        <img class="ovs" src="ovs.png" alt="online voting system">
    </div>

    <script src="signup_script.js"></script>
</body>
</html>
