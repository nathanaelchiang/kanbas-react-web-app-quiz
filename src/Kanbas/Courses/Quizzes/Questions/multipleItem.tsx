import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KanbasState } from "../../../store";
import { setAnswer, removeAnswer, updateAnswer, addAnswer } from "../reducer";
import exp from "constants";

interface Props {
  question: any;
}

const MultipleItem: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch();
  const { quizId, questionId } = useParams();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddAnswer = () => {
    if (inputValue.trim() !== "") {
      const updatedQuestion = {
        ...question,
        possibleAnswers: [...question.possibleAnswers, inputValue],
      };
      console.log(inputValue);
      dispatch(addAnswer(inputValue)); // Add answer to Redux state
      setInputValue(""); // Clear the input field after adding the answer
    }
    console.log(question.possibleAnswers);
  };

  return (
    <div>
      <h4>Multiple Choice Question</h4>
      <div>
        <input
          type="text"
          placeholder="Enter a possible answer"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddAnswer}>Add Answer</button>
      </div>
      <div>
        {question.possibleAnswers.map((answer: string, index: number) => (
          <div key={index} className="list-group-item">
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                dispatch(setAnswer(answer));
              }}
            />
            <button onClick={() => dispatch(removeAnswer(index))}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleItem;
