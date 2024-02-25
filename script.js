/*
** The Gameboard represents the state of the board
*/

function Gameboard() {
    let board = [];
    const squares = document.querySelectorAll('.square');

    function updateBoard() {
        board = Array.from(squares).map(square => square.textContent)
        return board
        
    };

    return updateBoard;
}


function gameController() {
    const board = Gameboard();
    let player1 = 'x';
    let player2 = 'o';
    let turn = player1;
    let actions = 0;
    let win_conditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
      ];

    function turnCheck() {
        if (turn === player1) {
            turn = player2;

        } else {
            turn = player1;

        }
        return turn

    }

    function actionsCounter() {
        actions++
        return actions

    }

    function resetActions() {
        return actions = 0;
    }

    function checkBoard() {

        let boardArray = board();

        for (let condition of win_conditions) {
            const [pos1, pos2, pos3] = condition;
            if (boardArray[pos1] === boardArray[pos2] && boardArray[pos2] === boardArray[pos3] && boardArray[pos1] !== '') {
                return console.log('WIN!'); // Win condition met
            }
        }
        return false; // No win condition met
    }
    
    return {turnCheck, actionsCounter, resetActions, checkBoard};

}

function display() {
    const board = Gameboard();
    const game = gameController();
    const squares = Array.from(document.querySelectorAll('.square'));
    const modal = document.querySelector('.modal');
    const btnRestart = document.querySelector('.btnRestart');
    

    btnRestart.addEventListener('click', () => {
        modal.close();
        squares.forEach(square => {
            square.textContent = '';
        })
        game.resetActions();
    })

    squares.forEach(square => {
        square.addEventListener ('click', () =>{
        if (square.textContent !== '') {
            return
        }
        square.textContent = game.turnCheck();
        let counter = game.actionsCounter();

        console.log(board());
        game.checkBoard();

        if (counter === 9) {
            modal.showModal();
        }

        
        
        })
    })

}

display();