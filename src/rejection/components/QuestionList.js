import React from "react";

export const QuestionList = ({ questions = {}, deleteButton, update }) =>
  Object.keys(questions).length ? (
    <table>
      <tr>
        <th>ID</th>
        <th>Question</th>
        <th>Askee</th>
        <th>Status</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      {Object.keys(questions).map((key) => {
        const { question, askee, status } = questions[key];
        const id = key;
        return (
          <tr key={id} className="questionList">
            <td>{id}</td>
            <td>{question}</td>
            <td>{askee}</td>
            <td>{status}</td>
            <td>
              {
                <select
                  className="status"
                  value={status}
                  onChange={(event) =>
                    update({ id, question, askee, status: event.target.value })
                  }
                >
                  <option value="unanswered">Unanswered</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              }
            </td>
            <td>
              <button
                className="deleteButton"
                onClick={() => deleteButton(key)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </table>
  ) : (
    <></>
  );
