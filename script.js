let round;


let gameArray = ['','','','','','','','','',];

let defaultArray = ['','','','','','','','','',];

const gameTiles = document.querySelectorAll(".gameboardTiles");
const resetButton = document.getElementById('reset')

resetButton.addEventListener('click', resetGrid);



// gameTiles.addEventListener('click', gameTilesPress);

gameTiles.forEach(gameTilesPress);




function formGrid(){
    // console.log(gameTiles[1])
    for(i=0; i<gameArray.length ;i++){
        gameTiles[i].innerHTML = gameArray[i]
        gameTiles[i].style.color = 'black'
    }
}

const gameController = (() => {
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = '';
    round = 1;
    // let isOver = false;

    function setCurrentPlayer(){
        if (round%2===1){
            currentPlayer = playerX
            round++
            return playerX
        } else{

            currentPlayer = playerO
            round++
            return playerO
        }
        
    }   

    return {setCurrentPlayer};
})();

function resetGrid(){
    for(i=0; i<gameArray.length ;i++){
        gameTiles[i].innerHTML = ' '
        gameArray = ['','','','','','','','','']
        // gameTiles[i].style.color = 'black'
    }

    round = 1
}

function gameTilesPress(tile){
    // console.log(tile)
    tile.addEventListener('click', addInfoArray);

    function addInfoArray(){
        // console.log(gameController.setCurrentPlayer())

        if (gameArray[tile.dataset.id]===''){
            gameArray[tile.dataset.id] = gameController.setCurrentPlayer()
            checkWinner()
        }
        formGrid()
    }
}

const checkWinner = () => {
    const winningMoves = 
        [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    indexesOfX = []
    indexesOfO = []

    for(i = 0; i < gameArray.length; i++){
        if (gameArray[i] === 'X'){
            indexesOfX.push(i);
        } else if(gameArray[i] === 'O'){
            indexesOfO.push(i);
        }
    }

    // console.log(indexesOfX, indexesOfO)

    // let count = 0;
    // for(i=0; i<8;i++){
        // console.log(i)

        // for(j=0; j<indexesOfX.length; i++){

            // console.log(indexesOfX[j])

            // if(winningMoves[i][0]===indexesOfX[j] || winningMoves[i][1]===indexesOfX[j] || winningMoves[i][2]===indexesOfX[j]){
            //     count++
            // }

    //     }
        
    // }

    // console.log(count)
    
}


window.onload = () => {
    // checkWinner()
}
  


