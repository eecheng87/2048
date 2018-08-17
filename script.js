let gap_width = 8;
let box_width = 90;
let box_value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
document.getElementById('play_btn').addEventListener('click', function() {
    document.getElementsByClassName('menu')[0].style.display = "none";
    document.getElementById('boxBlock').style.display = "block";
    document.getElementById('gameBlock').style.display = "block";
    startGame();
});
//get boxBlock context
b = document.getElementById('boxBlock');
box_context = b.getContext('2d');

function startGame() {
    paintGameArea();
    geneBox();
}

function geneBox() {
    let pos = Math.floor(Math.random() * 16) + 1; // pos store index 1~16
    let row = Math.ceil(pos / 4);
    let col = ((pos) % 4 == 0) ? 4 : (pos) % 4;
    box_context.fillStyle = "rgba(171, 178, 185, 1)";
    roundRect(box_context, gap_width * col + box_width * (col - 1), gap_width * row + box_width * (row - 1), box_width, box_width, 10, false);
    // filltext, update box value array
}

function paintGameArea() {
    c = document.getElementById('gameBlock');
    context = c.getContext('2d');
    context.fillStyle = "rgba(86, 101, 115, 1)";
    roundRect(context, 0, 0, 400, 400, 10, true, "rgba(46, 64, 83, 1)");
    context.fillStyle = "rgba(123, 125, 125, 1)";
    for (let i = 1, k = 0; i < 5, k < 4; ++i, ++k)
        for (let j = 1, m = 0; j < 5, m < 4; ++j, ++m) {
            roundRect(context, gap_width * j + box_width * m, gap_width * i + box_width * k, box_width, box_width, 10, false);
        }
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