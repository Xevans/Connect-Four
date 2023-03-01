//all objects for the game here
class Piece {
    constructor(colNum, rowNum){
        this.x = Math.floor(connect4.rack.x + (140 * (colNum + 0.75)));
        this.y = Math.floor(connect4.rack.y + (140 * (rowNum + 0.75)));
        this.r = 62;
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

        // if(this.color!="black"){
        //     ctx.strokeStyle = "gray"
        //     ctx.beginPath();
        //     ctx.arc(this.x, this.y, this.r * .8, 0, 2 * Math.PI, true);
        //     ctx.stroke();
        // }
        

        this.afterDraw();
    }
}

class RectangleRoundedButton{
    constructor(x, y, w, h, r, onClick, fillColor, strokeColor, strokeWeight, text, textColor, font){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.onClick = onClick;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
        this.active = true;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.hover = false;
    }

    update(){
        if (connect4.mouse.x > this.x && connect4.mouse.x < this.x + this.w && connect4.mouse.y > this.y && connect4.mouse.y < this.y + this.h){
            this.hover = true;
            console.log(1)
        }
    }

    afterDraw(){
        this.hover = false;
    }

    draw(){
        if(this.active){
            ctx.globalAlpha = 1;
            drawRoundedRect(this.x, this.y, this.w, this.h, this.r, this.fillColor, this.strokeColor, this.strokeWeight);
            if (this.hover) drawRoundedRect(this.x, this.y, this.w, this.h, this.r, "rgba(0, 0, 0, 0.2)", this.strokeColor, this.strokeWeight);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "50px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
        }

        this.afterDraw();
    }

    clicked(){
        this.onClick();
    }
}
