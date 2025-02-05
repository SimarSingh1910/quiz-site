let gmail_arr=[];
let username_arr=[];
let password_arr=[];
function login(){
    let username=document.getElementById("username_input_login").value;
    let password=document.getElementById("password_input_login").value;
    for (let i = 0; i <=username_arr.length; i++) {
        if (username==username_arr[i] && password==password_arr[i]) {
            window.alert("WOW you have logged in")
        }
        else{
            window.alert("wrong password or username")
        }
    }
}
function submit() {
    let gmail=document.getElementById("gmail_input");
    let username=document.getElementById("username_input");
    let password=document.getElementById("password_input").value;
    let confirm_password=document.getElementById("confirm_password").value;
    let incorrect=document.getElementById("incorrect_text");
    if (password==confirm_password) {
        gmail_arr.push(gmail.value);
        username_arr.push(username.value);
        password_arr.push(password.value);
        window.location.href = "login.html";
    }
    else{
        incorrect.textContent="passwords does not match";
    }
    gmail.value="";
    username.value="";
    password.value="";
    confirm_password.value="";
}
