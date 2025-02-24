import { createStore, applyMiddleware, compose } from 'redux';
import enforceImmutableMiddleware from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import reduxReset from 'redux-reset';

import reducers from './reducers';
import initialState from './initial';

const enhancer =
 compose(applyMiddleware(
   enforceImmutableMiddleware(),
   thunkMiddleware,
 ), reduxReset());

const store = createStore(reducers, initialState, enhancer);

export default store;
