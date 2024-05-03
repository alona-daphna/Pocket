import { useEffect, useRef, useState } from 'react';
import './App.css';
import EntryCard from './components/EntryCard';
import { Entry } from './types';
import Textbox from './components/Textbox';
import { IoIosArrowRoundBack } from 'react-icons/io';
import DarkLightToggle from './components/DarkLightToggle';
import useModeToggle from './hooks/useModeToggle';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isFullMode, setIsFullMode] = useState(false);
  const entriesRef = useRef<HTMLDivElement>(null);

  const { mode, toggleMode } = useModeToggle();

  const scrollToBottom = () => {
    if (entriesRef.current) {
      entriesRef.current.scrollTop = entriesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('http://localhost:4000/entries');
      const entries: Entry[] = await response.json();
      setEntries(entries);
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [entries]);

  return (
    <div className={`${mode === 'dark' ? 'dark' : ''} h-full`}>
      <div className="dark:bg-neutral-900 h-full w-full p-[2rem]">
        <DarkLightToggle mode={mode} toggleMode={toggleMode} />
        <div className="flex items-center justify-center mb-5 gap-[100px]">
          {isFullMode && (
            <IoIosArrowRoundBack
              className="ml-[-100px] text-3xl cursor-pointer dark:hover:bg-neutral-800 dark:text-neutral-50 hover:bg-slate-200 p-1 rounded-md"
              onClick={() => setIsFullMode(false)}
            />
          )}
          <h1 className=" font-bold text-3xl dark:text-white">Pocket</h1>
        </div>
        <div className="mx-auto h-[80vh] lg:w-1/3 flex flex-col justify-between">
          {!isFullMode && (
            <div ref={entriesRef} className="overflow-auto">
              {entries.map((entry) => (
                <EntryCard
                  key={entry._id}
                  entry={entry}
                  setEntries={setEntries}
                />
              ))}
            </div>
          )}
          <Textbox
            setEntries={setEntries}
            setIsFullMode={setIsFullMode}
            isFullMode={isFullMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
