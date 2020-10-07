import React from "react";

export const AddQuestion = ({ onChange = () => {}, values, onClick }) => {
  return (
    <>
      <label>
        Question:
        <input
          type="text"
          name="question"
          className="question"
          value={values.question}
          onChange={onChange}
          autoComplete="off"
        />
      </label>

      <label>
        Askee:
        <input
          type="text"
          name="askee"
          className="askee"
          value={values.askee}
          onChange={onChange}
          autoComplete="off"
        />
      </label>

      <label>
        Status:
        <select
          id="status"
          className="status"
          name="status"
          onChange={onChange}
          value={values.status}
        >
          <option value="unanswered">unanswered</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </label>
      <button id="add" className="add" onClick={onClick}>
        Add
      </button>
    </>
  );
};
