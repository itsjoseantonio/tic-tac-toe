const players = function (name, status, sign) {
    const moves = [];
    const mark = function (value) {
        moves.push(value);
    };

    const displayMark = function (ele) {
        ele.classList.add(sign);
    };

    return {
        mark,
        displayMark,
        status,
        moves,
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

    const play = function () {
        square.forEach(function (item, index) {
            item.addEventListener('click', function () {
                currentPlayer.mark(index);
                currentPlayer.displayMark(item);
                console.log(currentPlayer.moves, currentPlayer);
                changePlayer();
            });
        });
    };

    const init = function () {
        play();
    };

    return {
        init: init,
    };
})();

gameBoard.init();
