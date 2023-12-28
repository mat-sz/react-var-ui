import React, { useEffect, useMemo, useRef } from 'react';
import { usePointerDrag } from 'react-use-pointer-drag';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

const PI2 = Math.PI * 2;

function wrap(angle: number) {
  return (PI2 + (angle % PI2)) % PI2;
}

export interface IVarAngleProps extends IVarBaseInputProps<number> {}

/**
 * Angle picker component. Accepts and provides numbers (radians).
 */
export const VarAngle = ({
  label,
  path,
  value,
  onChange,
  disabled,
  readOnly,
  defaultValue = 0,
  className,
  error,
  errorPath,
}: IVarAngleProps): JSX.Element => {
  const controlRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });
  const degrees = useMemo(
    () => Math.round(wrap(currentValue) * (180 / Math.PI)),
    [currentValue]
  );

  const { dragProps } = usePointerDrag({
    onMove: ({ x, y }) => {
      if (!controlRef.current) {
        return;
      }

      const div = controlRef.current;
      const rect = div.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setCurrentValue(wrap(Math.atan2(y - centerY, x - centerX) + Math.PI / 2));
    },
  });

  useEffect(() => {
    controlRef.current?.addEventListener('wheel', e => e.preventDefault());
  }, []);

  return (
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      error={currentError}
    >
      <span className="react-var-ui-angle-value">{degrees}&deg;</span>
      <div className="react-var-ui-angle">
        <div
          className="react-var-ui-angle-control react-var-ui-interactive"
          ref={controlRef}
          style={{ transform: `rotate(${degrees}deg)` }}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue)
          }
          onWheel={e => {
            setCurrentValue(wrap(currentValue + 0.5 * (e.deltaY < 0 ? -1 : 1)));
          }}
          title="Angle"
          {...dragProps()}
        ></div>
      </div>
    </VarBase>
  );
};
