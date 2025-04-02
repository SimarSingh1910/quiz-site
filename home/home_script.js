// import { supabase } from '../supabase/supabaseClient';

const getUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) console.error('User Fetch Error:', error);
  else console.log('User:', user);
};

// fetch('home.php')
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         // console.log(response);
//         return response.json(); // Parse JSON only if response is valid
//     })
//     .then((sessionData) => {
//         console.log(sessionData);
//         window.userSession = sessionData;
//         // user profile in aside navbar
//         let username = document.querySelector('.profile-name');
//         let useremail = document.querySelector('.profile-email');
//         let logout = document.querySelector('.logout-btn');
//         if (window.userSession && window.userSession.user) {
//             username.textContent = window.userSession.user.name;
//             useremail.textContent = window.userSession.user.email;
//         }
//         else {
//             username.textContent = "Guest";
//             useremail.textContent = "";
//             logout.textContent = "Login";
//             logout.classList.add("signup");
//             console.log("login button");
//         }
//     })
//     .catch(error => console.error('Error fetching session data:', error));

$(document).ready(function () {
    //aside navbar
    function displayAside() {
        $(".asideNavbar").toggleClass("showAside");
        $(".navbar").toggleClass("move");

        if ($(".navbar").hasClass("move") && window.innerWidth > 768) {
            $(".navbar").css({
                "width": "80vw",
                "left": "17vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
        }
        else if ($(".navbar").hasClass("move") && window.innerWidth <= 500) {
            $(".navbar").css({
                "width": "45vw",
                "left": "52vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
        }
        else if ($(".navbar").hasClass("move") && window.innerWidth <= 768) {
            $(".navbar").css({
                "width": "70vw",
                "left": "27vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
            $(".navbar .search-container").css("display", "none");
        }
        else {
            $(".navbar").css({
                "width": "97%",
                "left": "0",
                "transition": "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), left 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            });
            $(".navbar .search-container").css({ "display": "block", "transition": "display 0.4s cubic-bezier(0.4, 0, 0.2, 1)" });
        }
    };


    $("#navSVG").on("click", displayAside);
    // USER LOGIN
    $(document).on("click", ".login", function (event) {
        event.preventDefault();
        console.log("User login page");
        window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
    });

    // USER LOGOUT
    $(".logout-btn").on("click", function (event) {
        event.preventDefault(); // Prevent default button behavior

        console.log("Logging out...");

        // Clear session storage and local storage
        localStorage.removeItem('userSession');
        localStorage.removeItem('quizHistory');
        sessionStorage.removeItem('userSession');

        // Make sure logout request is completed before redirecting
        fetch('logout.php', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Logout request failed");
                }
                console.log("User logged out successfully");
                return response.text(); // Read the response to avoid fetch errors
            })
            .then(() => {
                // Redirect to login page
                window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
            })
            .catch(error => {
                console.error("Logout failed:", error);
                alert("Logout failed. Please try again.");
            });
    });

    //user profile
    $(".profile").on("click", function () {
        if (window.userSession && window.userSession.user) {
            console.log("User profile page");
            window.location.href = "/Quiz-website/Profile/profile.html";
        } else {
            console.log("User not logged in.");
            window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
        }
    });
});