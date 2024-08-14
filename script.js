const boxes = document.querySelectorAll('.box');
const newGame = document.querySelector('#new-game');
const winner = document.querySelector('.winner');
const playerX = document.querySelector('.player1-score');
const playerO = document.querySelector('.player2-score');
const selectLevel = document.querySelector('.level');
let level = 'easy';
let currentPlayer = 'X';

selectLevel.addEventListener('change', function() {
    level = this.value;
    console.log('level selected : ',level);
    resetGame();
});
let gameEnded = false;

newGame.addEventListener("click",resetGame);

boxes.forEach(box => {
    box.addEventListener('click', function() {
        if (box.textContent === '' && !gameEnded){
            box.textContent = currentPlayer;
            const result = checkWinner();
            if (result) {
                displayWinner(result);
                gameEnded = true;
            } else {
                switchPlayer();
                if(level!=='play-with-friend'&&currentPlayer==='O'){
                    computerTurn();
                }
            }
        }
    });
});

function resetGame() {
    boxes.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    winner.textContent = '';
    gameEnded = false;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function displayWinner(result) {
    if (result === 'Draw') {
        document.querySelector('.winner').textContent = 'It\'s a Draw!';
    } else {
        document.querySelector('.winner').textContent = `${result} Wins!`;
        updateScore(result);
    }
}

//winning conditions
function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];
    const grid = getData();
    let blank=0;
    for(let i=0;i<winConditions.length;i++){
        const conditions = winConditions[i];
        let player1=0;
        let player2=0;
        for(let j=0;j<3;j++){
            if(grid[conditions[j]]==='X'){
                player1++;
            }
            else if(grid[conditions[j]]==='O'){
                player2++;
            }
            else{
                blank++;
            }
        }
        if(player1==3){
            return "X";
        }
        else if(player2==3){
            return "O";
        }
    }
    if(blank>0){
        return null;
    }
    else{
        return "Draw";
    }

}

function getData() {
    let grid = [];
    boxes.forEach(box => {
        grid.push(box.textContent);
    });
    return grid;
}

function updateScore(result) {
    if(result == "X"){
        playerX.textContent++;
    }
    else if(result == "O"){
        playerO.textContent++;
    }
}



