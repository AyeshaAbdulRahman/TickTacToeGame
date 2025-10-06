// Get all needed elements
const startButton = document.querySelector(".start");
const boxes = document.querySelectorAll(".btn");
const playerXInput = document.getElementById("nameX");
const playerOInput = document.getElementById("nameO");
const statusText = document.getElementById("statusText");

// Game variables
let currentPlayer = "X";
let gameActive = false;
let playerXName = "Player X";
let playerOName = "Player O";

// All winning combinations
const winningPatterns = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];


const checkWinner = () => {
  for (pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) { //6x = 7x = 8 x
        //Highlight winning cells
        boxes[pattern[0]].style.backgroundColor = "#f1ebf7";
        boxes[pattern[1]].style.backgroundColor = "#f1ebf7";
        boxes[pattern[2]].style.backgroundColor = "#f1ebf7";
        return pos1; //  Return "X" or "O"
      }
    }
  }
  return null; // No winner yet
};


// Function to check draw
const checkDraw = () => {
    const isDraw = [...boxes].every((b) => b.innerText !== "");
//  let draw = true; 
// for (let i = 0; i < boxes.length; i++) {
//     if (boxes[i].innerText === "") {
//       draw = false; // not a draw if any box empty
//       break; // no need to check further
//     }
//   }
  if (isDraw) {
    statusText.textContent = "😅 It's a Draw!";
    gameActive = false;
  }
};



const startGame = () => {
  playerXName = playerXInput.value.trim() || "Player X";
  playerOName = playerOInput.value.trim() || "Player O";
  statusText.textContent = `${playerXName} (X) vs ${playerOName} (O)`;
  currentPlayer = "X";
  gameActive = true;
// boxes.foreach( (box)=> {})
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.color = "black";
    box.style.backgroundColor = "#cd0a58";

    box.addEventListener("click", () => {
      if (!gameActive || box.innerText !== "") {
        return;} // prevent clicking filled boxes

      box.innerText = currentPlayer;
      box.disabled = true;

      const winner = checkWinner();

      if (winner) {
        //const winnerName;
        //if(winner=== "X"){
        // WinnerName=PlayerXName; }
        //else{
            //WinnerName=PlayerOName;
            //}
        const winnerName = winner === "X" ? playerXName : playerOName;
        statusText.textContent = `🎉 ${winnerName} Wins!`;
        gameActive = false;
        return;
      }

      checkDraw();

      // Switch turn
      if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const nextName = currentPlayer === "X" ? playerXName : playerOName;
        statusText.textContent = `👉 ${nextName}'s Turn`;
      }
    });
  });
};

// Button event listeners
startButton.addEventListener("click", startGame);
