// import { supabase } from '../supabase/supabaseClient.js';
import { supabase } from '../supabase/supabaseClient.js';

const username = localStorage.getItem('username');
const gmail = localStorage.getItem('gmail');
const getUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) console.error('User Fetch Error:', error);
    else console.log('User:', user);
};

$(document).ready(function () {
    if (username && gmail) {
        $(".profile-name").text(username);
        // $(".profile-email").text(gmail);
        $(".logout-btn").text("Logout");
        getUser();
    }
    else {
        $(".profile-name").text("Guest");
        $(".profile-email").text("");
        $(".logout-btn").text("Log In");
        $(".logout-btn").addClass("login");
    }
    
    // logout 
    $(".logout-btn").click(async function (e) {
        e.preventDefault();
        if ($(this).hasClass("login")) {
            console.log("User not logged in.");
            window.location.href = "../SignupAndLogin/login.html";
        }
        else {
            const { error } = await supabase.auth.signOut()
            if (error) console.error('Logout Error:', error);
            localStorage.removeItem('username');
            localStorage.removeItem('gmail');
            window.location.href = '../home/home.html';
        }
    });
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

    //user profile page
    $(".profile").on("click", function (e) {
        e.preventDefault();
        if ($(".profile-name").text() !== "Guest") {
            console.log("User profile page");
            window.location.href = "../Profile/profile.html";
        } else {
            console.log("User not logged in.");
            window.location.href = "../SignupAndLogin/login.html";
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });
});