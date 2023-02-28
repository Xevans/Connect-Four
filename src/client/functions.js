//for all functions that do generic stuff
function drawRoundedRect(x, y, w, h, r, fillColor, strokeColor, lineWidth){
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);//
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);//
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

function moveSelect(direction){
    var tileNum = 0;
    for(var i=0; i<tiles.length; i++){
        if(tiles[i].selected) {
            tiles[i].selected = false;
            tileNum = i;
        }
    }

    for(var i=0; i<tiles.length; i++){
        if(direction=="left"&&tiles[i].colNum==(tiles[tileNum].colNum-1+totalColumnTiles)%totalColumnTiles&&tiles[i].rowNum==tiles[tileNum].rowNum) {
            tiles[i].selected = true;
            break;
        } else if(direction=="up"&&tiles[i].colNum==tiles[tileNum].colNum&&tiles[i].rowNum==(tiles[tileNum].rowNum-1+totalRowTiles)%totalRowTiles) {
            tiles[i].selected = true;
            break;
        } else if(direction=="right"&&tiles[i].colNum==(tiles[tileNum].colNum+1+totalColumnTiles)%totalColumnTiles&&tiles[i].rowNum==tiles[tileNum].rowNum) {
            tiles[i].selected = true;
            break;
        } else if(direction=="down"&&tiles[i].colNum==tiles[tileNum].colNum&&tiles[i].rowNum==(tiles[tileNum].rowNum+1+totalRowTiles)%totalRowTiles) {
            tiles[i].selected = true;
            break;
        }

    }



}

function changeHighlightedTiles(num){
    if(num=="backSpace"){
        for(var i=0; i<tiles.length; i++){
            if(tiles[i].selected) tiles[i].backSpace();
        }
    } else if(tileMode=="big") {
        for(var i=0; i<tiles.length; i++){
            if(tiles[i].selected) tiles[i].mainNumber = num;
        }
    } else if(tileMode=="corner") {
        for(var i=0; i<tiles.length; i++){
            if(tiles[i].selected) tiles[i].addCornerNum(num);
        }
    } else if(tileMode=="center") {
        for(var i=0; i<tiles.length; i++){
            if(tiles[i].selected) tiles[i].addCenterNum(num);
        }
    } else if(tileMode=="color") {
        for(var i=0; i<tiles.length; i++){
            if(tiles[i].selected) tiles[i].color = numberToColor(num);
        }
    } else if(tileMode=="Draw Mode") {
        if(num=="1"){
            for(var i=0; i<tiles.length; i++){
                if(tiles[i].selected) {
                    shapes.push(new ThermoBulb(tiles[i].centerX, tiles[i].centerY, tiles[i].w/2-6, "rgb(125,125,125)"));
                }
            }
        } else if(num=="2"){
            var tempSelected = [];
            for(var i=0; i<tiles.length; i++){
                if(tiles[i].selected) {
                    tempSelected.push({x: tiles[i].centerX, y: tiles[i].centerY})
                    // shapes.push(new ThermoBulb(tiles[i].centerX, tiles[i].centerY, tiles[i].w/2-6, "rgb(125,125,125)"));
                }
            }
            if(tempSelected.length == 2){
                shapes.push(new ThermoChamber(tempSelected[0].x, tempSelected[0].y, tempSelected[1].x, tempSelected[1].y, "rgb(125,125,125)"));
            }
        }
    }
}

function numberToColor(num){
    if(num=="1") return "rgb(207, 207, 207)";
    else if(num=="2") return "rgb(95, 95, 95)";
    else if(num=="3") return "rgb(0, 0, 0)";
    else if(num=="4") return "rgb(163, 224, 72)";
    else if(num=="5") return "rgb(210, 59, 231)";
    else if(num=="6") return "rgb(235, 117, 50)";
    else if(num=="7") return "rgb(230, 38, 31)";
    else if(num=="8") return "rgb(247, 208, 56)";
    else if(num=="9") return "rgb(52, 187, 230)";
    else if(num=="0") return "rgb(255, 255, 255)";
    console.log("error")
    return "";
}


