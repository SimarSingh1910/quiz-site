function login(){
    let username=document.getElementById("username_input_login").value;
    let password=document.getElementById("password_input_login").value;
    let incorrect=document.getElementById("incorrect_text_login");
    let incorrect_box=document.getElementById("incorrect_password_login");
    if(!username || !password){
        incorrect_box.style.display = "block";
        incorrect.textContent = "All fields are required.";
        return true;
    }
    else{
        incorrect_box.style.display = "none";
        return false;
    }
}
document.getElementById("log-in-btn").addEventListener("click", function(event){
    if (login()) {   
        event.preventDefault();
    }
});