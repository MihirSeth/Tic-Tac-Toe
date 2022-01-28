
let gameArray = ['','','','','','','','','',];


function Player(name, sign){
    this.sign = sign;
    this.name = name;

  };



const gameTiles = document.querySelectorAll(".gameboardTiles");
const resetButton = document.getElementById('reset')
const currentPlayerText = document.getElementById('currentPlayer')
const submitButton = document.getElementById('submit');

const mainGameboardContainer = document.getElementById('mainGameboardContainer');
const playerNameContainer = document.getElementById('playerNameContainer');

resetButton.addEventListener('click', resetGridPass);

submitButton.addEventListener('click', submitButtonFunctionPass);

function resetGridPass(){
    gameController.resetGrid()
}

function submitButtonFunctionPass(){
    gameController.submitButtonFunction()
}

gameTiles.forEach(gameTilesPress);


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
    // const playerX = 'X';
    // const playerO = 'O';
    let currentPlayer = '';
    let round = 1;

    const winningMoves = 
        [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    let isOver = false;
    let playerArray = [];

    function submitButtonFunction(){
        const playerOneName = document.getElementById('player1').value;
        const playerTwoName = document.getElementById('player2').value;
    
        // let player1 = new Player(playerOneName, 'X');
        // let player2 = new Player(playerTwoName, 'O');
    
        if (playerOneName === '' || playerTwoName === '' ){ 
            alert('We need another player!')
    
        } else{
            let player1 = new Player(playerOneName, 'X');
            let player2 = new Player (playerTwoName, 'O');
            playerArray = [player1, player2]
            playerNameContainer.style.display = 'none';
            mainGameboardContainer.style.display = 'block';
        }
    
    }

    function setCurrentPlayer(){
        // console.log(playerArray)
        if (round%2===1){
            currentPlayer = playerArray[0].sign

            currentPlayerText.innerHTML = `Player ${playerArray[0].name}'s (X) turn`
            round++
            return playerArray[0].sign
        } else{

            currentPlayer = playerArray[1].sign
            currentPlayerText.innerHTML = `Player ${playerArray[1].name}'s (O) turn`
            round++
            return playerArray[1].sign
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


    function resetGrid(){
        for(i=0; i<gameArray.length ;i++){
            gameTiles[i].innerHTML = ' '
            gameArray = ['','','','','','','','','']
        }
    
        currentPlayerText.innerHTML = "Player X's turn"
    
        isOver = false
        round = 1
    }

    return {setCurrentPlayer, checkWinner, getGameStatus, resetGrid, submitButtonFunction};
})();




window.onload = () => {


    mainGameboardContainer.style.display = 'none';

  }
  