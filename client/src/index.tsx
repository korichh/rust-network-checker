import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Options from "./pages/Options";

createRoot(document.getElementById("root")!).render(
  <Router>
    <div className="w-full min-h-full flex bg-default-light">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </div>
  </Router>
);
