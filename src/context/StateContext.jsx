import React, { useEffect, useReducer } from 'react';

const LOCAL_STORAGE_KEY = 'activeIds';

const employeesReducer = (state, [type, payload]) => {
  switch (type) {
    case 'setEmployees':
      return {
        ...state,
        employees: payload,
      };
    case 'setActiveIds':
      return {
        ...state,
        activeIds: payload,
      };
    case 'addActiveId':
      return {
        ...state,
        activeIds: [
          ...state.activeIds,
          payload,
        ],
      };
    case 'removeActiveId':
      return {
        ...state,
        activeIds: state.activeIds.filter(id => id !== payload),
      };
    default:
      return state;
  };
};

const initialState = {
  employees: [],
  activeIds: [],
};

export const DispatchContext = React.createContext(() => {});
export const StateContext = React.createContext(null);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, initialState, () => {
    try {
      return {
        ...initialState,
        activeIds: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
      };
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.activeIds));
  }, [state.activeIds]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
