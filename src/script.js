const players = function (name, status, sign, box) {
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
        status,
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
    const box = document.querySelectorAll('.box');
    const pointsX = document.getElementById('pointsX');
    const pointsO = document.getElementById('pointsO');
    const playerX = players('Jose', true, 'x', pointsX);
    const playerO = players('Antonio', false, 'o', pointsO);
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

    const _setPlayer = function (player) {
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

    const changePlayer = function () {
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
            _setPlayer(currentPlayer);
        } else if (currentPlayer == playerO) {
            currentPlayer = playerX;
            _setPlayer(currentPlayer);
        }
    };

    const matchWin = function (arr) {
        let match = false;
        if (arr.length >= 3)
            for (let i = 0; i < winsConditions.length; i++) {
                match = winsConditions[i].every((item) => arr.includes(item));
                if (match) {
                    currentPlayer.wins++;
                    currentPlayer.box.textContent = currentPlayer.wins;
                    _displayWin(currentPlayer);
                }
            }
        return match;
    };

    const play = function () {
        square.forEach(function (item, index) {
            item.addEventListener('click', function () {
                currentPlayer.mark(index);
                currentPlayer.displayMark(item);
                matchWin(currentPlayer.moves);
                console.log(currentPlayer.name, ': ', currentPlayer.wins);
                changePlayer();
            });
        });
    };

    const init = function () {
        play();
        // matchWin();
    };

    return {
        init: init,
    };
})();

gameBoard.init();
