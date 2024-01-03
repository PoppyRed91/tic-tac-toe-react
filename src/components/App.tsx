import { useState } from "react";

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

function Square({value, onSquareClick}: SquareProps) {
  return <button onClick={onSquareClick} className="square">{value}</button>
}

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void
}

function Board({xIsNext, squares, onPlay}: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] != null || calculateWinner(squares)) {
      return;
    }
    
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={function() { handleClick(0)}}/>
        <Square value={squares[1]} onSquareClick={function() { handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick={function() { handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={function() { handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick={function() { handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick={function() { handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={function() { handleClick(6)}}/>
        <Square value={squares[7]} onSquareClick={function() { handleClick(7)}}/>
        <Square value={squares[8]} onSquareClick={function() { handleClick(8)}}/>
      </div>
    </>
  );
}






export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1)
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })



  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

function calculateWinner(squares: string[]) {
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
      return squares[a];
    }
  }
  return null;
}



/*

- Add top level component named Game and make it default
- Remove default keyword from the Board component
- Move "xIsNext" state variable from Board to Game
- Add new state variable "history" which will hold array states from previous moves
- Create props "xIsNext, squares and onPlay" for the Board component and pass them from Game
- handlePlay function will control the history of the board and the player turn
- Explain the setHistory syntax
- Explain the .map() function and how it changes the array
- Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `Game`.
- Make Game component track current move and the current board array

*/