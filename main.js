
$(document).ready(initializeApp);

function initializeApp(){
console.log("Hello, Kitty!");
createGameBoard(8,8);

}

function createGameBoard(columnAmount, rowAmount) {
    var gameBoard = $("#game-area");
    var rowCountFirst = 1;
    var rowCountBuild = 1;
    var columnCountBuild = 2;
    for(rowIterate = 0; rowIterate < columnAmount; rowIterate++) {
        var newFirstSquareOfRow = ($("<div>", {
            class: "square",
            value: "undefined",
            row: rowCountFirst,
            column: 1,
            click: createPieces //put Andrew's function here
        }));
        rowCountFirst++;
        gameBoard.append(newFirstSquareOfRow);
        for(colIterate = 0; colIterate < rowAmount-1; colIterate++) {
            var newSquare = ($("<div>", {
                class: "square",
                value: "undefined",
                row: rowCountBuild,
                column: columnCountBuild,
                click: createPieces //put Andrew's function here
            }));
            gameBoard.append(newSquare);
            columnCountBuild++;
        }
        rowCountBuild++;
        columnCountBuild = 2;
    }

}

function createPieces() {
    console.log("pieces initiated");
    var gamePiece = $("<div class='game-pieces'>");
    $(this).append(gamePiece)
}

function isBoardFull() {
    
}

















