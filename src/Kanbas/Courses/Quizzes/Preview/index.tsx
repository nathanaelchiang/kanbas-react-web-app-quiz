import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { convertFromRaw } from "draft-js";

const CanvasQuizPreview: React.FC = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);
  const [startTime] = useState(new Date());
  const [userAnswers, setUserAnswers] = useState<any>({});

  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/quizzes/${quizId}`);
        setQuizData(response.data);
        const savedAnswers = localStorage.getItem(`quiz_${quizId}_answers`);
        if (savedAnswers) {
          setUserAnswers(JSON.parse(savedAnswers));
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  const handleOptionChange = (optionIndex: number) => {
    const updatedAnswers = { ...userAnswers };
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleTrueFalseOptionChange = (value: boolean) => {
    const updatedAnswers = { ...userAnswers };
    updatedAnswers[currentQuestionIndex] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleFillInTheBlankChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedAnswers = { ...userAnswers };
    updatedAnswers[currentQuestionIndex] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    localStorage.setItem(`quiz_${quizId}_answers`, JSON.stringify(userAnswers));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

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

  if (!quizData) {
    return <h4>This quiz does not have any questions yet.</h4>;
  }

  return (
    <div className="canvas-quiz-preview">
      <div className="quiz-wrapper">
        <div className="preview-header">
          <h2>{quizData.quizTitle}</h2>
          <div className="preview-warning">
            This is a preview of the published version of the quiz
          </div>
          <div className="started-time">
            Started: {startTime.toLocaleString()}
          </div>
        </div>
        <div className="quiz-instructions">
          <h3>Quiz Instructions</h3>
          <hr />
        </div>
        <div className="question-card">
          <div className="question-box-wrapper">
            <div
              className="flag-button"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              <button
                onClick={() => setIsFlagged(!isFlagged)}
                style={{ padding: "5px", fontSize: "0.8em" }}
              >
                {isFlagged ? "Unflag" : "Flag"}
              </button>
            </div>
            <div className="question-box">
              <div className="question">
                <div className="question-header">
                  <h3
                    style={{
                      fontSize: "1.2em",
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                  >
                    {currentQuestion.questionTitle}
                  </h3>
                  <p
                    style={{
                      float: "right",
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                  >
                    {currentQuestion.questionPoints} pts
                  </p>
                </div>
                <div className="question-body">
                  {extractTextFromJson(currentQuestion.questionBody)}
                </div>
                <div className="answer-options">
                  {currentQuestion.questionType === "MultipleChoice" ? (
                    // Render multiple choice options
                    currentQuestion &&
                    currentQuestion.answers &&
                    currentQuestion.answers.map((option: any, index: any) => (
                      <div key={index}>
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${currentQuestionIndex}`}
                          checked={userAnswers[currentQuestionIndex] === index}
                          onChange={() => handleOptionChange(index)}
                        />
                        <label htmlFor={`option-${index}`}>
                          {option.answer}
                        </label>
                        <hr />
                      </div>
                    ))
                  ) : currentQuestion.questionType === "TrueFalse" ? (
                    <div>
                      <input
                        type="radio"
                        id={`option-true`}
                        name={`question-${currentQuestionIndex}`}
                        value="True"
                        checked={userAnswers[currentQuestionIndex] === true}
                        onChange={() => handleTrueFalseOptionChange(true)}
                      />
                      <label htmlFor={`option-true`}>True</label>
                      <br />
                      <input
                        type="radio"
                        id={`option-false`}
                        name={`question-${currentQuestionIndex}`}
                        value="False"
                        checked={userAnswers[currentQuestionIndex] === false}
                        onChange={() => handleTrueFalseOptionChange(false)}
                      />
                      <label htmlFor={`option-false`}>False</label>
                    </div>
                  ) : currentQuestion.questionType === "FillInTheBlank" ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Your answer"
                        value={userAnswers[currentQuestionIndex] || ""}
                        onChange={handleFillInTheBlankChange}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex !== 0 && (
          <button style={{ fontSize: "0.8em" }} onClick={handlePrevQuestion}>
            Previous
          </button>
        )}
        {currentQuestionIndex !== quizData.questions.length - 1 && (
          <button style={{ fontSize: "0.8em" }} onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
      <div
        className="submit-button-box"
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "5px",
          marginTop: "20px",
        }}
      >
        <div
          className="submit-button"
          style={{ textAlign: "right", fontSize: "0.8em" }}
        >
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      </div>
      <div
        className="edit-quiz"
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          padding: "10px",
          marginTop: "10px",
          textAlign: "left",
        }}
      >
        <button
          style={{ margin: "0", cursor: "pointer" }}
          onClick={() =>
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`)
          }
        >
          Keep Editing This Quiz
        </button>
      </div>
      <div className="question-list" style={{ marginTop: "10px" }}>
        {quizData.questions.map((question: any, index: any) => (
          <p
            key={index}
            style={{
              margin: "0",
              cursor: "pointer",
              textDecoration: "underline",
              color: "#c84343",
              fontWeight: currentQuestionIndex === index ? "bold" : "normal",
            }}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {question.questionTitle}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CanvasQuizPreview;
