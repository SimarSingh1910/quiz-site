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




//navigation bar

//1.search box implementations
let searchBox = $(".searchInput").eq(0);
searchBox.on("keydown", (e) => {
    if(e.key === "Enter"){
        if(!searchBox.val().trim()){
            searchBox.attr("placeholder", "Field is empty");
            searchBox.addClass("red-placeholder");
            e.preventdefault()
        }
    }
});

//2.search button implementations
let searchbtn = $(".searchbtn").eq(0);
searchbtn.on("click", (e) => {
    if(!searchBox.val().trim()){
        searchBox.attr("placeholder", "Field is empty");
        searchBox.addClass("red-placeholder");
        e.preventdefault();
    }
});

//3.Form submission prevention
let searchForm = $(".search-container");
searchForm.on("submit", (e) => {
    let searchContent = searchBox.val().trim();
    if (!searchContent) {
        e.preventDefault();
    }
});





//Quiz tabs

//quiz box implementations
const quizBoxes = document.getElementsByClassName("quizBox");           //returns an array of elements having class: "quizBox".
function quizPage(){
    for(let i = 0; i < quizBoxes.length; i++){
        quizBoxes[i].addEventListener("click", () => {
          window.location.href="./allQuiz.html";
        });
    }
};
