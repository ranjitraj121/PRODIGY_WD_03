document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const usernameInput = document.getElementById('username');
    const startGameButton = document.getElementById('start-game');
    const resetGameButton = document.getElementById('reset-game');
    const gameBoard = document.getElementById('game-board');
    const winnerAnnouncement = document.createElement('div');
    winnerAnnouncement.classList.add('announcement');
    gameBoard.appendChild(winnerAnnouncement);

    let currentPlayer = 'X';
    let gameActive = false;

    startGameButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('Please enter your name to start the game.');
            return;
        }
        startGame(username);
    });

    function startGame(username) {
        usernameInput.disabled = true;
        startGameButton.disabled = true;
        gameActive = true;
        resetGameButton.style.display = 'none';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick);
        });
        winnerAnnouncement.textContent = `${username}'s turn`;
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (!gameActive || cell.textContent !== '') {
            return;
        }

        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer === 'X' ? usernameInput.value : 'AI'} wins!`);
        } else if (checkDraw()) {
            endGame('No one wins! It\'s a draw.');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            winnerAnnouncement.textContent = `${currentPlayer === 'X' ? usernameInput.value : 'AI'}'s turn`;
            if (currentPlayer === 'O') {
                setTimeout(makeAIMove, 1000); // AI makes a move after 1 second delay
            }
        }
    }

    function checkWin(player) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent === player && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function endGame(message) {
        gameActive = false;
        winnerAnnouncement.textContent = message;
        resetGameButton.style.display = 'block';
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    function makeAIMove() {
        // Simple AI logic: Randomly choose an empty cell
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer === 'X' ? usernameInput.value : 'AI'} wins!`);
        } else if (checkDraw()) {
            endGame('No one wins! It\'s a draw.');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            winnerAnnouncement.textContent = `${currentPlayer === 'X' ? usernameInput.value : 'AI'}'s turn`;
        }
    }

    resetGameButton.addEventListener('click', () => {
        currentPlayer = 'X';
        usernameInput.disabled = false;
        startGameButton.disabled = false;
        resetGameButton.style.display = 'none';
        cells.forEach(cell => {
            cell.textContent = '';
        });
        winnerAnnouncement.textContent = '';
    });
});
