"use client";

import { ReducerAction, createContext, useReducer } from "react";
interface Action {
  type: string;
  payload?: Object;
}
interface State {
  user: Object | null;
}
export const AppContext = createContext({});
function rootReducer(state: State = { user: null }, action: Action) {
  if (action.type === "SET_USER") {
    let tempState = { ...state };
    if (action.payload) {
      tempState.user = action.payload;
    }
    return tempState;
  } else if (action.type === "REMOVE_USER") {
    return { ...state, user: null };
  } else {
    //default
    return state;
  }
}
export default function Context({ children }) {
  const [state, dispatch] = useReducer(rootReducer);
  return (
    <AppContext.Provider
      value={{ user: state && state.user, dispatch: dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
