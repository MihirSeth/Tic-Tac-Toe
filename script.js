let round;


let gameArray = ['','','','','','','','','',];

const gameTiles = document.querySelectorAll(".gameboardTiles");
const resetButton = document.getElementById('reset')
const currentPlayerText = document.getElementById('currentPlayer')
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', submitButtonFunction);
const mainGameboardContainer = document.getElementById('mainGameboardContainer');
const playerNameContainer = document.getElementById('playerNameContainer');

resetButton.addEventListener('click', resetGrid);

gameTiles.forEach(gameTilesPress);

function submitButtonFunction(){
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;


    if (player1 === '' || player2 === '' ){ 
        alert('We need another player!')

    } else{
        // inputPlayerContainer.style.visibility = 'hidden';
        playerNameContainer.style.display = 'none';

        mainGameboardContainer.style.display = 'block';
        // console.log(player2)
    }

}

function formGrid(){
    for(i=0; i<gameArray.length ;i++){
        gameTiles[i].innerHTML = gameArray[i]
        gameTiles[i].style.color = 'black'
    }
}

function gameTilesPress(tile){
    tile.addEventListener('click', addInfoArray);

    function addInfoArray(){

        if (gameArray[tile.dataset.id]==='' && gameController.getGameStatus() !== true){
            gameArray[tile.dataset.id] = gameController.setCurrentPlayer()
            gameController.checkWinner()
        }
        formGrid()
    }
}

const gameController = (() => {
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = '';
    round = 1;

    const winningMoves = 
        [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    let isOver = false

    function setCurrentPlayer(){
        if (round%2===1){
            currentPlayer = playerX

            currentPlayerText.innerHTML = "Player X's turn"
            round++
            return playerX
        } else{

            currentPlayer = playerO
            currentPlayerText.innerHTML = "Player O's turn"
            round++
            return playerO
        }
        
    }   

    function checkWinner(){
        for(i=0; i<winningMoves.length;i++){
        
            if (gameArray[winningMoves[i][0]] === 'X' && gameArray[winningMoves[i][1]] === 'X' && gameArray[winningMoves[i][2]] === 'X'){
                console.log('Winner is X')
    
                currentPlayerText.innerHTML = 'Winner is X!'
                isOver = true
   
            } else if (gameArray[winningMoves[i][0]] === 'O' && gameArray[winningMoves[i][1]] === 'O' && gameArray[winningMoves[i][2]] === 'O' ){
                console.log('Winner is O')
                isOver = true

                currentPlayerText.innerHTML = 'Winner is O!'
    
            } else if (round === 10){
                console.log('Stalemate')
                currentPlayerText.innerHTML = 'It is a Stalemate!'
                isOver = true
            }
        }
    }

    function getGameStatus(){
        return isOver
    }

    return {setCurrentPlayer, checkWinner, getGameStatus};
})();

function resetGrid(){
    for(i=0; i<gameArray.length ;i++){
        gameTiles[i].innerHTML = ' '
        gameArray = ['','','','','','','','','']
    }

    currentPlayerText.innerHTML = "Player X's turn"
    round = 1
}


window.onload = () => {


    mainGameboardContainer.style.display = 'none';

  }
  