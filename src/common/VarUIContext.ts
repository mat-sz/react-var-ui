import { createContext, useContext, useMemo, useCallback } from 'react';

export interface IVarUIContext {
  values: any;
  getValue: (path?: string) => any;
  setValue: (path: string, value: any) => void;
}

export const VarUIContext = createContext<IVarUIContext | undefined>(undefined);

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
  const value = useMemo(
    () => context?.getValue(path) ?? fallbackValue,
    [context, path, fallbackValue]
  );
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
