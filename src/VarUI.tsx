import React, {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import result from 'lodash.result';

export type VarUIObject = any;

export interface IVarUIProps {
  /**
   * A JavaScript object or array to be mutated by the input components.
   */
  values: VarUIObject;

  /**
   * The function to be called whenever an update is available.
   */
  updateValues: (values: VarUIObject) => void;

  /**
   * Additional class names for the wrapper object.
   */
  className?: string;

  /**
   * Input components (or any other children).
   */
  children?: ReactNode;
}

interface IVarUIContext {
  values: VarUIObject;
  getValue: (path?: string) => any;
  setValue: (path: string, value: any) => void;
}

const VarUIContext = createContext<IVarUIContext | undefined>(undefined);

/**
 * Simple function used for custom input components.
 * @param path
 * @param fallbackValue
 * @param onChange
 * @returns [value: T, setValue: (value: T) => void]
 */
export function useVarUIValue<T>(
  path?: string,
  fallbackValue?: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const context = useContext(VarUIContext);
  const value = useMemo(() => context?.getValue(path) ?? fallbackValue, [
    context,
    path,
    fallbackValue
  ]);
  const setValue = useCallback(
    (value: T) => {
      if (path && context) {
        context.setValue(path, value);
      }

      onChange?.(value);
    },
    [path, context, onChange]
  );

  return [value, setValue];
}

/**
 * Event object to be applied on the target element.
 * <div {...events} />
 */
export interface IPointerDragEvents {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export interface IPointerDragState {
  /**
   * Event object to be applied on the target element.
   * <div {...events} />
   */
  events: IPointerDragEvents;

  /**
   * Whether the element is currently being dragged.
   */
  moving: boolean;
}

/**
 * Common mouse/touch hold and move actions.
 * @param updatePosition Function to be called with clientX and clientY when mouse/touch is down and dragged.
 * @returns IPointerDragState
 */
export function usePointerDrag(
  updatePosition: (x: number, y: number) => void
): IPointerDragState {
  const [moving, setMoving] = useState(false);

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

  const events = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        setMoving(true);
      },
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        setMoving(true);
      }
    }),
    [setMoving]
  );

  return {
    events,
    moving
  };
}

/**
 * This is the main component which provides a Context for other components.
 * It is not required to use this component - other components accept
 * `onChange` and `value` properties which provide a similar functionality.
 */
export const VarUI: FC<IVarUIProps> = ({
  values,
  updateValues,
  className,
  children
}) => {
  const getValue = useCallback(
    (path?: string) => (path ? result(values, path) : undefined),
    [values]
  );

  const setValue = useCallback(
    (path: string, value: any) => {
      updateValues(set(cloneDeep(values), path, value));
    },
    [values, updateValues]
  );

  const contextValue = useMemo(() => ({ values, getValue, setValue }), [
    values,
    getValue,
    setValue
  ]);

  return (
    <VarUIContext.Provider value={contextValue}>
      <div className={'react-var-ui ' + (className ? className : '')}>
        {children}
      </div>
    </VarUIContext.Provider>
  );
};
