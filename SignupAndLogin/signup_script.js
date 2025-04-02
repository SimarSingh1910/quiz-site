import { supabase } from '../supabase/supabaseClient.js'; 

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", async () => {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error("Session Error:", error.message);
        return;
    }

    if (data.session) {
        console.log("User already logged in:", data.session.user);
        window.location.href = "./home/home.html"; // Redirect to dashboard
    }
});

// Capturing form elements
const gmailInput = document.getElementById("gmail_input");
const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const confirmPasswordInput = document.getElementById("confirm_password");

const incorrect = document.getElementById("incorrect_text");
const incorrect_box = document.getElementById("incorrect_password");

// Signup function with Supabase integration
const signUp = async (email, password, username) => {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw new Error(error.message);
        if (!data?.user) throw new Error("User signup failed.");

        console.log("User signed up:", data.user);
        alert("Signup successful!");

        if (data.user && data.user.id) {
            const { error: profileError } = await supabase
                .from("profiles")
                .insert([{ id: data.user.id, username, email }]);

            if (profileError) {
                console.error("Profile Insert Error:", profileError.message);
                return false; // Signup failed
            }
        }

        return true; // Signup successful
    } catch (err) {
        console.error("Signup Error:", err.message);
        incorrect_box.style.display = "block";
        incorrect.textContent = err.message;
        return false; // Signup failed
    }
};

// Validation function
const validateForm = () => {
    const email = gmailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!email || !username || !password || !confirmPassword) {
        showError("All fields are required.");
        return false;
    }
    if (!isValidEmail(email)) {
        showError("Email is not valid.");
        return false;
    }
    if (!isValidPassword(password)) {
        showError("Password must contain at least 8 characters, including uppercase, lowercase, number, and a special character.");
        return false;
    }
    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return false;
    }
    return true;
};

// Show error message
const showError = (message) => {
    incorrect_box.style.display = "block";
    incorrect.textContent = message;
};

// Event listener for signup button
document.getElementById("sign-in-btn").addEventListener("click", async function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const email = gmailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const signupSuccess = await signUp(email, password, username);
    if (signupSuccess) toEmpty();
});

// Helper functions
const isValidPassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const toEmpty = () => {
    gmailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
};

console.log("script is running!");