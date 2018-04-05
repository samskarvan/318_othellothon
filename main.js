
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
            click: checkForValidEntry
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
                click: checkForValidEntry
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

function checkForValidEntry(){

    if ($(this).attr('value') === "blank"){
        var valueClicked = $(this).attr('value');
        var rowClicked = parseInt($(this).attr('row'));
        var columnClicked = parseInt($(this).attr('column'));
        checkHorizontal(rowClicked,columnClicked);
        checkVertical(rowClicked,columnClicked);
        checkDiagonal(rowClicked,columnClicked);
    }else{
        return;
    }
    function checkHorizontal() {
        var i;
        var k;

        if ( gameBoard2dArray[rowClicked][(columnClicked +1)] === "blank" || gameBoard2dArray[rowClicked][columnClicked+1] === valueClicked){
            return;
        }
        else{
            k= 2;
            for(i = columnClicked +1; i <= 7; i++){
                if(gameBoard2dArray[rowClicked][columnClicked+k] === "blank"){
                    return;
                }
                if(gameBoard2dArray[rowClicked][columnClicked+k] === valueClicked){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    k++;
                }
            }
            k= -2;
            for(i = columnClicked -1; i >= 0; i--){
                if(gameBoard2dArray[rowClicked][columnClicked-k] === "blank"){
                    return;
                }
                if(gameBoard2dArray[rowClicked][columnClicked-k] === valueClicked){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    k--;
                }
            }
        }
    }
    function checkVertical(){
        var i;
        var k;

        if ( gameBoard2dArray[rowClicked+1][(columnClicked)] === "blank" || gameBoard2dArray[rowClicked+1][columnClicked] === valueClicked){
            return;
        }
        else{
            k= 2;
            for(i = rowClicked +1; i <= 7; i++){
                if(gameBoard2dArray[rowClicked+k][columnClicked] === "blank"){
                    return;
                }
                if(gameBoard2dArray[rowClicked+k][columnClicked] === valueClicked){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    k++;
                }
            }
            k= -2;
            for(i = columnClicked -1; i >= 0; i--){
                if(gameBoard2dArray[rowClicked-k][columnClicked] === "blank"){
                    return;
                }
                if(gameBoard2dArray[rowClicked-k][columnClicked] === valueClicked){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    k--;
                }
            }
        }
    }
    function checkDiagonal(){

    }
}

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



