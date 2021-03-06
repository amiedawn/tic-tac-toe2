window.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');
  const turn = document.querySelector('.turn');

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 'X';
  let isGameActive = true;

  // 3 constants to determine endGame state
  const PLAYER_X_WON = 'PLAYER_X_WON!';
  const PLAYER_O_WON = 'PLAYER_O_WON!';
  const DRAW = 'DRAW';

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
      announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
      isGameActive = false;
      return;
    }

    // if every cell has been played
    if (!board.includes(''))
      announce(DRAW);
    }

  function announce(type) {  
    switch(type) {
      case PLAYER_O_WON:
        turn.classList.add('hide');
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
        break;
      case PLAYER_X_WON:
        turn.classList.add('hide');
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
        break;
      case DRAW: 
        turn.classList.add('hide');
        announcer.innerText = 'Draw!';  
    }
    announcer.classList.remove('hide');
  };

  // if someone has already played a cell, they cannot choose it again in the same game
  function isValidAction(cell) {
    if (cell.innerText === 'X' || cell.innerText === 'O') {
      return false;
    }

    return true;
  };

  function updateBoard(index) {  
    board[index] = currentPlayer;
  };

  function changePlayer() {  
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  function userAction(cell, index) {  
    if (isValidAction(cell) && isGameActive) {
      cell.innerText = currentPlayer;
      cell.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  function resetBoard() {  
    // have board have 9 empty strings
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    // hide the announcer
    announcer.classList.add('hide');
    // show the turn
    turn.classList.remove('hide');

    // Player_X starts first every time
    if (currentPlayer === 'O') {
      changePlayer();
    }

    // make every cell empty and remove classes from each cell
    cells.forEach(cell => {
      cell.innerText = "";
      cell.classList.remove('playerX');
      cell.classList.remove('playerO');
    });
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
  });

  resetButton.addEventListener('click', resetBoard);
});