const cells = document.querySelectorAll('.cell');
const resultDiv = document.getElementById('result');
const winCounterX = document.getElementById('win-counter-x');
const winCounterO = document.getElementById('win-counter-o');
const resetScoreButton = document.getElementById('reset-score-button');

let currentPlayer = 'X';
let gameOver = false;
let winsX = 0;
let winsO = 0;

function adjustBoardSize() {
    const board = document.querySelector('.board');
    const cellSize = Math.min(board.offsetWidth / 3, window.innerHeight / 3) - 10;
    board.style.gridTemplateColumns = `repeat(3, ${cellSize}px)`;
    cells.forEach(cell => cell.style.fontSize = `${cellSize * 0.4}px`);
}

window.addEventListener('resize', adjustBoardSize);
adjustBoardSize();

function playerMove(cell) {
    if (!cell.innerText && !gameOver) {
        cell.innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            resultDiv.innerText = `Játékos ${currentPlayer} nyert!`;
            updateWinCounter(currentPlayer);
            gameOver = true;
        } else if ([...cells].every(cell => cell.innerText !== '')) {
            resultDiv.innerText = 'Döntetlen!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && !gameOver) {
                aiMove();
            }
        }
    }
}

function aiMove() {
    const emptyCells = [...cells].filter(cell => cell.innerText === '');
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (randomCell) {
        setTimeout(() => playerMove(randomCell), 1000);
    }
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combination => {
        const [a, b, c] = combination;
        return cells[a].innerText === player && cells[b].innerText === player && cells[c].innerText === player;
    });
}

const newGameButton = document.getElementById('new-game-button');

newGameButton.addEventListener('click', startNewGame);
resetScoreButton.addEventListener('click', resetScore);

function startNewGame() {
    cells.forEach(cell => {
        cell.innerText = '';
    });

    resultDiv.innerText = '';
    gameOver = false;
    currentPlayer = 'X';
}

function updateWinCounter(player) {
    if (player === 'X') {
        winsX++;
        winCounterX.innerText = `X nyert: ${winsX}`;
    } else {
        winsO++;
        winCounterO.innerText = `O nyert: ${winsO}`;
    }
}

function resetScore() {
    winsX = 0;
    winsO = 0;
    winCounterX.innerText = `X nyert: ${winsX}`;
    winCounterO.innerText = `O nyert: ${winsO}`;
}