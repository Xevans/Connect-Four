//mostly everything here is from a different game i made of sudoku. we will change this to fix our needs later
//window.addEventListener('resize', resize);

document.addEventListener("mousemove", function(e) {
    //var oldMouse = {x:mouse.x, y:mouse.y};
    var cRect = canvas.getBoundingClientRect();
    scaleX = canvas.width / cRect.width;
    scaleY = canvas.height / cRect.height;
    //var mouse = { x: 0, y: 0 };
    mouse.x = Math.floor((e.clientX - cRect.left) * scaleX);
    mouse.y = Math.floor((e.clientY - cRect.top) * scaleY);
   // mouse.x = Math.floor(mouse.screenPos.x*((canvas.width/desiredScale)/window.innerWidth));
    //mouse.y = Math.floor(mouse.screenPos.y*((canvas.height/desiredScale)/window.innerHeight));
    // if(isSelecting){
    //     selecting(oldMouse);
    // }
    
    
});


document.addEventListener("mousedown", function(e) {
    //left mouse button
    if(e.which==1){
        //var oldMouse = {x:mouse.x, y:mouse.y};
        var cRect = canvas.getBoundingClientRect();
        scaleX = canvas.width / cRect.width;
        scaleY = canvas.height / cRect.height;
        var mouse = { x: 0, y: 0 };
        mouse.x = Math.floor((e.clientX - cRect.left) * scaleX);
        mouse.y = Math.floor((e.clientY - cRect.top) * scaleY);
        // mouse.x = Math.floor(mouse.screenPos.x*((canvas.width/desiredScale)/window.innerWidth));
        //mouse.y = Math.floor(mouse.screenPos.y*((canvas.height/desiredScale)/window.innerHeight));
        // if(isSelecting){
        //     selecting(oldMouse);
        // }

        var tempWidth = pieces[0].r;
        for (var i = 0; i < pieces.length; i += 6) {
            if (mouse.x > pieces[i].x - tempWidth && mouse.x < pieces[i].x + tempWidth) {
                //pieces[i].hovered = true;
                for (var j = i; j < i + 6; j++) {
                    if (j + 1 >= i + 6 || pieces[j + 1].color != "black") {
                        pieces[j].changeColor("red");
                        break;
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

/*
main.js
    global variables/startup of program
        init canvas
        init ctx which allows us to draw and do stuff to canvas
        init
        assign player 1 as red and player 2 as yellow
        display initialized game board(empty connect four grid)

    Gameloop
        determine which piece is hovered
        call draw

    draw
        clear canvas
        draw board
        loop through pieces and call its draw function
        draw who's turn it is
        draw instuctions if needed


    newGame
        win_status = false
        full_status = false
        init token_count to 0
        loop through pieces and set to default values
        make it p1's turn

eventlisteners.js
    mousemove
        update mouse.x and mouse.y values

    mousedown
        update mouse.x and mouse.y values
        place piece if in valid spot


functions.js
    drawRoundedRect(x, y, width, height, radius, fillColor, strokeColor, lineWidth)
        if fillColor = -1 then dont fill
        if strokeColor = -1 then dont draw stroke
    
    clamp(value, lower, upper)
        clamps the value to be between lower and upper

    resize
        does nothing for now

objects.js
    Piece


checkwinner
    horizontal checks
    for(i=indexI-3; i<=indexI; i++){
        for(j=i; j<i+4; j++){

        }

    }

    di check
    for(i=indexI-3, j=indexJ+3; i<=indexI && j>=indexJ; i++, j--){
        for(k=i, l=j; k<i+4 && l>j-4; k++, j--){

        }

    }


    

    - prompt player to choose a column
        - update grid to reflect player choice
            - disply grid
                - determine if there is a winner
                    - if win_status is true -> break
- check if grid is full
    - if full_status is true -> break
- player two makes their choice
    - update grid
        - display grid
            - determine if there is a winner
                - if win_status is true -> break
- check if grid is full
    - if full_status is true -> break

- if win_status is true
    - display the winner with a message: (Player X wins!)

- if full_status is true
    - display message: (No more moves!)

- prompt player to play again.
    - if player choses to quit, end the program
    - if player chooses to continue
- empty the grid
    - flip win_status
        - flip full_status
            - init token_count to 0
                - loop
*/
