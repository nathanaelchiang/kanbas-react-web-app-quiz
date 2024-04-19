import { createSlice } from "@reduxjs/toolkit";

export interface Question {
  _id?: string;
  questionType: 'MultipleChoice' | 'TrueFalse' | 'FillInTheBlank';
  questionTitle: string;
  questionPoints: number;
  questionBody: string;
  correctAnswer: string;
  possibleAnswers: string[];
  answers: string[];
}

export interface Quiz {
  _id?: string;
  id: string;
  quizTitle: string;
  quizDesc: string;
  quizType: 'GradedQuiz' | 'PracticeQuiz' | 'GradedSurvey' | 'UngradedSurvey';
  quizPoints: number;
  assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionPerTime: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;
  quizDueDate: Date;
  quizStartDate: Date;
  quizUntilDate: Date;
  isPublished: boolean;
  questions: Question[];
  course: string;
}

interface QuizState {
  quizzes: Quiz[];
  quiz: Quiz;

  // questions: Question[];
  // question: Question;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: {
    _id: undefined,
    id: "",
    quizTitle: "",
    quizDesc: "",
    quizType: "GradedQuiz",
    quizPoints: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionPerTime: false,
    webcamRequired: false,
    lockQuestions: false,
    quizDueDate: new Date(),
    quizStartDate: new Date(),
    quizUntilDate: new Date(),
    isPublished: false,
    questions: [],
    course: "",
  },
  // questions: [],
  // question: {
  //   questionType: 'MultipleChoice',
  //   questionTitle: '',
  //   questionPoints: 10,
  //   questionBody: '',
  //   correctAnswer: '',
  //   possibleAnswers: [],
  // }
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
      state.quiz = action.payload;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
      if (state.quiz._id === action.payload) {
        state.quiz = initialState.quiz;
      }
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
            return action.payload;
          } else {
            return quiz;
          }
        });
      },


    addQuestion: (state, action) => {
      state.quiz.questions = [...state.quiz.questions, action.payload];
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === state.quiz._id) {
          return state.quiz;
        } else {
          return quiz;
        }
      });
    },
    updateQuestion: (state, action) => {
      state.quiz.questions = state.quiz.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === state.quiz._id) {
          return state.quiz;
        } else {
          return quiz;
        }
      });
    },
    deleteQuestion: (state, action) => {
      state.quiz.questions = state.quiz.questions.filter(
        (question) => question._id !== action.payload
      );
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === state.quiz._id) {
          return state.quiz;
        } else {
          return quiz;
        }
      });
    },
    setQuestions: (state, action) => {
      state.quiz.questions = action.payload;
    },

  },
});
  
export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setQuestions
} = quizzesSlice.actions;
export default quizzesSlice.reducer;

