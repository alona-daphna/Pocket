import { useEffect, useRef, useState } from 'react';
import './App.css';
import EntryCard from './components/EntryCard';
import { Entry } from './types';
import Textbox from './components/Textbox';
import { IoIosArrowRoundBack } from 'react-icons/io';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isFullMode, setIsFullMode] = useState(false);
  const entriesRef = useRef<HTMLDivElement>(null);

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
    <>
      <div className="flex items-center justify-center mb-5 gap-[100px]">
        <IoIosArrowRoundBack
          className="ml-[-100px] text-3xl cursor-pointer hover:bg-slate-200 p-1 rounded-md"
          onClick={() => setIsFullMode(false)}
        />
        <h1 className=" font-bold text-3xl">Pocket</h1>
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
        <div className="">
          <Textbox
            setEntries={setEntries}
            setIsFullMode={setIsFullMode}
            isFullMode={isFullMode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
