let gmail_arr=[];
let username_arr=[];
let password_arr=[];
function login(){
    let username=document.getElementById("username_input_login").value;
    let password=document.getElementById("password_input_login").value;

    let isCorrect = false;
    for (let i = 0; i <=username_arr.length; i++) {
        if(username === username_arr[i] && password === password_arr[i]){
            isCorrect = true;
            break;
        }
    }

    if(username==username_arr[i] && password==password_arr[i]) {
        window.alert("WOW you have logged in")
    }
    else{
        window.alert("wrong password or username")
    }
}

function submit() {
    let gmail=document.getElementById("gmail_input").value;
    let username=document.getElementById("username_input").value;
    let password=document.getElementById("password_input").value;
    let confirm_password=document.getElementById("confirm_password").value;
    let incorrect=document.getElementById("incorrect_text");
    let incorrect_box=document.getElementById("incorrect_password");
    if(!gmail || !username || !password || !confirm_password){
        incorrect_box.style.display = "block";
        incorrect.textContent = "All fields are required.";
    }

    else if(password != confirm_password) {
        incorrect_box.style.display = "block";
        incorrect.textContent="passwords do not match";
    }
    else{
        gmail_arr.push(gmail);
        username_arr.push(username);
        password_arr.push(password);

        window.location.href = "login.php";
    }
    // gmail.value="";
    // username.value="";
    // password.value="";
    // confirm_password.value="";
    // incorrect.textContent="";
}

//default submit action removal
document.getElementById("sign-in-btn").addEventListener("click", function(event){
    event.preventDefault();
    submit();
});