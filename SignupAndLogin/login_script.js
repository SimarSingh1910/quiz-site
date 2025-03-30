import { supabase } from '../supabase/supabaseClient';

const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error('Login Error:', error.message);
        showError(error.message);
        return;
    }

    console.log('User logged in:', data);
    alert("Login successful!");

    // Redirect user to home page
    window.location.href = "home.html";
};

function login() {
    let email = document.getElementById("username_input_login").value;
    let password = document.getElementById("password_input_login").value;
    let incorrect = document.getElementById("incorrect_text_login");
    let incorrect_box = document.getElementById("incorrect_password_login");
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
document.getElementById("log-in-btn").addEventListener("click", async function (e) {
    e.preventDefault(); 

    if (login()) return; 

    let email = document.getElementById("username_input_login").value;
    let password = document.getElementById("password_input_login").value;

    await signIn(email, password); // Call Supabase login function
});