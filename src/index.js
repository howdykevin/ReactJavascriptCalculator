import React from "react";
import ReactDOM from "react-dom";
import Operator from "./components/operation";
import Pad from "./components/calculatorPad";

import "./styles.css";

class App extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "azure";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <div>
        <Pad />
        <div className="text-center">Coded by Kevin.G</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
