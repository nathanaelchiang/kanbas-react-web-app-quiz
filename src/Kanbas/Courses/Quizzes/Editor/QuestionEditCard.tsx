import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuestion } from "../reducer";
import * as client from "../client";

interface Question {
  questionType: "MultipleChoice" | "TrueFalse" | "FillInTheBlank";
  questionTitle: string;
  questionPoints: number;
  questionBody: string;
  correctAnswer: string;
  possibleAnswers: string[];
}

const defaultQuestion: Question = {
  questionType: "MultipleChoice",
  questionTitle: "Question title",
  questionPoints: 0,
  questionBody: "",
  correctAnswer: "",
  possibleAnswers: [],
};

const QuestionEditCard = () => {
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(defaultQuestion);

  const handleInputChange = (
    field: keyof Question,
    value: string | string[]
  ) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }));
  };

  const { quizId } = useParams();
  console.log("quizId", quizId);
  const handleUpdateQuestion = async () => {
    if (quizId) {
      try {
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  return (
    <div
      style={{
        marginLeft: "12px",
        marginRight: "12px",
        marginBottom: "50px",
      }}
    >
      <ul className="list-group wd-questions">
        <li className="list-group-item">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <input
              placeholder="Question Title"
              className=""
              style={{
                border: "1px solid #ced4da",
                marginRight: "5px",
                height: "38px",
              }}
              value={currentQuestion.questionTitle}
              onChange={(e) =>
                handleInputChange("questionTitle", e.target.value)
              }
            />

            <select
              className="float-top"
              style={{
                border: "1px solid #ced4da",
                marginRight: "5px",
                height: "38px",
              }}
              value={currentQuestion.questionType}
              onChange={(e) =>
                handleInputChange("questionType", e.target.value)
              }
            >
              <option value="MultipleChoice">Multiple Choice</option>
              <option value="TrueFalse">True False</option>
              <option value="FillInTheBlank">Fill in the Blank</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <span style={{ marginRight: "10px" }}>pts:</span>
              <input
                className="float-end"
                style={{ border: "1px solid #ced4da", height: "38px" }}
                value={currentQuestion.questionPoints}
                onChange={(e) =>
                  handleInputChange("questionPoints", e.target.value)
                }
              />
            </div>
          </div>

          <h4 className="mt-3">Question</h4>
          <textarea
            className="form-control mb-3"
            value={currentQuestion.questionBody}
            onChange={(e) => handleInputChange("questionBody", e.target.value)}
          />

          <h4>Answers</h4>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <h5 style={{ marginRight: "10px" }}>Correct Answer</h5>
              <input
                style={{ border: "1px solid #ced4da" }}
                value={currentQuestion.correctAnswer}
                onChange={(e) =>
                  handleInputChange("correctAnswer", e.target.value)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <h5 style={{ marginRight: "10px" }}>Possible Answer</h5>
              <input
                style={{ border: "1px solid #ced4da" }}
                value={currentQuestion.possibleAnswers[0] || ""}
                onChange={(e) =>
                  handleInputChange("possibleAnswers", [e.target.value])
                }
              />
            </div>
          </div>

          <div>
            <button className="btn border float-top">Cancel</button>

            <button
              className="btn btn-danger float-top"
              onClick={handleUpdateQuestion}
            >
              Update Question
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default QuestionEditCard;
