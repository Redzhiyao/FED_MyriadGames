const apiKey = "ApiKeyAuth";
const apiUrl = "https://the-trivia-api.com/v2/questions";
const answersContainer = document.getElementById("answers-container");

// Fetch trivia question from the API
function fetchTriviaQuestion() {
  fetch(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayQuestion(data);
    })
    .catch((error) => console.error("Error fetching trivia question:", error));
}

// Display the trivia question and answers
function displayQuestion(questionData) {
  const questionElement = document.getElementById("question");

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Display question text
  questionElement.textContent = questionData.question.text;

  // Display answer choices
  const allAnswers = [
    questionData.correctAnswer,
    ...questionData.incorrectAnswers,
  ];
  shuffleArray(allAnswers);

  allAnswers.forEach((answer) => {
    const answerBox = document.createElement("div");
    answerBox.classList.add("answer-box");
    answerBox.textContent = answer;
    answerBox.addEventListener("click", () =>
      checkAnswer(answer, questionData.correctAnswer)
    );
    answersContainer.appendChild(answerBox);
  });
}

// Shuffle array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct!");
  } else {
    alert(`Incorrect. The correct answer is: ${correctAnswer}`);
  }

  // Fetch the next question
  fetchTriviaQuestion();
}

// Start the quiz by fetching the first question
fetchTriviaQuestion();
