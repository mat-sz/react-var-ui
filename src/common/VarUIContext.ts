import { createContext, useContext, useMemo, useCallback } from 'react';

export interface IVarUIContext {
  values: any;
  getValue: (path?: string) => any;
  setValue: (path: string, value: any) => void;
  getError: (path?: string) => any;
}

export const VarUIContext = createContext<IVarUIContext | undefined>(undefined);

export interface UseVarUIValueOptions<T> {
  path?: string;
  fallbackValue?: T;
  onChange?: (value: T) => void;
  errorPath?: string;
  error?: string;
}

/**
 * Simple function used for custom input components.
 * @param path
 * @param fallbackValue
 * @param onChange
 * @returns [value: T, setValue: (value: T) => void]
 */
export function useVarUIValue<T>({
  path,
  fallbackValue,
  onChange,
  errorPath,
  error,
}: UseVarUIValueOptions<T>): [T, (value: T) => void, string | undefined] {
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
  error ||= context?.getError(errorPath || path);

  return [value, setValue, error];
}
