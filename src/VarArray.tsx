import React, { FC, ReactNode } from 'react';
import { clone, get, set } from 'radash';

import { useVarUIValue, VarUIContext } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarArrayProps<T = any>
  extends Omit<IVarBaseInputProps<T[]>, 'label' | 'children'> {
  children?: ReactNode | ((element: T, index: number, array: T[]) => ReactNode);
}

/**
 * Array input component.
 */
export const VarArray: FC<IVarArrayProps> = ({
  path,
  value,
  onChange,
  disabled,
  className,
  children,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <div
      className={
        'react-var-ui-array ' +
        (disabled ? 'react-var-ui-disabled ' : '') +
        (className ?? '')
      }
    >
      {currentValue?.map((element, index, array) => {
        return (
          <VarUIContext.Provider
            value={{
              values: element,
              getValue: (path?: string) =>
                path ? get(element, path) : undefined,
              setValue: (path: string, newValue: any) => {
                const newArray = [...currentValue];
                newArray[index] = set(clone(element), path, newValue);
                setCurrentValue(newArray);
              },
            }}
            key={index}
          >
            {typeof children === 'function'
              ? children(element, index, array)
              : children}
          </VarUIContext.Provider>
        );
      })}
    </div>
  );
};
