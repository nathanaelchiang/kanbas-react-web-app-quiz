import { createSlice } from "@reduxjs/toolkit";
import db from "../../../Database";

const initialState = {
  questions: db.questions,
  question: { name: "New question 123", description: "New Description", type: "true-false", pts: 10, prompt: "", answers: [        {
    "_id": "A",
    "text": "True",
    "correct": true
  }]},
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.questions,
      ];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },

    addAnswer: (state, action) => {
      state.question.answers = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.question.answers,
      ];
    },

    setAnswer: (state, action) => {
      state.question.answers = state.question.answers.map((answer) => {
        if (answer._id === action.payload._id) {
          return action.payload;
        } else {
          return answer;
        }
      });
    },
    removeAnswer: (state, action) => {
      state.question.answers = state.question.answers.filter(
        (answer) => answer._id !== action.payload._id
      );
    },


  },
});


export const { addQuestion, deleteQuestion,
  updateQuestion, setQuestion, setAnswer, removeAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;