const form = document.getElementById("form");
const formData = document.getElementById("form");
const problemElement = document.querySelector(".problem");
const questionForm = document.getElementById("answer-form");
const questionField = document.querySelector(".answer-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const imageTag = document.getElementById("image");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

console.log("Test");

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let userage = document.getElementById("age").value;
  try {
    const res = await fetch("http://localhost:8080/get-user-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userage }),
    });
    if (!res.ok) {
      throw new Error("Network response failed!");
    }
  } catch (error) {
    console.error("problem with fetch", error);
  }
});

let gameData = {
  score: 0,
  wrongAnswers: 0,
  currentProblem: 0,
};

let questionArray = [
  "How many lion cubs are in this image?",
  "How many meerkats are in this image?",
  "How many zebras are in this image?",
];

let answers = [6, 13, 18];

const images = ["images/Lions.jpg", "images/Meerkats.jpg", "images/Zebras.jpg"];

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
    pointsNeeded.textContent = 3 - gameData.score;
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

  const retrievedData = localStorage.getItem("gameScore");
  const gameScore = JSON.parse(retrievedData);
  console.log(gameScore);
  return gameScore;
}

function checkLogic() {
  //if you won -- submit score to the db??
  if (gameData.score === 3) {
    endMessage.textContent = "Congrats! You won.";
    document.body.classList.add("overlay-is-open");
  }

  //amend the above to if the score = 3, then scroll to next level, then:
  // if (state.score === 6) {
  //   alert("Congrats! You won.");
  //   resetGame();
  // }

  //if you lost -- submit score to the db??
  if (gameData.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, you lost.";
    document.body.classList.add("overlay-is-open");
  }
}
resetButton.addEventListener("click", resetGame);

function resetGame() {
  //value from local storage gets sent to db
  document.body.classList.remove("overlay-is-open");
  gameData.currentProblem = 0;
  gameData.score = 0;
  gameData.wrongAnswers = 0;
  pointsNeeded.textContent = 3;
  mistakesAllowed.textContent = 2;
  updateProblem();
  renderProgressBar();
  localStorage.clear();
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${gameData.score / 6})`;
}

// formData = new FormData(form);

// const formValues = Object.fromEntries(formData);

// console.log(formValues);
// });

const username = localStorage.getItem("username");

const age = localStorage.getItem("age");

localStorage.setItem("username", username);

localStorage.setItem("age", age);

// const images = ["images/Lions.jpg", "images/Meerkats.jpg", "images/Zebras.jpg"];

// const firstImage = 0;
// const lastImage = images.length - 1;
// let currentImage = 0;

// const nextButton = document.getElementById("next");
// nextButton.addEventListener("click", () => {
//   const imageTag = document.getElementById("image");
//   currentImage++;
//   if (currentImage >= lastImage) {
//     currentImage = 2;
//   }
//   imageTag.src = images[currentImage];
// });

// const prevButton = document.getElementById("prev");
// prevButton.addEventListener("click", () => {
//   const imageTag = document.getElementById("image");
//   currentImage--;
//   if (currentImage <= firstImage) {
//     currentImage = 0;
//     // debugger;
//   }

//   imageTag.src = images[currentImage];
// });
