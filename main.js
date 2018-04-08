
$(document).ready(initializeApp);

function initializeApp(){
console.log("Hello, Kitty!");
createGameBoard(8,8);
middleSquares();
gameThemeMusic.play();
$(".reset").click(newGame);
$(".mute").click(muteMusic);

}

var playerWithCurrentTurn = "black";
var gameBoard2dArray = [];
var coinFlipArray = [];
var gamesPlayed = 0;

var coinFlipSound = new Audio();
coinFlipSound.src = 'assets/images/coinFlipSound.wav';
coinFlipSound.volume = .5;

var gameThemeMusic = new Audio();
gameThemeMusic.src = 'assets/images/othelloKittyThemeSong.mp3';
gameThemeMusic.volume = .2;
gameThemeMusic.onpause = function() {
    this.play();
};

$("html").append(coinFlipSound, gameThemeMusic);

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
        $("span.games-played").text(gamesPlayed);
    }

}



function flipCoins(array) {
    var coinsToBeFlippedIndex = 0;
        while (coinsToBeFlippedIndex < array.length) {
            if (playerWithCurrentTurn === "black") {
                $(array[coinsToBeFlippedIndex]).addClass("black").removeClass("white").attr('value', playerWithCurrentTurn);
            } else {
                $(array[coinsToBeFlippedIndex]).addClass("white").removeClass("black").attr('value', playerWithCurrentTurn);
            }
            var columnIndex = $(array[coinsToBeFlippedIndex]).attr('column');
            var rowIndex = $(array[coinsToBeFlippedIndex]).attr('row');
            gameBoard2dArray[rowIndex][columnIndex] = playerWithCurrentTurn;
            coinsToBeFlippedIndex++;
        }
        if (coinFlipArray[0] !== undefined) {
            if (playerWithCurrentTurn === "black") {
                playerWithCurrentTurn = "white";
                $('.turn-indicator img').attr('src', 'assets/images/kitty-coin.gif');
            } else {
                playerWithCurrentTurn = "black";
                $('.turn-indicator img').attr('src', 'assets/images/choco-coin.gif');
            }
            changeGameScore();
            coinFlipSound.play();
        }
}

