let loadButton = document.getElementById("loadButton")
let savedResults = document.getElementById("savedResults");
let clearButton = document.getElementById("clearButton")

// Navbar Burger functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  });

// Functionality to load the saved images
loadButton.addEventListener("click", function () {
    // window.location.href = "./saved.html",
    let savedImageArray = JSON.parse(window.localStorage.getItem("imageData"));
    for (let index = 0; index < savedImageArray.length; index++) {
        let newImageDiv = document.createElement("div");
        let newImageFigure = document.createElement("figure");
        let newImage = document.createElement("img");
        newImageDiv.classList.add("column");
        newImageDiv.classList.add("is-one-third");
        newImageFigure.classList.add("image");
        newImageFigure.classList.add("is-square");
        newImage.src = savedImageArray[index]
        newImageFigure.appendChild(newImage);
        newImageDiv.appendChild(newImageFigure);
        savedResults.appendChild(newImageDiv);
    }
    loadButton.classList.add("hidden")
    clearButton.classList.remove("hidden")
});

// Functionality to clear saved images
clearButton.addEventListener("click", function() {
    window.localStorage.clear("imageData")
    location.reload();
    clearButton.classList.add("hidden");
    loadButton.classList.remove("hidden");
})