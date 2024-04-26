import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBan, FaCheck, FaEllipsisV } from "react-icons/fa";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestionsEditor from "./QuestionsEditor";
import * as client from "../client";
import {
  addQuiz,
  Quiz,
  setQuiz,
  setQuizzes,
  updateQuiz,
  Question,
} from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";

enum QuizTypes {
  GradedQuiz = "GradedQuiz",
  PracticeQuiz = "PracticeQuiz",
  GradedSurvey = "GradedSurvey",
  UngradedSurvey = "UngradedSurvey",
}

enum AssignmentGroups {
  Quizzes = "Quizzes",
  Exams = "Exams",
  Assignments = "Assignments",
  Project = "Project",
}

enum ShowCorrectAnswersOptions {
  Immediately = "Immediately",
  AfterDueDate = "AfterDueDate",
  Never = "Never",
}

export default function QuizEditor() {
  const { courseId, quizId } = useParams();
  const [activeTab, setActiveTab] = useState("Details");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const calculateQuizPoints = () => {
    let totalPoints = 0;
    quiz.questions.forEach((question: Question) => {
      totalPoints += Number(question.questionPoints);
    });
    return totalPoints;
  };

  const handleNewQuiz = async (updatedQuiz: Quiz) => {
    try {
      if (courseId === undefined) {
        throw new Error("courseId is undefined");
      }
      const newQuiz = { ...updatedQuiz, id: new Date().getTime().toString() };
      const newQuizzes = quizzes.map((q) => {
        if (q.id === newQuiz.id) return newQuiz;
        else return q;
      });
      console.log(newQuizzes);
      dispatch(setQuizzes(newQuizzes));
      const fetchedStatus = await client.createQuiz(
        courseId as string,
        newQuiz
      );
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz.id}`);
    } catch (error) {
      console.error("Failed to create new quiz:", error);
    }
  };

  const handleExistedQuiz = async (updatedQuiz: Quiz) => {
    try {
      if (courseId === undefined) {
        throw new Error("courseId is undefined");
      }
      console.log(updatedQuiz);
      const fetchedStatus = await client.updateQuiz(updatedQuiz);
      console.log(fetchedStatus);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      console.error("Failed to update the quiz:", error);
    }
  };

  useEffect(() => {
    if (quizId !== "New") {
      const fetchQuiz = async () => {
        const fetchedQuiz = await client.findQuizbyId(quizId!);
        dispatch(setQuiz(fetchedQuiz));
      };
      fetchQuiz();
      console.log("Quiz Fetched");
      // console.log(quiz);
    } else {
      dispatch(
        setQuiz({
          id: new Date().getTime().toString(),
          quizTitle: "Unnamed Quiz",
          quizDesc: "",
          quizType: QuizTypes.GradedQuiz,
          quizPoints: 0,
          assignmentGroup: AssignmentGroups.Quizzes,
          shuffleAnswers: true,
          timeLimit: 20,
          multipleAttempts: false,
          showCorrectAnswers: ShowCorrectAnswersOptions.Immediately,
          accessCode: "",
          oneQuestionPerTime: true,
          webcamRequired: false,
          lockQuestions: false,
          quizDueDate: null,
          quizStartDate: null,
          quizUntilDate: null,
          isPublished: false,
          questions: [],
          course: courseId!,
        })
      );
    }
  }, [quizId, dispatch]);

  return (
    <div className="container">
      <div className="d-flex justify-content-end align-items-center text-center">
        <span>Points {calculateQuizPoints()}</span>
        {/*<span>Points {0}</span>*/}
        <span className="ms-3">
          {quiz.isPublished ? (
            <>
              <FaCheck className="ms-1" /> Published
            </>
          ) : (
            <>
              <FaBan className="ms-1" /> Not Published
            </>
          )}
        </span>

        <button className="btn border ms-3">
          <FaEllipsisV className="ms-1" />
        </button>
      </div>
      <hr />

      <ul className="nav nav-tabs">
        <a
          className={`nav-link ${
            activeTab === "Details" ? "active" : "text-danger"
          }`}
          onClick={() => setActiveTab("Details")}
        >
          Details
        </a>
        <a
          className={`nav-link ${
            activeTab === "Questions" ? "active" : "text-danger"
          }`}
          onClick={() => setActiveTab("Questions")}
        >
          Questions
        </a>
      </ul>

      <div>
        {activeTab === "Details" && <QuizDetailsEditor />}
        {activeTab === "Questions" && <QuizQuestionsEditor />}
      </div>

      <hr />

      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="notifyUsers" className="">
          <input type="checkbox" id="notifyUsers" name="notifyUsers" /> Notify
          users this quiz has changed
        </label>
        <div>
          <button
            className="btn border ms-2"
            onClick={() => {
              navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
            }}
          >
            Cancel
          </button>
          <button
            className="btn border ms-2"
            onClick={() => {
              const publishQuiz = { ...quiz, isPublished: true };
              dispatch(setQuiz(publishQuiz));
              console.log(publishQuiz);
              if (quizId !== "New") {
                dispatch(updateQuiz(publishQuiz));
                handleExistedQuiz(publishQuiz);
              } else {
                dispatch(addQuiz(publishQuiz));
                handleNewQuiz(publishQuiz);
              }
            }}
          >
            Save & Publish
          </button>

          <button
            className="btn btn-danger ms-2"
            onClick={() => {
              if (quizId !== "New") {
                dispatch(updateQuiz(quiz));
                handleExistedQuiz(quiz);
              } else {
                dispatch(addQuiz(quiz));
                handleNewQuiz(quiz);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}
