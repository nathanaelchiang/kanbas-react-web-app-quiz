import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import QuizList from "./QuizList";
import * as client from "./client";
import { setQuiz } from "./reducer";
import { useDispatch } from "react-redux";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleCreateAndNavigate = async () => {
  //   if (courseId) {
  //     try {
  //       const newQuiz = await client.createQuiz(courseId, defaultNewQuiz);
  //       dispatch(setQuiz(newQuiz));
  //
  //       navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz.id}/Edit`);
  //     } catch (error) {
  //       console.error("Failed to create quiz:", error);
  //     }
  //   } else {
  //     console.error("No courseId provided");
  //   }
  // };

  return (
    <div>
      {/* top nav bar for quizzes home screen */}
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <input
            type="text"
            placeholder="Search for Quiz"
            className="form-control"
            style={{ width: "40%" }}
          />
          <div className="d-flex">
            <button
              className="btn btn-danger d-flex align-items-center me-1"
              // onClick={handleCreateAndNavigate}
                onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/New/Edit`)}
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
