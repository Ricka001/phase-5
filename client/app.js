const form = document.getElementById("form");
const formData = document.getElementById("form");
const problemElement = document.querySelector(".problem");
const questionForm = document.getElementById("answer-form");
const questionField = document.querySelector(".answer-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");

console.log("Test");

document.getElementById("form").addEventListener("submit", async(event) => {
// form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const formValues = Object.fromEntries(formData);

  console.log(formValues);
});

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
});

let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.question1}`;
  questionField.value = "";
  questionField.focus();
}

updateProblem();

function generateProblem() {
  return {
    question1: "How many lion cubs are in this image?",
    question2: "How many meerkats are in this image?",
    question3: "How many zebras are in this image?",
  };
}

questionForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let correctAnswer;
  if (state.currentProblem == question1) correctAnswer = 6;
  if (state.currentProblem == question2) correctAnswer = 13;
  if (state.currentProblem.question3 == question3) correctAnswer = 17;

  if (parseInt(questionField.value, 10) === correctAnswer) {
    state.score++;
    pointsNeeded.textContent = 3 - state.score;
    updateProblem();
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
  }
}

function checkLogic() {}

const username = localStorage.getItem("username");

const age = localStorage.getItem("age");

localStorage.setItem("username", username);

localStorage.setItem("age", age);

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
    // debugger;
  }

  imageTag.src = images[currentImage];
});
