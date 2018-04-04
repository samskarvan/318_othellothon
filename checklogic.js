

function checkForValidEntry(){

    if (this === undefined){
        checkHorizontal();
        checkVertical();
        checkDiagonal();
    }else{
        return;
    }

    function checkHorizontal() {
        var i;
        var k;

        if (this.row+1 === undefined || this.row+1 === this.row+1){
            return;
        }
        else{
            k= 2;
            for(i = this.row +1; i <= 8; i++){
                if(this.row +k === undefined){
                    return;
                }
                if(this.row +k === this.row){
                    //valid spot
                }
                else{
                    k++;
                }
            }
            k= -2;
            for(i = this.row -1; i >= 1; i--){
                if(this.row -k === undefined){
                    return;
                }
                if(this.row -k === this.row){
                    //valid spot
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