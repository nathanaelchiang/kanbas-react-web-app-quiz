import React, { useEffect, useState } from "react";
import { FaBan, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { KanbasState } from "../../../store";
import EditorComponent from "../Questions/EditorComponent";
import { setQuiz } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";





function QuizDetailsEditor() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);





  const editorStateToJSON = (editorState: any) => {
    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

// Function to convert JSON to EditorState
  const jsonToEditorState = (jsonString: any) => {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(jsonString)));
  };




  const quizDesc = "A quiz covering basic web terms.";

  // const editorState = initializeEditorState(
  //   quizId === "New" ? "" : quiz.quizDesc
  // );

  const [editorState, setEditorState] = useState(() => {
    return quiz.quizDesc
        ? jsonToEditorState(quiz.quizDesc)
        : EditorState.createEmpty();
  });



  // console.log(editorState.getCurrentContent().getPlainText());

  // const [editorState, setEditorState] = useState(initializeEditorState(quiz.quizDesc));
  // const [currentEditorState, setEditorState] = useState(editorState);

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    // Get the plain text from the editor state
    const jsonBody = editorStateToJSON(newEditorState);
    // Update your state to only store the plain text
    dispatch(setQuiz({ ...quiz, quizDesc: jsonBody }));
  };

  return (
    <div>
      <div className="quiz-detail-editor">
        <div className="form-group">
          <label>Quiz Name</label>
          <input
            type="text"
            value={quiz.quizTitle}
            onChange={(e) => {
              dispatch(setQuiz({ ...quiz, quizTitle: e.target.value }));
              console.log(quiz);
            }}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <EditorComponent
            editorState={editorState}
            setEditorState={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <label>Quiz Type</label>
          <select
            value={quiz.quizType}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, quizType: e.target.value }))
            }
            className="form-control"
          >
            <option value="GradedQuiz">Graded Quiz</option>
            <option value="PracticeQuizy">Practice Quizy</option>
            <option value="GradedSurvey">Graded Survey</option>
            <option value="UngradedSurvey">Ungraded Survey</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assignment Group</label>
          <select
            value={quiz.assignmentGroup}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))
            }
            className="form-control"
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.checked }))
              }
            />
            Shuffle Answers
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                dispatch(
                  setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                )
              }
            />
            Allow Multiple Attempts
          </label>
        </div>

        <div className="form-group">
          <label>
            Time Limit
            <input
              type="number"
              value={quiz.timeLimit}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))
              }
              className="form-control"
              placeholder="Enter time in minutes"
            />
          </label>
        </div>

        <div className="form-group">
          <label>Show Correct Answers</label>
          <select
            value={quiz.showCorrectAnswers}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, showCorrectAnswers: e.target.value }))
            }
            className="form-control"
          >
            <option value="Immediately">Immediately</option>
            <option value="AfterDueDate">AfterDueDate</option>
            <option value="Never">Never</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Access Code
            <input
              type="text"
              value={quiz.accessCode}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
              }
              className="form-control"
              defaultValue={""}
              placeholder="You can leave it empty"
            />
          </label>
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <select
            value={quiz.assignmentGroup}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))
            }
            className="form-control"
          >
            <option value="Quizzes">Everyone</option>
            <option value="Exams">Undergraduates</option>
            <option value="Assignments">Graduates</option>
            <option value="Project">Graduates</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={quiz.oneQuestionPerTime}
              onChange={(e) =>
                dispatch(
                  setQuiz({ ...quiz, oneQuestionPerTime: e.target.checked })
                )
              }
            />
            One Question At a Time
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={quiz.webcamRequired}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))
              }
            />
            Webcam Required
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={quiz.lockQuestions}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, lockQuestions: e.target.checked }))
              }
            />
            Lock Questions After Answering
          </label>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={
              quiz.quizDueDate
                ? new Date(quiz.quizDueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, quizDueDate: e.target.value }))
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            value={
              quiz.quizStartDate
                ? new Date(quiz.quizStartDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, quizStartDate: e.target.value }))
            }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Until</label>
          <input
            type="date"
            value={
              quiz.quizUntilDate
                ? new Date(quiz.quizUntilDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, quizUntilDate: e.target.value }))
            }
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default QuizDetailsEditor;
