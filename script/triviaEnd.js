const usernameTrivia = document.getElementById("usernameTrivia");
const saveScoreBtnTrivia = document.querySelector("#saveScoreBtnTrivia");

const highScoresTrivia =
  JSON.parse(localStorage.getItem("highScoresTrivia")) || [];

const MAX_HIGH_SCORES_TRIVIA = 5;

let mostRecentScoreTrivia =
  parseInt(localStorage.getItem("mostRecentScoreTrivia")) || 0;

console.log("Most recent score (Trivia):", mostRecentScoreTrivia);

// Display the most recent score (Trivia)
document.getElementById("mostRecentScoreTrivia").innerText =
  mostRecentScoreTrivia;

usernameTrivia.addEventListener("keyup", () => {
  saveScoreBtnTrivia.disabled = !usernameTrivia.value;
});

saveHighScoreTrivia = (e) => {
  e.preventDefault();

  const usernameValue = usernameTrivia.value; // Get the value of the username input field
  const score = {
    score: mostRecentScoreTrivia,
    name: usernameValue.value, // Use the username value instead of the username element itself
  };

  highScoresTrivia.push(score);

  highScoresTrivia.sort((a, b) => {
    return parseInt(b.score) - parseInt(a.score);
  });

  highScoresTrivia.splice(MAX_HIGH_SCORES_TRIVIA);

  localStorage.setItem("highScoresTrivia", JSON.stringify(highScoresTrivia));
  localStorage.setItem("mostRecentScoreTrivia", mostRecentScoreTrivia); // Store the most recent score
  localStorage.setItem("usernameTrivia", usernameValue); // Store the username#
  console.log("We going somewhere but nowhere");
  window.location.assign("triviaHighScores.html");
};
