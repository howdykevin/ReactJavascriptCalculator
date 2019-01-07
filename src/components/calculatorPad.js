import React from "react";
import Operation from "./operation";
import variables from "./variables";

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: "",
      display: "0",
      currentVal: "",
      prevState: ""
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleFormulaScreenNumber = this.handleFormulaScreenNumber.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleDecimals = this.handleDecimals.bind(this);
  }

  //number and decimal buttons
  handleNumber(event) {
    console.log(event.target.value);
    if (this.state.display === "0") {
      this.setState(
        {
          display: event.target.value,
          prevState: event.target.value
        },
        () => this.handleFormulaScreenNumber()
      );
    } else {
      //if user clicks a new number after evaluation, start new calculation
      if (this.state.prevState === "=") {
        this.setState({
          display: event.target.value,
          prevState: event.target.value,
          working: event.target.value
        });
      } else {
        this.setState(
          {
            display: this.state.display + event.target.value,
            prevState: event.target.value
          },
          () =>
            this.setState({
              //mainly after hitting operator so that the formula screen will
              //continue to append while display screen takes in input
              working:
                this.state.display !== this.state.working
                  ? this.state.working + this.state.prevState
                  : this.state.display
            })
        );
      }
    }
    //this is to put the operator in the working screen ,not in display screen
    if (
      this.state.prevState === "+" ||
      this.state.prevState === "-" ||
      this.state.prevState === "*" ||
      this.state.prevState === "/"
    ) {
      this.setState(
        {
          display: event.target.value
        },
        () =>
          this.setState({
            working: this.state.working + this.state.display,
            prevState: ""
          })
      );
    }
  }

  handleFormulaScreenNumber() {
    this.setState({
      working: this.state.display
    });
  }

  //operators buttons
  handleOperation(event) {
    if (!(this.state.display === "0")) {
      //if user clicks on operators consecutively, replace the existing operator
      //with latest operator
      if (
        this.state.prevState === "+" ||
        this.state.prevState === "-" ||
        this.state.prevState === "*" ||
        this.state.prevState === "/"
      ) {
        this.setState({
          working: this.state.working.replace(
            this.state.prevState,
            event.target.value
          ),
          prevState: event.target.value
        });
      } else {
        //else do as normal
        this.setState({
          working: this.state.working + event.target.value,
          prevState: event.target.value
        });
      }
    }
  }

  //handledecimals
  handleDecimals(event) {
    //cannot have more than 2 decimal point
    if (!this.state.display.includes(".")) {
      this.setState(
        {
          display: this.state.display + event.target.value,
          prevState: event.target.value
        },
        () =>
          this.setState({
            working: this.state.working + "."
          })
      );
    }
    //if decimal is hit after operator display '0.'
    if (
      this.state.prevState === "+" ||
      this.state.prevState === "-" ||
      this.state.prevState === "*" ||
      this.state.prevState === "/"
    ) {
      this.setState(
        {
          display: "0.",
          prevState: event.target.value
        },
        () =>
          this.setState({
            working: this.state.working + "0."
          })
      );
    }
  }
  //reset everything
  clearDisplay() {
    console.log("clear");
    this.setState({
      working: "",
      display: "0",
      currentVal: ""
    });
  }

  evaluate() {
    //no evaluation allowed if display is 0
    if (this.state.display !== "0") {
      const endWithOperators = /(-|\+|x|\/)$/g;
      let expression = "";
      if (endWithOperators.test(this.state.working)) {
        expression = this.state.working.slice(0, -1);
      } else {
        expression = this.state.working;
      }
      let result = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        display: result.toString(),
        working: result.toString(),
        currentVal: result.toString(),
        prevState: "="
      });
    }
  }

  render() {
    const pads = variables.map((item, index) => {
      return (
        <Operation
          key={index}
          id={item.class}
          val={item.operation}
          name={item.name}
          handleChange={this.handleNumber}
          clear={this.clearDisplay}
          eval={this.evaluate}
          calculate={this.handleOperation}
          decimal={this.handleDecimals}
        />
      );
    });
    return (
      <div className="grid-container mt-4">
        <div className="item1 display text-right text-warning">
          {this.state.working}
        </div>
        <div className="item2 display text-right" id="display">
          {this.state.display}
        </div>
        {pads}
      </div>
    );
  }
}

export default Pad;
