import "./styles.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisV, FaCheckCircle, FaBan, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { setQuiz } from "../reducer";
import * as client from "../client";

function QuizDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const [published, setPublished] = useState(quiz.published);


  const { quizId } = useParams();
  useEffect(() => {
    if (quizId) {
      const fetchQuestions = async () => {
        try {
          const fetchedQuiz = await client.findQuizbyId(quizId);
          dispatch(setQuiz(fetchedQuiz));
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      };

      fetchQuestions();
    }
  }, [quizId, dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-end gap-1">
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setPublished(!published)}
        >
          {published ? (
            <>
              <FaBan className="me-1" /> Unpublished
            </>
          ) : (
            <>
              <FaCheckCircle /> Published
            </>
          )}
        </button>
        <button
          className="btn border"
          onClick={() => navigate(`/Kanbas/Courses/RS101/Quizzes/q1/Preview`)}
        >
          Preview
        </button>
        <button
          className="btn border d-flex align-items-center"
          onClick={() => navigate(`/Kanbas/Courses/RS101/Quizzes/q1/Edit`)}
        >
          <FaPen className="me-1" /> Edit
        </button>
        <div className="btn border">
          <FaEllipsisV className="ms-1" />
        </div>
      </div>
      <hr />

      <h2>{quiz.quizTitle}</h2>

      <table className="table quiz-detail-table">
        <tbody>
          <tr>
            <th>Quiz Type</th>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <th>Points</th>
            <td>{quiz.quizPoints}</td>
          </tr>
          <tr>
            <th>Assignment Group</th>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <th>Shuffle Answers</th>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Time Limit</th>
            <td>{quiz.timeLimit}</td>
          </tr>
          <tr>
            <th>Multiple Attempts</th>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>View Responses</th>
            <td>Always</td>
          </tr>
          <tr>
            <th>Show Correct Answers</th>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <th>One Question at a Time</th>
            <td>{quiz.oneQuestionPerTime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Require Respondus LockDown Browser</th>
            <td>No</td>
          </tr>
          <tr>
            <th>Required to View Quiz Results</th>
            <td>No</td>
          </tr>
          <tr>
            <th>Webcam Required</th>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Lock Questions After Answering</th>
            <td>{quiz.lockQuestions ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <table className="table ms-3">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {new Date(quiz.quizDueDate).toLocaleString("en-US", {
                month: "short", // "short" month format, e.g., "Sep"
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </td>

            <td>Everyone</td>
            <td>
              {new Date(quiz.quizStartDate).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </td>
            <td>
              {new Date(quiz.quizUntilDate).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuizDetail;
function dispatch(arg0: { payload: any; type: "quizzes/setQuestions" }) {
  throw new Error("Function not implemented.");
}