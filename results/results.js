// import { supabase } from '../supabase/supabaseClient.js';

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
  });