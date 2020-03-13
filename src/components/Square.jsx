import React from "react"
import styles from "./start.module.css"
import clsx from "clsx"

function Square(props) {
  const getDisplayValue = () => {
    return (
      <>
        {props.display === 0 && <span />}
        {props.display !== 0 && (
          <span
            className={clsx(
              props.display === "X" && styles.x,
              props.display === "O" && styles.o
            )}
          >
            {props.display}
          </span>
        )}
      </>
    )
  };

  return (
    <div
      className={styles.cell}
      onClick={() => props.onClick(props.value)}
      value={props.value}
    >
      {getDisplayValue()}
    </div>
  );
}

export default Square;
