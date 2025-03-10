// const setting_icon = document.querySelector('.profile svg');
// setting_icon.addEventListener('click', () =>{
//     setting_icon.classList.toggle('rotate');
// });
// fetch('home.php')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json(); // Parse JSON only if response is valid
//     })
//     .then(sessionData => {
//         console.log(sessionData);
//         username_display(sessionData);
//     })
//     .catch(error => console.error('Error fetching session data:', error));

// function username_display(userData) {
//     if (userData.user) {
//         document.getElementById('username').textContent = userData.user.name;
//     } else {
//         console.log("No user data found.");
//     }
// }


$(document).ready(function() {
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
            window.location.href = "./allQuiz.html";
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

    // Quiz Boxes Click Event
    $(".quizBox").on("click", () => {
        window.location.href = "./allQuiz.html";
    });
});


