import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoTextArea } from './AutoTextArea';
import { GoScreenFull } from 'react-icons/go';
import { Entry } from '../types';

interface TextboxProps {
  setEntries: Dispatch<SetStateAction<Entry[]>>;
}

const Textbox = ({ setEntries }: TextboxProps) => {
  const [content, setContent] = useState('');

  const createEntry = async () => {
    const response = await fetch('http://localhost:4000/entries', {
      method: 'POST',
      body: JSON.stringify({ content: content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const entry: Entry = await response.json();
      setEntries((prev) => [...prev, entry]);
    } else {
      console.log((await response.json()).error);
    }
  };

  const handleSubmit = () => {
    createEntry();
    setContent('');
  };

  const toggleFullMode = () => {};

  return (
    <div className="relative">
      <AutoTextArea
        styles="overflow-hidden resize-none w-full px-3 py-2 focus:border-slate-300 border-2 rounded-md border-white focus:outline-none"
        placeholder="type something..."
        value={content}
        setValue={setContent}
        onEnter={handleSubmit}
        resizeOnEnter={true}
      />
      <GoScreenFull
        className="cursor-pointer absolute right-0 bottom-3"
        onClick={toggleFullMode}
      />
    </div>
  );
};

export default Textbox;
