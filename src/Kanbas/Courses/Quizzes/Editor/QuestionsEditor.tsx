import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuestionDisplayCard from "./QuestionDisplayCard";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";
import QuestionEditCard from "./QuestionEditCard";

export interface Question {
  _id: string;
  questionType: string;
  questionTitle: string;
  questionPoints: number;
  questionBody: string;
  correctanswer: string;
  possibleAnswers: string[];
}

function QuizQuestionsEditor() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayNewQuestion, setDisplayNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState(null);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  const handleNewQuestionClick = () => {
    if (!displayNewQuestion) {
      setDisplayNewQuestion(true);
    } else {
      if (newQuestion) {
        setDisplayNewQuestion(false);
        setNewQuestion(null); 
      }
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return;
      try {
        const fetchedQuestions = await client.findQuestionsOfQuiz(quizId);
        setQuestionList(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  return (
    <div>

      <div>
        {questionList.length === 0 ? (
          <div style={{ height: "10em" }}></div>
        ) : (
          <ul>
            {questionList.map((question: Question) => (
              <QuestionDisplayCard key={question._id} question={question} />
            ))}
          </ul>
        )}
      </div>

      {displayNewQuestion && <QuestionEditCard />}
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
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <label htmlFor="notifyUsers" className="">
          <input type="checkbox" id="notifyUsers" name="notifyUsers" /> Notify
          users this quiz has changed
        </label>
        <div>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes`)}
          >
            Cancel
          </button>
          <button
            className="btn border ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes`)}
          >
            Save & Publish
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => navigate(`/Kanbas/Courses/1/Quizzes`)}
          >
            Save
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default QuizQuestionsEditor;
