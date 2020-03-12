import React from "react"
import styles from "./start.module.css"
import clsx from "clsx"

function Square(props) {
  const getDisplayValue = () => {
    if (props.cellValue === 0) {
      return <span></span>
    }
    else return (
        <span className={clsx(props.cellValue==="X" && 
            styles.x, props.cellValue==="O" && styles.o )}>{props.cellValue}
        </span>
    )
  };

  return (
    <div className={styles.cell}
      onClick={()=> props.onClick(props.value)}
      value={props.value}
    >
      {getDisplayValue()}
    </div>
  );
}

export default Square;
