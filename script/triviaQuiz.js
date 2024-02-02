const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 2+2",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "17",
    answer: 2,
  },
  {
    question:
      "What percent of American adults believe that chocolate milk comes from brown cows?",
    choice1: "20%",
    choice2: "18%",
    choice3: "7%",
    choice4: "33%",
    answer: 3,
  },
  {
    question: "The tallest building in the world is located in which city?",
    choice1: "Dubai",
    choice2: "New York",
    choice3: "Shanghai",
    choice4: "None of the above",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  console.log("Starting game");
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  console.log("Getting new question");
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    console.log("No more questions or max questions reached");
    return window.location.assign("/html/triviaEnd.html");
  }

  questionCounter++;
  console.log(`Question ${questionCounter} of ${MAX_QUESTIONS}`);
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  console.log("Current question:", currentQuestion);
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
  console.log("Score incremented:", score);
};

startGame();

/*try {
  const response = await fetch("https://the-trivia-api.com/v2/questions", {
    headers: {
      "x-apikey": "ApiKeyAuth",
    },
  });
  const data = await response.json();

  // Get HTML elements
  let displayQuestionElement = document.getElementById("displayQuestion");
  let optionAnswer1Element = document.getElementById("optionAnswer1");
  let optionAnswer2Element = document.getElementById("optionAnswer2");
  let optionAnswer3Element = document.getElementById("optionAnswer3");
  let optionAnswer4Element = document.getElementById("optionAnswer4");

  // Update HTML elements with data for the next question
  displayQuestionElement.textContent = data[currentQuestionIndex].question.text;
  optionAnswer1Element.textContent = data[currentQuestionIndex].correctAnswer;
  optionAnswer2Element.textContent =
    data[currentQuestionIndex].incorrectAnswers[0];
  optionAnswer3Element.textContent =
    data[currentQuestionIndex].incorrectAnswers[1];
  optionAnswer4Element.textContent =
    data[currentQuestionIndex].incorrectAnswers[2];
} catch (error) {
  console.error("Error fetching data:", error);
}

// Call the nextQuestion function to load the first question
nextQuestion();*/
