const form = document.querySelector("form");
const problemElement = document.querySelector(".problem");
const questionForm = document.querySelector(".answer-form");
const questionField = document.querySelector(".answer-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");

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

//===========
let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.question1} ${state.currentProblem.question2} ${state.currentProblem.question3}`;
}

updateProblem();

function generateProblem() {
  return {
    question1: "count the number of X",
    question2: "count the number of Y",
    question3: "count the number of Z",
  };
}

questionForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let correctAnswer;
  if (state.currentProblem.question1 == question1) correctAnswer = X;
  if (state.currentProblem.question2 == question2) correctAnswer = Y;
  if (state.currentProblem.question3 == question3) correctAnswer = Z;

  if (parseInt(questionField.value, 10) === correctAnswer) {
    state.score++;
    pointsNeeded.textContent = 3 - state.score;
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
  }
}
