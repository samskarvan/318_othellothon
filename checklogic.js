
$(document).ready(initializeApp);

function initializeApp(){
    console.log("Hello, Kitty!");
    createGameBoard(8,8);
    middleSquares();
    $("div").click(changeArray);
    $("#game-area").css("pointer-events","none");
}

var currentPlayer = "black";
var gameBoard2dArray = [];

function createGameBoard(columnAmount, rowAmount) {
    var gameBoard = $("#game-area");
    var rowCountFirst = 0;
    var rowCountBuild = 0;
    var columnCountBuild = 1;
    for(rowIterate = 0; rowIterate < columnAmount; rowIterate++) {
        var newFirstSquareOfRow = ($("<div>", {
            class: "square front",
            value: "not-clicked",
            row: rowCountFirst,
            column: 0,
            click: checkForValidEntry
        }));
        gameBoard2dArray.push([]);
        gameBoard2dArray[rowCountFirst].push(newFirstSquareOfRow[0].attributes.value.nodeValue);
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

}

function createPieces() {
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
    pieceClassArray = [ "white", "black"];
    $( "[row=3][column=3]" ).addClass(pieceClassArray[0]).attr("value","white");
    gameBoard2dArray[3][3] = "white";
    $( "[row=3][column=4]" ).addClass(pieceClassArray[1]).attr("value","black");
    gameBoard2dArray[3][4] = "black";
    $( "[row=4][column=3]" ).addClass(pieceClassArray[1]).attr("value","black");
    gameBoard2dArray[4][3] = "black";
    $( "[row=4][column=4]" ).addClass(pieceClassArray[0]).attr("value","white");
    gameBoard2dArray[4][4] = "white";

    //could add randomization later to order of starting chips
}

function resetGame() {
    //reset all variables

}

function changeArray() {
    //change Array when dom changes
    gameBoard2dArray[$(this).attr("row")][$(this).attr("column")] = $(this).attr("value");
    console.log(this)
}

//need function to tell which player clicked last
//



