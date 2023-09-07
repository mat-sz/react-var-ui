import React, { FC, useCallback, useMemo, useRef } from 'react';
import { usePointerDrag } from 'react-use-pointer-drag';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export type IVarXYValue = [number, number];

export interface IVarXYProps extends IVarBaseInputProps<IVarXYValue> {
  /**
   * Minimum value.
   */
  min?: IVarXYValue;

  /**
   * Maximum value.
   */
  max?: IVarXYValue;

  /**
   * Step.
   */
  step?: IVarXYValue;
}

function roundValue(
  value: IVarXYValue,
  min: IVarXYValue,
  max: IVarXYValue,
  step: IVarXYValue
): IVarXYValue {
  const result: IVarXYValue = [0, 0];

  if (!value || !Array.isArray(value) || value.length < 2) {
    return result;
  }

  for (let i = 0; i < step.length; i++) {
    const decimalPlaces = step[i].toString().split('.')[1]?.length || 0;
    result[i] = Math.round(value[i] / step[i]) * step[i];
    result[i] = Math.max(min[i], result[i]);
    result[i] = Math.min(max[i], result[i]);

    result[i] = parseFloat(result[i].toFixed(decimalPlaces));
  }

  return result;
}

function percentValue(
  value: IVarXYValue,
  min: IVarXYValue,
  max: IVarXYValue
): IVarXYValue {
  if (!value) {
    return [50, 50];
  }

  const result: IVarXYValue = [0, 0];

  for (let i = 0; i < value.length; i++) {
    result[i] = ((value[i] - min[i]) / (max[i] - min[i])) * 100;
  }

  return result;
}

/**
 * XY offset picker. Accepts and provides an array in form of [x, y].
 */
export const VarXY: FC<IVarXYProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  className,
  defaultValue = [0, 0],
  min = [-1.0, -1.0],
  max = [1.0, 1.0],
  step = [0.01, 0.01],
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(() => roundValue(currentValue, min, max, step), [
    currentValue,
    min,
    max,
    step,
  ]);
  const percent = useMemo(() => percentValue(rounded, min, max), [
    rounded,
    min,
    max,
  ]);

  const updatePosition = useCallback(
    (x: number, y: number) => {
      if (!sliderRef.current) {
        return;
      }

      const div = sliderRef.current;
      const rect = div.getBoundingClientRect();

      const percentX = (x - rect.left) / rect.width;
      const percentY = (y - rect.top) / rect.height;

      const value = roundValue(
        [
          min[0] + (max[0] - min[0]) * percentX,
          min[1] + (max[1] - min[1]) * percentY,
        ],
        min,
        max,
        step
      );
      setCurrentValue(value);
    },
    [setCurrentValue, min, max, step]
  );

  const { dragProps } = usePointerDrag({
    onMove: ({ x, y }) => updatePosition(x, y),
  });

  const reset = useCallback(() => {
    if (typeof defaultValue !== 'undefined') {
      setCurrentValue(defaultValue);
    }
  }, [defaultValue, setCurrentValue]);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span className="react-var-ui-xy-value">
        {rounded[0]}, {rounded[1]}
      </span>
      <div className="react-var-ui-xy">
        <div
          className="react-var-ui-xy-space"
          ref={sliderRef}
          onClick={e => updatePosition(e.clientX, e.clientY)}
          onDoubleClick={reset}
          {...dragProps()}
        >
          <div
            className="react-var-ui-xy-control"
            style={{ top: percent[1] + '%', left: percent[0] + '%' }}
          ></div>
        </div>
      </div>
    </VarBase>
  );
};
