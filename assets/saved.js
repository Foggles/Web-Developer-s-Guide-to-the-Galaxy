let loadButton = document.getElementById("loadButton")
let savedResults = document.getElementById("savedResults");
let clearButton = document.getElementById("clearButton");
let savedGenericModal = document.getElementById("savedGenericModal");
let savedModalImage = document.getElementById("savedModalImage");
let savedResultDesc = document.getElementById("savedResultDesc");
// let modalClearBtn = document.getElementById("modalClearBtn");
let savedModalCloseBtn = document.getElementById("savedModalCloseBtn");

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
loadButton.addEventListener("click", () => {
    // window.location.href = "./saved.html",
    let savedImagesDescArray = JSON.parse(window.localStorage.getItem("imageDesc"));
    let savedImageArray = JSON.parse(window.localStorage.getItem("imageData"));

    for (let index = 0; index < savedImageArray.length; index++) {
        const newImageDiv = document.createElement("div");
        const newImageFigure = document.createElement("figure");
        const newImage = document.createElement("img");
        newImageDiv.classList.add("column");
        newImageDiv.classList.add("is-one-third");
        newImageFigure.classList.add("image");
        newImageFigure.classList.add("is-square");
        newImage.src = savedImageArray[index]
        newImageFigure.appendChild(newImage);
        newImageDiv.appendChild(newImageFigure);
        savedResults.appendChild(newImageDiv);

        for (let index = 0; index < savedImagesDescArray.length; index++) {
          newImage.setAttribute("desc", savedImagesDescArray[index]);          
        };
    };
    loadButton.classList.add("hidden")
    clearButton.classList.remove("hidden")
});

savedResults.addEventListener("click", function (event) {
  if (event.target.matches("img")) {
    const savedImgSrc = event.target.getAttribute("src");
    // console.log(imgSrc);
    savedModalImage.setAttribute("src", savedImgSrc);
    const imgDesc = event.target.getAttribute("desc");
    savedResultDesc.textContent = imgDesc;
    savedGenericModal.classList.add("is-active");
    
  };
});

savedModalCloseBtn.addEventListener("click", () => savedGenericModal.classList.remove("is-active"));

// Functionality to clear all saved images
clearButton.addEventListener("click", () => {
    window.localStorage.clear("imageData")
    location.reload();
    clearButton.classList.add("hidden");
    loadButton.classList.remove("hidden");
})