import { createRoot } from "react-dom/client";
import { Component, useState, useEffect } from "react";
import "./index.css";

const root = createRoot(document.getElementById("root"));

class Counter extends Component {
  state = {
    count: 1,
  };
  onClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "shouldComponentUpdate",
      this.props,
      nextProps,
      this.state,
      nextState
    );
    return true;
  }
  render() {
    return (
      <div>
        <div>counter is: {this.state.count}</div>
        <button onClick={this.onClick}> Add </button>
      </div>
    );
  }
}

function Input() {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    console.log("input has changed", input);
  }, [input]);

  return (
    <div>
      <input value={input} onChange={onChange} />
      <span style={{ marginLeft: 20 }}>input is: {input}</span>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="h1">Hello, world!</h1>
      <Input />
      <Counter />
    </div>
  );
}

root.render(<App />);
