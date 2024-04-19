import axios from 'axios';
import {Question, Quiz} from './reducer';

export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/courses`;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;

const newAxios = axios.create({ withCredentials: true });

export const updateQuestion = async (quizId: string, question: Question) => {
  const response = await newAxios.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await newAxios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const addQuestion = async (quizId: string, question: Question) => {
  const response = await newAxios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

export const findQuestionsOfQuiz = async (quizId: string) => {
  const response = await newAxios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const findQuestionById = async (quizId: string, questionId: string) => {
    const response = await newAxios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
};

export const updateQuiz = async (quiz: Quiz) => {
  const response = await newAxios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await newAxios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: Quiz) => {
  const response = await newAxios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const findAllQuizzes = async (courseId: string) => {
  const response = await newAxios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizbyId = async (quizId: string) => {
    const response = await newAxios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

