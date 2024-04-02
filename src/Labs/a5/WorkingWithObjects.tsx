import React, { useEffect, useState } from "react";
import axios from "axios";
import { setModule } from "../../Kanbas/Courses/Modules/reducer";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: "1", name: "Module Test Name",
    description: "Testing this module", course: "Sample Course"
  });

  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);


  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text"
        onChange={(e) => setAssignment({
          ...assignment,
          title: e.target.value
        })}
        value={assignment.title} /><br />
      <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <input
        type="checkbox"
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        checked={assignment.completed}
      /><br />
      <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="number"
        onChange={(e) => setAssignment({
          ...assignment,
          score: parseInt(e.target.value)
        })}
        value={assignment.score} />
      <h4>Retrieving Objects</h4>
      <a href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>
      <h4>Retrieving Properties</h4>
      <a href={`${API_BASE}/a5/module`}>
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a href={`${API_BASE}/a5/module.name`}>
        Get Module Name
      </a>
      <h4>Modifying Properties</h4>
      <a href={`${API_BASE}/a5/module/name/${module.name}`}>
        Update Module Name
      </a>
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          name: e.target.value
        })}
        value={module.name} /><br />
      <a href={`${API_BASE}/a5/module/description/${module.description}`}>
        Update Module Description
      </a>
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          description: e.target.value
        })}
        value={module.description} />
            <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>
    </div>
  );
}
export default WorkingWithObjects;