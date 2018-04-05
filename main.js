
$(document).ready(initializeApp);

function initializeApp(){
console.log("Hello, Kitty!");
createGameBoard(8,8);

}

var gameBoard2dArray = [];

function createGameBoard(columnAmount, rowAmount) {
    var gameBoard = $("#game-area");
    var rowCountFirst = 0;
    var rowCountBuild = 0;
    var columnCountBuild = 1;
    for(rowIterate = 0; rowIterate < columnAmount; rowIterate++) {
        var newFirstSquareOfRow = ($("<div>", {
            class: "square front white",
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
                class: "square",
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
var playerWithCurrentTurn="black";
var testingArray=gameBoard2dArray;
function flipCoins(gameBoard2Array){
    //since we don't have ai functionality, user will play for both teams, so default turn will be set to black
    //turn all values in the array to the value of the current turn - call flip function
    //change current player to white after flipping has occured (at end of function)
    var coinsToBeFlippedIndex=0;
    while(coinsToBeFlippedIndex<array.length){
        // array[coinsToBeFlippedIndex] flip animation--should divs start with all coin classes at different z indexs and then toggle higher/lower index classes on flip?
        array[coinsToBeFlippedIndex].toggleClass(playerWithCurrentTurn);//class of coin whose turn it is-white or black//);
        coinsToBeFlippedIndex++;
        if(playerWithCurrentTurn==="black"){
            playerWithCurrentTurn="white";
        }else{
            playerWithCurrentTurn="black";
        }
    }

}

// function testingClassToggle(){
//     var pieceClassArray=["white","black"];
//     testingArray.push($('[row=1][column=3]').addClass(pieceClassArray[0]).attr('value','white'));
//     testingArray.push($('[row=1][column=4]').addClass(pieceClassArray[1]).attr('value','black'));
//     testingArray.push($('[row=1][column=5]').addClass(pieceClassArray[0]).attr('value','white'));
//     testingArray.push($('[row=1][column=6]').addClass(pieceClassArray[1]).attr('value','black'));
// }

function determineWhichClassOfCoinDivsWillAdopt(){

}

// function middleSquares() {
//     $("div").attr("row","3");
// }



