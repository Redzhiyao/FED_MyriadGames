const usernameGeography = document.querySelector("#usernameGeography");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScoreGeography = document.querySelector(
  "#mostRecentScoreGeography"
);

const highScoresGeography =
  JSON.parse(localStorage.getItem("highScoresGeography")) || [];
const MAX_HIGH_SCORES = 5;

mostRecentScoreGeography.innerText =
  localStorage.getItem("mostRecentScoreGeography") || 0;

usernameGeography.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameGeography.value;
});

saveHighScoreGeography = (e) => {
  e.preventDefault();

  const usernameValue = usernameGeography.value;
  const score = {
    score: mostRecentScoreGeography.innerText,
    name: usernameValue,
  };

  highScoresGeography.push(score);

  highScoresGeography.sort((a, b) => {
    return b.score - a.score;
  });

  highScoresGeography.splice(5);

  localStorage.setItem(
    "highScoresGeography",
    JSON.stringify(highScoresGeography)
  );
  localStorage.setItem(
    "mostRecentScoreGeography",
    mostRecentScoreGeography.innerText
  );
  localStorage.setItem("usernameGeography", usernameValue); // Store the usernameGeography

  window.location.assign("geographyHighScores.html");
};
