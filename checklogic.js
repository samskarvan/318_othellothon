

function checkForValidEntry(){

    if (this.value=== undefined){
        var valueClicked = this;
        var rowClicked = $(this).attr('row');
        var columnClicked = $(this).attr('column');
        checkHorizontal(rowClicked,columnClicked);
        checkVertical(rowClicked,columnClicked);
        checkDiagonal(rowClicked,columnClicked);
    }else{
        return;
    }

    function checkHorizontal() {
        var i;
        var k;

        if ( gameBoard2dArr[rowClicked][columnClicked +1] === "blank" || gameboard2dArr[rowClicked][columnClicked+1].value === valueClicked){
            return;
        }
        else{
            k= 2;
            for(i = columnClicked +1; i <= 7; i++){
                if(gameBoard2dArr[rowClicked][columnClicked+k] === "blank"){
                    return;
                }
                if(gameBoard2dArr[rowClicked][columnClicked+k].value === valueClicked){
                    console.log('this is a valid spot');
                    return;
                }
                else{
                    k++;
                }
            }
            k= -2;
            for(i = columnClicked -1; i >= 0; i--){
                if(gameBoard2dArr[rowClicked][columnClicked-k] === "blank"){
                    return;
                }
                if(gameBoard2dArr[rowClicked][columnClicked-k].value === valueClicked){
                    //valid spot
                    return;
                }
                else{
                    k--;
                }
            }
        }
    }

    function checkVertical(){


    }

    function checkDiagonal(){


    }

}