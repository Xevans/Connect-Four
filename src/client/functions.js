//for all functions that do generic stuff
function drawRoundedRect(x, y, w, h, r, fillColor, strokeColor, lineWidth){
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    if(fillColor!=-1){
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if(strokeColor!=-1){
        if(typeof lineWidth != "undefined") ctx.lineWidth = lineWidth;
        else ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }

}

function clamp(value, lower, upper){
    return Math.max(lower, Math.min(upper, value))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}



function resize() {
    //may use this later for dynamtic size of game screen to fit different sized screens

    // var dpr = window.devicePixelRatio;

    // // Get browser's x/y scaling
    // var xScale = window.innerWidth * dpr / defaultWidth;
    // var yScale = window.innerHeight * dpr / defaultHeight;

    // // Round down to 2 decimal places (e.g. 2.73)
    // xScale = Math.floor(xScale * 100) / 100;
    // yScale = Math.floor(yScale * 100) / 100;

    // // Select the lowest scale
    // desiredScale = Math.min(xScale, yScale);

    // // Set the canvas width and height, taking pixel ratio into account
    // canvas.width = window.innerWidth * dpr;
    // canvas.height = window.innerHeight * dpr;

    // // Scale the canvas using our chosen scale
    // ctx.setTransform(desiredScale, 0, 0, desiredScale, 0, 0);

    // // Don't forget to turn off image smoothing
    // ctx.imageSmoothingEnabled = false;

    // currentWidth = canvas.width/desiredScale;
    // currentHeight = canvas.height/desiredScale;

    //center canvas on screen
    //ctx.translate(currentWidth / 2 - defaultWidth / 2, 0);
}

function checkForHover(){
    for (var i = 0; i < connect4.rack.columns; i++) {
        if (connect4.mouse.x > connect4.pieces[i][0].x - connect4.pieces[i][0].r && connect4.mouse.x < connect4.pieces[i][0].x + connect4.pieces[i][0].r) {
            for (var j = 0; j < connect4.rack.rows; j++) {
                if (j + 1 >= connect4.rack.rows || connect4.pieces[i][j + 1].color != "black") {
                    if (connect4.pieces[i][j].color == "black") {
                        connect4.pieces[i][j].hovered = true;
                        break;
                    }

                }
            }
        }
    }
}

function nextPlayersTurn(){
    if (connect4.currentPlayerTurn == 1) connect4.currentPlayerTurn = 2;
    else connect4.currentPlayerTurn = 1;
}


function checkIfRackFull(){
    for (var i = 0; i < connect4.rack.columns; i++) {
        if (connect4.pieces[i][0].color == "black"){
            return false;
        }
    }
    gameEnd();
    return true;
}

function gameEnd(){
    //pause game until button is pressed for new game
    connect4.gameEnd = true;
}

function newGame(){
    //basically reset all values except score
    connect4.gameEnd= false;
    paused= false;
    connect4.winner= 0;
    currentPlayerTurn= 1;
    for (var i = 0; i < connect4.rack.columns; i++) {
        for (var j = 0; j < connect4.rack.rows; j++) {
            connect4.pieces[i][j].reset();
        }
    }
    connect4.restartButton.reset();

}

function checkWinner(currentCol, currentRow, shouldHighlight){
    //xavier's code here
    if (checkHorizontal(currentCol, currentRow, shouldHighlight)) return true
    else if (checkVertical(currentCol, currentRow, shouldHighlight)) return true
    else if (checkPositiveSlope(currentCol, currentRow, shouldHighlight)) return true
    else if (checkNegativeSlope(currentCol, currentRow, shouldHighlight)) return true

    return false
}

function setWinnerAddScoreAndEndGame(){
    connect4.winner = connect4.currentPlayerTurn;
    if (connect4.winner == 1) {
        connect4.scores.player1++;
        gameEnd();
    }
    else if (connect4.winner == 2) {
        connect4.scores.player2++;
        gameEnd();
    }
}

function checkHorizontal(currentCol, currentRow, shouldHighlight){

    var count = 0;
    for(var i=0; i<connect4.rack.columns; i++){
        if (connect4.pieces[i][currentRow].color == connect4.pieces[currentCol][currentRow].color){
            count++;
        }
        else count = 0;
        if (count == 4) {
            if (shouldHighlight) {
                for (var j = i; j > i - 4; j--) {
                    connect4.pieces[j][currentRow].highlightWinner();
                }
            }
            return true
        }
    }
    return false;
}

function checkVertical(currentCol, currentRow, shouldHighlight){
    var count = 0;
    for (var i = 0; i < connect4.rack.rows; i++) {
        if (connect4.pieces[currentCol][i].color == connect4.pieces[currentCol][currentRow].color) {
            count++;
        }
        else count = 0;
        if (count == 4) {
            if (shouldHighlight) {
                for (var j = i; j > i - 4; j--) {
                    connect4.pieces[currentCol][j].highlightWinner();
                }
            }
            return true
        }
    }
    return false;
}

function checkPositiveSlope(currentCol, currentRow, shouldHighlight) {
    var count = 0;
    var startingCol = currentCol;
    var startingRow = currentRow;

    while (startingCol - 1 >= 0 && startingRow + 1 < connect4.rack.rows){
        startingCol--;
        startingRow++;
    }
    for (var i = startingCol, j = startingRow; i < connect4.rack.columns && j >= 0; i++, j--) {
        if (connect4.pieces[i][j].color == connect4.pieces[currentCol][currentRow].color) {
            count++;
        }
        else count = 0;
        if (count == 4) {
            if (shouldHighlight) {
                for (var k = i, l = j; k > i - 4 && l < j + 4; k--, l++) {
                    connect4.pieces[k][l].highlightWinner();
                }
            }
            return true
        }
    }
    return false;
}

function checkNegativeSlope(currentCol, currentRow, shouldHighlight) {
    var count = 0;
    var startingCol = currentCol;
    var startingRow = currentRow;

    while (startingCol - 1 >= 0 && startingRow - 1 >= 0) {
        startingCol--;
        startingRow--;
    }
    for (var i = startingCol, j = startingRow; i < connect4.rack.columns && j < connect4.rack.rows; i++, j++) {
        if (connect4.pieces[i][j].color == connect4.pieces[currentCol][currentRow].color) {
            count++;
        }
        else count = 0;
        if (count == 4) {
            if (shouldHighlight){
                for (var k = i, l = j; k > i - 4 && l > j - 4; k--, l--) {
                    connect4.pieces[k][l].highlightWinner();
                }
            }
            return true
        }
    }
    return false;
}


function changeAI(){
    connect4.ai = !connect4.ai;
    if (connect4.ai) connect4.aiButton.text = "Change AI to Player 2";
    else connect4.aiButton.text = "Change Player 2 to AI";
    
}

function endOfTurn(indexCol, indexRow){
    if (checkWinner(indexCol, indexRow, true)) setWinnerAddScoreAndEndGame();
    checkIfRackFull();
    //only change turns if next turn as able to be played. game will pause otherwise
    if (!connect4.gameEnd) nextPlayersTurn();
}

function aiTakeTurn(){
    console.log("ai start move")
    //this is for easy ai
    var tempCol = 0;
    var tempRow = 0;

    //check all possible moves and put into a list
    var possibleMoves = [];
    for(var i=0; i<connect4.rack.columns; i++){
        if(connect4.pieces[i][0].color == "black"){
            var tempRow = 0;
            for (var j = 0; j < connect4.rack.rows; j++) {
                if (connect4.pieces[i][j].color == "black") {
                    tempRow = j;
                }
            }
            possibleMoves.push([i, tempRow]);
        } 
    }

    //if any possible moves = win then do that move
    for (var i = 0; i < possibleMoves.length; i++) {
        tempCol = possibleMoves[i][0];
        tempRow = possibleMoves[i][1];
        connect4.pieces[tempCol][tempRow].color = "yellow"
        if (checkWinner(tempCol, tempRow, false)) {
            console.log(tempCol, tempRow, "winning move")
            endOfTurn(tempCol, tempRow);
            return;
        }
        else connect4.pieces[tempCol][tempRow].color = "black"
    }

    //if any possible moves should be blocked so other player doesnt win next turn
    for (var i = 0; i < possibleMoves.length; i++) {
        tempCol = possibleMoves[i][0];
        tempRow = possibleMoves[i][1];
        connect4.pieces[tempCol][tempRow].color = "red"
        if (checkWinner(tempCol, tempRow, false)) {
            connect4.pieces[tempCol][tempRow].color = "yellow"
            console.log(tempCol, tempRow, "block red from winning next move")
            endOfTurn(tempCol, tempRow);
            return;
        }
        else connect4.pieces[tempCol][tempRow].color = "black"
    }

    //if any possible moves would make player win next turn if they place on spot just above then try not to place in this spot
    for (var i = 0; i < possibleMoves.length && possibleMoves.length > 1; i++) {
        tempCol = possibleMoves[i][0];
        tempRow = possibleMoves[i][1];
        if (tempRow-1>=0){
            connect4.pieces[tempCol][tempRow - 1].color = "red"
            console.log(tempCol, tempRow - 1 )
            if (checkWinner(tempCol, tempRow - 1, false)) {
                console.log(possibleMoves, i, "possible move would make player win next turn")
                possibleMoves.splice(i, 1);
                i--;
            }
            connect4.pieces[tempCol][tempRow - 1].color = "black"
        }
        
    }

    //if any possible moves would make ai win next turn if they place on spot just above then try not to place in this spot
    for (var i = 0; i < possibleMoves.length && possibleMoves.length > 1; i++) {
        tempCol = possibleMoves[i][0];
        tempRow = possibleMoves[i][1];
        if (tempRow - 1 >= 0){
            connect4.pieces[tempCol][tempRow - 1].color = "yellow"
            if (checkWinner(tempCol, tempRow - 1, false)) {
                console.log(possibleMoves, i, "possible move would make ai win next turn if they place on spot just above")
                possibleMoves.splice(i, 1);
                i--;
            }
            connect4.pieces[tempCol][tempRow - 1].color = "black"
        }
        
    }

    //if any possible next moves allow for 3 in a row horitonal with open right and left sides for player next turn then pick this turn to block that
    for (var i = 0; i < possibleMoves.length && possibleMoves.length > 1; i++) {
        tempCol = possibleMoves[i][0];
        tempRow = possibleMoves[i][1];
        //open, self, red, red, open
        if(tempCol>=1 && tempCol<=3){
            if (connect4.pieces[tempCol - 1][tempRow].color == "black" && connect4.pieces[tempCol + 1][tempRow].color == "red" &&
            connect4.pieces[tempCol + 2][tempRow].color == "red" && connect4.pieces[tempCol + 3][tempRow].color == "black"){
                connect4.pieces[tempCol][tempRow].color = "yellow";
                console.log(tempCol, tempRow, "possible next moves block 3 in a row horitonal", "open, self, red, red, open")
                endOfTurn(tempCol, tempRow);
                return;
            }
        }
        //open, red, red, self, open
        if (tempCol >= 3 && tempCol <= 5) {
            if (connect4.pieces[tempCol - 3][tempRow].color == "black" && connect4.pieces[tempCol - 2][tempRow].color == "red" &&
            connect4.pieces[tempCol - 1][tempRow].color == "red" && connect4.pieces[tempCol + 1][tempRow].color == "black") {
                connect4.pieces[tempCol][tempRow].color = "yellow";
                console.log(tempCol, tempRow, "possible next moves block 3 in a row horitonal", "open, red, red, self, open")
                endOfTurn(tempCol, tempRow);
                return;
            }
        }
        //open, red, self, red, open
        if (tempCol >= 2 && tempCol <= 4) {
            if (connect4.pieces[tempCol - 2][tempRow].color == "black" && connect4.pieces[tempCol - 1][tempRow].color == "red" &&
            connect4.pieces[tempCol + 1][tempRow].color == "red" && connect4.pieces[tempCol + 2][tempRow].color == "black") {
                connect4.pieces[tempCol][tempRow].color = "yellow";
                console.log(tempCol, tempRow, "possible next moves block 3 in a row horitonal", "open, red, self, red, open")
                endOfTurn(tempCol, tempRow);
                return;
            }
        }

    }


    //otherwise pick random move
    var randomIndex = getRandomIntInclusive(0, possibleMoves.length-1);
    connect4.pieces[possibleMoves[randomIndex][0]][possibleMoves[randomIndex][1]].color = "yellow"
    endOfTurn(possibleMoves[randomIndex][0], possibleMoves[randomIndex][1]);
}