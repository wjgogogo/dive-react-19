import { createRoot } from "react-dom/client";
import "./index.css";

const root = createRoot(document.getElementById("root"));

console.log("🚀 ~ root:", root);

const props = {};

function Child() {
  return <div>Child</div>;
}
function App() {
  const element = (
    <h1 key={"key"} className="h1">
      Hello, world!
    </h1>
  );

  return (
    <div {...props} key={"key"}>
      {element} <Child />
    </div>
  );
}

root.render(<App />);
