let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let result = document.querySelector(".result");
let newGame = document.querySelector(".new-game");
let resultContainer = document.querySelector(".result-container");

let turnX = false;
let count = 0

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnX = false;
  count = 0;
  enabledBoxes();
  resultContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
        gameDrawn()
    }
  });
});

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const gameDrawn = () => {
  result.innerText = "the game is drawn";
  resultContainer.classList.remove("hide");
  disabledBoxes();
};
const showWinner = (winner) => {
  result.innerText = `Congratulations winner is ${winner}`;
  resultContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let position1 = boxes[patterns[0]].innerText;
    let position2 = boxes[patterns[1]].innerText;
    let position3 = boxes[patterns[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        showWinner(position1);
        return true
      }
    }
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
