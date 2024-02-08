const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

let mostRecentScore = parseInt(localStorage.getItem("mostRecentScore")) || 0;

console.log("Most recent score:", mostRecentScore);

// Display the most recent score
document.getElementById("mostRecentScore").innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore, // Use mostRecentScore instead of parseInt(mostRecentScore.innerText)
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return parseInt(b.score) - parseInt(a.score);
  });

  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/html/triviaHighScores.html");
};
