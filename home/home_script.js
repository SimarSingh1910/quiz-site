fetch('home.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON only if response is valid
    })
    .then(sessionData => {
        console.log(sessionData);
        window.userSession = sessionData;
    })
    .catch(error => console.error('Error fetching session data:', error));

$(document).ready(function() {
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


    //QUIZ TABS

    // Quiz Boxes Click Event
    $(".quizBox").on("click", () => {
        window.location.href = "/Quiz-Website/AllQuizzes/allQuiz.html";
    });

    //user profile
    $(".profile").on("click", function() {
        if (window.userSession && window.userSession.user) {
            console.log("User profile page");
            window.location.href = "/Quiz-website/Profile/profile.html";
        } else {
            console.log("User not logged in.");
            window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
        }
    });
});



