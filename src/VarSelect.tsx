import React, { FC, ReactText } from 'react';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarSelectOption {
  key: ReactText;
  label: string;
  value?: any;
}

export interface IVarSelectProps extends IVarBaseInputProps<any> {
  options: IVarSelectOption[];
}

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
          onChange={e => setCurrentValue(e.target.value)}
        >
          {options.map(option => (
            <option key={option.key} value={option.value ?? option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </VarBase>
  );
};
