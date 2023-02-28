//main js file that has all global variables and main couple functions that are looped
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var defaultWidth = 1050;
var defaultHeight = 910;
var currentWidth = 1050;
var currentHeight = 910;
var desiredScale;

resize();


var pieces = [];
var totalRows = 6;
var totalColumns = 7;
for (var i = 0; i < totalColumns; i++){
    for (var j = 0; j < totalRows; j++){
        pieces.push(new Piece(pieces.length, i, j));
    }
}

var mouse = {
    x:0,
    y:0
}

var keyDown = {
    ctrl: false,
    shift: false,
    enter: false,
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false
}


function startGame(){

    //set time per gameupdate in ms
    setInterval(gameUpdate, 17);


}

function gameUpdate() {

    if(keyDown.leftArrow){
        moveSelect("left");
        keyDown.leftArrow = false;
    } else if(keyDown.upArrow){
        moveSelect("up");
        keyDown.upArrow = false;
    } else if(keyDown.rightArrow){
        moveSelect("right");
        keyDown.rightArrow = false;
    } else if(keyDown.downArrow){
        moveSelect("down");
        keyDown.downArrow = false;
    }

    for (var i = 0; i < pieces.length; i += 6) {
        if (mouse.x > pieces[i].x - pieces[i].r && mouse.x < pieces[i].x + pieces[i].r) {
            for (var j = i; j < i + 6; j++) {
                if (j + 1 >= i + 6 || pieces[j + 1].color != "black") {
                    if (pieces[j].color == "black"){
                        pieces[j].hovered = true;
                        break;
                    }
                    
                }
            }
        }
    }

    draw();
}
function draw() {
    //clear canvas
    ctx.clearRect(0, 0, currentWidth, currentHeight);

    //draw board
    ctx.fillStyle = "rgb(50,0,255)";
    ctx.globalAlpha = 1;
    drawRoundedRect(0, 0, currentWidth, currentHeight, 50, "rgb(50,0,255)", "rgb(0,0,0)", 2)

    //draw pieces
    for (var i = 0; i < pieces.length; i++) {
        pieces[i].draw();
    }

}


startGame();
