import React, { useState } from 'react';
import { AutoTextArea } from './AutoTextArea';
import { GoScreenFull } from 'react-icons/go';

const Textbox = () => {
  const [content, setContent] = useState('');

  const createEntry = async () => {
    await fetch('http://localhost:4000/entries', {
      method: 'POST',
      body: JSON.stringify({ content: content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
