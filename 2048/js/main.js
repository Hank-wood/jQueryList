var board = new Array();
var hasConflicted=new Array();
var score = 0;
$(document).ready(function() {
    var btn = $("new_game_button");
    btn.click(function() {
        // newGame();
        // alert('aa')
        console.log('a')
    })
    newGame();
})

function newGame() {
    // 初始化棋盘格
    init();
    // 生成2个数字
    generateOneNumber();
    generateOneNumber();
    // console.log(generateOneNumber());
    // score
    score=0;
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid_cell_' + i + '_' + j);
            gridCell.css('top', getTop(i, j));
            gridCell.css('left', getLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();
}

function updateBoardView() {
    $('.number_cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
            var theNumberCell = $('#number_cell_' + i + '_' + j);
            if (board[i][j] == 0) {
                theNumberCell.css({
                    'width': '0px',
                    'height': '0px',
                    'top': getTop(i, j) + 50,
                    'left': getLeft(i, j) + 50

                })
            } else {
                theNumberCell.css({
                    'width': '100px',
                    'height': '100px',
                    'top': getTop(i, j),
                    'left': getLeft(i, j),
                    'backgroundColor': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                }).text(board[i][j]);
            }
        hasConflicted[i][j]=false;
        }
    }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false
    }
    // 生成一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //生成一个数字
    var number = Math.random() > 0.8 ? 4 : 2;
    //随机位置的随机数字
    board[randx][randy] = number;
    // 显示数字
    showAnimationNumber(randx, randy, number);
    return true;
}
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout('isgameover()', 220)
            }
            break
        case 38:
            if (moveUp()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 220);
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 220);
            }
            break;
        case 40:
            if (moveDown()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 220);
            }
            break
        default:
            break;
    }
})

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockH(i, k, j, board)) {
                        // move
                        showAnimationMove(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        console.log('a')
                        continue
                    } else if (board[i][k] == board[i][j] && noBlockH(i, k, j, board) && !hasConflicted[i][k]) {
                        // move;
                        showAnimationMove(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);;
    return true;
}
// up
// function moveUp() {
//     if (!canMoveUp(board)) {
//         return false;
//     }
//     for (var i = 1; i < 4; i++) {
//         for (var j = 0; j < 4; j++) {
//             if (board[i][j] != 0) {
//                 for (var k = 0; k < i; k++) {
//                     if (board[k][j] == 0 && noBlockV(j, k, i, board)) {
//                         //move
//                         showAnimationMove(i, j, k, j);
//                         board[k][j] = board[i][j];
//                         board[i][j] = 0;
//                         continue;

//                     } else if (board[k][j] = board[i][j] && noBlockV(j, k, i, board)) {
//                         //move
//                         showAnimationMove(i, j, k, j);
//                         board[k][j] += board[i][j];
//                         board[i][j] = 0;
//                         continue
//                     }
//                 }
//             }
//         }
//     }
//     setTimeout('updateBoardView()', 200);;
//     return true;
// }
function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockV( j , k , i , board )  ){
                        //move
                        showAnimationMove( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockV( j , k , i , board ) && !hasConflicted[k][j]){
                        //move
                        showAnimationMove( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

// function moveDown() {
//     if (!canMoveDown(board)) {
//         return false;
//     }
//     for (var i = 2; i >=0; i--) {
//         for (var j = 0; j < 4; j++) {
//             if (board[i][j] != 0) {
//                 for (var k = 3; k > i; k--) {
//                     if (board[k][j] == 0 && noBlockV(j, i, k, board)) {
//                         //move
//                         showAnimationMove(i, j, k, j);
//                         board[k][j] = board[i][j];
//                         board[i][j] = 0;
//                         continue;

//                     } else if (board[k][j] = board[i][j] && noBlockV(j, i, k, board)) {
//                         //move
//                         showAnimationMove(i, j, k, j);
//                         board[k][j] += board[i][j];
//                         board[i][j] = 0;
//                         continue
//                     }
//                 }
//             }
//         }
//     }
//     setTimeout('updateBoardView()', 200);;
//     return true;
// }
function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockV( j , i , k , board ) ){
                        //move
                        showAnimationMove( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockV( j , i , k , board )&& !hasConflicted[k][j]){
                        //move
                        showAnimationMove( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

// function moveRight() {
//     if (!canMoveRight(board)) {
//         return false;
//     }
//     for (var i = 0; i < 4; i++) {
//         for (var j = 2; j >= 0; j--) {
//             if (board[i][j] != 0) {
//                 for (var k = 3; k > j; k--) {
//                     if (board[i][k] == 0 && noBlockH(i, j, k, board)) {
//                         showAnimationMove(i, j, i, k);
//                         board[i][k] = board[i][j];
//                         board[i][j] = 0;
//                         continue;
//                     } else if (board[i][j + 1] == board[i][j] && noBlockH(i, j, k, board)) {
//                         showAnimationMove(i, j, i, k);
//                         board[i][k] += board[i][j];
//                         board[i][j] = 0;
//                         continue;
//                     }
//                 }
//             }
//         }
//     }
//     setTimeout('updateBoardView()', 200);;
//     return true;
// }
function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockH( i , j , k , board ) ){
                        //move
                        showAnimationMove( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockH( i , j , k , board ) && !hasConflicted[i][k]){
                        //move
                        showAnimationMove( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function isgameover() {
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}
function gameover() {
	alert('gameover');
}
function updateScore(score) {
	$("#score").text(score);
}