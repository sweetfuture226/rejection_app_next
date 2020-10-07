import { describe } from "riteway";
import { call, put, select } from "redux-saga/effects";

import {
  reducer,
  addQuestion,
  loadQuestions,
  getState,
} from "./rejection-reducer";
import { loadLocalState, saveLocalState } from "./rejection-saga";
import { loadState, saveState } from "../services/localStorage";

const createQuestion = ({
  question = "",
  askee = "unknown",
  status = "unanswered",
}) => ({
  question,
  askee,
  status,
});

describe("rejection saga save state to LocalStorage", async (assert) => {
  {
    const iter = saveLocalState();

    const question = createQuestion({
      question: "Will you fund my company?",
      askee: "A16z",
    });

    const state = reducer(reducer(), addQuestion(question));

    assert({
      given: "saveLocalState saga",
      should: "load the state with getState",
      actual: iter.next().value,
      expected: select(getState),
    });

    assert({
      given: "saveLocalState saga",
      should: "then call the saveState with the state",
      actual: iter.next(state).value,
      expected: call(saveState, state),
    });

    assert({
      given: "saveLocalState saga",
      should: "then be complete",
      actual: iter.next(),
      expected: { done: true, value: undefined },
    });
  }
});

describe("rejection saga load state from LocalStorage (Empty)", async (assert) => {
  {
    const iter = loadLocalState();

    assert({
      given: "loadLocalState saga",
      should: "first call loadState",
      actual: iter.next().value,
      expected: call(loadState),
    });

    assert({
      given: "loadLocalState saga",
      should: "then put the loaded state",
      actual: iter.next(undefined).value,
      expected: put(loadQuestions()),
    });

    assert({
      given: "loadLocalState saga",
      should: "then be complete",
      actual: iter.next(),
      expected: { done: true, value: undefined },
    });
  }
});

describe("rejection saga load state from LocalStorage (Populated)", async (assert) => {
  {
    const iter = loadLocalState();

    const question = createQuestion({
      question: "Will you fund my company?",
      askee: "A16z",
    });

    const state = reducer(reducer(), addQuestion(question));

    assert({
      given: "loadLocalState saga",
      should: "first call loadState",
      actual: iter.next().value,
      expected: call(loadState),
    });

    assert({
      given: "loadLocalState saga",
      should: "then put loadQuestions with the loaded state",
      actual: iter.next(state).value,
      expected: put(loadQuestions(state)),
    });

    assert({
      given: "loadLocalState saga",
      should: "then be complete",
      actual: iter.next(),
      expected: { done: true, value: undefined },
    });
  }
});
