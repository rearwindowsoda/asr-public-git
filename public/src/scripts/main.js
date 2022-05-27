function play() {
  const audio = new Audio("src/audio/audioclick.mp3");
  audio.play();
}

function showPoints() {
  if (
    localStorage.getItem("all-points") === null ||
    isNaN(Number(localStorage.getItem("all-points")))
  ) {
    localStorage.setItem("all-points", 0);
  }
  let localFetch = localStorage.getItem("all-points");
  const pointsStatus = document.getElementById("points-status");
  const pointsMultiply = document.getElementById("points-multiply");

  pointsStatus.innerText = `${localFetch}`;
  pointsMultiply.innerText = `${localFetch * 30}`;
}

function addPoints(numberOfPoints) {
  localStorage.getItem("all-points") ?? localStorage.setItem("all-points", "0");
  play();
  const localFetch = localStorage.getItem("all-points");
  let userPoints = Number(localFetch) + parseInt(numberOfPoints);
  localStorage.setItem("all-points", userPoints + "");
  showPoints();
  return;
}

function subtractPoints(numberOfPoints) {
  const localFetch = localStorage.getItem("all-points") ?? 0;
  let userPoints = Number(localFetch) - parseInt(numberOfPoints);
  if (isNaN(userPoints) || userPoints < 0 || parseInt(numberOfPoints) < 0) {
    userPoints = 0;
    alert("Nie możesz wykonać tej operacji.");
    return;
  }

  localStorage.setItem("all-points", userPoints + "");
  showPoints();
  return;
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  play();
  const userConfirmation = confirm(
    "Czy na pewno chcesz zresetować dotychczasowe punkty?"
  );
  if (userConfirmation) {
    alert("Twoje punkty zostaną zresetowane.");
    localStorage.setItem("all-points", "0");
    showPoints();
  } else {
    alert("Twoje punkty zostały zachowane.");
  }
});

const subtractButton = document.getElementById("subtract-points");
const subtractValue = document.querySelector("#subtract-value");
subtractButton.addEventListener("click", function () {
  play();
  subtractPoints(subtractValue.value);
  subtractValue.value = "";
});

showPoints();
