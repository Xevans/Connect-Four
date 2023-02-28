//mostly everything here is from a different game i made of sudoku. we will change this to fix our needs later
//window.addEventListener('resize', resize);

// document.addEventListener("mousemove", function(e) {
//     var oldMouse = {x:mouse.x, y:mouse.y};
//     var cRect = canvas.getBoundingClientRect();
//     mouse.screenPos.x = Math.floor(e.pageX - cRect.left);
//     mouse.screenPos.y = Math.floor(e.pageY - cRect.top);
//     mouse.x = Math.floor(mouse.screenPos.x*((canvas.width/desiredScale)/window.innerWidth));
//     mouse.y = Math.floor(mouse.screenPos.y*((canvas.height/desiredScale)/window.innerHeight));
//     if(isSelecting){
//         selecting(oldMouse);
//     }
// });


// document.addEventListener("mousedown", function(e) {
//     //left mouse button
//     if(e.which==1){
//         var tempBool = false;
//         for(var i=0; i<buttons.length; i++){
//             if(buttons[i].pressCheck()) tempBool = true;
//         }
//         if(!keyDown.ctrl && !keyDown.macCtrl && !tempBool){
//             for(var i=0;i<tiles.length;i++){
//                 tiles[i].selected = false;
//             }
//         }
//         isSelecting = true;
//     }
// });

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

// $(document).on('keydown',function(e){
//   var $target = $(e.target||e.srcElement);
//   if(e.keyCode == 8 && !$target.is('input,[contenteditable="true"],textarea'))
//   {
//     e.preventDefault();
//   }
// })
