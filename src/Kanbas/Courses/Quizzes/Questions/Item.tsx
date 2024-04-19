import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KanbasState } from "../../../store";
import { setAnswer, removeAnswer } from "./reducer";

function multipleItem({ question }: { question: any }) {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  return (
    <li key={question.answer.id} className="list-group-item">
      <input
        className="form-check-input me-1"
        style={{ marginBottom: "5px" }}
        value={question.answer.text}
        onChange={(e) =>
          dispatch(
            setAnswer({
              ...question.answer,
              text: e.target.value,
            })
          )
        }
      />

      <button
        className="btn btn-danger float-end"
        onClick={() =>
          dispatch(
            removeAnswer({
              courseId: courseId,
              questionId: question.id,
              answerId: question.answer.id,
            })
          )
        }
      >
        Delete
      </button>
    </li>
  );
}
