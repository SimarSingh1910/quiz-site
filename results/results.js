import { supabase } from '../supabase/supabaseClient.js';

const getUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) console.error('User Fetch Error:', error);
    else console.log('User:', user);
  };
  
  $(document).ready(function () {
      //user profile
      $(".profile").on("click", function () {
          if (window.userSession && window.userSession.user) {
              console.log("User profile page");
              window.location.href = "/Quiz-Website/Profile/profile.html";
          } else {
              console.log("User not logged in.");
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




    //   realtime function of results table 
    const tableBody = $(".tableBody");
    const username = $("")

    function addRowToTable(data) {
        const newRow = tableBody.insertRow(); // create a new <tr>
        Object.values(data).forEach(value => {
          const newCell = newRow.insertCell(); // create a new <td>
          newCell.textContent = value;         // set the value
        });
      }

      async function fetchAndDisplayData() {
        const { data, error } = await supabase.from('results').select().eq('username',username);
        if (error) {
          console.error('Error fetching data:', error);
          return;
        }
      
        data.forEach(row => addRowToTable(row));
      }
      
      fetchAndDisplayData();

  });

