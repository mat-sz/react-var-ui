import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarAngleProps extends IVarBaseInputProps<number> {}

/**
 * Angle picker component. Accepts and provides numbers (radians).
 */
export const VarAngle: FC<IVarAngleProps> = ({
  label,
  path,
  value,
  onChange,
  defaultValue = 0
}) => {
  const controlRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const degrees = useMemo(() => Math.round(currentValue * (180 / Math.PI)), [
    currentValue
  ]);

  const [moving, setMoving] = useState(false);
  const updatePosition = useCallback(
    (x: number, y: number) => {
      if (!controlRef.current) {
        return;
      }

      const div = controlRef.current;
      const rect = div.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let angle = Math.atan2(y - centerY, x - centerX) + Math.PI / 2;
      if (angle < 0) {
        angle = Math.PI * 2 + angle;
      }
      setCurrentValue(angle);
    },
    [setCurrentValue]
  );

  useEffect(() => {
    if (!moving) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) {
        return;
      }

      updatePosition(touch.clientX, touch.clientY);
    };

    const handleUp = () => {
      setMoving(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleUp);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('touchcancel', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleUp);

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('touchcancel', handleUp);
    };
  });

  return (
    <VarBase label={label}>
      <span className="react-var-ui-angle-value">{degrees}&deg;</span>
      <div className="react-var-ui-angle">
        <div
          className="react-var-ui-angle-control"
          ref={controlRef}
          style={{ transform: `rotate(${degrees}deg)` }}
          onDoubleClick={() =>
            typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue)
          }
          onMouseDown={e => {
            e.preventDefault();
            setMoving(true);
          }}
          onTouchStart={e => {
            e.preventDefault();
            setMoving(true);
          }}
        ></div>
      </div>
    </VarBase>
  );
};
