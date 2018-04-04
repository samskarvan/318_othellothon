
$(document).ready(initializeApp);

function initializeApp(){
console.log("hello");
createGameBoard();

}

function createGameBoard() {
    var gameBoard = $("#game-area");
    var rowCountFirst = 1;
    var rowCountBuild = 1;
    var columnCountBuild = 2;
    for(rowIterate = 0; rowIterate < 8; rowIterate++) {
        var newFirstSquareOfRow = ($("<div>", {
            class: "square",
            value: "undefined",
            row: rowCountFirst,
            column: 1
        }));
        rowCountFirst++;
        gameBoard.append(newFirstSquareOfRow);
        for(colIterate = 0; colIterate < 7; colIterate++) {
            var newSquare = ($("<div>", {
                class: "square",
                value: "undefined",
                row: rowCountBuild,
                column: columnCountBuild
            }));
            gameBoard.append(newSquare);
            columnCountBuild++;
        }
        rowCountBuild++;
        columnCountBuild = 2;
    }

}




function clickedSpace(){

    // andrew works here
var newSquare
    

}