import React, { ChangeEvent, useEffect, useRef } from 'react';

interface AutoTextAreaProps {
  styles: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  onBlur?: () => void;
  resizeOnEnter?: boolean;
  onEnter?: () => void;
}

export const AutoTextArea = ({
  styles,
  placeholder,
  value,
  setValue,
  onBlur,
  resizeOnEnter,
  onEnter,
}: AutoTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sizeTextarea = () => {
    const currentTextarea = textareaRef.current;

    if (currentTextarea) {
      currentTextarea.style.height = 'auto';
      currentTextarea.style.height = `${currentTextarea.scrollHeight}px`;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    sizeTextarea();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (resizeOnEnter && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (onEnter) {
        onEnter();
      }

      const currentTextarea = textareaRef.current;
      if (currentTextarea) {
        currentTextarea.style.height = 'auto';
      }
    }
  };

  useEffect(() => {
    sizeTextarea();
  }, []);

  return (
    <textarea
      onChange={handleChange}
      value={value}
      ref={textareaRef}
      className={styles}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      rows={1}
    >
      AutoTextArea
    </textarea>
  );
};
