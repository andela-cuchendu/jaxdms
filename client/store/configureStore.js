import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers';

export default function configureStore(InitialState) {
  return createStore(
    RootReducer,
    InitialState,
    applyMiddleware(thunk),
  );
}
