// Grabbing elements from index.html
let searchButton = document.getElementById("searchButton");
let searchQuery = document.getElementById("searchQuery");
let imageFormat = document.getElementById("imageFormat");
let audioFormat = document.getElementById("audioFormat");
let searchedResultsContainer = document.getElementById("searchedResultsContainer");
let searchedResults = document.getElementById("searchedResults");

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
      newImageFigure.classList.add("is-480x480");

      // Changing the src of the new image & setting an alt
      newImageDiv.setAttribute("alt", "RESULT FAILED TO LOAD");
      newImage.src = response.collection.items[index].links[0].href;
      console.log(newImage.src);

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

  let queryURL = "https://images-api.nasa.gov/search?q=" + querySearch + queryMediaType;

  // Changing queryMediaType depending on which parameters are checked
  if (imageFormat.checked || audioFormat.checked) {
    if (imageFormat.checked && audioFormat.checked) {
      queryMediaType = "&media_type=image,audio";
      searchDatabase(queryURL);
    }
    else if (imageFormat.checked === true) {
      queryMediaType = "&media_type=image";
      searchDatabase(queryURL);
    } else if (audioFormat.checked === true) {
      queryMediaType = "&media_type=audio";
      searchDatabase(queryURL);
    }
  } else {
    alert("Please select at least one format type");
  }

  searchedResults.innerHTML = "";

});
