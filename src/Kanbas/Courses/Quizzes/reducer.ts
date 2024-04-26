import { createSlice } from "@reduxjs/toolkit";

export interface Question {
  _id?: string;
  questionType: 'MultipleChoice' | 'TrueFalse' | 'FillInTheBlank';
  questionTitle: string;
  questionPoints: number;
  questionBody: string;
  correctAnswer: string;
  possibleAnswers: string[];
  answers: Answer[];
}

export interface Answer {
  _id?: string;
  answer: string;
  isCorrect: boolean;
  
}
export interface Quiz {
  _id?: string;
  id: string;
  quizTitle: string;
  quizDesc: string;
  quizType: 'GradedQuiz' | 'PracticeQuiz' | 'GradedSurvey' | 'UngradedSurvey';
  assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers: 'Immediately' | 'AfterDueDate' | 'Never';
  accessCode: string;
  oneQuestionPerTime: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;
  quizDueDate: Date | null;
  quizStartDate: Date | null;
  quizUntilDate: Date | null;
  isPublished: boolean;
  questions: Question[];
  course: string;
}



interface QuizState {
  quizzes: Quiz[];
  quiz: Quiz;

  questions: Question[];
  question: Question;

  answers: string[];
  answer: string;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: {
    _id: undefined,
    id: "",
    quizTitle: "",
    quizDesc: "",
    quizType: "GradedQuiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    showCorrectAnswers: "Immediately",
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
  questions: [],
  question: {
    questionType: 'MultipleChoice',
    questionTitle: '',
    questionPoints: 10,
    questionBody: '',
    correctAnswer: '',
    possibleAnswers: [],
    answers: [],
  },
  answers: [],
  answer: '',

};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    // setQuiz: (state, action) => {
    //   state.quiz = action.payload;
    // },

    setQuiz: (state, action) => {
      return {
        ...state,
        quiz: {...action.payload},
      };
    },

    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
      state.quiz = action.payload;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
      if (state.quiz.id === action.payload) {
        state.quiz = initialState.quiz;
      }
    },


      // updateQuiz: (state, action) => {
    //   state.quizzes = state.quizzes.map((quiz) => {
    //     if (quiz._id === action.payload._id) {
    //         return action.payload;
    //       } else {
    //         return quiz;
    //       }
    //     });
    //   },

    updateQuiz: (state, action) => {

      return {
        ...state,
        quizzes: state.quizzes.map((quiz : Quiz) => {
          if (quiz.id === action.payload.id) {
            return action.payload;
          } else {
            return quiz;
          }
        })
      };

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

    
    addAnswer: (state, action) => {
      const { question } = state;
      console.log("question", question);
      question.possibleAnswers = [...question.possibleAnswers, action.payload];
    },

    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    removeAnswer: (state, action) => {
      const { question } = state;
      question.possibleAnswers = question.possibleAnswers.filter((answer) => answer !== action.payload);
    },

    updateAnswer: (state, action) => {
      const { question } = state;
      question.possibleAnswers = question.possibleAnswers.map((answer) =>
        answer === action.payload.oldAnswer ? action.payload.newAnswer : answer      );
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
  setQuestions,
  addAnswer,
  setAnswer,
  removeAnswer,
  updateAnswer,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;

