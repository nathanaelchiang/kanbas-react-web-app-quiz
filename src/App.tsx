import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Kanbas from "./Kanbas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
        <Route path="/Kanbas/*" element={<Kanbas />} />
      </Routes>
    </Router>
  );
}

export default App;
