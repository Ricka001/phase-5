const form = document.querySelector("form");

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const formValues = Object.fromEntries(formData);

  console.log(formValues);

  setupCounter(document.querySelector("#counter"));
  console.log("Test");

  const images = [
    "images/Lions.jpg",
    "images/Meerkats.jpg",
    "images/Zebras.jpg",
  ];

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
}
