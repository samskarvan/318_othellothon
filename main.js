
$(document).ready(initializeApp);

function initializeApp(){
console.log("Hello, Kitty!");
createGameBoard(8,8);
middleSquares();

}

var playerWithCurrentTurn = "black";
var gameBoard2dArray = [];
var coinFlipArray = [];

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
        console.log(newFirstSquareOfRow[0].attributes.value.nodeValue);
        rowCountFirst++;
        gameBoard.append(newFirstSquareOfRow);
        for(colIterate = 0; colIterate < rowAmount-1; colIterate++) {
            var newSquare = ($("<div>", {
                class: "square front",
                value: "not-clicked",
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


function flipCoins(array) {
    var coinsToBeFlippedIndex = 0;
    var currentTurnCoinIcon = playerWithCurrentTurn;
    while (coinsToBeFlippedIndex < array.length) {
        array[coinsToBeFlippedIndex].toggleClass(playerWithCurrentTurn).attr('value', playerWithCurrentTurn);
        var columnIndex=array[coinsToBeFlippedIndex].attr('column');
        var rowIndex = array[coinsToBeFlippedIndex].attr('row');
        gameBoard2dArray[rowIndex][columnIndex]=playerWithCurrentTurn;
        coinsToBeFlippedIndex++;
    }
    if (playerWithCurrentTurn === "black") {
        playerWithCurrentTurn = "white";
        $('.turn-indicator img').attr('src','images/kitty-coin.gif');
    } else {
        playerWithCurrentTurn = "black";
        $('.turn-indicator img').attr('src','images/choco-coin.gif');
    }
}


function checkForValidEntry(){

    if ($(this).attr('value') === "not-clicked"){
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
        var currentPosition;
        var searchExtender;


        if ( gameBoard2dArray[rowClicked][(columnClicked +1)] === "not-clicked" || gameBoard2dArray[rowClicked][columnClicked+1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else {
            // gameBoard2dArray[$(this).attr("row")][$(this).attr("column")] = $(this).attr("value");
            //push current coordinates into array and the coordinates of the square above
            searchExtender = 2;
            for (currentPosition = columnClicked + 1; currentPosition <= 7; currentPosition++) {
                if (gameBoard2dArray[rowClicked][columnClicked + searchExtender] === "not-clicked") {
                    return;
                }
                if (gameBoard2dArray[rowClicked][columnClicked + searchExtender] === "black") {
                    console.log('this is a valid spot');
                    return;
                }
                else {
                    searchExtender++;
                }
            }
        }
        if ( gameBoard2dArray[rowClicked][(columnClicked -1)] === "not-clicked" || gameBoard2dArray[rowClicked][columnClicked-1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            // coinFlipArray.push($(this));
            // console.log(this);
            // gameBoard2dArray[$(this).attr("row")][$(this).attr("column")] = $(this).attr("value");
            //push current coordinates into array and the coordinates of the square above
            searchExtender= 2;
            for(currentPosition = columnClicked -1; currentPosition >= 0; currentPosition--) {
                if (gameBoard2dArray[rowClicked][columnClicked - searchExtender] === "not-clicked") {
                    return;
                }
                if (gameBoard2dArray[rowClicked][columnClicked - searchExtender] === "black") {
                    console.log('this is a valid spot');
                    return;
                }
                else {
                    searchExtender++;
                }
            }
        }
    }

    function checkVertical(){
        var currentPosition;
        var searchExtender;
        if ( gameBoard2dArray[rowClicked+1][(columnClicked)] === "not-clicked" || gameBoard2dArray[rowClicked+1][columnClicked] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else {
            // gameBoard2dArray[$(this).attr("row")][$(this).attr("column")] = $(this).attr("value");
            //push current coordinates into array and the coordinates of the square above
            searchExtender = 2;
            for (currentPosition = rowClicked + 1; currentPosition <= 7; currentPosition++) {
                if (gameBoard2dArray[rowClicked + searchExtender][columnClicked] === "not-clicked") {
                    return;
                }
                if (gameBoard2dArray[rowClicked + searchExtender][columnClicked] === "black") {
                    console.log('this is a valid spot');
                    return;
                }
                else {
                    searchExtender++;
                }
            }
        }
        if ( gameBoard2dArray[rowClicked-1][(columnClicked)] === "not-clicked" || gameBoard2dArray[rowClicked-1][columnClicked] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            // gameBoard2dArray[$(this).attr("row")][$(this).attr("column")] = $(this).attr("value");
            //push current coordinates into array and the coordinates of the square above
            searchExtender= 2;
            for(currentPosition = columnClicked -1; currentPosition >= 0; currentPosition--){
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked] === "not-clicked"){
                    return;
                }
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked] === "black"){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    searchExtender++;
                }
            }
        }
    }
    function checkDiagonal(){
        var currentPosition;
        var searchExtender;
        // bottom right diagonal check
        // var greaterNumber needed to compare the greater of [rowClicked+1] and [(columnClicked+1)] to be used as currentPosition
        if ( gameBoard2dArray[rowClicked+1][(columnClicked+1)] === "not-clicked" || gameBoard2dArray[rowClicked+1][columnClicked+1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            var greaterNumber = Math.max(rowClicked, columnClicked);
            searchExtender= 2;
            for(currentPosition = greaterNumber +1; currentPosition <= 7; currentPosition++){
                if(gameBoard2dArray[rowClicked+searchExtender][columnClicked+searchExtender] === "not-clicked"){
                    return;
                }
                if(gameBoard2dArray[rowClicked+searchExtender][columnClicked+searchExtender] === "black"){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    searchExtender++;
                }
            }
        }
        // top right diagonal check
        // need a variable to see if row or column is closer to the edge, then pick that value for current position. (may require an additional loop)
        if ( gameBoard2dArray[rowClicked-1][(columnClicked+1)] === "not-clicked" || gameBoard2dArray[rowClicked-1][columnClicked+1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            searchExtender= 2;
            for(currentPosition = columnClicked +1; currentPosition <= 7; currentPosition++){
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked+searchExtender] === "not-clicked"){
                    return;
                }
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked+searchExtender] === "black"){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    searchExtender++;
                }
            }
        }
        // top left diagonal check
        // Var lesserNumber needed to compare the lesser of [rowClicked-1] and [(columnClicked-1)] to be used as currentPosition
        if ( gameBoard2dArray[rowClicked-1][(columnClicked-1)] === "not-clicked" || gameBoard2dArray[rowClicked-1][columnClicked-1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            var lesserNumber = Math.min(rowClicked, columnClicked);
            searchExtender= 2;
            for(currentPosition = lesserNumber -1; currentPosition >= 0; currentPosition--){
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked-searchExtender] === "not-clicked"){
                    return;
                }
                if(gameBoard2dArray[rowClicked-searchExtender][columnClicked-searchExtender] === "black"){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    searchExtender++;
                }
            }
        }
        // bottom left diagonal check
        // need a variable to see if row or column is closer to the edge, then pick that value for current position. (may require an additional loop)
        if ( gameBoard2dArray[rowClicked+1][(columnClicked-1)] === "not-clicked" || gameBoard2dArray[rowClicked+1][columnClicked-1] === playerWithCurrentTurn){
            console.log('not valid');
        }
        else{
            searchExtender= 2;
            for(currentPosition = columnClicked -1; currentPosition >= 0; currentPosition--){
                if(gameBoard2dArray[rowClicked+searchExtender][columnClicked-searchExtender] === "not-clicked"){
                    return;
                }
                if(gameBoard2dArray[rowClicked+searchExtender][columnClicked-searchExtender] === "black"){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    searchExtender++;
                }
            }
        }
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
    console.log(this);
}

//need function to tell which player clicked last



