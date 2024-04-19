import React, { useState, useEffect } from "react";
import "./list.css";
import db from "../../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
} from "./reducer";
import { KanbasState } from "../../../store";
import "../../../styles.css";

function QuestionList() {
  const { courseId } = useParams();
  const [questionPrompt, setQuestionPrompt] = useState("");
  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const dispatch = useDispatch();

  const questionsList = questionList.filter(
    (question) => question.course === courseId
  );
  const [selectedQuestion, setSelectedQuestion] = useState(questionsList[0]);

  useEffect(() => {
    switch (question.type) {
      case "true-false":
        setQuestionPrompt(
          "Enter your question text, select if True or False is the correct answer:"
        );
        break;
      case "multiple-choice":
        setQuestionPrompt(
          "Enter your question text, select the correct answer:"
        );
        break;
      case "fill-in-the-blank":
        setQuestionPrompt(
          "Enter your question text, select the correct answer:"
        );
        break;
      default:
        setQuestionPrompt("");
    }
  }, [question.type]);

  return (
    <>
      <div className="main-container">
        <ul className="list-group wd-questions">
          <li className="list-group-item">
            <div className="input-container">
              <input
                placeholder="Question Title"
                className="question-title-input"
                value={question.title}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      ...question,
                      name: e.target.value,
                    })
                  )
                }
              />

              <select
                className="question-type-select"
                value={question.type}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      ...question,
                      type: e.target.value,
                    })
                  )
                }
              >
                <option value="true-false">True False</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="fill-in-the-blank">Fill in the Blank</option>
              </select>

              <div className="points-container">
                <span className="points-label">pts:</span>
                <input
                  className="points-input"
                  value={question.points}
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        ...question,
                        points: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>

            <h4>{question.prompt}</h4>

            <h4>Question</h4>

            <br />
            <textarea
              className="form-control question-body-textarea"
              value={question.body}
              onChange={(e) =>
                dispatch(
                  setQuestion({
                    ...question,
                    body: e.target.value,
                  })
                )
              }
            />

            <h4>Answers</h4>
            <div>
              <div className="answer-container">
                <h5 className="answer-label">Correct Answer</h5>
                <input
                  className="answer-input"
                  value={question.answer}
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        ...question,
                        answer: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="answer-container">
                <h5 className="answer-label">Possible Answer</h5>
                <input
                  className="answer-input"
                  value={question.possibleAnswer}
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        ...question,
                        possibleAnswer: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>

            <h4>{questionPrompt}</h4>
            <div>
              <button
                className="btn border float-top"
                onClick={() => dispatch(setQuestion({}))}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger float-top"
                onClick={() => dispatch(updateQuestion(question))}
              >
                Update Question
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default QuestionList;

