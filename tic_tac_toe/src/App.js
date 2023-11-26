import './App.css';
import { useState } from 'react';

// square component
const Square = ({ value, onSquareClick }) => {
  return (
    <button 
    className='square'
    onClick={onSquareClick}
    >
      {value}
    </button>
  )
};

// board component
function Board({ xIsNext, squares, onPlay}) {
  // handle's click events
  const handleClick = (i) => {
    // prevents changing the X to O
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares)
  }

  // checks for the winner of the game
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next Player is ${xIsNext ? 'X' : 'O'}`
  }


  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

// Game component (the main component)
export default function Game() {
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentMove, setcurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHIstory = [...history.slice(0, currentMove + 1), nextSquares];
    sethistory(nextHIstory);
    setcurrentMove(nextHIstory.length - 1);
  }

  function jumpTo(nextMove) {
    setcurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })


  return (
    <div className='game'>
      <div className='game-board'>
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// helper function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //returns the winner
    }
  }
  return null;
}

