import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { usePointerDragSimple } from 'react-use-pointer-drag';

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
export const VarAngle: FC<IVarAngleProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  defaultValue = 0,
  className,
}) => {
  const controlRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const degrees = useMemo(
    () => Math.round(wrap(currentValue) * (180 / Math.PI)),
    [currentValue]
  );

  const updatePosition = useCallback(
    (x: number, y: number) => {
      if (!controlRef.current) {
        return;
      }

      const div = controlRef.current;
      const rect = div.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setCurrentValue(wrap(Math.atan2(y - centerY, x - centerX) + Math.PI / 2));
    },
    [setCurrentValue]
  );

  const { events } = usePointerDragSimple(updatePosition);

  useEffect(() => {
    controlRef.current?.addEventListener('wheel', e => e.preventDefault());
  }, []);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span className="react-var-ui-angle-value">{degrees}&deg;</span>
      <div className="react-var-ui-angle">
        <div
          className="react-var-ui-angle-control"
          ref={controlRef}
          style={{ transform: `rotate(${degrees}deg)` }}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue)
          }
          onWheel={e => {
            setCurrentValue(wrap(currentValue + 0.5 * (e.deltaY < 0 ? -1 : 1)));
          }}
          title="Angle"
          {...events}
        ></div>
      </div>
    </VarBase>
  );
};
