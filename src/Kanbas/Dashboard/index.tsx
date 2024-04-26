import React, { useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";
import DefaultImage from "./images/DefaultCourseImage.png";
import NEU from "./images/NEU.jpeg";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input
        value={course.name}
        className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        className="form-control"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.startDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        className="form-control mb-2"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />
      <button className="btn btn-danger" onClick={addNewCourse}>
        Add
      </button>
      <button className="btn btn-danger ms-2" onClick={updateCourse}>
        Update
      </button>
      <hr />

      <h2>{`Published Courses (${courses?.length})`}</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses?.map((course) => (
            <div className="col" style={{ width: "340px" }}>
              <div className="card">
                <img
                  src={course.image || NEU}
                  className="card-img-top"
                  style={{ height: "170px" }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course.id}`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}

                    <button
                      className="btn border ms-1"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn border ms-1"
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                  <p className="card-text">
                    {course.description.split(" ").slice(0, 8).join(" ") +
                      (course.description.split(" ").length > 10 ? "..." : "")}
                  </p>
                  <Link to={"#"} className="btn btn-danger">
                    Go
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <pre>
        <code>{JSON.stringify(courses, null, 2)}</code>
      </pre> */}
    </div>
  );
}

export default Dashboard;
