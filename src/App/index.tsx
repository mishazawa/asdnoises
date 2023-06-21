import { createRoot } from "react-dom/client";
import { Canv } from "./canv";

function App() {
  return (
    <div className="mx-auto w-full h-screen">
      <Canv />
    </div>
  );
}
const el = document.getElementById("root");
const root = createRoot(el);
root.render(<App />);
