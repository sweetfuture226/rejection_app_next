import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loadState, saveState } from "../services/localStorage";

import {
  loadQuestions,
  deleteQuestion,
  getState,
} from "./rejection-reducer";

export const loadFromLocalStorage = () => ({
  type: 'rejection/loadQuestions'
});

export function* saveLocalState() {
  const state = yield select(getState);
  yield call(saveState, state);
}

export function* loadLocalState() {
  const state = yield call(loadState);
  yield put(loadQuestions(state));
}

function* watchAddQuestion() {
  yield takeEvery('rejection/addQuestion', saveLocalState);
};

function* watchUpdateQuestion() {
  yield takeEvery('rejection/updateQuestion', saveLocalState);
};

function* watchDeleteQuestion() {
  yield takeEvery(deleteQuestion().type, saveLocalState);
};

function* watchLoadQuestions() {
  yield takeEvery(loadFromLocalStorage().type, loadLocalState);
};

export default function* rootSaga() {
  yield all([
    watchAddQuestion(),
    watchUpdateQuestion(),
    watchDeleteQuestion(),
    watchLoadQuestions()
  ]);
};