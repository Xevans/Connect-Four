//main js file that has all global variables and main couple functions that are looped
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var desiredScale;

resize();



var connect4 = {
    gameEnd: false,
    paused: false,
    winner: 0,
    rack: {
        x: 0,
        y: 0,
        width: 1050,
        height: 910,
        columns: 7,
        rows: 6,
        cornerRadius: 50,
        fillColor: "rgb(50,0,255)",
        strokeColor: "rgb(0,0,0)",
        strokeWeight: 2
    },
    currentPlayerTurn: 1,
    scores: {
        player1: 0,
        player2: 0    
    },
    pieces: [],
    mouse: {
        x: 0,
        y: 0
    },
    restartButton: 0,
    keyDown: {
        ctrl: false,
        shift: false,
        enter: false,
        leftArrow: false,
        rightArrow: false,
        upArrow: false,
        downArrow: false
    }
}
//make all pieces
connect4.pieces = Array.from(Array(connect4.rack.columns), () => new Array(connect4.rack.rows));
for (var i = 0; i < connect4.rack.columns; i++) {
    for (var j = 0; j < connect4.rack.rows; j++) {
        connect4.pieces[i][j] = new Piece(i, j);
    }
}
//make restartbutton
connect4.restartButton = new RectangleRoundedButton(connect4.rack.x + connect4.rack.width + 50, connect4.rack.height / 2, 500, 200, 20, newGame(), "gray", "black", 2, "Restart Game", "black", "50px Arial")


function startGame(){

    //set time per gameupdate in ms
    setInterval(gameUpdate, 17);


}


function gameUpdate() {
    if (!connect4.paused && !connect4.gameEnd) {
        checkForHover();
    }
    connect4.restartButton.update();

    draw();
}
function draw() {
    //clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //draw board
    ctx.globalAlpha = 1;
    drawRoundedRect(connect4.rack.x, connect4.rack.y, connect4.rack.width, connect4.rack.height, connect4.rack.cornerRadius, connect4.rack.fillColor, connect4.rack.strokeColor, connect4.rack.strokeWeight);

    //draw pieces
    for (var i = 0; i < connect4.rack.columns; i++) {
        for (var j = 0; j < connect4.rack.rows; j++) {
            connect4.pieces[i][j].draw();
        }
    }


    //draw score
    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Player 1's Score: " + connect4.scores.player1, connect4.rack.x + connect4.rack.width + 20, 100);
    ctx.fillText("Player 2's Score: " + connect4.scores.player2, connect4.rack.x + connect4.rack.width + 20, 200);

    //text at bottom of board
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.font = "100px Arial";
    ctx.fillStyle = "black";
    var tempText = {
        x: connect4.rack.x + (connect4.rack.width / 2),
        y: connect4.rack.y + connect4.rack.height + 100,
        //draw who's turn it is
        text: "Player " + connect4.currentPlayerTurn + "'s Turn"
    }
    if(connect4.gameEnd){
        //if game ended instead say its a tie or who wins
        if (connect4.winner == 0) tempText.text = "Its a tie!";
        else tempText.text = "Player " + connect4.winner + " wins!"
    }
    else if (connect4.paused) tempText.text = "Game Paused"
    ctx.fillText(tempText.text, tempText.x, tempText.y);

    //draw play again button if game ended
    connect4.restartButton.draw();
}


startGame();
