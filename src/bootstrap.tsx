import ReactDOM from "react-dom/client";
import App from "./App";

const rootNode = document.getElementById("root");
if (!rootNode) throw new Error("Root Node Not Found");
const root = ReactDOM.createRoot(rootNode);

root.render(<App />);
