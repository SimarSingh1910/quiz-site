import { supabase } from '../supabase/supabaseClient.js';
let gmailInput = document.getElementById("gmail_input");
let usernameInput = document.getElementById("username_input");
let passwordInput = document.getElementById("password_input");
let confirmPasswordInput = document.getElementById("confirm_password");

const incorrect = document.getElementById("incorrect_text");
const incorrect_box = document.getElementById("incorrect_password");

async function signUpUser() {
    let gmail = gmailInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let confirm_password = confirmPasswordInput.value;

    if (!gmail || !username || !password || !confirm_password) {
        showError("All fields are required.");
        return;
    }
    if (!isvalidPassword(password)) {
        let signup_box = document.getElementById("small_signup_box");
        signup_box.style.height = "85%";
        incorrect_box.style.display = "block";
        incorrect_box.style.marginLeft = "15px";
        incorrect.textContent = "Password must contain at least 8 characters, including uppercase, lowercase, number and a speical character.";
        toEmpty();
        return;
    }
    if (password !== confirm_password) {
        showError("Passwords do not match.");
        return;
    }
    // check if username is unique
    const { data: user,logicError } = await supabase
        .from('profiles')
       .select('username')
       .eq('username', username);
    if (user.length > 0) {
        console.error('Error fetching username:', logicError);
        showError("Username already exists.");
        return;
    }
    const { data, error } = await supabase.auth.signUp({
        email: gmail,
        password: password,
    });
    if (error) {
        showError(error.message);
    } else {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('gmail', gmail);
        const { error } = await supabase
            .from('profiles')
            .insert({
                username: username, 
                email: gmail
            });
        if (error) {
            showError(error.message);
        } else {
            window.location.href = "../home/home.html";
        }
    }
}
function isvalidPassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
}

function showError(message) {
    incorrect_box.style.display = "block";
    incorrect.textContent = message;
    toEmpty();
}
function toEmpty() {
    gmailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
}

document.getElementById("sign-in-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    await signUpUser();
});

