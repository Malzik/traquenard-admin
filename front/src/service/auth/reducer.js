const initialState = {
  authenticated: false,
  user: null,
  token: null,
};

export function authReducer(state = initialState, action = {}) {
  const newState = state;

  switch (action.type) {
    case 'AUTHENTICATE':
      newState.authenticated = true;
      break;

    case 'LOGOUT':
      newState.authenticated = false;
      break;

    case 'UPDATE_AUTH':
      newState.user = action.user;
      newState.token = action.token;
      break;

    default:
      break;
  }

  return newState;
}
