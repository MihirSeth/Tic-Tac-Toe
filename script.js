
let gameArray = ['','','','','','','','','',];

let defaultArray = ['','','','','','','','','',];

const gameTiles = document.querySelectorAll(".gameboardTiles");
const resetButton = document.getElementById('reset')

resetButton.addEventListener('click', resetGrid);

function resetGrid(){
    for(i=0; i<gameArray.length ;i++){
        gameTiles[i].innerHTML = ' '
        gameArray = ['','','','','','','','','']
        // gameTiles[i].style.color = 'black'
    }
}

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
    let round = 1;
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


function gameTilesPress(tile){
    // console.log(tile)
    tile.addEventListener('click', addInfoArray);

    function addInfoArray(){
        // console.log(gameController.setCurrentPlayer())

        if (gameArray[tile.dataset.id]===''){
            gameArray[tile.dataset.id] = gameController.setCurrentPlayer()
        }
        formGrid()
    }
}

window.onload = () => {
    // gameController()
}
  