function checkForValidEntry(){
    var holdTheOb = this;
    if ($(this).attr('value') === "not-clicked"){
        var valueClicked = $(this).attr('value');
        var rowClicked = parseInt($(this).attr('row'));
        var columnClicked = parseInt($(this).attr('column'));
        checkHorizontal(rowClicked,columnClicked);
        checkVertical(rowClicked,columnClicked);
        checkDiagonal(rowClicked,columnClicked);
        flipCoins(coinFlipArray);
        coinFlipArray = [];
    }else{
        return;
    }
    function checkHorizontal() {
        var currentPosition;
        var searchExtender;
        // Right Horizontal Check
        if (columnClicked + 1 <= 7) {
            if (gameBoard2dArray[rowClicked][(columnClicked + 1)] === "not-clicked" ||
                gameBoard2dArray[rowClicked][columnClicked + 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + rowClicked + "][column=" + (columnClicked + 1) + "]")[0]);
                searchExtender = 2;
                for (currentPosition = columnClicked + 1; currentPosition <= 7; currentPosition++) {
                    if (gameBoard2dArray[columnClicked + searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked][columnClicked + searchExtender] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked][columnClicked + searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + rowClicked + "][column=" + (columnClicked + searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
        // Left Horizontal Check
        if (columnClicked - 1 >= 0) {
            if (gameBoard2dArray[rowClicked][(columnClicked - 1)] === "not-clicked" ||
                gameBoard2dArray[rowClicked][columnClicked - 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + rowClicked + "][column=" + (columnClicked - 1) + "]")[0]);
                searchExtender = 2;
                for (currentPosition = columnClicked - 1; currentPosition >= 0; currentPosition--) {
                    if (gameBoard2dArray[columnClicked - searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked][columnClicked - searchExtender] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked][columnClicked - searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + rowClicked + "][column=" + (columnClicked - searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
    }
    function checkVertical(){
        var currentPosition;
        var searchExtender;
        // Bottom Vertical Check
        if (rowClicked+1 <= 7) {
            if (gameBoard2dArray[rowClicked + 1][(columnClicked)] === "not-clicked" ||
                gameBoard2dArray[rowClicked + 1][columnClicked] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked + 1) + "][column=" + columnClicked + "]")[0]);
                searchExtender = 2;
                for (currentPosition = rowClicked + 1; currentPosition <= 7; currentPosition++) {
                    if (gameBoard2dArray[rowClicked + searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked + searchExtender][columnClicked] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked + searchExtender][columnClicked] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked + searchExtender) + "][column=" + columnClicked + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
        // Top Vertical Check
        if((rowClicked - 1) >= 0) {
            if (gameBoard2dArray[rowClicked - 1][(columnClicked)] === "not-clicked" ||
                gameBoard2dArray[rowClicked - 1][columnClicked] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked - 1) + "][column=" + columnClicked + "]")[0]);
                searchExtender = 2;
                for (currentPosition = columnClicked - 1; currentPosition >= 0; currentPosition--) {
                    if (gameBoard2dArray[rowClicked - searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked - searchExtender][columnClicked] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked - searchExtender][columnClicked] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked - searchExtender) + "][column=" + columnClicked + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
    }
    function checkDiagonal(){
        var currentPosition;
        var currentPosition2;
        var searchExtender;

        // bottom right diagonal check
        if(columnClicked + 1 <= 7 && rowClicked+1 <=7) {
            if (gameBoard2dArray[rowClicked + 1][columnClicked + 1] === "not-clicked" ||
                gameBoard2dArray[rowClicked + 1][columnClicked + 1] === undefined ||
                gameBoard2dArray[rowClicked + 1][columnClicked + 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked + 1) + "][column=" + (columnClicked + 1) + "]")[0]);
                var greaterNumber = Math.max(rowClicked, columnClicked);
                searchExtender = 2;
                for (currentPosition = greaterNumber + 1; currentPosition <= 7; currentPosition++) {
              
                    if (gameBoard2dArray[rowClicked + searchExtender] === undefined ||
                        gameBoard2dArray[columnClicked + searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked + searchExtender][columnClicked + searchExtender] === "not-clicked" ) {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked + searchExtender][columnClicked + searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked + searchExtender) + "][column=" + (columnClicked + searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
        // top right diagonal check
        if( rowClicked - 1 >= 0 && columnClicked+1 <=7) {
            if (gameBoard2dArray[rowClicked - 1][columnClicked + 1] === undefined ||
                gameBoard2dArray[rowClicked - 1][columnClicked + 1] === "not-clicked" ||
                gameBoard2dArray[rowClicked - 1][columnClicked + 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked - 1) + "][column=" + (columnClicked + 1) + "]")[0]);
                searchExtender = 2;
                for (currentPosition = columnClicked + 1, currentPosition2 = rowClicked - 1; currentPosition <= 7 && currentPosition2 >= 0; currentPosition++, currentPosition2--) {
                    if (gameBoard2dArray[rowClicked - searchExtender] === undefined ||
                        gameBoard2dArray[columnClicked + searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked - searchExtender][columnClicked + searchExtender] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked - searchExtender][columnClicked + searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked - searchExtender) + "][column=" + (columnClicked + searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
        // top left diagonal check
        if(columnClicked - 1 >= 0 && rowClicked - 1  >= 0 ) {
            if (gameBoard2dArray[rowClicked - 1][columnClicked - 1] === undefined ||
                gameBoard2dArray[rowClicked - 1][columnClicked - 1] === "not-clicked" ||
                gameBoard2dArray[rowClicked - 1][columnClicked - 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked - 1) + "][column=" + (columnClicked - 1) + "]")[0]);
                var lesserNumber = Math.min(rowClicked, columnClicked);
                searchExtender = 2;
                for (currentPosition = lesserNumber - 1; currentPosition >= 0; currentPosition--) {
                    if (gameBoard2dArray[rowClicked - searchExtender] === undefined ||
                        gameBoard2dArray[columnClicked - searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked - searchExtender][columnClicked - searchExtender] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked - searchExtender][columnClicked - searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked - searchExtender) + "][column=" + (columnClicked - searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
        // bottom left diagonal check
        if(columnClicked - 1 >= 0 && rowClicked + 1 <= 7) {
            if (gameBoard2dArray[rowClicked + 1][columnClicked - 1] === undefined ||
                gameBoard2dArray[rowClicked + 1][columnClicked - 1] === "not-clicked" ||
                gameBoard2dArray[rowClicked + 1][columnClicked - 1] === playerWithCurrentTurn) {
                console.log('not valid');
            }
            else {
                coinFlipArray.push(holdTheOb);
                coinFlipArray.push($("[row=" + (rowClicked + 1) + "][column=" + (columnClicked - 1) + "]")[0]);
                searchExtender = 2;
                for (currentPosition = columnClicked - 1, currentPosition2 = rowClicked + 1; currentPosition >= 0 && currentPosition2 <= 7; currentPosition--, currentPosition2++) {
                    if (gameBoard2dArray[rowClicked + searchExtender] === undefined ||
                        gameBoard2dArray[columnClicked - searchExtender] === undefined ||
                        gameBoard2dArray[rowClicked + searchExtender][columnClicked - searchExtender] === "not-clicked") {
                        coinFlipArray.splice(coinFlipArray.length - searchExtender, searchExtender);
                        break;
                    }
                    if (gameBoard2dArray[rowClicked + searchExtender][columnClicked - searchExtender] === playerWithCurrentTurn) {
                        console.log('this is a valid spot');
                        break;
                    }
                    else {
                        coinFlipArray.push($("[row=" + (rowClicked + searchExtender) + "][column=" + (columnClicked - searchExtender) + "]")[0]);
                        searchExtender++;
                    }
                }
            }
        }
    }
}

function middleSquares() {
    pieceClassArray = [ "white", "black"];
    $( "[row=3][column=3]" ).addClass(pieceClassArray[0]).addClass("originalSquare").attr("value","white");
    gameBoard2dArray[3][3] = "white";
    $( "[row=3][column=4]" ).addClass(pieceClassArray[1]).addClass("originalSquare").attr("value","black");
    gameBoard2dArray[3][4] = "black";
    $( "[row=4][column=3]" ).addClass(pieceClassArray[1]).addClass("originalSquare").attr("value","black");
    gameBoard2dArray[4][3] = "black";
    $( "[row=4][column=4]" ).addClass(pieceClassArray[0]).addClass("originalSquare").attr("value","white");
    gameBoard2dArray[4][4] = "white";
    //could add randomization later to order of starting chips
}

function newGame(){

    var blankSquaresArray = $(".square.front:not(.white,.black)");
    if (blankSquaresArray.length === 0) {
        gamesPlayed++;
    }

    gameBoard2dArray=[];
    var gameBoard = $("#game-area");
    gameBoard.empty();
    createGameBoard(8,8);
    middleSquares();
    $("span.games-played").text(gamesPlayed);
    $('.choco-cat-score').text(0);
    $('.kitty-cat-score').text(0);
}

function changeGameScore(){
    var chocoCoinArray = $('.black').toArray();
    var kittyCoinArray = $('.white').toArray();
    var kittyScore = kittyCoinArray.length;
    var chocoScore = chocoCoinArray.length;
    $('.choco-cat-score').text(chocoScore);
    $('.kitty-cat-score').text(kittyScore);
    winGame(chocoScore,kittyScore);
}

function winGame(chocoScore,kittyScore){
    if(chocoScore+kittyScore==64){
        //game over modal.show(); on click of the modal reset game button, call newGame function
    }else{
        return;
    }
}

function muteMusic() {
    var mute = "https://cdn0.iconfinder.com/data/icons/forgen-audio-video/48/mute-512.png";
    var play = "https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-2/128/volume-512.png";
    if (gameThemeMusic.muted === true) {
        gameThemeMusic.muted = false;
        coinFlipSound.muted = false;
        $("button img")[0].src = play;
    } else {
        gameThemeMusic.muted = true;
        coinFlipSound.muted = true;
        $("button img")[0].src = mute;
    }
}


