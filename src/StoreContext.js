import React, { createContext, useReducer } from "react";

import reducer from "./reducers";
import initialState from "./reducers/initialState";

const StoreContext = createContext();

function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

const StoreContextConsumer = StoreContext.Consumer;

export { StoreContext, StoreContextProvider, StoreContextConsumer };
