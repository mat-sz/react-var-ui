import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { usePointerDrag } from 'react-use-pointer-drag';

import { Number } from './common/Number';
import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';

export interface IVarSliderProps extends IVarBaseInputProps<number> {
  /**
   * Minimum value.
   */
  min: number;

  /**
   * Maximum value.
   */
  max: number;

  /**
   * Step.
   */
  step: number;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;

  /**
   * If true will display an editable input, otherwise shows a read only value.
   */
  showInput?: boolean;

  /**
   * If true will display buttons that increase and decrease the value by step.
   */
  showButtons?: boolean;

  /**
   * Unit to display to the right of the input field.
   */
  unit?: string;
}

/**
 * Integer/float slider component. Accepts and provides numbers.
 */
export const VarSlider = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step,
  integer,
  defaultValue,
  showInput,
  showButtons,
  disabled,
  readOnly,
  className,
  error,
  errorPath,
  unit,
}: IVarSliderProps): JSX.Element => {
  const sliderRef = useRef<HTMLDivElement>(null);
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
  const percent = useMemo(
    () => ((rounded - min) / (max - min)) * 100,
    [rounded, min, max]
  );

  const setValue = useCallback(
    (value: number) => {
      setCurrentValue(round(value));
    },
    [round, setCurrentValue]
  );

  const updatePosition = useCallback(
    (x: number) => {
      if (!sliderRef.current) {
        return;
      }

      const div = sliderRef.current;
      const rect = div.getBoundingClientRect();
      const percent = (x - rect.left) / rect.width;
      setValue(min + (max - min) * percent);
    },
    [setValue, integer, min, max, step]
  );

  const { dragProps } = usePointerDrag({
    onMove: ({ x }) => updatePosition(x),
  });

  useEffect(() => {
    sliderRef.current?.addEventListener('wheel', e => e.preventDefault());
  }, []);

  return (
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      error={currentError}
    >
      <div className="react-var-ui-slider">
        <div
          className="react-var-ui-slider-track react-var-ui-interactive"
          ref={sliderRef}
          onClick={e => updatePosition(e.clientX)}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setValue(defaultValue)
          }
          onWheel={e => setValue(currentValue - step * Math.sign(e.deltaY))}
          title="Slider"
          {...dragProps()}
        >
          <div
            className="react-var-ui-slider-content"
            style={{ width: percent + '%' }}
          ></div>
        </div>
        {showInput ? (
          <Number
            className="react-var-ui-slider-input"
            round={round}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            readOnly={readOnly}
            onChange={setValue}
            value={currentValue}
            unit={unit}
          />
        ) : (
          <span>
            {rounded.toString()}
            {unit}
          </span>
        )}
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
