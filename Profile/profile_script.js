fetch('home.php')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log(response);
        return response.json(); // Parse JSON only if response is valid
    })
    .then((sessionData) => {
        console.log(sessionData);
        window.userSession = sessionData;
        // user profile in aside navbar
        let username = document.querySelector('.profile-name');
        let useremail = document.querySelector('.profile-email');
        let logout = document.querySelector('.logout-btn');
        if (window.userSession && window.userSession.user) {
            username.textContent = window.userSession.user.name;
            useremail.textContent = window.userSession.user.email;
        }
        else {
            username.textContent = "Guest";
            useremail.textContent = "";
            logout.textContent = "Login";
            logout.classList.add("signup");
            console.log("login button");
        }
    })
    .catch(error => console.error('Error fetching session data:', error));

$(document).ready(function () {
    //SEARCH BAR

    // Predefined quizzes list
    let quizzes = ["sports", "music", "movies", "food and drink", "games", "literature", "history", "geography", "maths"];

    let searchBox = $(".searchInput").eq(0);
    let searchBtn = $(".searchbtn").eq(0);

    //quiz spelling checker
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

    //funcitonality on pressing enter key
    searchBox.on("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            checkQuizAndRedirect();
        }
    });

    //functionality on pressing search btn
    searchBtn.on("click", (e) => {
        e.preventDefault();
        checkQuizAndRedirect();
    });

    // Removing Red Placeholder When User Starts Typing Again
    searchBox.on("input", () => {
        $(this).removeClass("red-placeholder").attr("placeholder", "Search");
    });




    //aside navbar
    function displayAside() {
        $(".asideNavbar").toggleClass("showAside");
        $(".navbar").toggleClass("move");

        if ($(".navbar").hasClass("move") && window.innerWidth > 768) {
            $(".navbar").css({
                "width": "85vw",
                "left": "15vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
        }
        else if ($(".navbar").hasClass("move") && window.innerWidth <= 500) {
            $(".navbar").css({
                "width": "50vw",
                "left": "50vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
        }
        else if ($(".navbar").hasClass("move") && window.innerWidth <= 768) {
            $(".navbar").css({
                "width": "75vw",
                "left": "25vw",
                "transition": "width 0.3s ease-in-out, left 0.3s ease-in-out"
            });
            $(".navbar .search-container").css("display", "none");
        }
        else {
            $(".navbar").css({
                "width": "100%",
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
});



