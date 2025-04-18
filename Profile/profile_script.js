import { supabase } from '../supabase/supabaseClient.js';

const username = localStorage.getItem('username');
const gmail = localStorage.getItem('gmail');

// Fetch user data from Supabase
const getUser = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('username', username)
        .single();

    if (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
    return data;
};

$(document).ready(async function () {
    // Apply input mask to DOB field
    $("#dob").inputmask("99-99-9999", {
        placeholder: "DD-MM-YYYY",
        showMaskOnHover: false,
        alias: "datetime",
        inputFormat: "dd-mm-yyyy"
    });

    const convertDateToISO = (inputDate) => {
        const parts = inputDate.split("-");
        if (parts.length !== 3) return null;
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const convertISOToDisplay = (isoDate) => {
        const parts = isoDate.split("-");
        if (parts.length !== 3) return '';
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const safeSet = (id, value) => {
        if (value) $(`#${id}`).val(value);
    };

    // Fill input fields with data
    const user = await getUser();
    if (user) {
        safeSet("first-name", user.firstName);
        safeSet("last-name", user.lastName);
        safeSet("Username", user.username);
        safeSet("gmail", user.email);
        safeSet("age", user.age);
        safeSet("gender", user.gender);
        safeSet("qualification", user.qualification);
        safeSet("country", user.country);

        if (user.DOB) {
            $("#dob").val(convertISOToDisplay(user.DOB));
        }
    }

    // Handle form submission
    $(".profile-form").on("submit", async function (e) {
        e.preventDefault();

        const rawDob = $("#dob").val();
        const isoDob = convertDateToISO(rawDob);

        // Collect form data
        const fullFormData = {
            firstName: $("#first-name").val(),
            lastName: $("#last-name").val(),
            username: $("#Username").val(),
            email: $("#gmail").val(),
            age: $("#age").val(),
            gender: $("#gender").val(),
            qualification: $("#qualification").val(),
            country: $("#country").val(),
            DOB: isoDob
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(fullFormData, { onConflict: ['username'] });

        if (error) {
            console.error("Error saving profile:", error.message);
            alert("Failed to save profile. Please try again.");
        } else {
            console.log("Profile saved successfully!");
        }
    });

    // Logout handler
    $(".logout-btn").on("click", async function () {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Logout Error:', error);
        localStorage.removeItem('username');
        localStorage.removeItem('gmail');
        window.location.href = "../SignupAndLogin/login.html";
    });
});
