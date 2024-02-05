document.addEventListener("DOMContentLoaded", function () {
    setTimeout(Loadingpage, 3000);
    function Loadingpage() {
      // Hide the loading page
      document.getElementById("loading-page").style.display = "none";
    }
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
        if (data && data.results.length > 0) {
          questions = data.results;
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
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple");
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Error response from API: ${response.status} - ${errorText}`
          );
          return null;
        }
  
        const data = await response.json();
  
        // Return the entire response object
        return data;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }
    };
  
    // Function to shuffle an array using Fisher-Yates algorithm
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
  
    const updateHighScore = (score) => {
      const currentHighScore = localStorage.getItem("highScore") || 0;
  
      if (score > currentHighScore) {
        localStorage.setItem("highScore", score);
      }
    };
  
    const getNewQuestion = () => {
      console.log("Getting new question");
      console.log("availableQuestions.length:", availableQuestions.length);
      console.log("questionCounter:", questionCounter);
  
      if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
  
        console.log("No more questions or max questions reached");
        // Call this function whenever the game ends with the player's final score
        updateHighScore(score);
  
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
      const questionText = currentQuestion.question;
  
      if (questionText) {
        // Display the question text
        question.innerText = questionText;
  
        // Disable user interaction during the loading period
        acceptingAnswers = false;
  
        // Update choice elements with answers simultaneously
        const answerChoices = [
          currentQuestion.correct_answer,
          ...currentQuestion.incorrect_answers,
        ];
        shuffleArray(answerChoices);
  
        for (let i = 0; i <= 3; i++) {
          choices[i].innerText = "Loading answer...";
  
          // Set answers after a delay
          setTimeout(() => {
            choices[i].innerText = answerChoices[i];
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
          selectedAnswer === currentQuestion.correct_answer
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