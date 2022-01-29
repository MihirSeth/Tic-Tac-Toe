
let gameArray = ['','','','','','','','','',];


function Player(name, sign){
    this.sign = sign;
    this.name = name;

  };


// Player VS Player Variables

const gameTilesPvP = document.querySelectorAll(".gameboardTilesPvP");
const resetButton = document.getElementById('reset')
const currentPlayerText = document.getElementById('currentPlayer')
const mainGameboardContainerPvP = document.getElementById('mainGameboardContainerPlayerVSPlayer');
gameTilesPvP.forEach(gameTilesPressPvP);


// Player VS Computer Variables
const gameTilesPvC = document.querySelectorAll(".gameboardTilesPvC");
const mainGameboardContainerPvC = document.getElementById('mainGameboardContainerPlayerVSComputer');
const currentPlayerTextPvC = document.getElementById('currentPlayerPvC')
const resetButtonPvC = document.getElementById('resetPvC')
resetButtonPvC.addEventListener('click', resetGridPassPvC);

gameTilesPvC.forEach(gameTilesPressPvC);



// Common Variables
const submitButton = document.getElementById('submit');
const playerNameContainer = document.getElementById('playerNameContainer');
const chooseGameTypeClassifier = document.getElementById('chooseGameType');
const backButtonPlayerNamePage = document.getElementById('backButtonPlayerNameInput');


backButtonPlayerNamePage.addEventListener('click', goBacktoGameClassifierPage);
resetButton.addEventListener('click', resetGridPass);
submitButton.addEventListener('click', submitButtonFunctionPass);



function goBacktoGameClassifierPage(){
    chooseGameTypeClassifier.style.display = 'block';
    playerNameContainer.style.display = 'none';
}

function playerVSplayerClassifier(){
    chooseGameTypeClassifier.style.display = 'none';
    playerNameContainer.style.display = 'block';
}


function playerVScomputerClassifier(){
    // playerNameContainer.style.display = 'none';
    chooseGameTypeClassifier.style.display = 'none';
    mainGameboardContainerPvC.style.display = 'block';
}


function resetGridPass(){
    gameControllerPvP.resetGrid()
}



function submitButtonFunctionPass(){
    gameControllerPvP.submitButtonFunction()
}



function formGridPvP(){
    for(i=0; i<gameArray.length ;i++){
        gameTilesPvP[i].innerHTML = gameArray[i]
        gameTilesPvP[i].style.color = 'black'
    }
}

function gameTilesPressPvP(tile){
    tile.addEventListener('click', addInfoArray);

    function addInfoArray(){

        if (gameArray[tile.dataset.id]==='' && gameControllerPvP.getGameStatus() !== true){
            gameArray[tile.dataset.id] = gameControllerPvP.setCurrentPlayer()
            gameControllerPvP.checkWinner()
        }
        formGridPvP()
    }
}

const gameControllerPvP = (() => {
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
    
        if (playerOneName === '' || playerTwoName === '' ){ 
            alert('We need another player!')
    
        } else{
            let player1 = new Player(playerOneName, 'X');
            let player2 = new Player (playerTwoName, 'O');
            playerArray = [player1, player2]
            playerNameContainer.style.display = 'none';
            mainGameboardContainerPvP.style.display = 'block';
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
            gameTilesPvP[i].innerHTML = ' '
            gameArray = ['','','','','','','','','']
        }
    
        currentPlayerText.innerHTML = "Player X's turn"
    
        isOver = false
        round = 1
    }

    return {setCurrentPlayer, checkWinner, getGameStatus, resetGrid, submitButtonFunction};
})();






function resetGridPassPvC(){
    gameControllerPvC.resetGrid()
}


function gameTilesPressPvC(tile){
    tile.addEventListener('click', addInfoArray);

    function addInfoArray(){

        if (gameArray[tile.dataset.id]==='' && gameControllerPvC.getGameStatus() !== true){

            if (gameControllerPvC.playerOrComputer() === 'Player'){
                gameArray[tile.dataset.id] = 'X'

                gameControllerPvC.roundIncrement() 
          
                gameArray[computerChoice()] = 'O'
            
            }
            gameControllerPvC.checkWinner()
        }
        formGridPvC()
    }
}


function formGridPvC(){
    for(i=0; i<gameArray.length ;i++){
        gameTilesPvC[i].innerHTML = gameArray[i]
        gameTilesPvC[i].style.color = 'black'
    }
}

function computerChoice(){

    let computerChoice = Math.floor(Math.random() * gameArray.length);

    while (gameArray[computerChoice] !== '' ){
        computerChoice = Math.floor(Math.random() * gameArray.length);
    }
    gameControllerPvC.roundIncrement() 
    return computerChoice
}
const gameControllerPvC = (() => {
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

    function playerOrComputer(){
        if (round%2===1){
            currentPlayer = 'Player'
            currentPlayerText.innerHTML = ``
            return currentPlayer
        } else{
            currentPlayer = 'Computer'
            // currentPlayerText.innerHTML = `Computer (O)'s turn`
            return currentPlayer
        }
        
    }   

    function roundIncrement(){
        round++
    }

    function checkWinner(){
        for(i=0; i<winningMoves.length;i++){
        
            if (gameArray[winningMoves[i][0]] === 'X' && gameArray[winningMoves[i][1]] === 'X' && gameArray[winningMoves[i][2]] === 'X'){
                console.log('Winner is X')
    
                currentPlayerTextPvC.innerHTML = 'Winner is X!'
                isOver = true
   
            } else if (gameArray[winningMoves[i][0]] === 'O' && gameArray[winningMoves[i][1]] === 'O' && gameArray[winningMoves[i][2]] === 'O' ){
                console.log('Winner is O')
                isOver = true

                currentPlayerTextPvC.innerHTML = 'Winner is O!'
    
            } else if (round === 10){
                console.log('Stalemate')
                currentPlayerTextPvC.innerHTML = 'It is a Stalemate!'
                isOver = true
            }
        }
    }

    function getGameStatus(){
        return isOver
    }


    function resetGrid(){
        for(i=0; i<gameArray.length ;i++){
            gameTilesPvC[i].innerHTML = ' '
            gameArray = ['','','','','','','','','']
        }
    
        currentPlayerTextPvC.innerHTML = "Player X's turn"
    
        isOver = false
        round = 1
    }

    return {playerOrComputer, checkWinner, getGameStatus, resetGrid, roundIncrement};
})();



window.onload = () => {

    mainGameboardContainerPvP.style.display = 'none';
    mainGameboardContainerPvC.style.display = 'none';
    playerNameContainer.style.display = 'none';
  }
  