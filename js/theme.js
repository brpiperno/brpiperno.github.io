//toggle light and dark mode
function toggleTheme() {
  console.log("toggle theme!");
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme == "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", newTheme);
  const toggleButton = document.getElementById("darkModeToggle");
  toggleButton.innerText = newTheme + " mode";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("darkModeToggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  } else {
    console.error("could not find toggle button!");
  }
});
