// signup.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.querySelector("input[name='username']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");

    form.addEventListener("submit", function (event) {
        // Validate username
        if (usernameInput.value.trim().length < 3) {
            alert("Username must be at least 3 characters long.");
            event.preventDefault();
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
            return;
        }

        // Validate password length
        if (passwordInput.value.length < 6) {
            alert("Password must be at least 6 characters long.");
            event.preventDefault();
            return;
        }
    });
});