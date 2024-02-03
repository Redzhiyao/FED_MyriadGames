document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "ApiKeyAuth";

  const question = document.getElementById("question");
  const choices = Array.from(
    document.querySelectorAll(".choice-container .choice-text")
  );
  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");

  let currentQuestion = {};
  let acceptingAnswers = true;
  let score = 0;
  let questionCounter = 0;
  let availableQuestions = [];
  let questions = [];
  const SCORE_POINTS = 100;
  const MAX_QUESTIONS = 10;

  // Function to start the game
  const startGame = async () => {
    console.log("Starting game");

    // Check if questions are already fetched
    if (questions.length === 0) {
      const data = await fetchTriviaData();
      if (data && data.length > 0) {
        questions = data;
        questionCounter = 0;
        score = 0;
        availableQuestions = [];
        getNewQuestion();
      } else {
        console.error("No questions retrieved from the API");
      }
    } else {
      // Questions are already fetched, proceed to the game
      questionCounter = 0;
      score = 0;
      availableQuestions = [];
      getNewQuestion();
    }
  };

  // Function to fetch trivia data from the API
  const fetchTriviaData = async () => {
    try {
      let settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      };

      const response = await fetch(
        "https://the-trivia-api.com/v2/questions/",
        settings
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Error response from API: ${response.status} - ${errorText}`
        );
        return null;
      }

      const data = await response.json();

      // Return only the first 10 questions
      return data.slice(0, 10);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };

  const getNewQuestion = () => {
    console.log("Getting new question");
    console.log("availableQuestions.length:", availableQuestions.length);
    console.log("questionCounter:", questionCounter);

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);

      console.log("No more questions or max questions reached");

      // Redirect to triviaEnd.html after 10 questions
      if (questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/html/triviaEnd.html");
      }
    }

    questionCounter++;
    console.log(`Question ${questionCounter} of ${MAX_QUESTIONS}`);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Select the next question from the API data sequentially
    currentQuestion = questions[questionCounter - 1];
    console.log("Current question:", currentQuestion);

    // Access nested properties correctly
    const questionText = currentQuestion.question?.text;

    if (questionText) {
      // Display the question text
      question.innerText = questionText;

      // Disable user interaction during the loading period
      acceptingAnswers = false;

      // Update choice elements with answers simultaneously
      for (let i = 0; i <= 3; i++) {
        choices[i].innerText = "Loading answer...";
      }

      const correctAnswer = currentQuestion.correctAnswer;
      const incorrectAnswers = currentQuestion.incorrectAnswers;

      // Set correct answer after a delay
      setTimeout(() => {
        choices[0].innerText = correctAnswer;
      }, 1000);

      // Set incorrect answers after a delay
      for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
          choices[i].innerText = incorrectAnswers[i - 1];
        }, 1000);
      }

      // Enable user interaction after the answers are loaded
      setTimeout(() => {
        acceptingAnswers = true;
      }, 2000);
    } else {
      console.error("No question text available in the API response");
    }
  };

  // Event listener for user's choice
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.innerText;

      let classToApply =
        selectedAnswer === currentQuestion.correctAnswer
          ? "correct"
          : "incorrect";

      if (classToApply === "correct") {
        incrementScore(SCORE_POINTS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 2000);
    });
  });

  // Function to increment the score
  const incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
    console.log("Score incremented:", score);
  };

  // Invoke the startGame function
  startGame();
});
