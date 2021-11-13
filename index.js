window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  // 3 constants to determine endGame state
  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';

  /*
    Indexes in the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
  */

  // winning state
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  function handleResultValidation() {
    let roundWon = false;
    // run loop for each row in winningConditions array
    for (let i=0; i<=7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]]; // if 1st row
      const b = board[winCondition[1]]; // if 2nd row
      const c = board[winCondition[2]]; // if 3rd row
      // if any horizontal row is blank, keep playing
      if (a === '' || b === '' || c === '') {
        continue;
      }
      // if 1st and 2nd row are equal or 2nd and 3rd row are equal, then someone won
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    // if every cell has been played
    if (!board.includes(''))
      announce(TIE);
    }

  const announce = (type) => {
    switch(type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE: 
        announcer.innerText = 'Tie Game';  
    }
    announcer.classList.remove('hide');
  };

  // if someone has already played a tile, they cannot choose it again in the same game
  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    // have board have 9 empty strings
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    // hide the announcer
    announcer.classList.add('hide');

    // PlayerX starts first every time
    if (currentPlayer === 'O') {
      changePlayer();
    }

    // make every tile empty and remove classes from each tile
    tiles.forEach(tile => {
      tile.innerText = "";
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
  });

  resetButton.addEventListener('click', resetBoard);
});