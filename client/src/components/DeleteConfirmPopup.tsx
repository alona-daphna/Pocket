import React from 'react';

interface DeleteConfirmPopupProps {
  setShowPopup: (value: boolean) => void;
  handleDelete: () => void;
}

const DeleteConfirmPopup = ({
  setShowPopup,
  handleDelete,
}: DeleteConfirmPopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 ">
      <div className="dark:bg-neutral-800 bg-white rounded-md py-4 px-3 w-[300px]">
        <p className="text-lg pl-4 text-left font-bold">Delete Entry?</p>
        <p className="mb-5 pl-4 text-sm text-left">
          Are you sure you want to delete this entry?
        </p>
        <button
          className="dark:bg-neutral-700 bg-slate-200 rounded-md px-2 mr-1"
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[red] text-white rounded-md px-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
