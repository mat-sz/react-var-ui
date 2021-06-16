import React, { FC, useCallback, useMemo, useRef } from 'react';

import { usePointerDrag, useVarUIValue } from './VarUI';
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

function roundValue(
  value: number,
  min: number,
  max: number,
  step: number,
  integer: boolean
): number {
  const decimalPlaces = step.toString().split('.')[1]?.length || 0;
  value = Math.round(value / step) * step;
  value = Math.max(min, value);
  value = Math.min(max, value);

  return integer ? Math.round(value) : parseFloat(value.toFixed(decimalPlaces));
}

/**
 * Integer/float slider component. Accepts and provides numbers.
 */
export const VarSlider: FC<IVarSliderProps> = ({
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
  showButtons
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(
    () => roundValue(currentValue, min, max, step, !!integer),
    [currentValue, min, max, step, integer]
  );
  const percent = useMemo(() => ((rounded - min) / (max - min)) * 100, [
    rounded,
    min,
    max
  ]);

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

  const { events } = usePointerDrag(updatePosition);

  return (
    <VarBase label={label}>
      <div className="react-var-ui-slider">
        <div
          className="react-var-ui-slider-track"
          ref={sliderRef}
          onClick={e => updatePosition(e.clientX)}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue)
          }
          {...events}
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
            onChange={e =>
              setCurrentValue(
                integer ? parseInt(e.target.value) : parseFloat(e.target.value)
              )
            }
          />
        ) : (
          <span>{rounded}</span>
        )}
        {showButtons && (
          <>
            <button
              title="Increase"
              onClick={() =>
                setCurrentValue(
                  roundValue(currentValue + step, min, max, step, !!integer)
                )
              }
            >
              <IconUp />
            </button>
            <button
              title="Decrease"
              onClick={() =>
                setCurrentValue(
                  roundValue(currentValue - step, min, max, step, !!integer)
                )
              }
            >
              <IconDown />
            </button>
          </>
        )}
      </div>
    </VarBase>
  );
};
