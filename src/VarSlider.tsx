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
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';

export interface IVarSliderProps extends IVarBaseInputProps<number> {
  min: number;
  max: number;
  step: number;
  integer?: boolean;
}

export const VarSlider: FC<IVarSliderProps> = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step,
  integer,
  defaultValue
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const rounded = useMemo(
    () =>
      integer
        ? Math.round(currentValue)
        : Math.round(currentValue / step) * step,
    [currentValue, step, integer]
  );
  const percent = useMemo(() => ((rounded - min) / (max - min)) * 100, [
    rounded,
    min,
    max
  ]);

  const [moving, setMoving] = useState(false);
  const updatePosition = useCallback(
    (pageX: number) => {
      if (!sliderRef.current) {
        return;
      }

      const div = sliderRef.current;
      const rect = div.getBoundingClientRect();
      const percent = (pageX - rect.left) / rect.width;
      let value = Math.round((min + (max - min) * percent) / step) * step;
      value = Math.max(min, value);
      value = Math.min(max, value);

      setCurrentValue(integer ? Math.round(value) : value);
    },
    [setCurrentValue, integer, min, max, step]
  );

  useEffect(() => {
    if (!moving) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      updatePosition(e.pageX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) {
        return;
      }

      updatePosition(touch.pageX);
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
      <div className="react-var-ui-slider">
        <div
          className="react-var-ui-slider-track"
          ref={sliderRef}
          onClick={e => updatePosition(e.pageX)}
          onDoubleClick={() => defaultValue && setCurrentValue(defaultValue)}
          onMouseDown={() => setMoving(true)}
          onTouchStart={() => setMoving(true)}
        >
          <div
            className="react-var-ui-slider-content"
            style={{ width: percent + '%' }}
          ></div>
        </div>
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
        <button
          title="Increase"
          disabled={currentValue + step > max}
          onClick={() =>
            setCurrentValue(
              integer ? Math.round(currentValue + step) : currentValue + step
            )
          }
        >
          <IconUp />
        </button>
        <button
          title="Decrease"
          disabled={currentValue - step < min}
          onClick={() =>
            setCurrentValue(
              integer ? Math.round(currentValue - step) : currentValue - step
            )
          }
        >
          <IconDown />
        </button>
      </div>
    </VarBase>
  );
};
