import { supabase } from '../supabase/supabaseClient.js';

const redirectURL = "../home/home.html"
let email = document.getElementById("username_input_login").value;
let password = document.getElementById("password_input_login").value;
let incorrect = document.getElementById("incorrect_text_login");
let incorrect_box = document.getElementById("incorrect_password_login");

//function to validate the form inputs
function validateForm() {
    if (!email || !password) {
        incorrect_box.style.display = "block";
        incorrect.textContent = "All fields are required.";
        return true;
    }
    else {
        incorrect_box.style.display = "none";
        return false;
    }
}

//funciton to login using supabase
async function UsernameLogin (username, password) {
    // let incorrect = document.getElementById("#incorrect_text_login");
    // let incorrect_box = document.getElementById("incorrect_password_login");

    try{
        const {data: user, error} = await supabase.from("profiles").select("email").eq("username", username).single();

        if(error || !user){
            incorrect_box.style.display = "block";
            incorrect.textContent = "username not found.";
            return;
        }

        //authenticate the user with email and password
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email: user.email,                            //uses the email fetched from database
            password: password,
        });

        if(loginError){
            incorrect_box.style.display = "block";
            incorrect.textContent = "username or password is not correct!";
            return;
        }

        //redirecting after login
        console.log("login successful!");
        window.location.href = redirectURL;
    } catch(err) {
        incorrect_box.style.display = "block";
        incorrect.textContent = "Something went wrong. Please try again.";
        console.error("Login Error:", err);
    }
}

document.getElementById("log-in-btn").addEventListener("click", async function (e) {
    e.preventDefault(); 

    if (validateForm()){
        let email = document.getElementById("username_input_login").value;
        let password = document.getElementById("password_input_login").value;
        await UsernameLogin(email, password);            // Call Supabase login function
    }; 


});