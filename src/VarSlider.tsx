import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { usePointerDrag } from 'react-use-pointer-drag';

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
}: IVarSliderProps): JSX.Element => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(
    () => roundValue(currentValue, min, max, step, !!integer),
    [currentValue, min, max, step, integer]
  );
  const percent = useMemo(
    () => ((rounded - min) / (max - min)) * 100,
    [rounded, min, max]
  );

  const updatePosition = useCallback(
    (x: number) => {
      if (!sliderRef.current) {
        return;
      }

      const div = sliderRef.current;
      const rect = div.getBoundingClientRect();
      const percent = (x - rect.left) / rect.width;
      const value = roundValue(
        min + (max - min) * percent,
        min,
        max,
        step,
        !!integer
      );
      setCurrentValue(value);
    },
    [setCurrentValue, integer, min, max, step]
  );

  const increaseValue = useCallback(
    () =>
      setCurrentValue(
        roundValue(currentValue + step, min, max, step, !!integer)
      ),
    [currentValue, setCurrentValue, integer, min, max, step]
  );

  const decreaseValue = useCallback(
    () =>
      setCurrentValue(
        roundValue(currentValue - step, min, max, step, !!integer)
      ),
    [currentValue, setCurrentValue, integer, min, max, step]
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
    >
      <div className="react-var-ui-slider">
        <div
          className="react-var-ui-slider-track react-var-ui-interactive"
          ref={sliderRef}
          onClick={e => updatePosition(e.clientX)}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue)
          }
          onWheel={e => {
            e.deltaY < 0 ? increaseValue() : decreaseValue();
          }}
          title="Slider"
          {...dragProps()}
        >
          <div
            className="react-var-ui-slider-content"
            style={{ width: percent + '%' }}
          ></div>
        </div>
        {showInput ? (
          <input
            className="react-var-ui-slider-input"
            type="number"
            min={min}
            max={max}
            step={step}
            value={rounded}
            disabled={disabled}
            readOnly={readOnly}
            onChange={e =>
              setCurrentValue(
                roundValue(
                  parseFloat(e.target.value),
                  min,
                  max,
                  step,
                  !!integer
                )
              )
            }
          />
        ) : (
          <span>{rounded.toString()}</span>
        )}
        {showButtons && (
          <>
            <button
              title="Increase"
              onClick={increaseValue}
              disabled={disabled || readOnly}
            >
              <IconUp />
            </button>
            <button
              title="Decrease"
              onClick={decreaseValue}
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
