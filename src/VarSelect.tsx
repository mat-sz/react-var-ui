import React, { FC, ReactText } from 'react';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarSelectOption {
  /**
   * Key for the option. Also used as value if `value` is not specified.
   */
  key: ReactText;

  /**
   * Option label.
   */
  label: string;

  /**
   * Option value. Key will be used if not specified.
   * Note: Will be serialized to JSON and deserialized when selected.
   */
  value?: any;
}

export interface IVarSelectProps extends IVarBaseInputProps<any> {
  /**
   * Options to be displayed.
   */
  options: IVarSelectOption[];
}

/**
 * Select component. Returns and accepts either `value` from option object or `key` when `value` is not provided.
 */
export const VarSelect: FC<IVarSelectProps> = ({
  label,
  path,
  value,
  onChange,
  options
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarBase label={label}>
      <span>
        <select
          value={currentValue}
          onChange={e => setCurrentValue(JSON.parse(e.target.value))}
        >
          {options.map(option => (
            <option
              key={option.key}
              value={JSON.stringify(option.value ?? option.key)}
            >
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </VarBase>
  );
};
