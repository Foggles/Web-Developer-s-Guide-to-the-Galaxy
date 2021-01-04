// Grabbing elements from index.html
let searchButton = document.getElementById("searchButton");
let searchQuery = document.getElementById("searchQuery");
let imageFormat = document.getElementById("imageFormat");
let videoFormat = document.getElementById("videoFormat");
let searchedResultsContainer = document.getElementById("searchedResultsContainer");
let searchedResults = document.getElementById("searchedResults");

// Grabbing elements from saved.html
let savedResultsContainer = document.getElementById("savedResultsContainer");
let savedResults = document.getElementById("savedResults");

// Navbar Burger functionaliy
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

// TODO: Search Input
// TODO: Grab the input of searchQuery and store in its own variable.
// TODO: Check what parameters have been selected (don't run search if none have been selected).
// TODO: Store the results.
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
  })
}

// Adding a click event listener to the search button
searchButton.addEventListener("click", function() { 
  querySearch = searchQuery.value;


  let queryURL = "https://images-api.nasa.gov/search?q=" + querySearch + queryMediaType;

  if (imageFormat.checked === true || videoFormat.checked === true) {
    if (imageFormat.checked === true && videoFormat.checked === true) {
      queryMediaType = "&media_type=image,audio";
      searchDatabase(queryURL);
    }  
      else if (imageFormat.checked === true) {
      queryMediaType = "&media_type=image";
      searchDatabase(queryURL);
    } else if (videoFormat.checked === true) {
      queryMediaType = "&media_type=audio";
      searchDatabase(queryURL);
    }
  } else {
    alert("Please select at least one format type");
  }

});
