var shipData = [
    [null, "X", "X", "X", "X", "X", null, null, null, null],
    [null, null, null, "X", null, null, null, null, null, null],
    [null, null, null, "X", null, null, null, null, null, null],
    [null, null, null, "X", null, null, "X", "X", null, null],
    [null, null, null, "X", null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "X", "X", "X", null, null, null],
    ["X", null, null, null, null, null, null, null, null, null],
    ["X", null, null, null, null, null, null, null, null, null],
    ["X", null, null, null, null, null, null, null, null, null]
];

var gameState = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
];

var schips = {
    C: {
        name: "Carrier",
        hits: 5
    },
    B: {
      name: "Battleship",
      hits: 3
    },
    S: {
      name: "Submarine",
      hits: 3
    },
    D: {
      name: "Destroyer",
      hits: 4
    },
    P: {
        name: "Patrol Boat",
      hits: 2
    }
  };

/*  Carrier - 5 hits
Battleship - 4 hist
Destroyer - 3 hits
Submarine - 3 hits
Patrol Boat - 2 hits

*/

function createGameBoard(){
    var gameBoard = document.getElementById("gameBoard");
    for (var i = 0; i < 10; i++) {
        var tableRow = document.createElement("tr");
        tableRow.setAttribute("row", i);
        for (var j = 0; j < 10; j++) {
            var tableData = document.createElement("td");
            tableData.setAttribute("col", j);
            tableData.setAttribute("onclick", "play(this)");
            tableData.innerHTML = shipData[i][j];
            tableRow.appendChild(tableData);
        }
        gameBoard.appendChild(tableRow);
    }
}

function populateGameBoard(gameState) {
    var gameBoard = document.getElementById("gameBoard");
    for (var i = 0; i < gameState.length; i++) {
        var row = gameBoard.children[i];
        console.log(row);
        for (var j = 0; j < gameState[i].length; j++) {
            var col = row.children[j];
            console.log(col);
            col.innerHTML = gameState[i][j];

        }
    }
}

function play(cell) {
    var col = cell.getAttribute("col");
    var row = cell.parentElement.getAttribute("row");
    var score = Number(document.getElementById("score").innerHTML);
    var totalHits = Number(document.getElementById("hits").innerHTML);

    if (gameState[row][col] == null){
        if (shipData[row][col] !== null) {
            alert("Hit!");
            for (var key in schips){
                if (key == shipData[row][col]) {
                    schips[key].hits--;
                    if (schips[key].hits === 0) {
                        alert("You sunk my " + schips[key].name);
                    }
                }
            }
            gameState[row][col] = "X";
            score += 5;
            totalHits -= 1;
        } else{
            alert("You hit water!");
            gameState[row][col] = "O";
            score -= 1;
        } 
    } else {
        alert("You already tried this one!");
    }
        document.getElementById("hits").innerHTML = totalHits;
        document.getElementById("score").innerHTML = score;
        populateGameBoard(gameState);
        hasGameEnded(totalHits);
}

window.onload = function() {
    createGameBoard();
};

function hasGameEnded(hits) {
    if (hits === 0) {
        alert("You won the game");
    }
}

var startButton = document.getElementById("startButton");
startButton.onclick = function() {
   //alert("I clicked the button");
   populateGameBoard(gameState);
};