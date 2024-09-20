import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log("🚀 ~ root:", root);

function Test(){
  return <h1>test</h1>
}

root.render(<Test />);
