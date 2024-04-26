import db from "../../Database";
import { useParams } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

function Grades() {
  const { courseId } = useParams();
  const as = db.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  const es = db.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
  return (
    <div>
      <h1>Grades</h1>
      <div className="d-flex justify-content-end align-items-center">
        <button type="button" className="btn btn-light border me-2">
          <i className="fas fa-file-import"></i> Import
        </button>

        <div className="btn-group me-3">
          <button
            type="button"
            className="btn btn-light border dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-file-export"></i> Export
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Export
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Export Current Gradebook View
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Export Entire Gradebook
              </a>
            </li>
          </ul>
        </div>

        <button type="button" className="btn btn-light border p-1">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <div>
        <div className="row">
          <div className="col">
            <h4>Student Names</h4>
          </div>
          <div className="col">
            <h4>Assignment Names</h4>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="dropdown">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control dropdown-toggle"
                  id="dropdownSearch"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  placeholder="Search Students"
                />
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownSearch">
                  <li>
                    <a className="dropdown-item" href="#">
                      A1 Setup
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      A2 HTML
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      A3 CSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="dropdown">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control dropdown-toggle"
                  id="dropdownSearch"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  placeholder="Search Assignments"
                />
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownSearch">
                  <li>
                    <a className="dropdown-item" href="#">
                      A1 Setup
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      A2 HTML
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      A3 CSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-light border my-3">Apply Filters</button>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="border">
            <th>Student Name</th>
            {as.map((assignment) => (
              <th>{assignment.title}</th>
            ))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = db.users.find(
                (user) => user._id === enrollment.user
              );
              return (
                <tr>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  {db.assignments.map((assignment) => {
                    const grade = db.grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return <td>{grade?.grade || ""}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
