import React, {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useCallback,
  useContext
} from 'react';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import result from 'lodash.result';

export type VarUIObject = any;

export interface IVarUIProps {
  /**
   * Object with values.
   */
  values: VarUIObject;

  /**
   * Function to be called with an updated object.
   */
  updateValues: (values: VarUIObject) => void;

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
 * Component which provides a context to input components and handles value updates.
 */
export const VarUI: FC<IVarUIProps> = ({ values, updateValues, children }) => {
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
      <div className="react-var-ui">{children}</div>
    </VarUIContext.Provider>
  );
};
