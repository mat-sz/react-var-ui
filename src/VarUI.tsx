import React, { FC, ReactNode, useMemo, useCallback } from 'react';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import result from 'lodash.result';

import { VarUIObject, VarUIContext } from './common/VarUIContext';

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
