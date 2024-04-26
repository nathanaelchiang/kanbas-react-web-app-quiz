import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { Question } from "../reducer";
import * as client from "../client";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { deleteQuestion } from "../reducer";
import { convertFromRaw } from "draft-js";

interface QuestionDisplayCardProps {
  question: Question;
  isShowQuestionEditCard: boolean;
  onShow: () => void;
}

// Extracts plain text from JSON stored in the database, this will include <p></p> tag
// in the return result, so need strpHtml to remove them
const extractTextFromJson = (jsonString: any) => {
  try {
    const contentState = convertFromRaw(JSON.parse(jsonString));
    return stripHtml(contentState.getPlainText());
  } catch (error) {
    console.error("Failed to parse question body:", error);
    return "";
  }
};

const stripHtml = (htmlString: any) => {
  return htmlString.replace(/<[^>]*>?/gm, "");
};

function QuestionDisplayCard({
  question,
  isShowQuestionEditCard,
  onShow,
}: QuestionDisplayCardProps) {
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionIndex = quiz.questions.findIndex(
    (eachQuestion: Question) => eachQuestion._id === question._id
  );

  const handleUpdate = () => {
    if (isShowQuestionEditCard) {
      window.alert(
        "Please finish editing the current question first. Click cancel or udpate to continue."
      );
    } else {
      onShow();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      client
        .deleteQuestion(quiz.id, questionIndex)
        .then(() => {
          dispatch(deleteQuestion(question._id));
        })
        .catch((error) => {
          console.error("Error deleting the quiz:", error);
        });
    }
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center">
            <i className="fas fa-ellipsis-v me-2"></i>
            {question.questionTitle}
          </span>
          <span>pts: {question.questionPoints}</span>
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <p className="card-text">
            {extractTextFromJson(question.questionBody)}
          </p>
          <div className="card-text">
            <button className="btn">
              <FaPencilAlt onClick={handleUpdate} />
            </button>
            <button className="btn" onClick={handleDelete}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDisplayCard;
