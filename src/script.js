const players = function (name, sign, box) {
    const moves = [];
    const wins = 0;
    const mark = function (value) {
        moves.push(value);
    };

    const displayMark = function (ele) {
        ele.classList.add(sign);
    };

    return {
        mark,
        displayMark,
        name,
        sign,
        moves,
        wins,
        box,
    };
};

const gameBoard = (function () {
    const square = document.querySelectorAll('.square');
    const turn = document.querySelector('.turnPlayer');
    const popup = document.querySelector('.popup-winner');
    const popupTie = document.querySelector('.popup-tie');
    const box = document.querySelectorAll('.box');
    const button = document.querySelector('.button-restart');
    const pointsX = document.getElementById('pointsX');
    const pointsO = document.getElementById('pointsO');
    let times = 0;
    let match = false;
    let playerX = players('Jose', 'x', pointsX);
    let playerO = players('Antonio', 'o', pointsO);
    let currentPlayer;
    currentPlayer = playerX;

    const winsConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const _selectPlayer = function (player) {
        const currentBox = player.box.parentElement;
        box.forEach((ele) => ele.classList.remove('active'));
        currentBox.classList.add('active');
        turn.textContent = player.sign;
    };

    const _displayWin = function (player) {
        popup.classList.add('showed');
        const span = popup.querySelector('span');
        span.textContent = player.sign;
    };

    const _clearMoves = function () {
        playerX.moves.splice(0, playerX.moves.length);
        playerO.moves.splice(0, playerO.moves.length);
    };

    const _displayTie = function (times) {
        if (times >= 9 && !match) {
            popupTie.classList.add('showed');
            _clearMoves();
        } else if (times >= 9 && match) {
            popup.classList.add('showed');
            _clearMoves();
        }
    };

    const restartGame = function () {
        _clearMoves();
        square.forEach((ele) => ele.classList.remove('x', 'o'));
        popup.classList.remove('showed');
        popupTie.classList.remove('showed');
        times = 0;
    };

    const changePlayer = function () {
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
            _selectPlayer(currentPlayer);
        } else if (currentPlayer == playerO) {
            currentPlayer = playerX;
            _selectPlayer(currentPlayer);
        }
    };

    const matchWin = function (arr) {
        if (arr.length >= 3) {
            for (let i = 0; i < winsConditions.length; i++) {
                match = winsConditions[i].every((item) => arr.includes(item));
                if (match) {
                    currentPlayer.wins++;
                    currentPlayer.box.textContent = currentPlayer.wins;
                    _displayWin(currentPlayer);
                    _clearMoves();
                }
            }
        }
        return match;
    };

    const play = function () {
        square.forEach(function (item, index) {
            item.addEventListener('click', function () {
                times++;
                currentPlayer.mark(index);
                currentPlayer.displayMark(item);
                matchWin(currentPlayer.moves);
                _displayTie(times);
                changePlayer();
            });
        });
    };

    const init = function () {
        play();
        button.addEventListener('click', restartGame);
    };

    return {
        init: init,
    };
})();

gameBoard.init();
