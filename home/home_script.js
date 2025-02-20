const setting_icon = document.querySelector('.profile svg');
setting_icon.addEventListener('click', () =>{
    setting_icon.classList.toggle('rotate');
});
fetch('home.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON only if response is valid
    })
    .then(sessionData => {
        console.log(sessionData);
        username_display(sessionData);
    })
    .catch(error => console.error('Error fetching session data:', error));

function username_display(userData) {
    if (userData.user) {
        document.getElementById('username').textContent = userData.user.name;
    } else {
        console.log("No user data found.");
    }
}