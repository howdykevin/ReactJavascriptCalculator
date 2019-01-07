import React from "react";
import variables from "./variables";

function Operators(props) {
  let styles = "";
  if (props.val === "AC") {
    styles = "btn btn-danger";
  } else if (props.val === "=") {
    styles = "btn btn-primary";
  } else {
    styles = "btn btn-secondary";
  }
  return (
    <button
      className={styles}
      id={props.id}
      value={props.val}
      onClick={
        props.val === "AC"
          ? props.clear
          : props.val === "="
          ? props.eval
          : props.val === "."
          ? props.decimal
          : !(
              props.val === "+" ||
              props.val === "-" ||
              props.val === "*" ||
              props.val === "/"
            )
          ? props.handleChange
          : props.calculate
      }
    >
      {props.name}
    </button>
  );
}

export default Operators;
