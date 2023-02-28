//all objects for the game here
class Piece {
    constructor(index, colNum, rowNum){
        this.x = Math.floor(140 * (colNum + 0.75));
        this.y = Math.floor(140 * (rowNum + 0.75));
        this.r = 62;
        this.index = index;
        this.colNum = colNum;
        this.rowNum = rowNum;
        this.color = "black";
        this.hovered = false;
    }

    afterDraw(){
        this.hovered = false;
    }

    changeColor(c){
        this.color = c;
        this.hovered = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        if (this.hovered) ctx.fillStyle = "pink"
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        ctx.fill();

        if(this.color!="black"){
            ctx.strokeStyle = "gray"
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * .8, 0, 2 * Math.PI, true);
            ctx.stroke();
        }
        

        this.afterDraw();
    }
}
