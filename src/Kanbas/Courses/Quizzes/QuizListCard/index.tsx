import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../reducer";

const options: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

function QuizListCard({ quiz }: { quiz: Quiz }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isPublished, setIsPublished] = useState(quiz.isPublished);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const togglePublish = () => {
    setIsPublished(!isPublished);
  };

  const getQuizStatus = () => {
    const now = new Date();
    const startDate = new Date(quiz.quizStartDate);
    const dueDate = new Date(quiz.quizDueDate);

    if (startDate > now) {
      return (
        "Not available until " + startDate.toLocaleString("en-US", options)
      );
    } else if (dueDate < now) {
      return "Closed";
    } else {
      return "Available now";
    }
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div
          className="card-body d-flex justify-content-between"
          style={{ borderLeft: isPublished ? "5px solid green" : "none" }}
        >
          <div
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/q1`)}
            style={{ cursor: "pointer" }}
          >
            <h5 className="card-title">{quiz.quizTitle}</h5>
            <div className="d-flex justify-content-start">
              <span className="card-text">{getQuizStatus()}</span>
              <span className="mx-2">|</span>
              <span className="card-text">
                Due Date:{" "}
                {new Date(quiz.quizDueDate).toLocaleDateString(
                  "en-US",
                  options
                )}
              </span>
              <span className="mx-2">|</span>
              <span className="card-text">Points: {quiz.quizPoints}</span>
              <span className="mx-2">|</span>
              <span className="card-text">
                {quiz.questions.length} Questions
              </span>
            </div>
          </div>
          <div>
            {isPublished ? (
              <i
                className="fas fa-check"
                style={{ color: "green", marginRight: "15px" }}
              ></i>
            ) : (
              <i
                className="fas fa-times"
                style={{ color: "red", marginRight: "15px" }}
              ></i>
            )}

            <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
            {showMenu && (
              <ul className="dropdown-menu show">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      navigate(`/Kanbas/Courses/1/Quizzes/q1/DetailEdit`)
                    }
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Delete
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Copy
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Sort
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={togglePublish}
                  >
                    {isPublished ? "Unpublish" : "Publish"}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizListCard;
