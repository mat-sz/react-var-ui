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
}: React.PropsWithChildren<IVarBaseValueProps<any>>): JSX.Element => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarUIContext.Provider
      value={{
        values: currentValue,
        getValue: (subpath?: string) =>
          subpath ? get(currentValue, subpath) : undefined,
        setValue: (subpath: string, newValue: any) => {
          const newObject = set(clone(currentValue), subpath, newValue);
          setCurrentValue(newObject);
        },
      }}
    >
      {children}
    </VarUIContext.Provider>
  );
};