function lineGridSquare(b, p1, p2){

    //just 4 line to line collisions
    if(lineLine(p1.x,p1.y,p2.x,p2.y, b.x,b.y,b.x, b.y+b.h)) return true;
    else if(lineLine(p1.x,p1.y,p2.x,p2.y, b.x+b.w,b.y, b.x+b.w,b.y+b.h)) return true;
    else if(lineLine(p1.x,p1.y,p2.x,p2.y, b.x,b.y, b.x+b.w,b.y)) return true;
    else if(lineLine(p1.x,p1.y,p2.x,p2.y, b.x,b.y+b.h, b.x+b.w,b.y+b.h)) return true;
    //if line is inside box
    else if(p1.x>b.x&&p2.x>b.x&&
        p1.x<b.x+b.w&&p2.x<b.x+b.w&&
        p1.y>b.y&&p2.y>b.y&&
        p1.y<b.y+b.h&&p2.y<b.y+b.h) return true;
    else return false;

}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
  var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

function selecting(oldMouse){
    for(var i=0;i<tiles.length;i++){
        if(lineGridSquare({x:tiles[i].x, y:tiles[i].y, w:tiles[i].w, h:tiles[i].h}, mouse, oldMouse)){
            tiles[i].selected = true;
        }
    }
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


function newPuzzle(){
    var gameEasiest = "530206900900000040748359000000400007016907580400005000000891452020000006004602093";
    var gameEasy =    "000004028406000005100030600000301000087000140000709000002010003900000507670400000";

    for(var j=0, t=0; j<9; j++){
        for(var k=j; k<81; k+=9, t++){
            temp = parseInt(gameEasy.substring(t,t+1))
            if(temp == 0) tiles[k].mainNumber = -1;
            else tiles[k].mainNumber = temp;
        }
    }


    for(var i=0; i<tiles.length; i++){
        if(tiles[i].mainNumber == -1) tiles[i].centerNumbers = [false, true, true, true, true, true, true, true, true, true];
        else tiles[i].centerNumbers = [false, false, false, false, false, false, false, false, false, false];
        tiles[i].cornerNumbers = [false, false, false, false, false, false, false, false, false, false];

    }

}

function setupEasy(){
    console.log("changing to easy puzzle");
    tiles[0].mainNumber = 5;
    tiles[1].mainNumber = 9;
    tiles[2].mainNumber = 7;
    tiles[3].mainNumber = -1;
    tiles[4].mainNumber = -1;
    tiles[5].mainNumber = 4;
    tiles[6].mainNumber = -1;
    tiles[7].mainNumber = -1;
    tiles[8].mainNumber = -1;
    tiles[9].mainNumber = 3;
    tiles[10].mainNumber = -1;
    tiles[11].mainNumber = 4;
    tiles[12].mainNumber = -1;
    tiles[13].mainNumber = 1;
    tiles[14].mainNumber = -1;
    tiles[15].mainNumber = -1;
    tiles[16].mainNumber = 2;
    tiles[17].mainNumber = -1;
    tiles[18].mainNumber = -1;
    tiles[19].mainNumber = -1;
    tiles[20].mainNumber = 8;
    tiles[21].mainNumber = -1;
    tiles[22].mainNumber = 6;
    tiles[23].mainNumber = -1;
    tiles[24].mainNumber = -1;
    tiles[25].mainNumber = -1;
    tiles[26].mainNumber = 4;
    tiles[27].mainNumber = 2;
    tiles[28].mainNumber = -1;
    tiles[29].mainNumber = 3;
    tiles[30].mainNumber = 4;
    tiles[31].mainNumber = 9;
    tiles[32].mainNumber = -1;
    tiles[33].mainNumber = 8;
    tiles[34].mainNumber = -1;
    tiles[35].mainNumber = 6;
    tiles[36].mainNumber = -1;
    tiles[37].mainNumber = -1;
    tiles[38].mainNumber = 5;
    tiles[39].mainNumber = -1;
    tiles[40].mainNumber = -1;
    tiles[41].mainNumber = -1;
    tiles[42].mainNumber = 9;
    tiles[43].mainNumber = -1;
    tiles[44].mainNumber = -1;
    tiles[45].mainNumber = 6;
    tiles[46].mainNumber = -1;
    tiles[47].mainNumber = 9;
    tiles[48].mainNumber = -1;
    tiles[49].mainNumber = 7;
    tiles[50].mainNumber = 5;
    tiles[51].mainNumber = 1;
    tiles[52].mainNumber = -1;
    tiles[53].mainNumber = 2;
    tiles[54].mainNumber = 9;
    tiles[55].mainNumber = -1;
    tiles[56].mainNumber = -1;
    tiles[57].mainNumber = -1;
    tiles[58].mainNumber = 5;
    tiles[59].mainNumber = -1;
    tiles[60].mainNumber = 4;
    tiles[61].mainNumber = -1;
    tiles[62].mainNumber = -1;
    tiles[63].mainNumber = -1;
    tiles[64].mainNumber = 4;
    tiles[65].mainNumber = -1;
    tiles[66].mainNumber = -1;
    tiles[67].mainNumber = 8;
    tiles[68].mainNumber = -1;
    tiles[69].mainNumber = 5;
    tiles[70].mainNumber = -1;
    tiles[71].mainNumber = 9;
    tiles[72].mainNumber = -1;
    tiles[73].mainNumber = -1;
    tiles[74].mainNumber = -1;
    tiles[75].mainNumber = 7;
    tiles[76].mainNumber = -1;
    tiles[77].mainNumber = -1;
    tiles[78].mainNumber = 2;
    tiles[79].mainNumber = 6;
    tiles[80].mainNumber = 3;

    for(var i=0; i<tiles.length; i++){
        if(tiles[i].mainNumber == -1) tiles[i].centerNumbers = [false, true, true, true, true, true, true, true, true, true];
        else tiles[i].centerNumbers = [false, false, false, false, false, false, false, false, false, false];
        tiles[i].cornerNumbers = [false, false, false, false, false, false, false, false, false, false];
    }
}

function solver(){

    console.log("solving setup")
    var mainNum = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    var pencilNum = [
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []]
    ]
    for(var i=0; i<tiles.length; i++){
        mainNum[tiles[i].colNum][tiles[i].rowNum] = tiles[i].mainNumber;
        pencilNum[tiles[i].colNum][tiles[i].rowNum] = tiles[i].centerNumbers;
    }

    //define each box
    var tileGroups = [
        [[0,0],[1,0],[2,0],
         [0,1],[1,1],[2,1],
         [0,2],[1,2],[2,2]],
        [[3,0],[4,0],[5,0],
         [3,1],[4,1],[5,1],
         [3,2],[4,2],[5,2]],
        [[6,0],[7,0],[8,0],
         [6,1],[7,1],[8,1],
         [6,2],[7,2],[8,2]],

        [[0,3],[1,3],[2,3],
         [0,4],[1,4],[2,4],
         [0,5],[1,5],[2,5]],
        [[3,3],[4,3],[5,3],
         [3,4],[4,4],[5,4],
         [3,5],[4,5],[5,5]],
        [[6,3],[7,3],[8,3],
         [6,4],[7,4],[8,4],
         [6,5],[7,5],[8,5]],

        [[0,6],[1,6],[2,6],
         [0,7],[1,7],[2,7],
         [0,8],[1,8],[2,8]],
        [[3,6],[4,6],[5,6],
         [3,7],[4,7],[5,7],
         [3,8],[4,8],[5,8]],
        [[6,6],[7,6],[8,6],
         [6,7],[7,7],[8,7],
         [6,8],[7,8],[8,8]]
    ]




    console.log("solving start")
    var step = 0;
    var stepWorked = false;
    var finished = false;
    do{
        pausecomp(200);
        if(step==0){ //solved cells
            for(var i=0; i<pencilNum.length; i++){
                for(var j=0; j<pencilNum[i].length; j++){
                    if(mainNum[i][j]==-1){
                        var nakedSingle = -1;
                        var isNakedSingle = false;
                        for(var k=0; k<pencilNum[i][j].length; k++){
                            if(pencilNum[i][j][k]&&!isNakedSingle) {
                                nakedSingle = k;
                                isNakedSingle = true;
                            } else if(pencilNum[i][j][k]){
                                nakedSingle = -1;
                            }
                        }
                        if(nakedSingle!=-1) {
                            mainNum[i][j] = nakedSingle;
                            pencilNum[i][j] = [false, false, false, false, false, false, false, false, false, false];
                            stepWorked = true;
                        }
                    }

                }

            }

        } else if(step==1){ //narrow down by sudoku col,row,box



            for(var i=0; i<pencilNum.length; i++){
                for(var j=0; j<pencilNum[i].length; j++){
                    listOfMainNum = [false, false, false, false, false, false, false, false, false, false];
                    if(mainNum[i][j]==-1){


                        //find all mainNum in row
                        for(var k=0; k<mainNum.length; k++){
                            if(k!=i&&mainNum[k][j]!=-1){
                                listOfMainNum[mainNum[k][j]] = true;
                            }
                        }
                        //find all mainNum in col
                        for(var k=0; k<mainNum[i].length; k++){
                            if(k!=j&&mainNum[i][k]!=-1){
                                listOfMainNum[mainNum[i][k]] = true;
                            }
                        }
                        //find all mainNum in box
                        var tileGroupNum = -1;
                        for(var k=0; k<tileGroups.length; k++){
                            for(var l=0; l<tileGroups[k].length; l++){
                                if(tileGroups[k][l][0]==i&&tileGroups[k][l][1]==j){
                                    tileGroupNum = k;
                                }
                            }
                        }
                        if(tileGroupNum==-1) console.log("ERROR")
                        else {
                            for(var k=0; k<tileGroups[tileGroupNum].length; k++){
                                if(tileGroups[tileGroupNum][k][0]!=i&&tileGroups[tileGroupNum][k][1]!=j&&mainNum[tileGroups[tileGroupNum][k][0]][tileGroups[tileGroupNum][k][1]]!=-1){
                                    listOfMainNum[mainNum[tileGroups[tileGroupNum][k][0]][tileGroups[tileGroupNum][k][1]]] = true;
                                }
                            }
                        }



                    }
                    for(var k=0; k<pencilNum[i][j].length; k++){
                        if(pencilNum[i][j][k]&&listOfMainNum[k]){
                            pencilNum[i][j][k] = false;
                            stepWorked = true;
                        }
                    }


                }
            }
        }  else if(step==2){ //find naked single
            exitLoop0:
            for(var i=0; i<pencilNum.length; i++){
                for(var j=0; j<pencilNum[i].length; j++){
                    if(mainNum[i][j]==-1){
                        for(var k=0; k<pencilNum[i][j].length; k++){
                            if(pencilNum[i][j][k]){
                                //check naked single in row
                                exitLoop1: {
                                    for(var l=0; l<mainNum.length; l++){
                                        // if(l!=i&&mainNum[l][j]!=-1&&!pencilNum[l][j][k]){
                                        //     break exitLoop1;
                                        // }
                                        if(l!=i&&mainNum[l][j]==-1&&pencilNum[l][j][k]){
                                            break exitLoop1;
                                        }
                                    }
                                    pencilNum[i][j] = [false, false, false, false, false, false, false, false, false, false];
                                    pencilNum[i][j][k] = true;
                                    stepWorked = true;
                                    //break exitLoop0;
                                }
                                //check naked single in col
                                exitLoop2: {
                                    for(var l=0; l<mainNum[i].length; l++){
                                        // if(l!=j&&mainNum[i][l]!=-1&&!pencilNum[i][l][k]){
                                        //     break exitLoop1;
                                        // }
                                        if(l!=j&&mainNum[i][l]==-1&&pencilNum[i][l][k]){
                                            break exitLoop2;
                                        }
                                    }
                                    pencilNum[i][j] = [false, false, false, false, false, false, false, false, false, false];
                                    pencilNum[i][j][k] = true;
                                    stepWorked = true;
                                    //break exitLoop0;
                                }



                                //check naked single in box
                                exitLoop3: {
                                    for(var l=0; l<tileGroups.length; l++){
                                        for(var m=0; m<tileGroups[l].length; m++){
                                            if(tileGroups[l][m][0]==i&&tileGroups[l][m][1]==j){
                                                for(var n=0; n<tileGroups[l].length; n++){
                                                    if((tileGroups[l][n][0]!=i||tileGroups[l][n][1]!=j)&&mainNum[tileGroups[l][n][0]][tileGroups[l][n][1]]==-1&&pencilNum[tileGroups[l][n][0]][tileGroups[l][n][1]][k]){
                                                        break exitLoop3;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    pencilNum[i][j] = [false, false, false, false, false, false, false, false, false, false];
                                    pencilNum[i][j][k] = true;
                                    stepWorked = true;
                                    //break exitLoop0;
                                }

                            }
                        }

                    }
                }
            }


        }else {
            finished = true;
        }


        if(stepWorked) {
            console.log("step ", step)
            //if(step!=0) step = 0;
            //stepWorked = false;
            finished = true;
        }
        else step++;


        //update client
        for(var i=0; i<tiles.length; i++){
            tiles[i].mainNumber = mainNum[tiles[i].colNum][tiles[i].rowNum];
            tiles[i].centerNumbers = pencilNum[tiles[i].colNum][tiles[i].rowNum];
        }
        draw();

    }while(!finished)

    console.log("solving done")

}
