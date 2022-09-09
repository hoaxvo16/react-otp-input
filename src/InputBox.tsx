import React from 'react';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
  style?: CSSProperties;
  focusIndex: number;
  index: number;
  onlyNumber?: boolean;
  className?: string;
  onChange: (index: number, value: string) => void;
  otpCode: string[];
}

export function InputBox({
  style,
  onChange,
  focusIndex,
  onlyNumber,
  className,
  index,
  otpCode,
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [disable, setDisable] = useState(true);

  const handleKeyDown: any = useCallback(
    (e: KeyboardEvent) => {
      if (
        (onlyNumber === undefined || onlyNumber === true) &&
        e.keyCode !== 8 &&
        isNaN(parseInt(e.key))
      ) {
        return;
      }
      if (e.keyCode === 8 && index > 0) {
        setDisable(true);
        onChange(index - 1, '');
      } else if (e.keyCode !== 8) {
        setDisable(true);
        setValue(e.key);
        onChange(index + 1, e.key);
      }
    },
    [index, onChange, onlyNumber]
  );

  useEffect(() => {
    if (focusIndex === index) {
      setDisable(false);
      if (value !== '') {
        setValue('');
      }
    }
  }, [focusIndex, index, value]);
  useEffect(() => {
    if (disable === false) {
      inputRef.current?.focus();
    }
  }, [disable]);

  useEffect(() => {
    if (otpCode.length === 0) {
      setValue('');
    }
  }, [otpCode]);

  return (
    <input
      className={className}
      autoComplete="off"
      value={value}
      ref={inputRef}
      maxLength={1}
      style={style}
      disabled={disable}
      onKeyDown={handleKeyDown}
    />
  );
}
