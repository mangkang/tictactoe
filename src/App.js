import React, { useState, useEffect } from "react";
import "./App.css";
import Squares from "./components/Squares";
import styles from "./components/start.module.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [moveCount, setMoveCount] = useState(0);
  const [results, setResults] = useState("");
  const [next, setNext] = useState("X");
  const initialHistory = [
    {
      board: Array(9).fill(0)
    }
  ];
  const [history, setHistory] = useState(initialHistory);

  const validCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  useEffect(() => {
      if (moveCount > 0) {
        updateResults();
      }
  }, [moveCount]);

  const undoMove = () => {
    if (history.length > 1) {
      let h = history.slice(0);
      setBoard(h[h.length - 2].board);
      setHistory(() => {
        return h.slice(0, h.length - 1);
      });
      setResults("");
      toggleNext();
      setMoveCount(() => moveCount - 1);
    } else {
      setHistory(initialHistory);
    }
  };

  const updateResults = endGame => {
    let winner = getWinner();
    if (winner) {
      setResults(winner + " wins.");
    } else if (moveCount === 9) {
      setResults("Tied Game");
    }
  };

  const toggleNext = () => {
    setNext(next === "X" ? "O" : "X");
  };

  const handleClick = v => {
    if (board[v] === 0) {
      let newBoard = board.slice(0)
      newBoard[v] = next
      setBoard(newBoard);
      toggleNext();
      setHistory(() => history.concat([{ board: newBoard }]))
      setMoveCount(() => moveCount + 1)
    }
  };

  const newGame = () => {
    setBoard(Array(9).fill(0))
    setResults("")
    setNext("X")
    setMoveCount(0)
    setHistory(initialHistory)
  };

  const getWinner = () => {
    for (let i = 0; i < validCombinations.length; i++) {
      const [first, second, third] = validCombinations[i];
      if (
        board[first] &&
        board[first] !== 0 &&
        board[first] === board[second] &&
        board[second] === board[third]
      ) {
        return board[first];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <header>Tic Tac Toe</header>
      <div>
        <>{results && <span> Result is {results} </span>}</>
      </div>

      <div className={styles.nextMove}>
        <>{next && <span> {next} goes next</span>}</>
      </div>

      <div className={styles.center}>
        <Squares next={next} onClick={handleClick} board={board}></Squares>
        <br />
        <br />
        <button onClick={undoMove}>Undo Move</button>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;
