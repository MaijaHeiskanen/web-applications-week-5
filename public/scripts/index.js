var currentPlayer = "X";

var taulukko = [];

// Copyed from courses demo.
if (document.readyState !== "loading") {
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready, executing after a wait.");
    initializeCode();
  });
}

function checkWin(dx, dy) {
  const aputaulukko = [];

  for (let x = 0; x < taulukko.length; x++) {
    aputaulukko.push([]);
    for (let y = 0; y < taulukko[0].length; y++) {
      aputaulukko[x].push(null);
    }
  }

  for (let y = 0; y < taulukko[0].length; y++) {
    for (let x = 0; x < taulukko.length; x++) {
      const prevX = x + dx;
      const prevY = y + dy;
      let prevValue = 0;

      if (
        prevX >= 0 &&
        prevX < taulukko.length &&
        prevY >= 0 &&
        prevY < taulukko[0].length
      ) {
        prevValue = aputaulukko[prevX][prevY];
      }

      if (taulukko[x][y] === " ") {
        aputaulukko[x][y] = 0;
      } else if (prevValue > 0) {
        if (taulukko[x][y] === taulukko[prevX][prevY]) {
          aputaulukko[x][y] = prevValue + 1;
        } else {
          aputaulukko[x][y] = 1;
        }
      } else {
        aputaulukko[x][y] = 1;
      }
    }
  }

  //console.log(aputaulukko);
  //console.log(taulukko);
  for (let y = 0; y < taulukko[0].length; y++) {
    for (let x = 0; x < taulukko.length; x++) {
      if (aputaulukko[x][y] >= 5) {
        return taulukko[x][y];
      }
    }
  }

  return null;
}

function checkWinCondition() {
  let directions = [[-1, 0], [0, -1], [-1, -1], [1, -1]];

  for (let dir of directions) {
    const winner = checkWin(dir[0], dir[1]);
    if (winner !== null) {
      return winner;
    }
  }
  return null;
}

function clicked(x, y) {
  var ruutu = document.getElementById(`tr${x}td${y}`);
  var turn = document.getElementById("turn");
  if (ruutu.textContent === " ") {
    //alert(`Klikkasit ${y + 1} ${x + 1}`);
    taulukko[x][y] = currentPlayer;
    if (currentPlayer === "X") {
      currentPlayer = "O";
      turn.innerHTML = "Turn: O";
    } else {
      currentPlayer = "X";
      turn.innerHTML = "Turn: X";
    }

    //console.log(taulukko[x][y]);
    ruutu.innerHTML = taulukko[x][y];
  } else {
    alert("This cell was already taken!");
  }

  const winner = checkWinCondition();
  if (winner !== null) {
    var turn = document.getElementById("turn");
    turn.innerHTML = `${winner} won!`;
    alert(`${winner} won!`);
    clearTable();
  }
}

function clearTable() {
  taulukko.length = 0;
  for (let i = 0; i < 5; i++) {
    taulukko.push([" ", " ", " ", " ", " "]);
  }
}

// ALso some parts copyed from courses demo.
function initializeCode() {
  console.log("Intiializing");
  clearTable();
  var board = document.getElementById("board");

  var table = document.createElement("table");

  for (let step = 0; step < taulukko[0].length; step++) {
    var para = document.createElement("tr");

    for (let step2 = 0; step2 < taulukko.length; step2++) {
      let x = step2;
      let y = step;
      var para2 = document.createElement("td");
      para2.id = `tr${step2}td${step}`;
      para2.innerText = " ";
      para2.onclick = function() {
        clicked(x, y);
      };
      para.appendChild(para2);
    }

    table.appendChild(para);
  }

  board.appendChild(table);
}