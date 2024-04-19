import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import db from "./Database";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";

const courses = db.courses;

function Kanbas() {
  return (
    <Provider store={store}>
      <div className="d-flex">
        <div>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/Courses/:courseId/*"
              element={<Courses courses={courses} />}
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;
