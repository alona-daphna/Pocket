import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoTextArea } from './AutoTextArea';
import { GoScreenFull } from 'react-icons/go';
import { Entry } from '../types';

interface TextboxProps {
  setEntries: Dispatch<SetStateAction<Entry[]>>;
  setIsFullMode: (value: boolean) => void;
  isFullMode: boolean;
}

const Textbox = ({ setEntries, setIsFullMode, isFullMode }: TextboxProps) => {
  const [content, setContent] = useState('');

  const createEntry = async () => {
    const response = await fetch(
      'https://pocket-production.up.railway.app/entries',
      {
        method: 'POST',
        body: JSON.stringify({ content: content }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setIsFullMode(false);
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      {!isFullMode ? (
        <>
          <AutoTextArea
            styles="dark:bg-neutral-800 dark:text-white dark:border-neutral-700 overflow-hidden resize-none w-full px-3 focus:border-slate-300 border rounded-md border-white focus:outline-none"
            placeholder="type something..."
            value={content}
            setValue={setContent}
            onEnter={handleSubmit}
            resizeOnEnter={true}
          />
          <GoScreenFull
            className="cursor-pointer absolute right-2 bottom-[9px] dark:text-white dark:hover:bg-neutral-700 hover:bg-slate-200 p-1 rounded-md text-2xl"
            onClick={() => setIsFullMode(true)}
          />
        </>
      ) : (
        <textarea
          className="dark:bg-neutral-800 w-full dark:text-white h-[80vh] resize-none focus:outline-none rounded-md px-2 py-1"
          placeholder="type something..."
          onKeyDown={handleKeyDown}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
    </div>
  );
};

export default Textbox;
