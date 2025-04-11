document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkmode");

    // Select elements to toggle dark mode
    const elementsToToggle = [
        document.documentElement, // Root HTML element
        document.body,            // Body element
        document.getElementById("mobile-nav"),
        document.getElementById("container"),
        document.getElementById("left-container"),
        document.querySelector("nav"),
        document.querySelector("footer"),
        document.querySelector(".wrappernav"),
        document.querySelector(".wrappernavwords"),
        ...document.querySelectorAll("header, section, article, aside, div, ul, li, span, label, input, table tr, table td, table th"),
    ];

    // Select elements where text color should change (but background remains unaffected)
    const textElementsToChange = [
        ...document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a, label, button, span, ul, li, td, th, li a"),
    ];

    // Detect if the user is on the homepage by checking for a unique element
    const mainElement = document.querySelector("main");
    const isHomePage = mainElement && mainElement.classList.contains("index-main");

    // Exclude `<main>` from dark mode if on the home page
    if (!isHomePage) {
        elementsToToggle.push(mainElement);
    }

    // Elements to EXCLUDE from dark mode (backgrounds stay unchanged)
    const elementsToExclude = [
        ...document.querySelectorAll("img, video, gif"), // Prevent images, videos, and GIFs from changing
        ...document.querySelectorAll(".index-main-content, .index-main-content-right, .resume-short, .resume-long, .dark-mode-placement, #mobile-nav li"), // Exclude background images
    ];

    // Function to enable dark mode
    function enableDarkMode() {
        elementsToToggle.forEach(element => {
            if (element) {
                element.classList.add("dark-mode-bg");
            }
        });

        // Change text color
        textElementsToChange.forEach(element => {
            if (element) {
                element.classList.add("dark-mode-text");
            }
        });

        // Ensure excluded elements keep their original styles
        elementsToExclude.forEach(element => {
            if (element) {
                element.classList.remove("dark-mode-bg"); // Background remains unchanged
            }
        });

        localStorage.setItem("darkMode", "enabled");
    }

    // Function to disable dark mode
    function disableDarkMode() {
        elementsToToggle.forEach(element => {
            if (element) {
                element.classList.remove("dark-mode-bg");
            }
        });

        textElementsToChange.forEach(element => {
            if (element) {
                element.classList.remove("dark-mode-text");
            }
        });

        localStorage.setItem("darkMode", "disabled");
    }

    // Check localStorage and apply dark mode if it was enabled
    function applyDarkModePreference() {
        if (localStorage.getItem("darkMode") === "enabled") {
            enableDarkMode();
            if (darkModeToggle) {
                darkModeToggle.checked = true;
            }
        } else {
            disableDarkMode();
        }
    }

    applyDarkModePreference(); // Apply the preference on every page load

    // Event listener for the toggle switch
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", function () {
            if (darkModeToggle.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }
});