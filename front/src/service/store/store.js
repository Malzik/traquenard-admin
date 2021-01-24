import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './AllReducers';
import { asyncDispatchMiddleware } from './asyncDispatchMiddleware';

const middleware = [thunk, asyncDispatchMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
