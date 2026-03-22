//
//    The Dark Mode System
//

const darkModeToggle = document.getElementById("dark-mode-toggle");

// Helper functions to toggle dark mode
function enableDarkMode() {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.add('cc--darkmode'); // For cookie consent banner
  localStorage.setItem("theme", "dark");
  // Update aria-pressed state
  if (darkModeToggle) {
    darkModeToggle.setAttribute("aria-pressed", "true");
  }
}

function disableDarkMode() {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove('cc--darkmode'); // For cookie consent banner
  localStorage.setItem("theme", "light");
  // Update aria-pressed state
  if (darkModeToggle) {
    // Defensive check: ensure button exists
    darkModeToggle.setAttribute("aria-pressed", "false");
  }
}

// Determines a user's dark mode preferences and applies theme
function detectColorScheme() {
  let theme = "light"; // Default to light theme

  // 1. Check localStorage for a saved 'theme' preference
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }

  // 2. If no saved preference, check browser's system preference
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }

  // Apply the detected theme and set the initial aria-pressed state
  theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// Run on page load to detect and apply the theme
detectColorScheme();

// Add event listener to the dark mode button toggle
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    // On click, toggle the theme based on the current saved value
    localStorage.getItem("theme") === "light" ? enableDarkMode() : disableDarkMode();
  });
}