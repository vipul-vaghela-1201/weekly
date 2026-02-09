import { useEffect, useRef } from 'react';
import { loadState, saveState } from '../services/storageService';

export const useLocalStorage = (state, enabled = true) => {
  const initialLoad = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      saveState(state);
    }, 300);
    return () => clearTimeout(timeout);
  }, [state, enabled]);
};

export const getInitialStoredState = () => loadState();
