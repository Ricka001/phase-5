console.log("Test");

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const username = formData.get("username");

  const age = formData.get("age");

  localStorage.setItem("username", username);

  localStorage.setItem("age", age);
});

// ===========================/

const images = ["images/Lions.jpg", "images/Meerkats.jpg", "images/Zebras.jpg"];

const firstImage = 0;
const lastImage = images.length - 1;
let currentImage = 0;

const nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
  const imageTag = document.getElementById("image");
  currentImage++;
  if (currentImage >= lastImage) {
    currentImage = 2;
  }
  imageTag.src = images[currentImage];
});

const prevButton = document.getElementById("prev");
prevButton.addEventListener("click", () => {
  const imageTag = document.getElementById("image");
  currentImage--;
  if (currentImage <= firstImage) {
    currentImage = 0;
    debugger;
  }

  imageTag.src = images[currentImage];
});
