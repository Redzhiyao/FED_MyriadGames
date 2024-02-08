const highScoresListGeography = document.getElementById(
  "highScoresListGeography"
);
const highScoresGeography =
  JSON.parse(localStorage.getItem("highScoresGeography")) || [];
let mostRecentScoreGeography =
  parseInt(localStorage.getItem("mostRecentScoreGeography")) || 0;
const usernameGeography = localStorage.getItem("usernameGeography"); // Retrieve username from local storage

console.log("Most recent score (Geography):", mostRecentScoreGeography);
console.log("Username for this Geography:", usernameGeography);

// Filter out the current user's score (Geography)
const filteredHighScoresGeography = highScoresGeography.filter(
  (score) => score.name !== usernameGeography
);

// Include the most recent score in the high scores list (Geography)
const scoresIncludingRecentGeography = [
  ...filteredHighScoresGeography,
  { name: usernameGeography, score: mostRecentScoreGeography },
];

// Sort the scores by descending order (Geography)
scoresIncludingRecentGeography.sort((a, b) => b.score - a.score);

// Select the top 5 scores (Geography)
const top5ScoresGeography = scoresIncludingRecentGeography.slice(0, 5);

// Update the HTML to display the high scores (Geography)
highScoresListGeography.innerHTML = top5ScoresGeography
  .map((score) => {
    return `<li class="high-score-geography">${score.name} - ${score.score}</li>`;
  })
  .join("");
