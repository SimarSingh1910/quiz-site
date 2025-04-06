import { supabase } from '../supabase/supabaseClient';

const updateUserProfile = (user) => {
    if (!user) {
        console.warn("No user session found.");
        return;
    }

    // Select UI elements
    let usernameElement = document.querySelector('.profile-name');
    let useremailElement = document.querySelector('.profile-email');

    // Fetch user data from Supabase profiles table
    supabase
        .from('profiles')
        .select('name, email')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
            if (error) {
                console.error("Error fetching profile data:", error);
                return;
            }
            // Update UI with fetched user data
            if (data) {
                usernameElement.textContent = data.name || "No Name";
                useremailElement.textContent = data.email || "No Email";
            }
        });
};


const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error fetching session data:", error);
    } else if (data.session && data.session.user) {
        console.log("User session:", data.session.user);
        updateUserProfile(data.session.user); 
    } else {
        console.log("No active session.");
    }
};

fetchSession();

// Update profile function 
const updateProfile = async () => {
    let newName = prompt("Enter your new name:");
    if (!newName) return;

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        alert("User not logged in");
        return;
    }

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: newName })
        .eq('id', data.user.id);

    if (updateError) {
        console.error('Update Error:', updateError);
        alert("Profile update failed.");
    } else {
        alert("Profile updated successfully.");
    }
};

$(document).ready(function () {
    // SEARCH BAR
    let quizzes = ["sports", "music", "movies", "food and drink", "games", "literature", "history", "geography", "maths"];

    let searchBox = $(".searchInput").eq(0);
    let searchBtn = $(".searchbtn").eq(0);

    function checkQuizAndRedirect() {
        let searchValue = searchBox.val().trim().toLowerCase();

        if (!searchValue) {
            searchBox.attr("placeholder", "Field is empty").addClass("red-placeholder");
        } else if (quizzes.includes(searchValue)) {
            window.location.href = "/Quiz-Website/AllQuizzes/allQuiz.html";
        } else {
            searchBox.val("");
            searchBox.attr("placeholder", "Not Available").addClass("red-placeholder");
        }
    }

    searchBox.on("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            checkQuizAndRedirect();
        }
    });

    searchBtn.on("click", (e) => {
        e.preventDefault();
        checkQuizAndRedirect();
    });

    searchBox.on("input", function() {
        $(this).removeClass("red-placeholder").attr("placeholder", "Search");
    });
    $("#dob").inputmask("99-99-9999", { 
        placeholder: "DD-MM-YYYY",
        showMaskOnHover: false,
        alias: "datetime",
        inputFormat: "dd-mm-yyyy"
    });
    // USER LOGOUT
    $(".logout-btn").on("click", async function (e) {
        e.preventDefault(); 

        console.log("Logging out...");
        
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
            return;
        }

        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');

        console.log("User logged out successfully");
        window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
    });
});
