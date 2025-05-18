import { supabase } from '../supabase/supabaseClient.js';

$(document).ready(async function () {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        console.error("User not logged in or error fetching user:", error);
        return;
    }

    const user = data.user;
    const username = user.email; 
    let categoryArray = [21, 12, 11, 31, 15, 9, 23, 22, 26,17,19,24,27,28,29];
    let quizName = ["sports","music","movies","anime","video games", "general Knowledge", "history", "geography", "celebrities", "science", "maths", "politics", "animal", "vehicle", "comics"];
    
    window.userSession = { user };

    const sessionResult = await supabase.auth.getSession();
    console.log("Current session:", sessionResult);
    
    
    $(".profile").on("click", function () {
        if (window.userSession && window.userSession.user) {
            window.location.href = "/Quiz-Website/Profile/profile.html";
        } else {
            window.location.href = "/Quiz-Website/SignupAndLogin/login.html";
        }
    });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });

    async function showResult() {
        let username = localStorage.getItem("username");
        const {data ,error} = await supabase
            .from('results')
            .select('category,level,score,questions')
            .eq('username', username)
            .order('created_at', { ascending: false });                             // newest quiz first
        if(error) {
            console.log("some error occured", error);
            return;
        }


        console.log("this is the current userData: ",data);
        data.forEach((row,index) => {
            const quizIndex = categoryArray.indexOf(parseInt(row.category));          //parseInt sets datatype to int
            const quizTitle = quizIndex !== -1 ? quizName[quizIndex] : "unknown";
            const score = `${row.score}/${row.questions}`
    
            let orderedData = [                                                      //rearranges data to add to the rows directly
                index + 1,
                quizTitle,
                row.level,
                score
            ]
            
            data.push(orderedData)
            addRowToTable(orderedData)})
    }
    
    const tableBody = document.querySelector(".tableBody");
    if (!tableBody) {
        console.error("No table body with class 'tableBody' found!");
        return;
    }
    
    
    function addRowToTable(dataArray) {
        const newRow = tableBody.insertRow();                       //declares <tr></tr>
        Object.values(dataArray).forEach(value => {
            const newCell = newRow.insertCell();                    //declares <td></td>
            newCell.textContent = value;
        });
    }
    
    showResult();
});
