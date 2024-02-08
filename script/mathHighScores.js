const highScoresListMath = document.getElementById("highScoresListMath");
const highScoresMath = JSON.parse(localStorage.getItem("highScoresMath")) || [];
let mostRecentScoreMath =
  parseInt(localStorage.getItem("mostRecentScoreMath")) || 0;
const usernameMath = localStorage.getItem("usernameMath"); // Retrieve username from local storage

console.log("Most recent score (Math):", mostRecentScoreMath);
console.log("Username for this Math:", usernameMath);

// Filter out the current user's score (Math)
const filteredHighScoresMath = highScoresMath.filter(
  (score) => score.name !== usernameMath
);

// Include the most recent score in the high scores list (Math)
const scoresIncludingRecentMath = [
  ...filteredHighScoresMath,
  { name: usernameMath, score: mostRecentScoreMath },
];

// Sort the scores by descending order (Math)
scoresIncludingRecentMath.sort((a, b) => b.score - a.score);

// Select the top 5 scores (Math)
const top5ScoresMath = scoresIncludingRecentMath.slice(0, 5);

// Update the HTML to display the high scores (Math)
highScoresListMath.innerHTML = top5ScoresMath
  .map((score) => {
    return `<li class="high-score-Math">${score.name} - ${score.score}</li>`;
  })
  .join("");
