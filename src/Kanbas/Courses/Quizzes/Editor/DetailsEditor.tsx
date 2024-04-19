import React, { useState } from "react";
import { FaBan, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function QuizDetailsEditor() {
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    description: "",
    type: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    multipleAttempts: false,
    timeLimitCheck: false,
    timeLimit: "",
    assignTo: "Everyone",
    oneQuestion: true,
    webcam: false,
    lockQuestions: false,
    dueDate: "",
    availableDate: "",
    untilDate: ""
  });

  const handleInputChange = (e: any) => {
  const { name, value, type, checked } = e.target;
  setQuizDetails((prevDetails) => ({
    ...prevDetails,
    [name]: type === "checkbox" ? checked : value
  }));
};


  return (
    <div>
      <div className="quiz-detail-editor">
  <div className="form-group">
    <label>Quiz Name</label>
    <textarea
      value={quizDetails.name}
      onChange={handleInputChange}
      name="name"
      className="form-control"
    ></textarea>
  </div>

  <div className="form-group">
    <label>Description</label>
    <textarea
      value={quizDetails.description}
      onChange={handleInputChange}
      name="description"
      className="form-control"
    ></textarea>
  </div>

  <div className="form-group">
    <label>Quiz Type</label>
    <select
      value={quizDetails.type}
      onChange={handleInputChange}
      name="type"
      className="form-control"
    >
      <option value="Graded Quiz">Graded Quiz</option>
      <option value="Ungraded Quiz">Ungraded Quiz</option>
      <option value="Graded Survey">Graded Survey</option>
      <option value="Ungraded Survey">Ungraded Survey</option>
    </select>
  </div>

  <div className="form-group">
  <label>Points</label>
  <input
    type="number"
    value={quizDetails.points}
    onChange={handleInputChange}
    name="points"
    className="form-control"
  />
</div>

<div className="form-group">
  <label>Assignment Group</label>
  <select
    value={quizDetails.assignmentGroup}
    onChange={handleInputChange}
    name="assignmentGroup"
    className="form-control"
  >
    <option value="Quizzes">Quizzes</option>
    <option value="Exams">Exams</option>
    <option value="Assignments">Assignments</option>
    <option value="Project">Project</option>
  </select>
</div>

<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.shuffleAnswers}
      onChange={handleInputChange}
      name="shuffleAnswers"
    />
    Shuffle Answers
  </label>
</div>

<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.multipleAttempts}
      onChange={handleInputChange}
      name="multipleAttempts"
    />
    Allow Multiple Attempts
  </label>
</div>

<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.timeLimitCheck}
      onChange={handleInputChange}
      name="timeLimitCheck"
    />
    Time Limit
  </label>
  {quizDetails.timeLimitCheck && (
    <input
      type="text"
      value={quizDetails.timeLimit}
      onChange={handleInputChange}
      name="timeLimit"
      className="form-control"
      placeholder="Enter time in minutes"
    />
  )}
</div>

<div className="form-group">
  <label>Assign To</label>
  <select
    value={quizDetails.assignTo}
    onChange={handleInputChange}
    name="assignTo"
    className="form-control"
  >
    <option value="Everyone">Everyone</option>
    <option value="Undergraduates">Undergraduates</option>
    <option value="Graduates">Graduates</option>
  </select>
</div>


<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.oneQuestion}
      onChange={handleInputChange}
      name="oneQuestion"
    />
    One Question
  </label>
</div>

<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.webcam}
      onChange={handleInputChange}
      name="webcam"
    />
    Webcam
  </label>
</div>

<div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={quizDetails.lockQuestions}
      onChange={handleInputChange}
      name="lockQuestions"
    />
    Lock Questions
  </label>
</div>

<div className="form-group">
  <label>Due Date</label>
  <input
    type="date"
    value={quizDetails.dueDate}
    onChange={handleInputChange}
    name="dueDate"
    className="form-control"
  />
</div>

<div className="form-group">
  <label>Available From</label>
  <input
    type="date"
    value={quizDetails.availableDate}
    onChange={handleInputChange}
    name="availableDate"
    className="form-control"
  />
</div>

<div className="form-group">
  <label>Until</label>
  <input
    type="date"
    value={quizDetails.untilDate}
    onChange={handleInputChange}
    name="untilDate"
    className="form-control"
  />
</div>
</div>


      <hr />

      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="notifyUsers" className="">
          <input type="checkbox" id="notifyUsers" name="notifyUsers" /> Notify
          users this quiz has changed
        </label>
        <div>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes`)}
          >
            Cancel
          </button>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes/q1`)}
          >
            Save & Publish
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes/q1`)}
          >
            Save
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default QuizDetailsEditor;

/* import React, { useState } from "react";
import { FaBan, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function QuizDetailsEditor() {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [points, setPoints] = useState(0);
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [timeLimitCheck, setTimeLimitCheck] = useState(false);
  const [timeLimit, setTimeLimit] = useState("");
  const [assignTo, setAssignTo] = useState("Everyone");
  const [oneQuestion, setOneQuestion] = useState(true);
  const [webcam, setWebcam] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [untilDate, setUntilDate] = useState("");

  return (
    <div>
      <div className="quiz-detail-editor">
        <div className="form-group">
          <label>Quiz Name</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Quiz Type</label>
          <select
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            className="form-control"
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Ungraded Quiz">Ungraded Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>

        <div className="form-group">
          <label>Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value, 10))}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Assignment Group</label>
          <select
            value={assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)}
            className="form-control"
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={shuffleAnswers}
              onChange={() => setShuffleAnswers(!shuffleAnswers)}
            />
            Shuffle Answers
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={multipleAttempts}
              onChange={() => setMultipleAttempts(!multipleAttempts)}
            />
            Allow Multiple Attempts
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={timeLimitCheck}
              onChange={() => setTimeLimitCheck(!timeLimitCheck)}
            />
            Time Limit
          </label>
          {timeLimitCheck && (
            <input
              type="text"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="form-control"
              placeholder="Enter time in minutes"
            />
          )}
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            className="form-control"
          >
            <option value="Everyone">Everyone</option>
            <option value="Undergraduates">Undergraduates</option>
            <option value="Graduates">Graduates</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={oneQuestion}
              onChange={() => setOneQuestion(!oneQuestion)}
            />
            One Question
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={webcam}
              onChange={() => setWebcam(!webcam)}
            />
            Webcam
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={lockQuestions}
              onChange={() => setLockQuestions(!lockQuestions)}
            />
            Lock Questions
          </label>
        </div>

        
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Until</label>
          <input
            type="date"
            value={untilDate}
            onChange={(e) => setUntilDate(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <hr />

      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="notifyUsers" className="">
          <input type="checkbox" id="notifyUsers" name="notifyUsers" /> Notify
          users this quiz has changed
        </label>
        <div>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes`)}
          >
            Cancel
          </button>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes/q1`)}
          >
            Save & Publish
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes/q1`)}
          >
            Save
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default QuizDetailsEditor;
 */