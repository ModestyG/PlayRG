const resultsDiv = document.getElementById("search-results-div");
const searchInput = document.getElementById("search");
const form = document.getElementById("form");

let sites = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  // Hides links based on search value (not case sensetive)
  sites.forEach((site) => {
    const isVisible = site.name.toLowerCase().includes(value.toLowerCase());
    site.element.classList.toggle("hidden", !isVisible);
  });
});

// Prevent page from reloading on enter
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
});

//Getting the site information from my custom api (made with google sheets) and creating links
resultsDiv.innerText = "Loading...";

fetch(
  "https://script.google.com/macros/s/AKfycbwZxIu7O7pjICdbnNkylrnCa3OMLN86osDc8uQgxW6IGHrtEUEBaQtFl5QIPZo7V8WN0Q/exec"
)
  .then((res) => res.json())
  .then((data) => {
    data = data["data"];
    resultsDiv.innerText = "";
    sites = data.map((site) => {
      let link = document.createElement("a");
      link.innerText = site.name;
      link.href = "search/" + site.clue;
      link.classList.add("search-link");
      resultsDiv.appendChild(link);
      return { name: site.name, element: link };
    });

    // Make it so search results filter in case you typed something before links finished loading
    searchInput.dispatchEvent(new CustomEvent("input", {}));
  });
