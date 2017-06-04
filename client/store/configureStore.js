import {createStore, applyMiddleware} from 'redux';
import RootReducer from '../reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(InitialState) {
  return createStore(
    RootReducer,
    InitialState,
    applyMiddleware(thunk)
  );
}