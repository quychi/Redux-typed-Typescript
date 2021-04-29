import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { expenseReducer } from "../reducers/expenses";
import { AppActions } from "../types/actions";

export const rootReducer = combineReducers({
  expenses: expenseReducer
});

export type AppState = ReturnType<typeof rootReducer>;      //AppState bản chất sẽ grab all the type from all our different reducers and store them into App State

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));//!!!
