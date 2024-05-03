import React, { useEffect, useState } from 'react';
import { Mode } from '../types';

const useModeToggle = () => {
  const [mode, setMode] = useState<Mode>('light');

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mode', newMode);
    setMode(newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');

    if ((savedMode && savedMode === 'light') || savedMode === 'dark') {
      setMode(savedMode);
    }
  }, []);

  return { toggleMode, mode };
};

export default useModeToggle;
