const initialState = {
  rules: [],
};

export function rulesReducer(state = initialState, action = {}) {
  const newState = state;

  switch (action.type) {
    case 'SET_RULES':
      newState.rules = action.rules;
      break;

    default:
      break;
  }

  return newState;
}
