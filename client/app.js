const form = document.getElementById("form");
const problemElement = document.querySelector(".problem");
const questionForm = document.getElementById("answer-form");
const questionField = document.querySelector(".answer-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const imageTag = document.getElementById("image");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");
let username = localStorage.getItem("username");
let age = localStorage.getItem("age");
let score = localStorage.getItem("gameScore");

console.log("Test");

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  const stringifiedForm = JSON.stringify(formValues);
  console.log(stringifiedForm);
  localStorage.setItem("username", formValues.username);
  localStorage.setItem("age", formValues.age);
});

let gameData = {
  score: 0,
  wrongAnswers: 0,
  currentProblem: 0,
};

let questionArray = [
  "How many lion cubs are in this image?",
  "How many rabbits are in this image?",
  "How many cats are in this image?",
  "How many meerkats are in this image?",
  "How many penguins are there in this image?",
  "How many zebras are in this image?",
  "How many butterflies are in this image?",
];

let answers = [6, 6, 8, 13, 12, 18, 8];

const images = [
  "images/Lions.jpg",
  "images/Rabbits.jpg",
  "images/Cats.jpg",
  "images/Meerkats.jpg",
  "images/Penguin.jpg",
  "images/Zebras.jpg",
  "images/Butterflies.jpg",
];

function updateProblem() {
  problemElement.textContent = questionArray[gameData.currentProblem];
  imageTag.src = images[gameData.currentProblem];
  questionField.value = "";
  questionField.focus();
}

updateProblem();

questionForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const userAnswer = parseInt(questionField.value, 10); // Convert answer to a number
  const correctAnswer = answers[gameData.currentProblem];

  const stringifiedData = JSON.stringify(gameData.score);

  if (userAnswer === correctAnswer) {
    gameData.score++;
    pointsNeeded.textContent = 7 - gameData.score;
    renderProgressBar();
    // Go to the next problem
    gameData.currentProblem =
      (gameData.currentProblem + 1) % questionArray.length;
    updateProblem();
    localStorage.setItem("gameScore", stringifiedData);
  } else {
    gameData.wrongAnswers++;
    mistakesAllowed.textContent = 2 - gameData.wrongAnswers;
    questionField.value = "";
    questionField.focus();
  }
  checkLogic();
}

function checkLogic() {
  if (gameData.score === 7) {
    endMessage.textContent = "Congrats! You won.";
    document.body.classList.add("overlay-is-open");
  }

  //amend the above to if the score = 3, then scroll to next level, then:
  // if (state.score === 6) {
  //   alert("Congrats! You won.");
  //   resetGame();
  // }

  if (gameData.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, you lost.";
    document.body.classList.add("overlay-is-open");
  }
}
resetButton.addEventListener("click", resetGame);

function resetGame() {
  completedData();
  document.body.classList.remove("overlay-is-open");
  gameData.currentProblem = 0;
  gameData.score = 0;
  gameData.wrongAnswers = 0;
  pointsNeeded.textContent = 7;
  mistakesAllowed.textContent = 2;
  updateProblem();
  renderProgressBar();
  localStorage.clear();
  renderLeaderboard();
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${gameData.score / 7})`;
}

async function completedData() {
  let username = localStorage.getItem("username");
  let age = localStorage.getItem("age");
  let score = localStorage.getItem("gameScore");

  try {
    console.log(username);
    const res = await fetch("http://localhost:8080/get-user-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, age, score }),
    });
    if (!res.ok) {
      throw new Error("Network response failed!");
    }
  } catch (error) {
    console.error("problem with fetch", error);
  }
}

async function renderLeaderboard() {
  const res = await fetch("http://localhost:8080/phase-five");
  const boardScores = await res.json();
  // if the name element ex change this to inner HTML ""
  //same again for scre and age
  boardScores.forEach((phase) => {
    const scoreElement = document.createElement("div");
    scoreElement.classList.add("boardScore");

    const nameElement = document.createElement("h3");
    nameElement.textContent = phase.user_name;

    const ageElement = document.createElement("p");
    ageElement.textContent = `Age: ${phase.age}`;

    const scoreElementScore = document.createElement("p");
    scoreElementScore.textContent = `Score: ${phase.game_score}`;

    scoreElement.appendChild(nameElement);
    scoreElement.appendChild(ageElement);
    scoreElement.appendChild(scoreElementScore);

    leaderboard.appendChild(scoreElement);
  });
}

//=================

const chickenCard = document.getElementById("chicken-card");
const chickendropZone = document.getElementById("chicken-drop-zone");
chickenCard.addEventListener("dragstart", function (event) {
  console.log(event);
});
chickendropZone.addEventListener("dragover", function (event) {
  event.preventDefault();
});
chickendropZone.addEventListener("drop", function (event) {
  chickendropZone.appendChild(chickenCard);
});

// ===============

const cowCard = document.getElementById("cow-card");
const cowdropZone = document.getElementById("cow-drop-zone");
cowCard.addEventListener("dragstart", function (event) {
  console.log(event);
});
cowdropZone.addEventListener("dragover", function (event) {
  event.preventDefault();
});
cowdropZone.addEventListener("drop", function (event) {
  cowdropZone.appendChild(cowCard);
});

// ==============

const dogCard = document.getElementById("dog-card");
const dogdropZone = document.getElementById("dog-drop-zone");
dogCard.addEventListener("dragstart", function (event) {
  console.log(event);
});
dogdropZone.addEventListener("dragover", function (event) {
  event.preventDefault();
});
dogdropZone.addEventListener("drop", function (event) {
  dogdropZone.appendChild(dogCard);
});

//====================

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
