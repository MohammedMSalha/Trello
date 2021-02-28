import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { Reducer } from './reducers/Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'


const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['Reducer'] // which reducer want to store
};


const rootReducer = combineReducers({
  Reducer: Reducer,
});

const perReducer= persistReducer(persistConfig,rootReducer)

export const store = createStore(
  perReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export const persiststore= persistStore(store);
export default {store,persiststore};