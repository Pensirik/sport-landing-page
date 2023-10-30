// TODO: remove this file
import { useContext, createContext, useReducer, PropsWithChildren } from 'react';
import { ExampleReducer, ExampleContextType, ExampleState } from '@/constants/example';

const exampleReducer: ExampleReducer = (state, action) => {
  switch (action.type) {
    case 'YES': return { example: true };
    case 'NO': return { example: false };
    default: throw new Error('no action');
  }
};

const initialState: ExampleState = { example: true };

const ExampleContext = createContext<ExampleContextType>([
  initialState,
  () => initialState,
]);

export const ExampleContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const handler = useReducer(exampleReducer, initialState);
  return (
    <ExampleContext.Provider value={handler}>
      {children}
    </ExampleContext.Provider>
  );
};

export const useExampleContext = () => useContext(ExampleContext);
