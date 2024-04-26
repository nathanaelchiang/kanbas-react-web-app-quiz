import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, Question, updateQuestion, Answer } from "../reducer";
import * as client from "../client";
import { KanbasState } from "../../../store";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import EditorComponent from "../Questions/EditorComponent";
import MultipleItem from "../Questions/multipleItem";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

interface QuestionEditCardProps {
  question: Question;
  questionIndex: number;
  onHide: () => void;
  isCreateNewQuestion: boolean;
}

// Function to convert EditorState to JSON
const editorStateToJSON = (editorState: any) => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

// Function to convert JSON to EditorState
const jsonToEditorState = (jsonString: any) => {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(jsonString)));
};

const QuestionEditCard = ({
  question,
  questionIndex,
  onHide,
  isCreateNewQuestion,
}: QuestionEditCardProps) => {
  const dispatch = useDispatch();

  // Convert the question body from JSON to EditorState for initial render
  const [editorState, setEditorState] = useState(() => {
    return question.questionBody
      ? jsonToEditorState(question.questionBody)
      : EditorState.createEmpty();
  });

  const handleEditorChange = (newEditorState: any) => {
    setEditorState(newEditorState);
    const jsonBody = editorStateToJSON(newEditorState);
    // Update your state to store the JSON string
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionBody: jsonBody,
    }));
  };
  const getDefaultAnswers = (
    questionType: string,
    existingAnswers: Answer[]
  ) => {
    let defaultAnswers: Answer[] = [];

    if (existingAnswers.length === 0) {
      if (questionType === "FillInTheBlank") {
        defaultAnswers = [
          { answer: "", isCorrect: true },
          { answer: "", isCorrect: false },
        ];
      } else if (questionType === "TrueFalse") {
        defaultAnswers = [
          { answer: "True", isCorrect: true },
          { answer: "False", isCorrect: false },
        ];
      } else if (questionType === "MultipleChoice") {
        defaultAnswers = [
          { answer: "", isCorrect: true },
          { answer: "", isCorrect: false },
        ];
      }
    } else {
      if (questionType === "FillInTheBlank") {
        defaultAnswers = existingAnswers.map((a) => ({
          ...a,
          isCorrect: true,
        }));
      } else if (questionType === "TrueFalse") {
        defaultAnswers = [
          { answer: "True", isCorrect: true },
          { answer: "False", isCorrect: false },
        ];
      } else if (questionType === "MultipleChoice") {
        const correctAnswers = existingAnswers.filter((a) => a.isCorrect);
        if (correctAnswers.length !== 1) {
          defaultAnswers = existingAnswers.map((a, i) => ({
            ...a,
            isCorrect: i === 0,
          }));
        } else {
          defaultAnswers = existingAnswers;
        }
      }
    }

    return defaultAnswers;
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);

  useEffect(() => {
    // Set default answers when question type changes
    const defaultAnswers = getDefaultAnswers(
      currentQuestion.questionType,
      currentQuestion.answers
    );
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: defaultAnswers,
    }));
  }, [currentQuestion.questionType]);

  // const handleEditorChange = (newEditorState: EditorState) => {
  //   setEditorState(newEditorState);
  //   // Get the plain text from the editor state
  //   const plainText = newEditorState.getCurrentContent().getPlainText();
  //   // Update your state to only store the plain text
  //   setCurrentQuestion((prevQuestion) => ({
  //     ...prevQuestion,
  //     questionBody: plainText,
  //   }));
  // };

  const handleInputChange = (
    field: keyof Question,
    value: string | string[] | Answer[]
  ) => {
    console.log("field:", field);
    console.log("value:", value);
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }));
    console.log("value:", value);
  };

  const handleMultipleChanges = (updates: {
    [key in keyof Question]?: Question[key];
  }) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      ...updates,
    }));
  };

  // const handlePossibleAnswerChange = (index: number, value: string) => {
  //   const newPossibleAnswers = [...currentQuestion.possibleAnswers];
  //   newPossibleAnswers[index] = value;
  //   setCurrentQuestion((prevQuestion) => ({
  //     ...prevQuestion,
  //     possibleAnswers: newPossibleAnswers,
  //   }));
  // };
  const addAnswer = (answers: Answer[]) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [...prevQuestion.answers, { answer: "", isCorrect: false }],
    }));
    console.log("answers:", answers);
  };

  const deleteAnswer = (index: number) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: prevQuestion.answers.filter((_, i) => i !== index),
    }));
  };

  const addPossibleAnswer = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      possibleAnswers: [...prevQuestion.possibleAnswers, ""],
    }));
  };

  const removePossibleAnswer = (index: number) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      possibleAnswers: prevQuestion.possibleAnswers.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const { quizId } = useParams();
  const handleUpdateQuestion = async () => {
    if (quizId) {
      try {
        if (isCreateNewQuestion) {
          await client.addQuestion(quizId, currentQuestion);
          dispatch(addQuestion(currentQuestion));
          console.log("Question added:", currentQuestion);
        } else {
          await client.updateQuestion(quizId, questionIndex, currentQuestion);
          dispatch(updateQuestion(currentQuestion));
          console.log("Question updated:", currentQuestion);
        }
        onHide(); // Hide the card after updating
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  const [questionPrompt, setQuestionPrompt] = useState("");

  useEffect(() => {
    switch (currentQuestion.questionType) {
      case "TrueFalse":
        setQuestionPrompt(
          "Enter your question text, then select if True or False is the correct answer:"
        );
        break;
      case "MultipleChoice":
        setQuestionPrompt(
          "Enter your question text, then select the correct answer:"
        );
        break;
      case "FillInTheBlank":
        setQuestionPrompt(
          "Enter your question text, then define all possible correct answers for the blank:"
        );
        break;
      default:
        setQuestionPrompt("");
    }
    if (
      currentQuestion.questionType === "FillInTheBlank" &&
      currentQuestion.answers.length < 2
    ) {
      setCurrentQuestion((prev) => ({
        ...prev,
        possibleAnswers: ["", ""], // Ensure two input boxes when switching to FillInTheBlank
      }));
    }
  }, [currentQuestion.questionType]);

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
              type="text"
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
                type="number"
                className="float-end"
                style={{ border: "1px solid #ced4da", height: "38px" }}
                value={currentQuestion.questionPoints}
                onChange={(e) =>
                  handleInputChange("questionPoints", e.target.value)
                }
              />
            </div>
          </div>
          {questionPrompt}
          <h4 className="mt-3">Question</h4>

          {/* <EditorComponent /> */}
          <FroalaEditor
            tag="textarea"
            model={editorState.getCurrentContent().getPlainText()}
            onModelChange={(content: any) => {
              const contentState = ContentState.createFromText(content);
              const newEditorState =
                EditorState.createWithContent(contentState);
              handleEditorChange(newEditorState);
            }}
          />

          <h4 className="mt-3">Answers</h4>
          {currentQuestion.questionType === "MultipleChoice" && (
            <>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                ></div>
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    {/* single checkbox for correct answer */}
                    <label>
                      <input
                        type="checkbox"
                        checked={currentQuestion.answers[index].isCorrect}
                        onChange={(e) =>
                          handleInputChange(
                            "answers",
                            currentQuestion.answers.map((a, i) =>
                              i === index
                                ? { ...a, isCorrect: true }
                                : { ...a, isCorrect: false }
                            )
                          )
                        }
                      />{" "}
                    </label>
                    <h5 style={{ marginRight: "10px" }}>
                      {currentQuestion.answers[index].isCorrect
                        ? "Correct Answer"
                        : `Possible Answer`}
                    </h5>
                    <input
                      style={{ border: "1px solid #ced4da" }}
                      value={currentQuestion.answers[index].answer}
                      onChange={(e) =>
                        handleInputChange(
                          "answers",
                          currentQuestion.answers.map((a, i) =>
                            i === index
                              ? { ...a, answer: e.target.value }
                              : { ...a }
                          )
                        )
                      }
                    />
                    <button
                      className="btn border ms-3"
                      onClick={() => deleteAnswer(index)}
                    >
                      Remove Answer
                    </button>
                  </div>
                ))}
                <button
                  className="btn border"
                  onClick={() => addAnswer(currentQuestion.answers)}
                >
                  Add Another Answer
                </button>
              </div>

              <div className="mt-4">
                <button className="btn border float-top me-2" onClick={onHide}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger float-top"
                  onClick={handleUpdateQuestion}
                >
                  Update Question
                </button>
              </div>
            </>
          )}

          {currentQuestion.questionType === "TrueFalse" && (
            <>
              <div>
                {currentQuestion.answers.map((answer, index) => (
                  <div key={index} className="d-flex align-items-top mb-2">
                    <label>
                      <input
                        type="checkbox"
                        className="me-1"
                        checked={currentQuestion.answers[index].isCorrect}
                        onChange={(e) =>
                          handleInputChange(
                            "answers",
                            currentQuestion.answers.map((a, i) =>
                              i === index
                                ? { ...a, isCorrect: true }
                                : { ...a, isCorrect: false }
                            )
                          )
                        }
                      />{" "}
                    </label>
                    <p>{currentQuestion.answers[index].answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button className="btn border float-top me-2" onClick={onHide}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger float-top"
                  onClick={handleUpdateQuestion}
                >
                  Update Question
                </button>
              </div>
            </>
          )}

          {currentQuestion.questionType === "FillInTheBlank" && (
            <>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                ></div>
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <h5 style={{ marginRight: "10px" }}>
                      Possible Answer {index + 1}
                    </h5>
                    <input
                      style={{ border: "1px solid #ced4da" }}
                      value={currentQuestion.answers[index].answer}
                      onChange={(e) =>
                        handleInputChange(
                          "answers",
                          currentQuestion.answers.map((a, i) =>
                            i === index
                              ? { ...a, answer: e.target.value }
                              : { ...a }
                          )
                        )
                      }
                    />
                    <button
                      className="btn border ms-3"
                      onClick={() => deleteAnswer(index)}
                    >
                      Remove Answer
                    </button>
                  </div>
                ))}
                <button
                  className="btn border"
                  onClick={() => addAnswer(currentQuestion.answers)}
                >
                  Add Another Answer
                </button>
              </div>

              <div className="mt-4">
                <button className="btn border float-top me-2" onClick={onHide}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger float-top"
                  onClick={handleUpdateQuestion}
                >
                  Update Question
                </button>
              </div>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default QuestionEditCard;
