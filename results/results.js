import { supabase } from '../supabase/supabaseClient.js';
const UserName = localStorage.getItem('username');
const tableBody = document.querySelector(".tableBody");

$(document).ready(async function () {
    $(".profile").on("click", function (e) {
        e.preventDefault();
        if (UserName) {
            console.log("User is logged in, redirecting to profile page.");
            window.location.href = "../Profile/profile.html";
        } else {
            console.log("User is not logged in, redirecting to login page.");
            window.location.href = "../SignupAndLogin/login.html";
        }
    });
    if (UserName) {
        $(".profile-name").text(UserName);
        $(".logout-btn").text("Logout");
        showResult();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
            console.error("User not logged in or error fetching user:", error);
        }
    } else {
        $(".profile-name").text("Guest");
        $(".logout-btn").text("Log In");
        $(".logout-btn").addClass("login");
    }
    // logout
    $(".logout-btn").click(async function (e) {
        e.preventDefault();
        if ($(this).hasClass("login")) {
            console.log("User not logged in.");
            window.location.href = "../SignupAndLogin/login.html";
        } else {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Logout Error:", error);
            }
            localStorage.removeItem("username");
            localStorage.removeItem("gmail");
            window.location.href = "../home/home.html";
        }
    });
    
    let categoryArray = [21, 12, 11, 31, 15, 9, 23, 22, 26, 17, 19, 24, 27, 28, 29];
    let quizName = ["sports", "music", "movies", "anime", "video games", "general Knowledge", "history", "geography", "celebrities", "science", "maths", "politics", "animal", "vehicle", "comics"];
    
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    async function showResult() {
        const { data, error } = await supabase
            .from('results')
            .select('category,level,score,questions')
            .eq('username', UserName)
            .order('created_at', { ascending: true });                             // oldest quiz first
        if (error) {
            console.log("some error occured", error);
            return;
        }
        console.log("this is the current userData: ", data);
        data.forEach((row, index) => {
            const quizIndex = categoryArray.indexOf(parseInt(row.category));          //parseInt sets datatype to int
            const quizTitle = quizIndex !== -1 ? quizName[quizIndex] : "unknown";
            const score = `${row.score}/${row.questions}`
            let orderedData = [                                                      //rearranges data to add to the rows directly
                index + 1,
                quizTitle,
                row.level,
                score
            ]
            
            // data.push(orderedData)
            addRowToTable(orderedData)
        })
    }
    
    
    function addRowToTable(dataArray) {
        const newRow = tableBody.insertRow();                       //declares <tr></tr>
        Object.values(dataArray).forEach(value => {
            const newCell = newRow.insertCell();                    //declares <td></td>
            newCell.textContent = value;
        });
    }
    
});
