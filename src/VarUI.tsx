import React, { ReactNode, useMemo, useCallback } from 'react';
import { clone, set, get } from 'radash';

import { VarUIContext } from './common/VarUIContext';

export interface IVarUIProps<T extends object> {
  /**
   * A JavaScript object or array to be mutated by the input components.
   */
  values: T;

  /**
   * A JavaScript object holding error information.
   */
  errors?: any;

  /**
   * @deprecated Replaced by onChange
   */
  updateValues?: (values: T) => void;

  /**
   * The function to be called with the entire changed object.
   */
  onChange?: (values: T) => void;

  /**
   * The function to be called when one value is changed.
   */
  onChangeValue?: (path: string, newValue: any) => void;

  /**
   * Additional class names for the wrapper object.
   */
  className?: string;

  /**
   * Input components (or any other children).
   */
  children?: ReactNode;
}

/**
 * This is the main component which provides a Context for other components.
 * It is not required to use this component - other components accept
 * `onChange` and `value` properties which provide a similar functionality.
 */
export const VarUI: <T extends object>(
  props: IVarUIProps<T>
) => JSX.Element = ({
  values,
  errors,
  updateValues,
  onChange,
  onChangeValue,
  className,
  children,
}) => {
  const getValue = useCallback(
    (path?: string) =>
      typeof path === 'string' ? get(values, path) : undefined,
    [values]
  );

  const setValue = useCallback(
    (path: string, value: any) => {
      onChangeValue?.(path, value);
      const newValues = path === '' ? value : set(clone(values), path, value);
      updateValues?.(newValues);
      onChange?.(newValues);
    },
    [values, updateValues, onChange, onChangeValue]
  );

  const getError = useCallback(
    (path?: string) =>
      errors && typeof path === 'string' ? get(errors, path) : undefined,
    [errors]
  );

  const contextValue = useMemo(
    () => ({ values, getValue, setValue, getError }),
    [values, getValue, setValue]
  );

  return (
    <VarUIContext.Provider value={contextValue}>
      <div className={'react-var-ui ' + (className ?? '')}>{children}</div>
    </VarUIContext.Provider>
  );
};
