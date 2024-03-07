import React from 'react';
import { clone, get, set } from 'radash';

import { VarUIContext, useVarUIValue } from './common/VarUIContext';
import { IVarBaseValueProps } from './VarBase';

/**
 * Utility component that creates a context with a certain path as base.
 */
export const VarScope = ({
  path,
  value,
  onChange,
  children,
  error,
  errorPath,
}: React.PropsWithChildren<IVarBaseValueProps<any>>): JSX.Element => {
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });

  return (
    <VarUIContext.Provider
      value={{
        values: currentValue,
        getValue: (subpath?: string) =>
          typeof subpath === 'string' ? get(currentValue, subpath) : undefined,
        setValue: (subpath: string, newValue: any) => {
          const newObject = set(clone(currentValue), subpath, newValue);
          setCurrentValue(newObject);
        },
        getError: (subpath?: string) => {
          return currentError && subpath
            ? get(currentError, subpath)
            : undefined;
        },
      }}
    >
      {children}
    </VarUIContext.Provider>
  );
};
