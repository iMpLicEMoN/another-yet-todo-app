import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import logger from 'redux-logger';

export const store: Store<any, AnyAction> = createStore(rootReducer, applyMiddleware(thunk, logger));
