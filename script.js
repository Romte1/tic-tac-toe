/*
** The Gameboard represents the state of the board
*/

function Gameboard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const getBoard = () => board;
    return getBoard();
}


function gameController() {
    const board = Gameboard();
    let player1 = 'x';
    let player2 = 'o';
    let turn = player1;

    function turnCheck() {
        
        if (turn === player1) {
            turn = player2;

        } else {
            turn = player1;

        }
        return turn

    }
    
    return turnCheck;

}

function display() {
    const game = gameController();
    const squares = document.querySelectorAll('.square');
    const modal = document.querySelector('.modal');
    const btnRestart = document.querySelector('.btnRestart');
    modal.showModal();

    btnRestart.addEventListener('click', () => {
        modal.close();
    })

    squares.forEach(square => {
        square.addEventListener ('click', () =>{
        if (square.textContent !== '') {
            return
        }
        square.textContent = game();
        
        
        })
    })

}

display();