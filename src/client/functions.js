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

}

function checkWinner(){
    //xavier's code here


    if(connect4.winner==1) {
        connect4.scores.player1++;
        gameEnd();
    }
    else if (connect4.winner == 2) {
        connect4.scores.player2++;
        gameEnd();
    }
}
