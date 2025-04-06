$(document).ready(function () {
    //SEARCH BAR

    // Predefined quizzes list
    let categoryArray = [21, 12, 11, 31, 15, 9, 23, 22, 26];
    let searchBox = $(".searchInput").eq(0);
    let searchBtn = $(".searchbtn").eq(0);
    let searchValue;
    let category;
    //quiz spelling checker
    function checkQuizAndRedirect(SearchValue) {
        // apply switch case to searchValue
        switch (SearchValue) {
            case "":
                searchBox.attr("placeholder", "Field is empty").addClass("red-placeholder");
                category = "";
                break;
            case "sports":
                category = categoryArray[0];
                break;
            case "music":
                category = categoryArray[1];
                break;
            case "movies":
                category = categoryArray[2];
                break;
            case "anime":
                category = categoryArray[3];
                break;
            case "video games":
                category = categoryArray[4];
                break;
            case "general knowledge":
                category = categoryArray[5];
                break;
            case "history":
                category = categoryArray[6];
                break;
            case "geography":
                category = categoryArray[7];
                break;
            case "celebrities":
                category = categoryArray[8];
                break;
            default:
                category = "";
                searchBox.val("");
                searchBox.attr("placeholder", "Not Available").addClass("red-placeholder");
        }
        if (category !== "") {
            localStorage.setItem("selectedCategory", category); // Store category in localStorage
            window.location.href = "../AllQuizzes/allQuiz.html"; // Redirect
        }
    }

    //funcitonality on pressing enter key
    searchBox.on("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchValue = searchBox.val().trim().toLowerCase();
            checkQuizAndRedirect(searchValue);
        }
    });

    //functionality on pressing search btn
    searchBtn.on("click", (e) => {
        e.preventDefault();
        searchValue = searchBox.val().trim().toLowerCase();
        checkQuizAndRedirect(searchValue);
    });

    // Quiz Boxes Click Event
    $(".quizBox").on("click", function () {
        searchValue = $(this).attr("id");
        checkQuizAndRedirect(searchValue);
    });

    // aside navbar options click function
    $(".p-3").on("click", function () {
        searchValue = $(this).attr("id");
        checkQuizAndRedirect(searchValue);
    });

    // Removing Red Placeholder When User Starts Typing Again
    searchBox.on("input", () => {
        $(this).removeClass("red-placeholder").attr("placeholder", "Search");
    });

});
