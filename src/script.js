const players = function (name, status, sign) {
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
        moves,
        wins,
    };
};

const gameBoard = (function () {
    const square = document.querySelectorAll('.square');
    const player1 = players('Jose', true, 'x');
    const player2 = players('Antonio', false, 'o');

    let currentPlayer;
    currentPlayer = player1;

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

    const changePlayer = function () {
        if (currentPlayer == player1) currentPlayer = player2;
        else if (currentPlayer == player2) currentPlayer = player1;
    };

    const matchWin = function (arr) {
        let match = false;
        if (arr.length >= 3)
            for (let i = 0; i < winsConditions.length; i++) {
                match = winsConditions[i].every((item) => arr.includes(item));
                if (match) {
                    currentPlayer.wins++;
                    break;
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
