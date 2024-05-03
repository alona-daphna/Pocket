import { useEffect, useRef, useState } from 'react';
import './App.css';
import EntryCard from './components/EntryCard';
import { Entry } from './types';
import Textbox from './components/Textbox';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
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
      <h1 className=" font-bold text-3xl mb-5">Pocket</h1>
      <div className="mx-auto h-[80vh] lg:w-1/3 flex flex-col justify-between">
        <div ref={entriesRef} className="overflow-auto">
          {entries.map((entry) => (
            <EntryCard key={entry._id} entry={entry} setEntries={setEntries} />
          ))}
        </div>
        <div className="">
          <Textbox setEntries={setEntries} />
        </div>
      </div>
    </>
  );
}

export default App;
