// Global variable to track the current question index
let currentQuestionIndex = 0;
let timer; // Store the timer reference
let playedQuestions = 0;

// Function to update question number and fetch data for the next question
async function nextQuestion(selectedOptionId) {
  currentQuestionIndex++;

  document.getElementById(
    "questionNumber"
  ).textContent = `Question ${currentQuestionIndex}`;

  // Check if the player has played 10 questions
  if (playedQuestions >= 10) {
    alert("You have completed 10 questions! Game Over!");
    return;
  }

  clearTimeout(timer);

  startTimer();

  try {
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
    displayQuestionElement.textContent =
      data[currentQuestionIndex].question.text;
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
}

// Function to start the timer
function startTimer() {
  const timerBar = document.getElementById("timerBar");

  // Reset the timer bar's width and transition properties
  function resetTimerBar() {
    timerBar.style.width = "0%";
    timerBar.style.transition = "none";
  }

  // Set the width of the timer bar to 0% initially
  resetTimerBar();

  // Add a class to initiate the animation
  timerBar.classList.add("animate-timer");

  // Call nextQuestion after 30 seconds
  setTimeout(() => {
    nextQuestion();
    resetTimerBar(); // Reset the timer bar visually
    timerBar.classList.remove("animate-timer"); // Remove animation class
  }, 30000);
}

document.getElementById("optionAnswer1").addEventListener("click", resetTimer);
document.getElementById("optionAnswer2").addEventListener("click", resetTimer);
document.getElementById("optionAnswer3").addEventListener("click", resetTimer);
document.getElementById("optionAnswer4").addEventListener("click", resetTimer);

// Function to reset the timer
function resetTimer() {
  clearTimeout(timer); // Clear existing timers
  startTimer(); // Start the timer again
}

// Call the nextQuestion function to load the first question
nextQuestion();
