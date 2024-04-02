import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams, Link, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import { Breadcrumb } from "react-bootstrap";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses({ courses }: { courses: any[]; }) {
  const { courseId } = useParams();
  const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);


  const location = useLocation();

  const isHomeRoute = location.pathname.includes('/Home');
  const isModulesRoute = location.pathname.includes('/Modules');
  const isPiazzaRoute = location.pathname.includes('/Piazza');
  const isGradesRoute = location.pathname.includes('/Grades');
  const isAssignmentsRoute = location.pathname.includes('/Assignments');

  return (
    <div>
      <h1>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/Kanbas/Dashboard" }}>
            <HiMiniBars3 /> Courses
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/Kanbas/Courses/${course?._id}/Home` }}>
            {course?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {isHomeRoute && 'Home'}
            {isModulesRoute && 'Modules'}
            {isPiazzaRoute && 'Piazza'}
            {isGradesRoute && 'Grades'}
            {isAssignmentsRoute && 'Assignments'}
          </Breadcrumb.Item>
        </Breadcrumb>
      </h1>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
