// TODO: remove this file
import { useState } from 'react';

const useExample = () => {
  const [state, setState] = useState(0);

  return {
    state,
    setState,
  };
};

export default useExample;
