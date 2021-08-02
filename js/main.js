'use strict'

var gNums = [];
var gCurrNum = 1;
var gStartTimer;


function initGame() {
    gCurrNum = 1;
    gNums = createArr();
    renderGame();
}
function renderGame(num = 16) {
    gNums = createArr(num);
    var elTable = document.querySelector('table');
    var strTableHTML = '<tr>\n';
    for (var i = 0; i < num; i++) {
        var rndNum = drawNum();
        strTableHTML += '\t<th onclick="isRight(this)" id="' + rndNum + '">' + rndNum + '</th>\n';
        if ((i + 1) % Math.sqrt(num) === 0) {
            strTableHTML += '</tr>\n <tr>\n'
        }
    }
    // console.log(strTableHTML);
    // console.log(gNums);
    gNums = createArr(num);
    // console.log(gNums);
    elTable.innerHTML = strTableHTML;
}
function isRight(elCell) {
    var currCellNum = parseInt(elCell.id);
    if (!gNums[currCellNum - 1]) {
        console.log(currCellNum);
        return;
    } if (gCurrNum === currCellNum) {
        if (currCellNum === 1) {
            timerStart();
            gStartTimer = Date.now();
        }
        gNums[currCellNum - 1] = 0;
        gCurrNum++;
        elCell.style.opacity = '0.2';
    }
    // console.logisWin(currCellNum))
}
function timerStart() {
    var elTimer = document.querySelector('.timer');
    var myVal = setInterval(function () {
        var time=((Date.now()-gStartTimer)/1000).toFixed(3)
        elTimer.textContent = time + '';
        if (isWin()) {
            gameTimer(time)                              
            clearInterval(myVal);
        }
    }, 81)
}
function isWin() {
    if (!gNums[gNums.length - 1]) {
        var elResBtn = document.querySelector('.resBtn');
        elResBtn.innerText = 'Play again';
        return true;
    }
    return false;
}
function gameTimer(time) {
    var elWonMsg = document.querySelector('.winnerMsg');
    elWonMsg.style.diplay = 'block'
    elWonMsg.innerHTML = '<h1> Good job! </br> Your time is:' + time + '</h1>';

}
function restartGame(){
    window.location="index.html";
}






function createArr(count = 16) {
    var nums = [];
    for (var i = 1; i <= count; i++) {
        nums.push(i);
    }
    return nums;
}
function drawNum(nums = gNums) {
    var randIdx = getRandom(1, nums.length);
    return nums.splice(randIdx - 1, 1);
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}