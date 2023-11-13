import React, { ReactNode, useMemo, useCallback } from 'react';
import { clone, set, get } from 'radash';

import { VarUIContext } from './common/VarUIContext';

export interface IVarUIProps<T = any> {
  /**
   * A JavaScript object or array to be mutated by the input components.
   */
  values: T;

  /**
   * The function to be called whenever an update is available.
   */
  updateValues: (values: T) => void;

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
export const VarUI: <T>(props: IVarUIProps<T>) => JSX.Element = ({
  values,
  updateValues,
  className,
  children,
}) => {
  const getValue = useCallback(
    (path?: string) => (path ? get(values, path) : undefined),
    [values]
  );

  const setValue = useCallback(
    (path: string, value: any) => {
      updateValues(set(clone(values) as any, path, value));
    },
    [values, updateValues]
  );

  const contextValue = useMemo(
    () => ({ values, getValue, setValue }),
    [values, getValue, setValue]
  );

  return (
    <VarUIContext.Provider value={contextValue}>
      <div className={'react-var-ui ' + (className ? className : '')}>
        {children}
      </div>
    </VarUIContext.Provider>
  );
};
