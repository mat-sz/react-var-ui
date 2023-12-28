import React, { useCallback, useEffect, useRef } from 'react';

export interface INumberProps {
  value: number;
  onChange: (value: number) => void;
  round: (value: number) => number;
  min?: number;
  max?: number;
  step: number;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  unit?: string;
}

/**
 * Integer/float slider component. Accepts and provides numbers.
 */
export const Number = ({
  value,
  onChange,
  min,
  max,
  step,
  className,
  disabled,
  readOnly,
  round,
  unit,
}: INumberProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const setValue = useCallback(
    (value: number) => {
      if (inputRef.current) {
        inputRef.current.value = String(round(value));
      }

      onChange(value);
    },
    [onChange, round]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = String(value);
    }
  }, [value]);

  const updateValueFromInput = () => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    setValue(parseFloat(input.value));
  };

  const events =
    disabled || readOnly
      ? {}
      : {
          onBlur: updateValueFromInput,
          onKeyDown: (e: React.KeyboardEvent) => {
            const input = inputRef.current!;
            switch (e.key) {
              case 'ArrowUp':
                e.preventDefault();
                setValue(parseFloat(input.value) + step);
                break;
              case 'ArrowDown':
                e.preventDefault();
                setValue(parseFloat(input.value) - step);
                break;
            }
          },
          onKeyUp: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              updateValueFromInput();
            }
          },
        };

  return (
    <div className={className}>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        ref={inputRef}
        {...events}
      />
      {unit ? <span>{unit}</span> : null}
    </div>
  );
};
