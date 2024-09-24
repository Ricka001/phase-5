import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
console.log("Test");

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
