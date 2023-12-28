import React, { useCallback, useMemo } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';
import { Number } from './common/Number';

export interface IVarNumberProps extends IVarBaseInputProps<number> {
  /**
   * Minimum value.
   */
  min?: number;

  /**
   * Maximum value.
   */
  max?: number;

  /**
   * Step.
   */
  step?: number;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;

  /**
   * If true will display buttons that increase and decrease the value by step.
   * Step must be set.
   */
  showButtons?: boolean;
}

/**
 * Integer/float number component. Accepts and provides numbers.
 */
export const VarNumber = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step = 1,
  integer,
  showButtons,
  disabled,
  readOnly,
  className,
  error,
  errorPath,
}: IVarNumberProps): JSX.Element => {
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });
  const round = useCallback(
    (value: number) => roundValue(value, min, max, step, !!integer),
    [min, max, step, integer]
  );
  const rounded = useMemo(() => round(currentValue), [currentValue, round]);

  const setValue = useCallback(
    (value: number) => {
      value = round(value);
      setCurrentValue(value);
    },
    [round, setCurrentValue]
  );

  return (
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      error={currentError}
    >
      <div className="react-var-ui-number">
        <Number
          className="react-var-ui-number-input"
          round={round}
          min={min}
          max={max}
          step={step}
          value={rounded}
          disabled={disabled}
          readOnly={readOnly}
          onChange={setValue}
        />
        {showButtons && (
          <>
            <button
              title="Increase"
              onClick={() => setValue(currentValue + step)}
              disabled={disabled || readOnly}
            >
              <IconUp />
            </button>
            <button
              title="Decrease"
              onClick={() => setValue(currentValue - step)}
              disabled={disabled || readOnly}
            >
              <IconDown />
            </button>
          </>
        )}
      </div>
    </VarBase>
  );
};
