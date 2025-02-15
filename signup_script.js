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
        return true;
    }

    else if(password != confirm_password) {
        incorrect_box.style.display = "block";
        incorrect.textContent="passwords do not match";
        return true;
    }
    else{
        return false;
    }
}

//default submit action removal
document.getElementById("sign-in-btn").addEventListener("click", function(event){
    if (submit()) {
        event.preventDefault();
    }
});