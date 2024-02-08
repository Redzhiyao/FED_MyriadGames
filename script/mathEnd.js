const usernameMath = document.querySelector("#usernameMath");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const mostRecentScoreMath = document.querySelector("#mostRecentScoreMath");

const highScoresMath = JSON.parse(localStorage.getItem("highScoresMath")) || [];

mostRecentScoreMath.innerText =
  localStorage.getItem("mostRecentScoreMath") || 0;

usernameMath.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameMath.value;
});

saveHighScoreMath = (e) => {
  e.preventDefault();

  const usernameValue = usernameMath.value;
  const score = {
    score: mostRecentScoreMath.innerText,
    name: usernameValue,
  };

  highScoresMath.push(score);

  highScoresMath.sort((a, b) => {
    return b.score - a.score;
  });

  highScoresMath.splice(5);

  localStorage.setItem("highScoresMath", JSON.stringify(highScoresMath));
  localStorage.setItem("mostRecentScoreMath", mostRecentScoreMath.innerText);
  localStorage.setItem("usernameMath", usernameValue); // Store the usernameMath

  window.location.assign("mathHighScores.html");
};
