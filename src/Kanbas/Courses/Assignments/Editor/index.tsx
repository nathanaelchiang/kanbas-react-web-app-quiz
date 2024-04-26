import React from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  updateAssignment,
  setAssignment,
  setAssignments,
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {
  const dispatch = useDispatch();
  const { courseId, assignmentId } = useParams();

  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const navigate = useNavigate();

  const handleSave = async () => {
    if (assignmentId) {
      console.log("final", assignment);
      const status = await client.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    } else {
      client
        .createAssignment(courseId as string, assignment)
        .then((assignment) => {
          dispatch(addAssignment(assignment));
        });
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div className="me-2">
      <div className="d-flex justify-content-end align-items-center gap-2">
        <div className="text-success">
          <FaCheckCircle /> Published
        </div>
        <button className="btn border">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <h2>Assignment Name</h2>
      <input
        value={assignment?.title}
        className="form-control mb-2"
        onChange={(e) =>
          dispatch(setAssignment({ ...assignment, title: e.target.value }))
        }
      />

      <div className="flex-grow-1">
        <textarea
          className="form-control"
          value={
            assignment?.description
              ? assignment.description
              : "This is the assignment description."
          }
          onChange={(e) =>
            dispatch(
              setAssignment({ ...assignment, description: e.target.value })
            )
          }
        ></textarea>
        <br />
        <br />

        <div className="container">
          <div className="row mb-3">
            <div className="col-md-4 text-end">
              <label htmlFor="points" className="form-label">
                Points
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                value={assignment.points}
                id="points"
                className="form-control"
                onChange={(e) =>
                  dispatch(
                    setAssignment({ ...assignment, points: e.target.value })
                  )
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 text-end">
              <label htmlFor="displayGrade" className="form-label">
                Assign
              </label>
            </div>
            <div className="col-md-5 border rounded">
              <label htmlFor="due">Due</label>
              <input
                type="date"
                value={assignment.due ? assignment.due : null}
                className="form-control mb-3"
                id="due"
                onChange={(e) =>
                  dispatch(
                    setAssignment({ ...assignment, due: e.target.value })
                  )
                }
              />

              <div className="d-flex">
                <div className="flex-grow-1 me-2">
                  <label htmlFor="available-from">Available from</label>
                  <br />
                  <input
                    type="date"
                    value={
                      assignment.availableFrom ? assignment.availableFrom : null
                    }
                    className="form-control mb-4"
                    id="available-from"
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableFrom: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="flex-grow-1">
                  <label htmlFor="">Until</label>
                  <br />
                  <input
                    type="date"
                    value={
                      assignment.availableUntil
                        ? assignment.availableUntil
                        : null
                    }
                    className="form-control"
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableUntil: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="d-flex">
          <div className="ms-auto">
            <button
              className="btn btn-success ms-2 float-end"
              onClick={handleSave}
            >
              Save
            </button>
            <Link
              to={`/Kanbas/Courses/${courseId}/Assignments`}
              className="btn btn-danger float-end"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AssignmentEditor;
