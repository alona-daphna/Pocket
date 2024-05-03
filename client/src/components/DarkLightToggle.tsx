import { Mode } from '../types';

interface DarkLightToggleProps {
  mode: Mode;
  toggleMode: () => void;
}

const DarkLightToggle = ({ mode, toggleMode }: DarkLightToggleProps) => {
  return (
    <div>
      <button
        className="dark:text-white dark:bg-neutral-800 bg-slate-200 absolute right-5 top-2 text-xs cursor-pointer p-1 rounded-md"
        onClick={toggleMode}
      >
        {mode === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

export default DarkLightToggle;
