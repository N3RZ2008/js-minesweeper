export const toggleTheme = (toggleButton) => {
    toggleButton.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        toggleButton.innerHTML = isDarkMode ? "🌙" : "🌞";
    });
};
