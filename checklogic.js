

function checkForValidEntry(){

    if (this === undefined){
        checkHorizontal();
        checkVertical();
        checkDiagonal();
    }else{
        return;
    }

    function checkHorizontal(){
    for(var i = this[row][col]; i <=8; i++){

        if (this[row+1][col] === undefined){
            return;
        }
        else if (this[row][col]=== this.value){

        }
        else if (this[row+1][col] === this.value +1 || this.value -1){


        }
    }



    }

    function checkVertical(){


    }

    function checkDiagonal(){


    }

}