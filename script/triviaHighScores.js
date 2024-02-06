const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Only include the top 5 scores
const top5Scores = highScores.slice(0, 5);

highScoresList.innerHTML = top5Scores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
