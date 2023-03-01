//mostly everything here is from a different game i made of sudoku. we will change this to fix our needs later
//window.addEventListener('resize', resize);

document.addEventListener("mousemove", function(e) {
    var cRect = canvas.getBoundingClientRect();
    scaleX = canvas.width / cRect.width;
    scaleY = canvas.height / cRect.height;
    connect4.mouse.x = Math.floor((e.clientX - cRect.left) * scaleX);
    connect4.mouse.y = Math.floor((e.clientY - cRect.top) * scaleY);
});


document.addEventListener("mousedown", function(e) {
    //left mouse button
    if(e.which==1){

        if(!connect4.paused && !connect4.gameEnd){
            //place down piece
            var cRect = canvas.getBoundingClientRect();
            scaleX = canvas.width / cRect.width;
            scaleY = canvas.height / cRect.height;
            connect4.mouse.x = Math.floor((e.clientX - cRect.left) * scaleX);
            connect4.mouse.y = Math.floor((e.clientY - cRect.top) * scaleY);
            tempWidth = connect4.pieces[0][0].r;
            for (var i = 0; i < connect4.rack.columns; i++) {
                if (connect4.mouse.x > connect4.pieces[i][0].x - tempWidth && connect4.mouse.x < connect4.pieces[i][0].x + tempWidth) {
                    for (var j = 0; j < connect4.rack.rows; j++) {
                        if (j + 1 >= connect4.rack.rows || connect4.pieces[i][j + 1].color != "black") {
                            if (connect4.pieces[i][j].color == "black") {
                                if (connect4.currentPlayerTurn == 1) connect4.pieces[i][j].changeColor("red");
                                else connect4.pieces[i][j].changeColor("yellow");
                                checkWinner();
                                checkIfRackFull();
                                //only change turns if next turn as able to be played. game will pause otherwise
                                if (!connect4.gameEnd) nextPlayersTurn();
                                break;
                            }

                        }
                    }
                }
            }
        }
        
    }
    
});

// document.addEventListener("mouseup", function(e) {
//     //left mouse button
//     if(e.which==1){
//         var cRect = canvas.getBoundingClientRect();
//         selecting(mouse);
//         isSelecting = false;
//     }
// });

// document.addEventListener("keydown", function(e) {
//     if (e.keyCode === 37) keyDown.leftArrow = true;
//     if (e.keyCode === 39) keyDown.rightArrow = true;
//     if (e.keyCode === 38) keyDown.upArrow = true;
//     if (e.keyCode === 40) keyDown.downArrow = true;
//     if (e.keyCode === 17) keyDown.ctrl = true;
//     if (e.keyCode === 224) keyDown.macCtrl = true;
//     if (e.keyCode === 16) keyDown.shift = true;
//     if (e.keyCode === 13) keyDown.enter = true;

//     //backspace/delete
//     if (e.keyCode === 46 || e.keyCode == 8) changeHighlightedTiles("backSpace");

//     //for number keys
//     if (e.keyCode === 49 || e.keyCode == 97) changeHighlightedTiles("1");
//     else if (e.keyCode === 50 || e.keyCode == 98) changeHighlightedTiles("2");
//     else if (e.keyCode === 51 || e.keyCode == 99) changeHighlightedTiles("3");
//     else if (e.keyCode === 52 || e.keyCode == 100) changeHighlightedTiles("4");
//     else if (e.keyCode === 53 || e.keyCode == 101) changeHighlightedTiles("5");
//     else if (e.keyCode === 54 || e.keyCode == 102) changeHighlightedTiles("6");
//     else if (e.keyCode === 55 || e.keyCode == 103) changeHighlightedTiles("7");
//     else if (e.keyCode === 56 || e.keyCode == 104) changeHighlightedTiles("8");
//     else if (e.keyCode === 57 || e.keyCode == 105) changeHighlightedTiles("9");
//     else if (e.keyCode === 48 || e.keyCode == 96) changeHighlightedTiles("0");


// });

// document.addEventListener("keyup", function(e) {
//     if (e.keyCode === 37) keyDown.leftArrow = false;
//     if (e.keyCode === 39) keyDown.rightArrow = false;
//     if (e.keyCode === 38) keyDown.upArrow = false;
//     if (e.keyCode === 40) keyDown.downArrow = false;
//     if (e.keyCode === 17) keyDown.ctrl = false;
//     if (e.keyCode === 224) keyDown.macCtrl = false;
//     if (e.keyCode === 16) keyDown.shift = false;
//     if (e.keyCode === 13) keyDown.enter = false;


// });

