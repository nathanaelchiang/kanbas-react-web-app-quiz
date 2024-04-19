import { Question } from "./QuestionsEditor";

function QuestionDisplayCard({ question }: { question: Question }) {
  console.log("question", question);
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
        <div className="card-body">
          <p className="card-text">{question.questionBody}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionDisplayCard;
