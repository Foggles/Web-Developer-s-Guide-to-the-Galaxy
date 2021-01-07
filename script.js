// Grabbing elements from index.html
let searchButton = document.getElementById("searchButton");
let searchQuery = document.getElementById("searchQuery");
let imageFormat = document.getElementById("imageFormat");
let audioFormat = document.getElementById("audioFormat");
let searchedResultsContainer = document.getElementById("searchedResultsContainer");
let searchedResults = document.getElementById("searchedResults");
let carouselContainer = document.getElementById("carousel_container")
let loadButton = document.getElementById("loadButton")
// Grabbing elements from the modal
let genericModal = document.getElementById("genericModal");
let modalImage = document.getElementById("modalImage");
let modalCloseBtn = document.getElementById("modalCloseBtn");
let resultInfo = document.getElementById("resultInfo");
let saveBtn = document.getElementById("saveBtn");
let savedImagesArray = [];

// Grabbing elements from saved.html
let savedResultsContainer = document.getElementById("savedResultsContainer");
let savedResults = document.getElementById("savedResults");

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

// Pop-up
$(document).ready(function () {
  //select the POPUP FRAME and show it
  $("#popup").hide().fadeIn(1000);
  //close the POPUP if the button with id="close" is clicked
  $("#close").on("click", function (e) {
    e.preventDefault();
    $("#popup").fadeOut(1000);
  });
});

// To Do: APOD Banner
let queryUrlApod = "https://api.nasa.gov/planetary/apod?api_key=E248tggrBrL0p3zT9UadOWJg1dfBcK1lLCYZJyYC&count=3"
function apodBanner(queryUrlApod) {
  $.ajax({
    url: queryUrlApod,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // apodImage.src = response.hdurl
    for (let index = 0; index < response.length; index++) {
      if (response[index].media_type === "video") {
        console.log({ index })
        let targetImg = document.getElementById("img" + index)
        targetImg.classList.add('hidden');
        let newDiv = document.getElementById("div" + index)
        console.log({ newDiv });
        newDiv.appendChild(createIframe(response[index].url));
      }
      let htmlImg = document.getElementById("img" + index);
      htmlImg.src = response[index].url;
    }
  })
}
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function createIframe(src) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', src);
  iframe.setAttribute('width', 1000);
  iframe.setAttribute('height', 560);
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', true);
  return iframe;
}

apodBanner(queryUrlApod);
// * DONE: Search Input
// * DONE: Grab the input of searchQuery and store in its own variable.
// * DONE: Check what parameters have been selected (don't run search if none have been selected).
// ? TODO: Store the results. (Don't think we need to store results, thoughts?)
// TODO: Use a "for loop" to update the DOM with the results.
let querySearch;
let queryMediaType;

// Function to search the NASA databse
function searchDatabase(queryURL) {
  console.log(querySearch);
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Displaying the search results to the DOM
    for (let index = 0; index < response.collection.items.length; index++) {
      // Creating the new elements in memory
      let newImageDiv = document.createElement("div");
      let newImageFigure = document.createElement("figure");
      let newImage = document.createElement("img");
      // Adding CSS classes to the new div and figure
      newImageDiv.classList.add("column");
      newImageDiv.classList.add("is-one-third");
      newImageFigure.classList.add("image");
      newImageFigure.classList.add("is-square");
      // Changing the src of the new image & setting an alt
      newImageDiv.setAttribute("alt", "RESULT FAILED TO LOAD");
      newImage.src = response.collection.items[index].links[0].href;
      newImage.setAttribute("description", response.collection.items[index].data[0].description);
      newImage.setAttribute("title", response.collection.items[index].data[0].title);
      // Appending everything to the DOM
      newImageFigure.appendChild(newImage);
      newImageDiv.appendChild(newImageFigure);
      searchedResults.appendChild(newImageDiv);
      // Removing the hidden class from the entire container
      searchedResultsContainer.classList.remove("hidden");
    };
  });
};

// Adding a click event listener to the search button
searchButton.addEventListener("click", function () {
  querySearch = searchQuery.value;
  querySearch = querySearch.toLowerCase();
  let queryURL;
  // Changing queryMediaType depending on which parameters are checked
  if (imageFormat.checked || audioFormat.checked) {
    if (imageFormat.checked && audioFormat.checked) {
      queryMediaType = "&media_type=image,audio";
      queryURL = "https://images-api.nasa.gov/search?q=" + querySearch + queryMediaType;
      searchDatabase(queryURL);
    }
    else if (imageFormat.checked === true) {
      queryMediaType = "&media_type=image";
      queryURL = "https://images-api.nasa.gov/search?q=" + querySearch + queryMediaType;
      searchDatabase(queryURL);
    } else if (audioFormat.checked === true) {
      queryMediaType = "&media_type=audio";
      queryURL = "https://images-api.nasa.gov/search?q=" + querySearch + queryMediaType;
      searchDatabase(queryURL);
    }
  } else {
    searchQuery.setAttribute("placeholder", "Please select a format type");
  }
  searchedResults.innerHTML = "";
});

// * DONE: When the click event is triggered, a modal appears.
// * DONE: When user clicks the close button, the modal disappears.
// TODO: The modal will contain the image on the left & information about the image on the right.
// TODO: There will also be a save button in the modal, allowing the user to save the image to local storage for later viewing.
// Event listener to give data to the modal and open it
searchedResultsContainer.addEventListener("click", function (event) {
  if (event.target.matches("img")) {
    let imgSrc = event.target.getAttribute("src");
    console.log(imgSrc);
    modalImage.setAttribute("src", imgSrc);
    let imgDesc = event.target.getAttribute("description");
    resultInfo.textContent = imgDesc;
    genericModal.classList.add("is-active");
    // Add event listener to save image button
    saveBtn.addEventListener("click", function (event) {
      // // Store data to local storage
      savedImagesArray.push(imgSrc);
      // console.log(savedImagesArray)
      window.localStorage.setItem('imageData', JSON.stringify(savedImagesArray));
    })
  }
});
// Event listener to close the modal
modalCloseBtn.addEventListener("click", function () {
  genericModal.classList.remove("is-active");
});
// When redirected to 'Saved Images', Retrieve local storage
// Append images to same format as home page