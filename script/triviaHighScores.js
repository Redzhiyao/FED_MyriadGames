const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let mostRecentScore = parseInt(localStorage.getItem("mostRecentScore")) || 0;
const username = localStorage.getItem("username") || "Anonymous"; // Retrieve username from local storage

console.log("Most recent score:", mostRecentScore);

// Display the most recent score
document.getElementById("mostRecentScore").innerText = mostRecentScore;

// Filter out the current user's score
const filteredHighScores = highScores.filter(
  (score) => score.name !== username
);

// Include the most recent score in the high scores list
const scoresIncludingRecent = [
  ...filteredHighScores,
  { name: username, score: mostRecentScore },
];

// Sort the scores by descending order
scoresIncludingRecent.sort((a, b) => b.score - a.score);

// Select the top 5 scores
const top5Scores = scoresIncludingRecent.slice(0, 5);

// Update the HTML to display the high scores
highScoresList.innerHTML = top5Scores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
