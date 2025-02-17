let gmailInput = document.getElementById("gmail_input");
let usernameInput = document.getElementById("username_input");
let passwordInput = document.getElementById("password_input");
let confirmPasswordInput = document.getElementById("confirm_password");

let incorrect = document.getElementById("incorrect_text");
let incorrect_box = document.getElementById("incorrect_password");

function submit() {
    let gmail = gmailInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let confirm_password = confirmPasswordInput.value;

    if (!gmail || !username || !password || !confirm_password) {
        incorrect_box.style.display = "block";
        incorrect.textContent = "All fields are required.";
        toEmpty();
        return true;
    }
    else if (!(isValidEmail(gmail))) {
        incorrect_box.style.display = "block";
        incorrect.textContent = "Gmail is not valid";
        toEmpty();
        return true;
    }
    else if (password !== confirm_password) {
        incorrect_box.style.display = "block";
        incorrect.textContent = "Passwords do not match";
        toEmpty();
        return true;
    }
    else {
        return false;
    }
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function toEmpty() {
    gmailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
}

// Prevent default form submission
document.getElementById("sign-in-btn").addEventListener("click", function (event) {
    if (submit()) {
        event.preventDefault();
    }
});
