import React from "react";

import { useParams, Routes, Route, Navigate } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";

import Quizzes from "./Quizzes";
import QuizDetail from "./Quizzes/QuizDetail";
import CourseNavigation from "./Navigation";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/Preview";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";

function Courses({ courses }: { courses: any[] }) {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <div>
      <h1 className="ms-3 text-danger d-flex align-items-center">
        <HiMiniBars3 className="me-2" />
        Course {course?.name}
      </h1>
      <hr />

      <div className="d-flex">
        <CourseNavigation />

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Assignments/New" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />

            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetail />} />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEditor />} />
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
