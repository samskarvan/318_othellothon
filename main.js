
$(document).ready(initializeApp);

function initializeApp(){
console.log("Hello, Kitty!");
createGameBoard(8,8);
middleSquares();

}

var gameBoard2dArray = [];

function createGameBoard(columnAmount, rowAmount) {
    var gameBoard = $("#game-area");
    var rowCountFirst = 0;
    var rowCountBuild = 0;
    var columnCountBuild = 1;
    for(rowIterate = 0; rowIterate < columnAmount; rowIterate++) {
        var newFirstSquareOfRow = ($("<div>", {
            class: "square front",
            value: "blank",
            row: rowCountFirst,
            column: 0,
            click: createPieces //put Andrew's function here
        }));
        gameBoard2dArray.push([]);
        gameBoard2dArray[rowCountFirst].push(newFirstSquareOfRow[0].attributes.value.nodeValue);
        console.log(newFirstSquareOfRow[0].attributes.value.nodeValue);
        rowCountFirst++;
        gameBoard.append(newFirstSquareOfRow);
        for(colIterate = 0; colIterate < rowAmount-1; colIterate++) {
            var newSquare = ($("<div>", {
                class: "square front",
                value: "blank",
                row: rowCountBuild,
                column: columnCountBuild,
                click: createPieces //put Andrew's function here
            }));
            gameBoard.append(newSquare);
            gameBoard2dArray[rowCountBuild].push(newSquare[0].attributes.value.nodeValue);
            columnCountBuild++;
        }
        rowCountBuild++;
        columnCountBuild = 1;
    }
    console.log(gameBoard2dArray);

}

function createPieces() {
    console.log("pieces initiated");
    console.log(this);
    $(this).addClass("front", "border-highlight");
}

//based on whose turn it is, white kitty and black kitty

function middleSquares() {
    pieceClassArray = [ "white", "black"]
    $( "[row=3][column=3]" ).addClass(pieceClassArray[0])
    $( "[row=3][column=4]" ).addClass(pieceClassArray[1])
    $( "[row=4][column=3]" ).addClass(pieceClassArray[1])
    $( "[row=4][column=4]" ).addClass(pieceClassArray[0])
    //could add randomization later to order of starting chips
}

function resetGame() {
    
}



