const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

console.log("Most recent score:", localStorage.getItem("highScore"));
mostRecentScore.innerText = localStorage.getItem("highScore") || 0;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: parseInt(mostRecentScore.innerText),
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return parseInt(b.score) - parseInt(a.score);
  });

  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("triviaHighScores.html");
};
