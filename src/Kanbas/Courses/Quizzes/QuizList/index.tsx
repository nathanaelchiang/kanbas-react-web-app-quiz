import QuizListCard from "./QuizListCard";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "../client";
import { setQuizzes } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";

function QuizList() {
  const dispatch = useDispatch();

  const { courseId } = useParams();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  useEffect(() => {
    if (courseId) {
      const fetchQuizzes = async () => {
        try {
          const fetchedQuizzes = await client.findAllQuizzes(courseId);
          dispatch(setQuizzes(fetchedQuizzes));
        } catch (error) {
          console.error("Failed to fetch quizzes:", error);
        }
      };
      fetchQuizzes();
      console.log("useEffect");
    }
    // }, [courseId, dispatch]);
  }, []);

  return (
    <div>
      <div className="container my-4">
        <div className="card">
          <div className="card-header">
            <h5>Assignment Quizzes</h5>
          </div>
        </div>
      </div>

      {quizzes.map((quiz) => (
        <QuizListCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}

export default QuizList;
