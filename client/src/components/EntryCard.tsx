import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Entry } from '../types';
import { formatDate } from '../utils/formatting';
import { AutoTextArea } from './AutoTextArea';
import { TiDelete } from 'react-icons/ti';
import DeleteConfirmPopup from './DeleteConfirmPopup';

interface EntryProps {
  entry: Entry;
  setEntries: Dispatch<SetStateAction<Entry[]>>;
}

const EntryCard = ({ entry, setEntries }: EntryProps) => {
  const [content, setContent] = useState(entry.content);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

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

  const handleDelete = async () => {
    setShowDeletePopup(false);
    const response = await fetch(`http://localhost:4000/entries/${entry._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setEntries((prev) => [...prev.filter((x) => x._id != entry._id)]);
    } else {
      console.log((await response.json()).error);
    }
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
        onClick={() => setShowDeletePopup(true)}
      />
      <AutoTextArea
        styles="text-left resize-none text-sm w-full bg-inherit focus:outline-none"
        value={content}
        setValue={setContent}
        onBlur={handleSave}
      />
      <span className="text-xs place-self-end">{formattedDate}</span>
      {showDeletePopup && (
        <DeleteConfirmPopup
          setShowPopup={setShowDeletePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default EntryCard;
