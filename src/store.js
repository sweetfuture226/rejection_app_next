  
import { combineReducers } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./rejection/rejection-reducer";
import rootSaga from './rejection/rejection-saga';

const logger = createLogger();
const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  rejectionState: reducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);

saga.run(rootSaga);
