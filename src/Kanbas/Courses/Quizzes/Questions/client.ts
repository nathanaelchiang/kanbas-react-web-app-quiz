import axios from 'axios';
const API_BASE = "http://localhost:5000";
const Quizzes_API = 'http://localhost:5000/api/Quizzes';
const COURSES_API = 'http://localhost:5000/api/Courses';
const QUESTIONS_API = 'http://localhost:5000/api/Questions';


export const findAllQuestions = async () => {
    const response = await axios.get(QUESTIONS_API);
    return response.data;
};

export const findQuestionById = async (questionId: any) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const updateQuestion = async (question: any) => {
    console.log("updateQuestion", question);
    const response = await axios.
        put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
}

export const deleteQuestion = async (questionId: any) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const createQuestion = async (quizId: any, question: any) => {
    const response = await axios.post(
        `${Quizzes_API}/${quizId}/questions`,
        question
    );
    return response.data;
};