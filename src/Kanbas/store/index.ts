import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
  
  // placeholder, to be removed---question reducer
  questionsReducer: {
    questions: any[];
    question: any;
  };

}
const store = configureStore({
  reducer: {
    quizzesReducer,
  }
});

export default store;