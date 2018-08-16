let gap_width = 8;
let box_width = 90;

document.getElementById('play_btn').addEventListener('click', function() {
    document.getElementsByClassName('menu')[0].style.display = "none";
    startGame();
});

function startGame() {
    paintGameArea();
}

function paintGameArea() {
    c = document.getElementById('gameBlock');
    context = c.getContext('2d');
    context.fillStyle = "rgba(86, 101, 115, 1)";
    roundRect(context, 0, 0, 400, 400, 10, true, "rgba(46, 64, 83, 1)");
    context.fillStyle = "rgba(123, 125, 125, 1)";
    roundRect(context, gap_width, gap_width, box_width, box_width, 10, false);
    roundRect(context, 2 * gap_width + box_width, gap_width, box_width, box_width, 10, false);
    roundRect(context, 3 * gap_width + 2 * box_width, gap_width, box_width, box_width, 10, false);
    roundRect(context, 4 * gap_width + 3 * box_width, gap_width, box_width, box_width, 10, false);
    roundRect(context, gap_width, 2 * gap_width + box_width, box_width, box_width, 10, false);
    roundRect(context, 2 * gap_width + box_width, 2 * gap_width + box_width, box_width, box_width, 10, false);
    roundRect(context, 3 * gap_width + 2 * box_width, 2 * gap_width + box_width, box_width, box_width, 10, false);
    roundRect(context, 4 * gap_width + 3 * box_width, 2 * gap_width + box_width, box_width, box_width, 10, false);
    roundRect(context, gap_width, 3 * gap_width + 2 * box_width, box_width, box_width, 10, false);
    roundRect(context, 2 * gap_width + box_width, 3 * gap_width + 2 * box_width, box_width, box_width, 10, false);
    roundRect(context, 3 * gap_width + 2 * box_width, 3 * gap_width + 2 * box_width, box_width, box_width, 10, false);
    roundRect(context, 4 * gap_width + 3 * box_width, 3 * gap_width + 2 * box_width, box_width, box_width, 10, false);
    roundRect(context, gap_width, 4 * gap_width + 3 * box_width, box_width, box_width, 10, false);
    roundRect(context, 2 * gap_width + box_width, 4 * gap_width + 3 * box_width, box_width, box_width, 10, false);
    roundRect(context, 3 * gap_width + 2 * box_width, 4 * gap_width + 3 * box_width, box_width, box_width, 10, false);
    roundRect(context, 4 * gap_width + 3 * box_width, 4 * gap_width + 3 * box_width, box_width, box_width, 10, false);

}

function roundRect(ctx, x, y, width, height, radius, stroke, strokeColor) {

    if (typeof radius === 'number')
        radius = { tl: radius, tr: radius, br: radius, bl: radius };

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
    if (stroke) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}