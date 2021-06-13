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

export interface IVarUIContext {
  values: VarUIObject;
  getValue: (path?: string) => any;
  setValue: (path: string, value: any) => void;
}

export interface IVarUIProps {
  values: VarUIObject;
  children?: ReactNode;
  updateValues: (values: VarUIObject) => void;
}

export const VarUIContext = createContext<IVarUIContext | undefined>(undefined);

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
