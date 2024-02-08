const highScoresListTrivia = document.getElementById("highScoresListTrivia");
const highScoresTrivia = JSON.parse(localStorage.getItem("highScores")) || []; // Retrieve high scores from local storage
const mostRecentScoreTrivia =
  parseInt(localStorage.getItem("mostRecentScoreTrivia")) || 0;
const username = localStorage.getItem("usernameTrivia"); // Retrieve username from local storage

console.log("Most recent score (Trivia):", mostRecentScoreTrivia);
console.log("Username for this Trivia", username);

// Filter out the current user's score (Trivia)
const filteredHighScoresTrivia = highScoresTrivia.filter(
  (score) => score.name !== username // Remove the .value as username is not an input element
);

// Include the most recent score in the high scores list (Trivia)
const scoresIncludingRecentTrivia = [
  ...filteredHighScoresTrivia,
  { name: username, score: mostRecentScoreTrivia },
];

// Sort the scores by descending order (Trivia)
scoresIncludingRecentTrivia.sort((a, b) => b.score - a.score);

// Select the top 5 scores (Trivia)
const top5ScoresTrivia = scoresIncludingRecentTrivia.slice(0, 5);

// Update the HTML to display the high scores (Trivia)
highScoresListTrivia.innerHTML = top5ScoresTrivia
  .map((score) => {
    return `<li class="high-score-trivia">${score.name} - ${score.score}</li>`;
  })
  .join("");
