import cuid from "cuid";

const createQuestion = (actionName) => {
  const type = `rejection/${actionName}`;
  const func = ({ question, askee, status, id = cuid() }) => ({
    type,
    payload: {
      [id]: { question, askee, status },
    },
  });
  func.type = type;
  return func;
};

const addQuestion = createQuestion("addQuestion");
const updateQuestion = createQuestion("updateQuestion");

const deleteQuestion = (id) => ({
  type: deleteQuestion.type,
  payload: { id },
});
deleteQuestion.type = "rejection/deleteQuestion";

const loadQuestions = (state = {}) => {
  return {
    type: loadQuestions.type,
    payload: state,
  };
};
loadQuestions.type = "rejection/loadQuestions";

function reducer(state = {}, { type, payload } = {}) {
  switch (type) {
    case addQuestion.type:
      return { ...state, ...payload };
    case updateQuestion.type:
      return { ...state, ...payload };
    case deleteQuestion.type: {
      const { [payload.id]: deleted, ...newState } = state;
      return newState;
    }
    case loadQuestions.type:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// prettier-ignore
const getScore = (state) =>
  Object.values(state).reduce(
    (score, { status }) =>
      status === "accepted" ? score + 1 : 
      status === "rejected" ? score + 10 : 
      score, 0
  );

const getState = (state) => state;

export {
  reducer,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  loadQuestions,
  getScore,
  getState,
};
