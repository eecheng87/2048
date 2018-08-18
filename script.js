var gap_width = 8;
var box_width = 90;
var box_value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var currentMove = "none";
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
    geneBox();
}
window.addEventListener('keydown', function(e) {
    let tmp_num = e.keyCode;
    switch (tmp_num) {
        case 37:
            currentMove = "left";
            break;
        case 38:
            currentMove = "up";
            break;
        case 39:
            currentMove = "right";
            break;
        case 40:
            currentMove = "down";
            break;
    }
    move(currentMove);
});

function move(dir) {
    let i, j, k;
    let emptyColNum = [0, 0, 0, 0];
    let emptyRowNum = [0, 0, 0, 0];
    switch (dir) {
        case "left":
            for (j = 0; j < 4; ++j) {
                for (i = 0; i < 4; ++i) {
                    if (box_value[j][i] == 0) {
                        emptyColNum[j]++
                    }
                }
                let nonZeroIndex = 0;
                if (emptyColNum[j] != 0) {
                    for (k = 0; k < 4; ++k) {
                        if (box_value[j][k] != 0) {
                            let tmp = box_value[j][k];
                            box_value[j][k] = 0;
                            box_value[j][nonZeroIndex] = tmp;
                            nonZeroIndex++;
                        }
                    }
                    emptyColNum[j] = 0;
                }
            }
            break;
        case "right":
            for (j = 0; j < 4; ++j) {
                for (i = 0; i < 4; ++i) {
                    if (box_value[j][i] == 0) {
                        emptyColNum[j]++
                    }
                }
                let nonZeroIndex = 3;
                if (emptyColNum[j] != 0) {
                    for (k = 3; k >= 0; --k) {
                        if (box_value[j][k] != 0) {
                            let tmp = box_value[j][k];
                            box_value[j][k] = 0;
                            box_value[j][nonZeroIndex] = tmp;
                            nonZeroIndex--;
                        }
                    }
                    emptyColNum[j] = 0;
                }
            }

            break;
        case "up":
            for (j = 0; j < 4; ++j) { //col
                for (i = 0; i < 4; ++i) { //row
                    if (box_value[i][j] == 0) {
                        emptyRowNum[j]++
                    }
                }
                let nonZeroIndex = 0;
                if (emptyRowNum[j] != 0) {
                    for (k = 0; k < 4; ++k) {
                        if (box_value[k][j] != 0) {
                            let tmp = box_value[k][j];
                            box_value[k][j] = 0;
                            box_value[nonZeroIndex][j] = tmp;
                            nonZeroIndex++;
                        }
                    }
                    emptyRowNum[j] = 0;
                }
            }
            break;
        case "down":
            for (j = 0; j < 4; ++j) { //col
                for (i = 0; i < 4; ++i) { //row
                    if (box_value[i][j] == 0) {
                        emptyRowNum[j]++
                    }
                }
                let nonZeroIndex = 3;
                if (emptyRowNum[j] != 0) {
                    for (k = 3; k >= 0; --k) {
                        if (box_value[k][j] != 0) {
                            let tmp = box_value[k][j];
                            box_value[k][j] = 0;
                            box_value[nonZeroIndex][j] = tmp;
                            nonZeroIndex--;
                        }
                    }
                    emptyRowNum[j] = 0;
                }
            }
            break;
    }

    update();
}


function update() {
    let x, y;

    for (let i = 0; i < 4; ++i) //row
        for (let j = 0; j < 4; ++j) { //column
        x = gap_width * (j + 1) + box_width * j;
        y = gap_width * (i + 1) + box_width * i;
        if (box_value[i][j] != 0) {
            box_context.fillStyle = "rgba(171, 178, 185, 1)";
            roundRect(box_context, x, y, box_width, box_width, 10, false);
            box_context.fillStyle = "white";
            box_context.font = "60px Verdana";
            box_context.textAlign = "center";
            box_context.fillText(box_value[i][j].toString(), x + box_width / 2, y + 70);
        } else {
            box_context.fillStyle = "rgba(123, 125, 125, 1)";
            roundRect(box_context, x, y, box_width, box_width, 10, false);
        }
    }

    geneBox();
}

function geneBox() {
    let existFlag = false;
    let pos; // pos store index 1~16
    let row;
    let col;
    do {
        pos = Math.floor(Math.random() * 16) + 1;
        row = Math.ceil(pos / 4);
        col = ((pos) % 4 == 0) ? 4 : (pos) % 4;
        if (box_value[row - 1][col - 1] == 0) {
            existFlag = true;
        }
    } while (!existFlag);
    //let row = Math.ceil(pos / 4);
    //let col = ((pos) % 4 == 0) ? 4 : (pos) % 4;
    let x = gap_width * col + box_width * (col - 1);
    let y = gap_width * row + box_width * (row - 1);
    box_context.fillStyle = "rgba(171, 178, 185, 1)";
    roundRect(box_context, x, y, box_width, box_width, 10, false);
    // filltext, update box value array
    box_value[row - 1][col - 1] = 2;
    box_context.fillStyle = "white";
    box_context.font = "60px Verdana";
    box_context.textAlign = "center";
    box_context.fillText("2", x + box_width / 2, y + 70);
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