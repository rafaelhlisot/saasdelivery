//packages imports
import { createContext, useReducer } from 'react';

//reducers imports
import { reducer } from './reducer';

//types imports
import { ContextType, DataType, ProviderType } from './types';

export { useAuthContext } from './hook';

const initialState: DataType = {
  token: '',
  user: null
}

export const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {}
});

export const Provider = ({children}: ProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {state, dispatch};
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}


