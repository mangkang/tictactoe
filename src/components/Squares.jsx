import React from "react";
import Square from "./Square";
import styles from "./start.module.css";

function Squares(props) {

  const getNext = () => {
    return props.next;
  };

  const clickHandler = v => {
    props.onClick(v);
  };

  const drawSquare = (i, v) => {
    return (
      <Square
        content={getNext()}
        getNext={getNext}
        onClick={clickHandler}
        cellValue={v}
        value={i}
      />
    );
  };

  const drawBoard = () => {
    let arr = [];
    if (props.board !== undefined) {
      for (let i = 0; i < props.board.length; i += 3) {
        arr.push(
          <div key={i} className={styles.row}>
            <>{drawSquare(i, props.board[i])}</>
            <>{drawSquare(i + 1, props.board[i + 1])}</>
            <>{drawSquare(i + 2, props.board[i + 2])}</>
          </div>
        );
      }
    }
    return arr;
  };

  return (
    <>
      <div className={styles.board}>{drawBoard()}</div>
    </>
  );
}

export default Squares;
