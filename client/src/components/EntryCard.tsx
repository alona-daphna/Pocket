import React, { useMemo, useState } from 'react';
import { Entry } from '../types';
import { formatDate } from '../utils/formatting';
import { AutoTextArea } from './AutoTextArea';
import { TiDelete } from 'react-icons/ti';

interface EntryProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryProps) => {
  const [content, setContent] = useState(entry.content);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const formattedDate = useMemo(() => {
    let date = formatDate(entry.createdAt);
    const day = date.slice(-1);
    date = date.concat(['th', 'st', 'nd', 'rd'][+day % 10 > 3 ? 0 : +day % 10]);

    return date;
  }, [entry.createdAt]);

  const handleSave = async () => {
    await fetch(`http://localhost:4000/entries/${entry._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const toggleConfirmPopup = async () => {
    //show popup
  };

  return (
    <div
      className=" relative w-full bg-slate-50 rounded-md py-5 px-6 items-start flex flex-col mb-4"
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      <TiDelete
        className={` cursor-pointer hover:text-[red] absolute right-2 top-3 ${
          showDeleteBtn ? 'block' : 'hidden'
        }`}
        onClick={toggleConfirmPopup}
      />
      <AutoTextArea
        styles="text-left resize-none text-sm w-full bg-inherit focus:outline-none"
        value={content}
        setValue={setContent}
        onBlur={handleSave}
      />
      <span className="text-xs place-self-end">{formattedDate}</span>
    </div>
  );
};

export default EntryCard;
