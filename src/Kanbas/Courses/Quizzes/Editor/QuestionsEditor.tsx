import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuestionDisplayCard from "./QuestionDisplayCard";
import { Question } from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";
import QuestionEditCard from "./QuestionEditCard";

const defaultQuestion: Question = {
  questionType: "MultipleChoice",
  questionTitle: "Question Title",
  questionPoints: 0,
  questionBody: "",
  correctAnswer: "",
  possibleAnswers: [],
  answers: [],
};

function QuizQuestionsEditor() {
  const { quizId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showQuestionEditCard, setShowQuestionEditCard] = useState(false);
  const [isCreateNewQuestion, setIsCreateNewQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(defaultQuestion);

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz.questions
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const handleNewQuestionClick = () => {
    setIsCreateNewQuestion(true);
    setCurrentQuestion(defaultQuestion);

    if (!showQuestionEditCard) {
      setShowQuestionEditCard(true);
    } else {
      window.alert(
        "Please finish editing the current question first. Click cancel or udpate to continue."
      );
    }
  };

  const findQuestionIndex = (question: Question) => {
    return quiz.questions.findIndex(
      (eachQuestion: Question) => eachQuestion._id === question._id
    );
  };

  // callback functions that hides or displays the QuestionEditCard
  const hideEditCard = () => {
    setShowQuestionEditCard(false);
  };

  const handleEditClick = (question: Question) => {
    setIsCreateNewQuestion(false);
    setCurrentQuestion(question);
    setShowQuestionEditCard(true);
  };

  useEffect(() => {}, [questionList]);

  return (
    <div>
      <div>
        {questionList.length === 0 ? (
          <div style={{ height: "10em" }}></div>
        ) : (
          <ul>
            {questionList.map((question: Question) => (
              <QuestionDisplayCard
                key={question._id}
                question={question}
                isShowQuestionEditCard={showQuestionEditCard}
                onShow={() => handleEditClick(question)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* if add new question button is clicked, or if edit-question button is clicked
      then display a new block to show question-edit-card */}
      {showQuestionEditCard && (
        <QuestionEditCard
          question={currentQuestion}
          questionIndex={findQuestionIndex(currentQuestion)}
          onHide={hideEditCard}
          isCreateNewQuestion={isCreateNewQuestion}
        />
      )}

      <div className="d-flex justify-content-center gap-5 my-4">
        <button
          className="btn border d-flex align-items-center"
          onClick={handleNewQuestionClick}
        >
          <FaPlus className="me-2" />
          New Question
        </button>
        <button className="btn border d-flex align-items-center">
          <FaPlus className="me-2" />
          New Question Group
        </button>
        <button className="btn border d-flex align-items-center">
          <FaSearch className="me-2" />
          Questions
        </button>
      </div>
    </div>
  );
}

export default QuizQuestionsEditor;
