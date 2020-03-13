import React, { useState, useEffect } from "react"
import "./App.css"
import Squares from "./components/Squares"
import styles from "./components/start.module.css"
import clsx from "clsx"

function App() {
  const boardSize = 9
  const [board, setBoard] = useState(Array(boardSize).fill(0))
  const [moveCount, setMoveCount] = useState(0)
  const [next, setNext] = useState("X")
  const [disableUndo, setDisableUndo] = useState(false)
  const [results, setResults] = useState("")
  const initialHistory = [ 
    { board: Array(boardSize).fill(0) }
  ]
  const [history, setHistory] = useState(initialHistory)
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
      updateResults()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount]);

  const undoMove = () => {
    if (history.length > 1) {
      let h = history.slice(0)
      setBoard(h[h.length - 2].board)
      setHistory(h.slice(0, h.length - 1))
      setMoveCount(prevCount => prevCount - 1)
      setResults("")
      toggleNext()
    }
  };

  const updateResults = () => {
    let winner = getWinner()
    let endGame = false
    if (winner) {
      setResults(winner)
      endGame = true
    } else if (moveCount === boardSize) {
      setResults("Tied")
      endGame = true
    }
    if (endGame) {
      setDisableUndo(true)
      setNext(null)
    }
  };

  const toggleNext = () => {
    setNext(next === "X" ? "O" : "X")
  };

  const handleClick = v => {
    if (board[v] === 0 && results === "") {
      let newBoard = board.slice(0)
      newBoard[v] = next
      setBoard(newBoard)
      toggleNext()
      setHistory(() => history.concat([{ board: newBoard }]))
      setMoveCount(prevCount => prevCount + 1)
    }
  };

  const newGame = () => {
    setBoard(Array(boardSize).fill(0))
    setNext("X")
    setMoveCount(0)
    setHistory(initialHistory)
    setDisableUndo(false)
    setResults("")
  };

  const getWinner = () => {
    for (let i = 0; i < validCombinations.length; i++) {
      const [first, second, third] = validCombinations[i]
      if (
        board[first] &&
        board[first] !== 0 &&
        board[first] === board[second] &&
        board[second] === board[third]
      ) {
        return board[first]
      }
    }
    return null
  };

  const displayResults = () => {
    if (results !== "") {
      if (results === "Tied") {
        return <>Result is tied</>
      }
      else return (
          <>
            Winner is&nbsp;
            <span className={clsx(results === "O" ? styles.o : styles.x)}>
              {results}
            </span>
          </>
      )     
    } 
    else return <>&nbsp;</>
  };

  return (
    <div className="App">
      <div className={styles.header}>
        <header>Tic Tac Toe</header>
        <div>{displayResults()}</div>
      </div>

      <div className={styles.nextMove}>
        {next && <span> {next} goes next</span>}&nbsp;
      </div>

      <div className={styles.center}>
        <Squares onClick={handleClick} board={board}></Squares>
        <button style={{marginTop:"30px"}} disabled={disableUndo} onClick={undoMove}>Undo Move</button>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  )
}

export default App;
