import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScore,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  loadQuestions
} from "./rejection/rejection-reducer";
import { Score, AddQuestion, QuestionList } from "./rejection/components";

const Rejection = () => {
  const initialState = { question: "", askee: "", status: "unanswered" };
  const [values, setValues] = useState(initialState);

  const score = useSelector(({ rejectionState }) => getScore(rejectionState));
  const questions = useSelector(({ rejectionState }) => rejectionState);
  const action = useDispatch();

  useEffect(() => {
    action({type: loadQuestions().type});
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  const createQuestion = () => {
    action(addQuestion({ ...values }));
    resetForm();
  };

  const modifyQuestion = ({ id, question, askee, status }) => {
    action(updateQuestion({ id, question, askee, status }));
  };

  const removeQuestion = (id) => {
    action(deleteQuestion(id));
  };

  return (
    <>
      <Score score={score} />
      <AddQuestion
        values={values}
        onChange={onChange}
        onClick={createQuestion}
      ></AddQuestion>
      <QuestionList
        questions={questions}
        onChange={onChange}
        update={modifyQuestion}
        deleteButton={removeQuestion}
      />
    </>
  );
};

export default Rejection;
