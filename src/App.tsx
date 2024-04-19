import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Kanbas from "./Kanbas";
import HomePage from "./Kanbas";
import Quizzes from "./Kanbas/Courses/Quizzes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/Kanbas/Courses/RS101/Quizzes" />}
        />
        <Route path="/Kanbas/*" element={<Kanbas />} />
      </Routes>
    </Router>
  );
}

export default App;
