import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import QuizListCard from "./QuizListCard";
import React from "react";
import QuizList from "./QuizList";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const createAndNavigateToQuiz = async () => {
    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response failedå");
      const newQuiz = await response.json();

      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}/Edit`);
    } catch (error) {
      console.error("Quiz creation failed - ", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <input
            type="text"
            placeholder="Search for Quiz"
            className="form-control"
            style={{ width: "30%" }}
          />
          <div className="d-flex">
            <button
              className="btn btn-danger d-flex align-items-center me-1"
              onClick={() => {
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/q1/Edit`);
              }}
            >
              <FaPlus className="me-2" />
              Quiz
            </button>
            <button className="btn btn-light border px-2 py-1 me-1">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        <hr />
      </div>

      <QuizList />
    </div>
  );
}

export default Quizzes;