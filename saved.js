let loadButton = document.getElementById("loadButton")
let savedResults = document.getElementById("savedResults");
let clearButton = document.getElementById("clearButton")
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
clearButton.addEventListener("click", function() {
    window.localStorage.clear("imageData")
    location.reload();
    clearButton.classList.add("hidden");
    loadButton.classList.remove("hidden");
})