import { useEffect, useRef, useState } from 'react';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  function setSafeAsyncState(data) {
    if (isMounted) {
      setState(data);
    }
  }

  return [state, setSafeAsyncState];
}