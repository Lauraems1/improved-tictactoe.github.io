import React from 'react';
import './App.css';

  const Board = () => {
    // 1st player is X ie 1
    // State keeps track of next player and gameState
    const [player, setPlayer] = React.useState(1);
    const [gameState, setGameState] = React.useState([]);
    let status = `${checkForWinner(gameState)}`;
    
    //const [status, setStatus] = React.useState('Next Player: Player X');
  
    // Part 1 step 1 code goes here
    // Use conditional logic to set a variable to either 'Player O' or  'Player X'
  
    const nextPlayer = player === 1 ? 'Player X' : 'Player O';
  
    const takeTurn = (id) => {
      setGameState(prevState => [...prevState, { id: id, player: player }]);
        // After updating the gameState, check for a winner
      let winner = checkForWinner(gameState);
      // Set the status: If there's a winner, display the winner's name, otherwise show the next player's turn
      status = winner !== 'No Winner Yet' ? winner : `Next Player: ${nextPlayer}`;
      setPlayer((player + 1) % 2);  // get next player
      };
    
      function renderSquare(i) {
        // use properties to pass callback function takeTurn to Child
        return <Square takeTurn={takeTurn} id={i} player={player}></Square>;
      }
     
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 id="turn">Next Player: {nextPlayer}</h1>
        <h1 id="turn">{status}</h1>
      </div>
    </div>
  );
};

const Square = ({ takeTurn, id, player }) => {
  const mark = ['O', 'X'];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // You call takeTurn to tell Parent that the square has been filled
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(null); 

const handleClick = () => {
  if (filled) return;  // Ignore click if already filled
  setTik(player);  // Set tik to the current player's number
  setFilled(true);
  takeTurn(id);
  console.log(`Square: ${id} filled by player: ${player}`);
};

      const markColor = tik === 0 ? 'white' : tik === 1 ? 'red' : '';

  return (
    <button 
      // Part 2: update the return statement below to add css classes
      onClick={handleClick} 
      className={`square ${markColor}`}>
      <h1>{mark[tik]}</h1>
    </button>
  );
};

// Checking for Winner takes a bit of work
// Use JavaScript Sets to check players choices
// against winning combinations
// Online there is more compact version but Dr. Williams prefers this one

const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = (gameState) => {

  // get array of box id's
  // can't be a winner in less than 5 turns
  if (gameState.length < 5) return 'No Winner Yet';

  let p0 = gameState.filter((item) => item.player === 0).map((item) => item.id);
  let px = gameState.filter((item) => item.player === 1).map((item) => item.id);

  let win0 = win.filter((item) => isSuperset(new Set(p0), new Set(item)));
  let winX = win.filter((item) => isSuperset(new Set(px), new Set(item)));

  if (win0.length > 0) return 'Winner is Player O';
  if (winX.length > 0) return 'Winner is Player X';
  return 'No Winner Yet';
};

// check if subset is in the set
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;

}

export default function App() {
  return <Board />;
}