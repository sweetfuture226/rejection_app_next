import { describe } from "riteway";
import deepFreeze from "deep-freeze";
import {
  reducer,
  addQuestion,
  getScore,
  updateQuestion,
  deleteQuestion,
  getState, loadQuestions
} from "./rejection-reducer";

const createState = (state = {}) => state;

const createQuestion = ({
  question = "",
  askee = "unknown",
  status = "unanswered",
}) => ({
  question,
  askee,
  status,
});

describe("rejection reducer", async (assert) => {
  assert({
    given: "no arguments",
    should: "return the intial state",
    actual: reducer(),
    expected: createState(),
  });
});

describe("add question", async (assert) => {
  const question = createQuestion({
    question: "Will you fund my company?",
    askee: "A16z",
  });

  const state = reducer(reducer(), addQuestion(question));

  assert({
    given: "a question to add",
    should: "add the question to state",
    actual: Object.keys(state).length,
    expected: 1,
  });
});

describe("get score", async (assert) => {
  const actions = [
    { status: "accepted" },
    { status: "accepted" },
    { status: "rejected" },
  ].map(addQuestion);

  assert({
    given: "no questions and asnwers",
    should: "return the score of 0",
    actual: getScore(reducer()),
    expected: 0,
  });

  const state = actions.reduce(reducer, reducer());

  assert({
    given: "some questions and asnwers",
    should: "return the correct score",
    actual: getScore(state),
    expected: 12,
  });
});

describe("update question", async (assert) => {
  const actions = [
    { status: "accepted" },
    { status: "accepted" },
    { status: "unanswered" },
  ].map(addQuestion);

  const state = actions.reduce(reducer, reducer());
  const id = Object.keys(state)[2];
  const updatedQuestion = { ...state[id], id, status: "accepted" };
  
  deepFreeze(state);

  const newState = reducer(state, updateQuestion(updatedQuestion));

  assert({
    given: "a question is updated",
    should: "return a state with the updated field",
    actual: newState[id].status,
    expected: 'accepted',
  });
});

describe("delete question", async (assert) => {
  const actions = [
    { status: "accepted" },
    { status: "accepted" },
    { status: "unanswered" },
  ].map(addQuestion);

  const state = actions.reduce(reducer, reducer());
  const id = Object.keys(state)[2];

  deepFreeze(state);

  const newState = reducer(state, deleteQuestion(id));

  assert({
    given: "a question is deleted",
    should: "return a state without the deleted question",
    actual: Object.keys(newState).length,
    expected: 2,
  });
});

describe("getState", async (assert) => {
  const question = createQuestion({
    question: "Will you fund my company?",
    askee: "A16z",
  });

  const state = reducer(reducer(), addQuestion(question));

  assert({
    given: "questions in state getState",
    should: "return the state",
    actual: getState(state),
    expected: state,
  });
});

describe("loadQuestions", async (assert) => {
  const question = createQuestion({
    question: "Will you fund my company?",
    askee: "A16z",
  });

  const state = reducer(reducer(), addQuestion(question));
  
  assert({
    given: "a load questions action",
    should: "return the state with loaded questions",
    actual: reducer(reducer(), loadQuestions(state)),
    expected: state,
  });
});
