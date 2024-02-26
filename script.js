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
    let player1 = 'X';
    let player2 = 'O';
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
        if (actions == 0) {
            return turn
        }
        if (turn === player1) {
            return turn = player2;

        } else {
            return turn = player1;
        }

    }

    function actionsCounter() {
        actions++
        return actions

    }

    function resetActions() {
        return actions = 0;
    }

    function resetTurn() {
        turn = player1;
    }

    function checkBoard() {

        let boardArray = board();

        for (let condition of win_conditions) {
            const [pos1, pos2, pos3] = condition;
            if (boardArray[pos1] === boardArray[pos2] && boardArray[pos2] === boardArray[pos3] && boardArray[pos1] !== '') {
                return true, condition; // Win condition met
            }
        }
        return false; // No win condition met
    }

    function winnerName(letter) {
        if (letter === player1) {
            return 'Player 1'
        } else {
            return 'Player 2'
        }

    }
    
    return {turnCheck, actionsCounter, resetActions, checkBoard, resetTurn, winnerName};

}

function display() {
    const board = Gameboard();
    const game = gameController();
    const squares = Array.from(document.querySelectorAll('.square'));
    const modal = document.querySelector('.modal');
    const modal2 = document.querySelector('.modal2');
    const modalResult = document.querySelector('.modalResult')
    const btnRestart = document.querySelector('.btnRestart');
    const btnSetPlayerNames = document.querySelector('.setPlayerNames');
    const inputP1 = document.querySelector('.p1');
    const inputP2 = document.querySelector('.p2');
    const nameP1 = document.querySelector('.nameP1');
    const nameP2 = document.querySelector('.nameP2');
    const btnDone = document.querySelector('.btnDone');

    btnDone.addEventListener('click', () =>{
        inputP1.value !== '' ? nameP1.textContent = inputP1.value : nameP1.textContent = 'Player 1';
        inputP2.value !== '' ? nameP2.textContent = inputP2.value : nameP2.textContent = 'Player 2';

        modal2.close();

    })

    btnSetPlayerNames.addEventListener('click', () => {
        modal2.showModal();
    })
    

    btnRestart.addEventListener('click', () => {
        modal.close();
        squares.forEach(square => {
            square.textContent = '';
            square.style.background = 'rgb(202, 216, 138)';
        })
        game.resetActions();
        game.resetTurn();
    })

    squares.forEach(square => {
        square.addEventListener ('click', () =>{
        if (square.textContent !== '' || game.checkBoard()) {
            return
        }
        square.textContent = game.turnCheck();
        let counter = game.actionsCounter();



        if (game.checkBoard()) {
            winnerSquare = game.checkBoard();

            squares[winnerSquare[0]].style.background = 'rgb(84, 196, 84)';
            squares[winnerSquare[1]].style.background = 'rgb(84, 196, 84)';
            squares[winnerSquare[2]].style.background = 'rgb(84, 196, 84)';
            
            console.log(game.checkBoard()[0]);
            modalResult.textContent = `${game.winnerName(square.textContent)} Wins!`;
            modal.showModal();
        }

        if (counter === 9) {
            modalResult.textContent = "It's a draw!";
            modal.showModal();
        }

        
        
        })
    })

}

display();