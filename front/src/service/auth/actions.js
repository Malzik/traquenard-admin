export const authenticate = () => ({
  type: 'AUTHENTICATE',
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const updateAuth = (user, token) => ({
  type: 'UPDATE_AUTH',
  user,
  token,
});
