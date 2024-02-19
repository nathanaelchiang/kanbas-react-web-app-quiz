import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams, Link, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import { Breadcrumb } from "react-bootstrap";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";

function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const location = useLocation();

  const isModulesRoute = location.pathname.includes('/Modules');
  const isPiazzaRoute = location.pathname.includes('/Piazza');
  const isGradesRoute = location.pathname.includes('/Grades');
  const isAssignmentsRoute = location.pathname.includes('/Assignments');

  return (
    <div>
      <h1>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/Dashbboard" }}>
            <HiMiniBars3 /> Courses
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/Courses/${course?._id}` }}>
            {course?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
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
