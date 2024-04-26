import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz, deleteQuiz } from "../reducer";
import * as client from "../client";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const togglePublish = () => {
    setIsPublished(!isPublished);
  };

  const getQuizStatus = () => {
    const now = new Date();
    let quizStatus = "Not available";

    if (quiz.quizStartDate && quiz.quizDueDate) {
      const startDate = new Date(quiz.quizStartDate);
      const dueDate = new Date(quiz.quizDueDate);

      if (startDate > now) {
        quizStatus =
          "Not available until " + startDate.toLocaleString("en-US", options);
      } else if (dueDate < now) {
        quizStatus = "Closed";
      } else {
        quizStatus = "Available now";
      }
    }
    return quizStatus;
  };

  const handleIsPublished = async () => {
    togglePublish();
    const updatedQuiz = {
      ...quiz,
      isPublished: !quiz.isPublished,
    };
    const fetchStatus = await client.updateQuiz(updatedQuiz);
    console.log(fetchStatus);
  };

  const handleDelete = async () => {
    dispatch(deleteQuiz(quiz.id));
    const fetchStatus = await client.deleteQuiz(quiz.id);
    console.log(fetchStatus);
  };

  const calculateQuizPoints = () => {
    let totalPoints = 0;
    quiz.questions.forEach((question) => {
      totalPoints += question.questionPoints;
    });
    return totalPoints;
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div
          className="card-body d-flex justify-content-between"
          style={{ borderLeft: isPublished ? "5px solid green" : "none" }}
        >
          <div
            onClick={() =>
              navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`)
            }
            style={{ cursor: "pointer" }}
          >
            <h5 className="card-title">{quiz.quizTitle}</h5>
            <div className="d-flex justify-content-start">
              <span className="card-text">{getQuizStatus()}</span>
              <span className="mx-2">|</span>
              <span className="card-text">
                Due Date:{" "}
                {quiz.quizDueDate
                  ? new Date(quiz.quizDueDate).toLocaleDateString(
                      "en-US",
                      options
                    )
                  : ""}
              </span>
              <span className="mx-2">|</span>
              <span className="card-text">Points: {calculateQuizPoints()}</span>
              <span className="mx-2">|</span>
              <span className="card-text">
                {quiz.questions ? quiz.questions.length : 0} Questions
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
                className="fas fa-ban"
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
                      navigate(
                        `/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Edit`
                      )
                    }
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleDelete}
                  >
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
                    onClick={handleIsPublished}
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
