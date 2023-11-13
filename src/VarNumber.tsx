import React, { useCallback, useMemo } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';

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
  className,
}: IVarNumberProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(
    () => roundValue(currentValue, min, max, step, !!integer),
    [currentValue, min, max, step, integer]
  );

  const increaseValue = useCallback(
    () =>
      setCurrentValue(
        roundValue(currentValue + (step ?? 1), min, max, step, !!integer)
      ),
    [currentValue, setCurrentValue, integer, min, max, step]
  );

  const decreaseValue = useCallback(
    () =>
      setCurrentValue(
        roundValue(currentValue - (step ?? 1), min, max, step, !!integer)
      ),
    [currentValue, setCurrentValue, integer, min, max, step]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-number">
        <input
          className="react-var-ui-number-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={rounded.toString()}
          onChange={e =>
            setCurrentValue(
              roundValue(parseFloat(e.target.value), min, max, step, !!integer)
            )
          }
        />
        {showButtons && (
          <>
            <button title="Increase" onClick={increaseValue}>
              <IconUp />
            </button>
            <button title="Decrease" onClick={decreaseValue}>
              <IconDown />
            </button>
          </>
        )}
      </div>
    </VarBase>
  );
};
