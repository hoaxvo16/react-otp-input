import React from 'react';
import {
  CSSProperties,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { InputBox } from './InputBox';

interface IProps {
  count: number;
  onFinish: (value: string[]) => void;
  onChange?: (value: string[]) => void;
  onReset?: () => void;
  inputStyle?: CSSProperties;
  className?: string;
  onlyNumber?: boolean;
  checkValue?: (value: string) => boolean;
  containerStyle?: CSSProperties;
  inputClassName?: string;
}

export function OTPContainer({
  onFinish,
  count,
  inputStyle,
  onChange,
  onlyNumber,
  checkValue,
  className,
  inputClassName,
  containerStyle,
}: IProps) {
  const [focusIndex, setFocusIndex] = useState(0);
  const [otpCode, setOtpCode] = useState<Array<string>>([]);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (checkValue !== undefined && !checkValue(value)) {
        return;
      }
      setFocusIndex(index);
      if (value === '') {
        otpCode.pop();
        const temp = [...otpCode];
        setOtpCode([...temp]);
        if (onChange) {
          onChange(temp);
        }
      } else {
        const temp = [...otpCode, value];
        setOtpCode(temp);
        if (onChange) {
          onChange(temp);
        }
      }
    },
    [onChange, otpCode, checkValue]
  );
  useEffect(() => {
    if (otpCode.length === count) {
      setFocusIndex(0);
      onFinish(otpCode);
      setOtpCode([]);
    }
  }, [otpCode, count, onFinish]);
  const renderInput = useMemo(() => {
    const inputs = [];
    for (let i = 0; i < count; i++) {
      inputs.push(
        <InputBox
          otpCode={otpCode}
          className={inputClassName}
          onChange={handleInputChange}
          focusIndex={focusIndex}
          onlyNumber={onlyNumber}
          index={i}
          key={i}
          style={inputStyle}
        />
      );
    }
    return inputs;
  }, [
    count,
    onlyNumber,
    focusIndex,
    inputStyle,
    handleInputChange,
    inputClassName,
    otpCode,
  ]);

  return (
    <div style={containerStyle} className={className}>
      {renderInput.map(input => input)}
    </div>
  );
}
